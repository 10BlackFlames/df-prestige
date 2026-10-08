import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get("reference");

    if (!reference) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment reference is required.",
        },
        { status: 400 }
      );
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json(
        {
          success: false,
          message: "Paystack configuration is missing.",
        },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(
        reference
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok || !data.status) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Unable to verify payment.",
        },
        { status: 400 }
      );
    }

    const transaction = data.data;

    if (transaction.status !== "success") {
      return NextResponse.json({
        success: false,
        message: "Payment was not successful.",
        status: transaction.status,
      });
    }

    const order = await prisma.order.findFirst({
      where: {
        paymentReference: reference,
      },
      include: {
        items: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order associated with this payment was not found.",
        },
        { status: 404 }
      );
    }

    // Payment has already been processed.
    if (
      order.status === "PAID" ||
      order.status === "PROCESSING" ||
      order.status === "SHIPPED" ||
      order.status === "DELIVERED"
    ) {
      return NextResponse.json({
        success: true,
        orderId: order.id,
        message: "Payment has already been verified.",
      });
    }

    const expectedAmount = Math.round(Number(order.total) * 100);

    if (transaction.amount !== expectedAmount) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment amount does not match the order total.",
        },
        { status: 400 }
      );
    }

    if (transaction.currency !== "NGN") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment currency.",
        },
        { status: 400 }
      );
    }

    await prisma.$transaction(async (tx) => {
      for (const item of order.items) {
        if (item.size) {
          const size = await tx.productSize.findFirst({
            where: {
              productId: item.productId,
              size: item.size,
            },
          });

          if (!size || size.quantity < item.quantity) {
            throw new Error(
              `Insufficient stock for product ${item.productId}, size ${item.size}.`
            );
          }

          await tx.productSize.update({
            where: {
              id: size.id,
            },
            data: {
              quantity: {
                decrement: item.quantity,
              },
            },
          });
        }

        await tx.product.update({
          where: {
            id: item.productId,
          },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      await tx.order.update({
        where: {
          id: order.id,
        },
        data: {
          status: "PAID",
        },
      });
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      message: "Payment verified and inventory updated successfully.",
    });
  } catch (error) {
    console.error("Payment verification error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong while verifying payment.",
      },
      { status: 500 }
    );
  }
}