import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  onClick?: () => void;
}

const baseClasses =
  "inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium transition duration-300";

const variants = {
  primary:
    "bg-primary text-black hover:bg-primary-hover",

  secondary:
    "border border-primary text-primary hover:bg-primary hover:text-black",
};

export default function Button({
  children,
  href,
  variant = "primary",
  type = "button",
  onClick,
}: ButtonProps) {
  const className = `${baseClasses} ${variants[variant]}`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
}