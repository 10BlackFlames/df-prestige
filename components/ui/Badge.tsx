import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
}

export default function Badge({
  children,
}: BadgeProps) {
  return (
    <span className="rounded-full bg-primary px-4 py-1 text-xs font-semibold uppercase tracking-wider text-black">
      {children}
    </span>
  );
}