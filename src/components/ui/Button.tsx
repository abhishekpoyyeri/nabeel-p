"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost";

/**
 * Pill button. `primary` is the acid-green accent CTA; `ghost` is a
 * neumorphic surface button for secondary actions.
 */
export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  ...rest
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
} & Omit<HTMLMotionProps<"a">, "ref">) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-tight transition-colors";
  const styles =
    variant === "primary"
      ? "bg-accent text-black hover:bg-[var(--accent-dim)] accent-glow"
      : "neu-sm text-foreground hover:text-accent";

  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${styles} ${className}`}
      {...rest}
    >
      {children}
    </motion.a>
  );
}
