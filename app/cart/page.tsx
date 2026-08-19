"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

import Section from "@/components/ui/Section";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/utils/formatCurrency";

export default function CartPage() {
  const {
    items,
    subtotal,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  if (items.length === 0) {
    return (
      <Section>
        <div className="mx-auto max-w-2xl py-16 text-center">
          <h1 className="text-4xl font-bold">
            Your Cart Is Empty
          </h1>

          <p className="mt-4 text-muted">
            You haven't added anything to your cart yet.
          </p>

          <Link
            href="/shop"
            className="mt-8 inline-flex rounded-xl bg-primary px-8 py-4 font-semibold text-black transition hover:bg-primary-hover"
          >
            Continue Shopping
          </Link>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-widest text-primary">
            Shopping Cart
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Your Cart
          </h1>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="text-sm text-muted transition hover:text-danger"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        {/* Cart Items */}
        <div className="space-y-5">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.size}`}
              className="flex gap-5 rounded-2xl border border-border bg-card p-4"
            >
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-surface">
                <Image
                  src={item.image}
                  alt={item.productName}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex justify-between gap-4">
                  <div>
                    <h2 className="font-semibold">
                      {item.productName}
                    </h2>

                    {item.size && (
                      <p className="mt-1 text-sm text-muted">
                        Size: {item.size}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removeItem(
                        item.productId,
                        item.size,
                      )
                    }
                    className="text-muted transition hover:text-danger"
                    aria-label={`Remove ${item.productName}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="mt-auto flex items-end justify-between gap-4">
                  <div className="flex items-center overflow-hidden rounded-lg border border-border">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.size,
                          item.quantity - 1,
                        )
                      }
                      className="p-2 transition hover:bg-surface"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="min-w-10 text-center text-sm">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.size,
                          item.quantity + 1,
                        )
                      }
                      className="p-2 transition hover:bg-surface"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <p className="font-bold text-primary">
                    {formatCurrency(
                      item.price * item.quantity,
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-2xl border border-border bg-card p-6">
          <h2 className="text-2xl font-semibold">
            Order Summary
          </h2>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between text-muted">
              <span>Subtotal</span>

              <span>
                {formatCurrency(subtotal)}
              </span>
            </div>

            <div className="flex justify-between text-muted">
              <span>Delivery</span>

              <span>Calculated at checkout</span>
            </div>

            <div className="h-px bg-border" />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>

              <span className="text-primary">
                {formatCurrency(subtotal)}
              </span>
            </div>
          </div>

          <Link
  href="/checkout"
  className="block w-full rounded-xl bg-primary px-6 py-4 text-center font-semibold text-black transition hover:bg-primary-hover"
>
  Proceed to Checkout
</Link>

          <Link
            href="/shop"
            className="mt-4 block text-center text-sm text-muted transition hover:text-primary"
          >
            Continue Shopping
          </Link>
        </aside>
      </div>
    </Section>
  );
}