import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function HomePage() {
  return (
    <section className="flex min-h-[80vh] items-center">
      <Container>
        <div className="max-w-3xl">
          <p className="mb-4 text-primary uppercase tracking-[0.3em]">
            Premium Fashion
          </p>

          <h1 className="mb-6 text-6xl font-bold leading-tight">
            Step Into Luxury.
          </h1>

          <p className="mb-8 text-lg text-muted">
            Discover premium sneakers, luxury fashion, and timeless
            streetwear delivered across Nigeria and worldwide.
          </p>

          <div className="flex gap-4">
            <Button href="/shop">
              Shop Now
            </Button>

            <Button
              href="/about"
              variant="secondary"
            >
              Learn More
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}