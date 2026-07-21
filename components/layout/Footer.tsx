import Container from "@/components/ui/Container";
import { SITE } from "@/constants/site";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface mt-20">
      <Container className="py-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <Logo />

          <p className="text-muted">
            {SITE.tagline}
          </p>

          <p className="text-sm text-muted">
            © {year} {SITE.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}