"use client";

import { EnvelopeSimple, ArrowUpRight } from "@phosphor-icons/react";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import EyebrowBadge from "@/components/ui/EyebrowBadge";

export default function Contact() {
  return (
    <AnimatedSection
      id="contact"
      className="mx-auto max-w-[1200px] px-6 pt-24 md:px-8 md:pt-32"
    >
      <div className="neu overflow-hidden rounded-[32px] p-8 md:p-14">
        <AnimatedItem>
          <EyebrowBadge>Let&apos;s connect</EyebrowBadge>
        </AnimatedItem>
        <AnimatedItem>
          <h2 className="mt-6 max-w-[18ch] text-5xl font-black leading-[0.95] tracking-tighter md:text-7xl">
            Let&apos;s explore{" "}
            <span className="text-accent">health tech</span> together.
          </h2>
        </AnimatedItem>

        <AnimatedItem>
          <a
            href="mailto:Mahinshad37@gmail.com"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-medium text-black transition-colors hover:bg-[var(--accent-dim)] accent-glow"
          >
            <EnvelopeSimple size={20} weight="fill" />
            Mahinshad37@gmail.com
            <ArrowUpRight size={18} />
          </a>
        </AnimatedItem>

        <AnimatedItem>
          <div className="mt-14 overflow-hidden rounded-2xl border border-border">
            <a
              href="mailto:Mahinshad37@gmail.com"
              className="flex items-center gap-4 bg-surface p-6 transition-colors hover:bg-surface-2"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl neu-sm text-accent">
                <EnvelopeSimple size={20} weight="duotone" />
              </span>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted">
                  Email
                </div>
                <div className="mt-0.5 break-all text-sm text-foreground">
                  Mahinshad37@gmail.com
                </div>
              </div>
            </a>
          </div>
        </AnimatedItem>
      </div>

      <footer className="flex flex-col items-center justify-between gap-3 py-10 text-xs text-muted md:flex-row">
        <span>© {2026} Ahamed Nabeel EI — Med-Tech Explorer</span>
        <span className="font-mono">Biomedical · Student Consultant</span>
      </footer>
    </AnimatedSection>
  );
}
