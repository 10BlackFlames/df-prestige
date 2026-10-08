"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PaymentCallback() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");

  const [message, setMessage] = useState("Verifying your payment...");
  const [success, setSuccess] = useState<boolean | null>(null);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    async function verifyPayment() {
      if (!reference) {
        setMessage("Payment reference is missing.");
        setSuccess(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/payment/verify?reference=${encodeURIComponent(reference)}`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Payment verification failed."
          );
        }

        setOrderId(data.orderId);
        setMessage("Payment successful! Your order has been confirmed.");
        setSuccess(true);
      } catch (error) {
        setMessage(
          error instanceof Error
            ? error.message
            : "Unable to verify your payment."
        );
        setSuccess(false);
      }
    }

    verifyPayment();
  }, [reference]);

  return (
    <main className="min-h-[70vh] px-6 py-20">
      <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 text-center">
        <div
          className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${
            success === true
              ? "bg-green-500/10 text-green-500"
              : success === false
                ? "bg-danger/10 text-danger"
                : "bg-primary/10 text-primary"
          }`}
        >
          {success === true ? "✓" : success === false ? "!" : "..."}
        </div>

        <h1 className="mt-6 text-3xl font-bold">
          {success === true
            ? "Payment Confirmed"
            : success === false
              ? "Payment Verification Failed"
              : "Verifying Payment"}
        </h1>

        <p className="mt-4 text-muted">{message}</p>

        {success === true && orderId && (
          <Link
            href={`/checkout/success?order=${orderId}`}
            className="mt-8 inline-flex rounded-xl bg-primary px-8 py-4 font-semibold text-black transition hover:bg-primary-hover"
          >
            View Your Order
          </Link>
        )}

        {success === false && (
          <Link
            href="/checkout"
            className="mt-8 inline-flex rounded-xl bg-primary px-8 py-4 font-semibold text-black transition hover:bg-primary-hover"
          >
            Return to Checkout
          </Link>
        )}
      </div>
    </main>
  );
}