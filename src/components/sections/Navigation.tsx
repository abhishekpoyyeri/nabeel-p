"use client";

import { useEffect, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Identity", href: "#identity" },
  { label: "Strengths", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`flex w-full max-w-[1200px] items-center justify-between rounded-full px-5 py-3 transition-all duration-300 ${
          scrolled ? "glass" : "bg-transparent"
        }`}
      >
        <a
          href="#hero"
          className="font-mono text-sm font-bold tracking-tight text-foreground"
        >
          AN<span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-muted transition-colors hover:text-accent"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="mailto:Mahinshad37@gmail.com"
          className="hidden rounded-full bg-accent px-5 py-2 text-sm font-medium text-black transition-colors hover:bg-[var(--accent-dim)] md:inline-block"
        >
          Contact
        </a>

        <button
          aria-label="Toggle menu"
          className="text-foreground md:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <List size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute inset-x-4 top-20 z-50 md:hidden"
          >
            <ul className="glass flex flex-col gap-1 rounded-3xl p-4">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-sm text-muted transition-colors hover:bg-white/5 hover:text-accent"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
