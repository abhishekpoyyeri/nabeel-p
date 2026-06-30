"use client";

import Image from "next/image";
import { ArrowUpRight, EnvelopeSimple } from "@phosphor-icons/react";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import EyebrowBadge from "@/components/ui/EyebrowBadge";
import NeumorphicCard from "@/components/ui/NeumorphicCard";

export default function CreativeDNA() {
  return (
    <AnimatedSection
      id="about"
      className="relative mx-auto max-w-[1200px] px-6 py-24 md:px-8 md:py-32"
    >
      <AnimatedItem>
        <EyebrowBadge>About Me</EyebrowBadge>
      </AnimatedItem>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Portrait */}
        <AnimatedItem className="lg:col-span-5">
          <div className="neu relative h-full min-h-[420px] overflow-hidden rounded-[24px]">
            <Image
              src="/person.jpg"
              alt="Ahamed Nabeel"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <div className="text-2xl font-black tracking-tighter">
                Ahamed Nabeel EI
              </div>
              <div className="text-sm uppercase tracking-[0.3em] text-accent">
                Med-Tech Explorer
              </div>
            </div>
          </div>
        </AnimatedItem>

        {/* Lead bio */}
        <AnimatedItem className="lg:col-span-7">
          <NeumorphicCard className="flex h-full flex-col justify-center">
            <p className="max-w-[54ch] text-lg leading-relaxed text-muted">
              I&apos;m a{" "}
              <span className="text-foreground">biomedical enthusiast</span> and{" "}
              <span className="text-foreground">
                student admission consultant
              </span>{" "}
              with a strong passion for learning and exploring{" "}
              <span className="text-accent">health technology</span>. I&apos;m a
              fast learner, research-driven, and guided by team leadership and a
              growth mindset. Intellectual curiosity and collaborative
              achievement drive me to keep improving and contribute meaningfully
              in both biomedical and education consultancy fields.
            </p>
          </NeumorphicCard>
        </AnimatedItem>

        {/* Who I am */}
        <AnimatedItem className="lg:col-span-7">
          <NeumorphicCard className="h-full">
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
              Who I am
            </h3>
            <p className="mt-3 max-w-[58ch] leading-relaxed text-muted">
              I&apos;ve always been fascinated by how things work — especially
              the human body and technology. That curiosity led me into
              biomedical engineering and also into student admission consultancy,
              where I guide students toward the right academic path. My journey
              is shaped by curiosity, continuous learning, and a genuine desire
              to make a positive impact.
            </p>
          </NeumorphicCard>
        </AnimatedItem>

        {/* Email CTA */}
        <AnimatedItem className="lg:col-span-5">
          <a href="mailto:Mahinshad37@gmail.com" className="group block h-full">
            <div className="neu flex h-full flex-col justify-between rounded-[24px] p-7 transition-transform duration-300 group-hover:-translate-y-1 md:p-8">
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-black">
                  <EnvelopeSimple size={24} weight="fill" />
                </span>
                <ArrowUpRight
                  size={24}
                  className="text-muted transition-colors group-hover:text-accent"
                />
              </div>
              <div className="mt-10">
                <h3 className="text-2xl font-black tracking-tighter">
                  Get in touch
                </h3>
                <p className="mt-1 break-all text-sm text-muted">
                  Mahinshad37@gmail.com
                </p>
              </div>
            </div>
          </a>
        </AnimatedItem>
      </div>
    </AnimatedSection>
  );
}
