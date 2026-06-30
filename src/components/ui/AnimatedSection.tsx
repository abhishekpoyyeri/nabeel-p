"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const spring = { type: "spring", stiffness: 100, damping: 20 } as const;

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: spring },
};

/**
 * A section that staggers its children into view once, when scrolled near.
 * Children should be wrapped in <AnimatedItem> to inherit the stagger.
 */
export function AnimatedSection({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.section>
  );
}

/** A single staggered reveal item. Use inside <AnimatedSection>. */
export function AnimatedItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
