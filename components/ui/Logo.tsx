import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

export default function Logo({ size = "md" }: LogoProps) {
  const sizes = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-5xl",
  };

  return (
    <Link
      href="/"
      className={`${sizes[size]} font-bold tracking-wide text-primary transition hover:opacity-90`}
    >
      DF Prestige
    </Link>
  );
}