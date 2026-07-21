import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";

export default function Header() {
  return (
    <header className="border-b border-border bg-background">
      <Container className="flex h-20 items-center justify-between">
        <Logo />

        <p className="text-sm text-muted">
          Step Into Luxury
        </p>
      </Container>
    </header>
  );
}