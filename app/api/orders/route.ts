import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface OrderItemInput {
  productId: string;
  size: string | null;
  quantity: number;
}

interface OrderRequest {
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  delivery: {
    address: string;
    city: string;
    state: string;
    postalCode?: string;
  };
  notes?: string;
  items: OrderItemInput[];
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as OrderRequest;

    if (
      !body.customer?.name ||
      !body.customer?.email ||
      !body.customer?.phone
    ) {
      return NextResponse.json(
        {
          error: "Please provide your name, email and phone number.",
        },
        { status: 400 }
      );
    }

    if (
      !body.delivery?.address ||
      !body.delivery?.city ||
      !body.delivery?.state
    ) {
      return NextResponse.json(
        {
          error: "Please provide your complete delivery address.",
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        {
          error: "Your cart is empty.",
        },
        { status: 400 }
      );
    }

    // Get the currently logged-in customer, if there is one.
    const currentUser = await getCurrentUser();

    const productIds = [
      ...new Set(body.items.map((item) => item.productId)),
    ];

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
      include: {
        sizes: true,
      },
    });

    if (products.length !== productIds.length) {
      return NextResponse.json(
        {
          error: "One or more products are no longer available.",
        },
        { status: 400 }
      );
    }

    let total = 0;
    const orderItems = [];

    for (const item of body.items) {
      if (
        !Number.isInteger(item.quantity) ||
        item.quantity <= 0
      ) {
        return NextResponse.json(
          {
            error: "Invalid product quantity.",
          },
          { status: 400 }
        );
      }

      const product = products.find(
        (currentProduct) => currentProduct.id === item.productId
      );

      if (!product) {
        return NextResponse.json(
          {
            error: "Product not found.",
          },
          { status: 400 }
        );
      }

      if (item.size) {
        const productSize = product.sizes.find(
          (size) => size.size === item.size
        );

        if (!productSize) {
          return NextResponse.json(
            {
              error: `${product.name} is not available in size ${item.size}.`,
            },
            { status: 400 }
          );
        }

        if (productSize.quantity < item.quantity) {
          return NextResponse.json(
            {
              error: `Only ${productSize.quantity} of ${product.name} in size ${item.size} are available.`,
            },
            { status: 400 }
          );
        }
      } else if (product.stock < item.quantity) {
        return NextResponse.json(
          {
            error: `Only ${product.stock} of ${product.name} are available.`,
          },
          { status: 400 }
        );
      }

      const itemTotal = Number(product.price) * item.quantity;

      total += itemTotal;

      orderItems.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
        size: item.size,
      });
    }

    const order = await prisma.order.create({
      data: {
        // Attach the order to the logged-in customer.
        // Guest orders remain supported because this can be null.
        userId: currentUser?.id ?? null,

        customerName: body.customer.name.trim(),
        customerEmail: body.customer.email.trim().toLowerCase(),
        customerPhone: body.customer.phone.trim(),

        address: body.delivery.address.trim(),
        city: body.delivery.city.trim(),
        state: body.delivery.state.trim(),
        postalCode: body.delivery.postalCode?.trim() || null,

        notes: body.notes?.trim() || null,

        total,

        items: {
          create: orderItems,
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        orderId: order.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("ORDER_CREATION_ERROR", error);

    return NextResponse.json(
      {
        error: "Unable to create your order. Please try again.",
      },
      { status: 500 }
    );
  }
}