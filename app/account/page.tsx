import Link from "next/link";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import LogoutButton from "./LogoutButton";

export default async function AccountPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/account/login");
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: user.id,
    },
    include: {
      items: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-[70vh] px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            DF Prestige
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            My Account
          </h1>

          <p className="mt-3 text-muted">
            Welcome back, {user.name}.
          </p>

          <div className="mt-6">
            <LogoutButton />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-xl font-semibold">
              Account Information
            </h2>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-sm text-muted">Name</p>
                <p className="mt-1 font-medium">{user.name}</p>
              </div>

              <div>
                <p className="text-sm text-muted">Email</p>
                <p className="mt-1 font-medium">{user.email}</p>
              </div>

              <div>
                <p className="text-sm text-muted">Phone</p>
                <p className="mt-1 font-medium">
                  {user.phone || "Not provided"}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-xl font-semibold">
              Orders
            </h2>

            {orders.length === 0 ? (
              <div className="mt-6">
                <p className="text-muted">
                  You have not placed any orders yet.
                </p>

                <Link
                  href="/shop"
                  className="mt-5 inline-block rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-black transition hover:bg-primary-hover"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-xl border border-border p-4"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-semibold">
                          Order #{order.id.slice(-8).toUpperCase()}
                        </p>

                        <p className="mt-1 text-sm text-muted">
                          {order.createdAt.toLocaleDateString("en-NG", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>

                      <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase text-primary">
                        {order.status}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                      <div>
                        <p className="text-sm text-muted">
                          {order.items.length}{" "}
                          {order.items.length === 1 ? "item" : "items"}
                        </p>

                        <p className="mt-1 font-semibold">
                          ₦{Number(order.total).toLocaleString("en-NG")}
                        </p>
                      </div>

                      <Link
                        href={`/account/orders/${order.id}`}
                        className="text-sm font-semibold text-primary transition hover:text-primary-hover"
                      >
                        View Order
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}