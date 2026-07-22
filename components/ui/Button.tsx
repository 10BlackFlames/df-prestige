import Link from "next/link";
import clsx from "clsx";
import { ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}

export default function Button({
  href,
  children,
  variant = "primary",
  className,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 active:translate-y-0",
        "focus:outline-none focus:ring-2 focus:ring-primary/50",
        {
          "bg-primary text-black hover:bg-primary-hover hover:-translate-y-0.5":
            variant === "primary",

          "border border-primary bg-transparent text-primary hover:bg-primary hover:text-black":
            variant === "secondary",

          "border border-border bg-card text-white hover:border-primary hover:text-primary":
            variant === "outline",
        },
        className
      )}
    >
      {children}
    </Link>
  );
}