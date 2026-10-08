import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Prisma } from "@prisma/client";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import OrderStatusTracker from "@/components/account/OrderStatusTracker";

interface OrderDetailsPageProps {
  params: Promise<{
    orderId: string;
  }>;
}

type OrderWithItems = Prisma.OrderGetPayload<{
  include: {
    items: {
      include: {
        product: {
          include: {
            images: true;
          };
        };
      };
    };
  };
}>;

export default async function OrderDetailsPage({
  params,
}: OrderDetailsPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/account/login");
  }

  const { orderId } = await params;

  const order: OrderWithItems | null = await prisma.order.findFirst({
    where: {
      id: orderId,
      userId: user.id,
    },
    include: {
      items: {
        include: {
          product: {
            include: {
              images: true,
            },
          },
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <main className="min-h-[70vh] px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/account"
          className="text-sm font-semibold text-primary transition hover:text-primary-hover"
        >
          ← Back to My Account
        </Link>

        <div className="mt-8 flex flex-col gap-4 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              Order Details
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Order #{order.id.slice(-8).toUpperCase()}
            </h1>

            <p className="mt-2 text-sm text-muted">
              Placed{" "}
              {order.createdAt.toLocaleDateString("en-NG", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <span className="w-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold uppercase text-primary">
            {order.status}
          </span>
        </div>

        <div className="mt-8 space-y-8">
          <OrderStatusTracker status={order.status} />

          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <section>
              <h2 className="text-xl font-semibold">Items</h2>

              <div className="mt-4 space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-border bg-card p-5"
                  >
                    <div className="flex gap-4">
                      {item.product.images[0] && (
                        <img
                          src={item.product.images[0].url}
                          alt={item.product.name}
                          className="h-24 w-24 rounded-xl object-cover"
                        />
                      )}

                      <div className="flex-1">
                        <h3 className="font-semibold">
                          {item.product.name}
                        </h3>

                        {item.size && (
                          <p className="mt-1 text-sm text-muted">
                            Size: {item.size}
                          </p>
                        )}

                        <p className="mt-1 text-sm text-muted">
                          Quantity: {item.quantity}
                        </p>

                        <p className="mt-3 font-semibold">
                          ₦
                          {Number(item.price).toLocaleString("en-NG")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <aside className="space-y-6">
              <section className="rounded-2xl border border-border bg-card p-6">
                <h2 className="text-xl font-semibold">Order Summary</h2>

                <div className="mt-5 flex items-center justify-between border-t border-border pt-5">
                  <span className="text-muted">Total</span>

                  <span className="text-xl font-bold">
                    ₦{Number(order.total).toLocaleString("en-NG")}
                  </span>
                </div>
              </section>

              <section className="rounded-2xl border border-border bg-card p-6">
                <h2 className="text-xl font-semibold">
                  Delivery Information
                </h2>

                <div className="mt-5 space-y-3 text-sm">
                  <div>
                    <p className="text-muted">Name</p>
                    <p className="mt-1">{order.customerName}</p>
                  </div>

                  <div>
                    <p className="text-muted">Phone</p>
                    <p className="mt-1">{order.customerPhone}</p>
                  </div>

                  <div>
                    <p className="text-muted">Address</p>
                    <p className="mt-1">{order.address}</p>
                  </div>

                  <div>
                    <p className="text-muted">Location</p>

                    <p className="mt-1">
                      {order.city}, {order.state}
                      {order.postalCode ? ` ${order.postalCode}` : ""}
                    </p>
                  </div>
                </div>
              </section>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}