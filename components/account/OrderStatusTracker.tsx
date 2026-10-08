interface OrderStatusTrackerProps {
  status:
    | "PENDING"
    | "PAID"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED";
}

const statuses = [
  {
    value: "PENDING",
    label: "Order Placed",
    description: "Your order has been received.",
  },
  {
    value: "PAID",
    label: "Payment Confirmed",
    description: "Your payment has been confirmed.",
  },
  {
    value: "PROCESSING",
    label: "Processing",
    description: "We're preparing your order.",
  },
  {
    value: "SHIPPED",
    label: "Shipped",
    description: "Your order is on its way.",
  },
  {
    value: "DELIVERED",
    label: "Delivered",
    description: "Your order has been delivered.",
  },
] as const;

export default function OrderStatusTracker({
  status,
}: OrderStatusTrackerProps) {
  if (status === "CANCELLED") {
    return (
      <div className="rounded-2xl border border-danger/30 bg-danger/10 p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-danger">
          Order Cancelled
        </p>

        <p className="mt-2 text-sm text-muted">
          This order has been cancelled.
        </p>
      </div>
    );
  }

  const currentIndex = statuses.findIndex(
    (item) => item.value === status
  );

  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h2 className="text-xl font-semibold">
        Order Tracking
      </h2>

      <div className="mt-8">
        {statuses.map((item, index) => {
          const completed = index <= currentIndex;
          const current = index === currentIndex;

          return (
            <div key={item.value} className="flex">
              <div className="mr-4 flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold ${
                    completed
                      ? "border-primary bg-primary text-black"
                      : "border-border bg-background text-muted"
                  }`}
                >
                  {completed ? "✓" : index + 1}
                </div>

                {index < statuses.length - 1 && (
                  <div
                    className={`my-1 h-12 w-px ${
                      index < currentIndex
                        ? "bg-primary"
                        : "bg-border"
                    }`}
                  />
                )}
              </div>

              <div className="pb-8">
                <p
                  className={`font-semibold ${
                    current ? "text-primary" : ""
                  }`}
                >
                  {item.label}
                </p>

                <p className="mt-1 text-sm text-muted">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}