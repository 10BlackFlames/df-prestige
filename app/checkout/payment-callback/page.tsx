import { Suspense } from "react";
import PaymentCallback from "./PaymentCallback";

export default function PaymentCallbackPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-[70vh] px-6 py-20">
          <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 text-center">
            <p className="text-muted">Verifying your payment...</p>
          </div>
        </main>
      }
    >
      <PaymentCallback />
    </Suspense>
  );
}