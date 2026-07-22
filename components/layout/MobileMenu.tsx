"use client";

import Link from "next/link";
import { X } from "lucide-react";

import { NAVIGATION } from "@/constants/navigation";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({
  open,
  onClose,
}: MobileMenuProps) {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ${
          open
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 h-screen w-72 bg-card border-l border-border transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border p-6">
          <h2 className="text-xl font-bold">
            DF Prestige
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <nav className="flex flex-col p-6">
          {NAVIGATION.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="rounded-lg px-4 py-4 transition hover:bg-surface"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}