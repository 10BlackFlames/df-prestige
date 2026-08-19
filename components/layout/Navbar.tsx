"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";

import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import MobileMenu from "./MobileMenu";
import { NAVIGATION } from "@/constants/navigation";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { itemCount } = useCart();

  return (
    <>
      <Container className="flex h-20 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          {NAVIGATION.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors duration-300 hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <button
            type="button"
            className="transition hover:text-primary"
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          <Link
            href="/cart"
            className="relative transition hover:text-primary"
            aria-label={`Cart with ${itemCount} items`}
          >
            <ShoppingCart size={20} />

            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-black">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            className="hidden transition hover:text-primary md:block"
            aria-label="Account"
          >
            <User size={20} />
          </button>

          <button
            type="button"
            className="transition hover:text-primary lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </Container>

      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}