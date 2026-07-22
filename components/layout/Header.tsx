import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <Navbar />
    </header>
  );
}