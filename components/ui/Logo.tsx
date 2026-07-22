import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

export default function Logo({
  size = "md",
}: LogoProps) {
  const textSize = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  };

  return (
    <Link
      href="/"
      className="flex items-center gap-3"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary text-primary font-bold text-xl">
        DP
      </div>

      <div>
        <h2
          className={`${textSize[size]} font-bold tracking-[0.25em] uppercase`}
        >
          DF Prestige
        </h2>

        <p className="text-[10px] uppercase tracking-[0.4em] text-muted">
          Step Into Luxury
        </p>
      </div>
    </Link>
  );
}