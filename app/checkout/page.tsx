"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Section from "@/components/ui/Section";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/utils/formatCurrency";

interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  notes: string;
}

export default function CheckoutPage() {
  const router = useRouter();

  const { items, subtotal } = useCart();

  const [form, setForm] = useState<CheckoutForm>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateField(
    field: keyof CheckoutForm,
    value: string,
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: {
            name: form.name,
            email: form.email,
            phone: form.phone,
          },
          delivery: {
            address: form.address,
            city: form.city,
            state: form.state,
            postalCode: form.postalCode,
          },
          notes: form.notes,
          items: items.map((item) => ({
            productId: item.productId,
            size: item.size,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to create order.",
        );
      }

      router.push(`/checkout/success?order=${data.orderId}`);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <Section>
        <div className="mx-auto max-w-2xl py-16 text-center">
          <h1 className="text-4xl font-bold">
            Your Cart Is Empty
          </h1>

          <p className="mt-4 text-muted">
            Add products to your cart before checking out.
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
      <div className="mb-10">
        <p className="text-sm uppercase tracking-widest text-primary">
          Checkout
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Complete Your Order
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-10 lg:grid-cols-[1fr_380px]"
      >
        {/* Checkout Form */}
        <div className="space-y-8">
          {/* Customer Information */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-2xl font-semibold">
              Customer Information
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <FormField
                label="Full Name"
                value={form.name}
                onChange={(value) =>
                  updateField("name", value)
                }
                placeholder="Your full name"
                required
              />

              <FormField
                label="Email Address"
                type="email"
                value={form.email}
                onChange={(value) =>
                  updateField("email", value)
                }
                placeholder="you@example.com"
                required
              />

              <FormField
                label="Phone Number"
                type="tel"
                value={form.phone}
                onChange={(value) =>
                  updateField("phone", value)
                }
                placeholder="08012345678"
                required
              />
            </div>
          </div>

          {/* Delivery Information */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-2xl font-semibold">
              Delivery Information
            </h2>

            <div className="mt-6 space-y-5">
              <FormField
                label="Delivery Address"
                value={form.address}
                onChange={(value) =>
                  updateField("address", value)
                }
                placeholder="Street address"
                required
              />

              <div className="grid gap-5 md:grid-cols-2">
                <FormField
                  label="City"
                  value={form.city}
                  onChange={(value) =>
                    updateField("city", value)
                  }
                  placeholder="City"
                  required
                />

                <FormField
                  label="State"
                  value={form.state}
                  onChange={(value) =>
                    updateField("state", value)
                  }
                  placeholder="State"
                  required
                />

                <FormField
                  label="Postal Code"
                  value={form.postalCode}
                  onChange={(value) =>
                    updateField("postalCode", value)
                  }
                  placeholder="Optional"
                />
              </div>
            </div>
          </div>

          {/* Order Notes */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-2xl font-semibold">
              Order Notes
            </h2>

            <textarea
              value={form.notes}
              onChange={(event) =>
                updateField("notes", event.target.value)
              }
              placeholder="Any special instructions?"
              rows={5}
              className="mt-5 w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 outline-none transition focus:border-primary"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-danger/30 bg-danger/10 p-4 text-sm text-danger">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary px-6 py-4 font-semibold text-black transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Creating Order..."
              : "Place Order"}
          </button>
        </div>

        {/* Order Summary */}
        <aside className="h-fit rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-28">
          <h2 className="text-2xl font-semibold">
            Order Summary
          </h2>

          <div className="mt-6 space-y-5">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.size}`}
                className="flex justify-between gap-4"
              >
                <div>
                  <p className="font-medium">
                    {item.productName}
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
                    item.price * item.quantity,
                  )}
                </p>
              </div>
            ))}
          </div>

          <div className="my-6 h-px bg-border" />

          <div className="flex justify-between text-muted">
            <span>Subtotal</span>

            <span>{formatCurrency(subtotal)}</span>
          </div>

          <div className="mt-4 flex justify-between text-muted">
            <span>Delivery</span>

            <span>Calculated later</span>
          </div>

          <div className="my-6 h-px bg-border" />

          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>

            <span className="text-primary">
              {formatCurrency(subtotal)}
            </span>
          </div>
        </aside>
      </form>
    </Section>
  );
}

function FormField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium">
        {label}
        {required && (
          <span className="ml-1 text-primary">*</span>
        )}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-border bg-surface px-4 py-3 outline-none transition focus:border-primary"
      />
    </label>
  );
}