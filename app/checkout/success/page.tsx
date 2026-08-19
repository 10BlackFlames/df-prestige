import Link from "next/link";

import Section from "@/components/ui/Section";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/utils/formatCurrency";

interface SuccessPageProps {
  searchParams: Promise<{
    order?: string;
  }>;
}

export default async function CheckoutSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { order: orderId } = await searchParams;

  if (!orderId) {
    return (
      <Section>
        <div className="mx-auto max-w-2xl py-16 text-center">
          <h1 className="text-4xl font-bold">
            Order Not Found
          </h1>

          <Link
            href="/shop"
            className="mt-8 inline-flex rounded-xl bg-primary px-8 py-4 font-semibold text-black"
          >
            Continue Shopping
          </Link>
        </div>
      </Section>
    );
  }

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    return (
      <Section>
        <div className="mx-auto max-w-2xl py-16 text-center">
          <h1 className="text-4xl font-bold">
            Order Not Found
          </h1>

          <Link
            href="/shop"
            className="mt-8 inline-flex rounded-xl bg-primary px-8 py-4 font-semibold text-black"
          >
            Continue Shopping
          </Link>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <div className="mx-auto max-w-3xl py-12">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-2xl text-success">
            ✓
          </div>

          <p className="mt-6 text-sm uppercase tracking-widest text-primary">
            Order Received
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Thank You, {order.customerName}
          </h1>

          <p className="mt-4 text-muted">
            Your order has been created successfully.
          </p>

          <p className="mt-2 text-sm text-muted">
            Order ID: {order.id}
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-6">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">
              Order Summary
            </h2>

            <span className="rounded-full bg-warning/15 px-3 py-1 text-sm text-warning">
              {order.status}
            </span>
          </div>

          <div className="mt-6 space-y-5">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between gap-4"
              >
                <div>
                  <p className="font-medium">
                    {item.product.name}
                  </p>

                  <p className="text-sm text-muted">
                    {item.size
                      ? `Size: ${item.size} · `
                      : ""}
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-medium">
                  {formatCurrency(
                    Number(item.price) * item.quantity,
                  )}
                </p>
              </div>
            ))}
          </div>

          <div className="my-6 h-px bg-border" />

          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>

            <span className="text-primary">
              {formatCurrency(Number(order.total))}
            </span>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">
            Delivery Information
          </h2>

          <div className="mt-4 space-y-1 text-muted">
            <p>{order.customerPhone}</p>
            <p>{order.address}</p>
            <p>
              {order.city}, {order.state}
              {order.postalCode
                ? ` ${order.postalCode}`
                : ""}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/shop"
            className="rounded-xl bg-primary px-8 py-4 text-center font-semibold text-black transition hover:bg-primary-hover"
          >
            Continue Shopping
          </Link>

          <Link
            href="/"
            className="rounded-xl border border-border px-8 py-4 text-center font-semibold transition hover:border-primary"
          >
            Back Home
          </Link>
        </div>
      </div>
    </Section>
  );
}