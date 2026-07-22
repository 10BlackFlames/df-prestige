import { ReactNode } from "react";
import Container from "./Container";

interface SectionProps {
  children: ReactNode;
  className?: string;
}

export default function Section({
  children,
  className = "",
}: SectionProps) {
  return (
    <section className={`py-20 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}