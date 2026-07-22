import Image from "next/image";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,169,106,0.15),transparent_45%)]" />
      <div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,.35))]" />

      <Container className="relative grid min-h-[88vh] items-center gap-14 py-20 lg:grid-cols-2">
        {/* Left Content */}
        <div>
          <span className="inline-flex rounded-full border border-primary/30 px-4 py-2 text-sm uppercase tracking-[0.35em] text-primary">
            Premium Fashion
          </span>

          <h1 className="mt-8 text-5xl font-bold leading-tight md:text-7xl">
            STEP INTO
            <br />
            <span className="text-gradient">LUXURY</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-muted">
            Discover premium sneakers, luxury wears and exclusive
            street fashion from DF Prestige. We deliver throughout
            Nigeria and internationally.
          </p>

          <div className="mt-10 flex flex-wrap gap-5">
            <Button href="/shop">
              Shop Now
            </Button>

            <Button
              href="/about"
              variant="secondary"
            >
              Explore Collection
            </Button>
          </div>

          <div className="mt-14 flex flex-wrap gap-10">
            <div>
              <h2 className="text-3xl font-bold text-primary">
                500+
              </h2>

              <p className="text-muted">
                Premium Products
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-primary">
                2
              </h2>

              <p className="text-muted">
                Physical Stores
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-primary">
                Worldwide
              </h2>

              <p className="text-muted">
                Delivery
              </p>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="relative flex items-center justify-center">
          <div className="absolute h-[520px] w-[520px] rounded-full bg-primary/10 blur-3xl" />

          <div className="relative overflow-hidden rounded-full border border-primary/20">
            <Image
              src="/images/hero/logo-shoe.png"
              alt="Premium Sneaker"
              width={560}
              height={560}
              priority
              className="object-contain transition duration-500 hover:scale-105"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}