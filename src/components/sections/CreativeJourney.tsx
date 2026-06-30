"use client";

import { Microscope, Heartbeat, Student } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import EyebrowBadge from "@/components/ui/EyebrowBadge";

type Identity = {
  icon: Icon;
  title: string;
  desc: string;
};

const IDENTITIES: Identity[] = [
  {
    icon: Microscope,
    title: "Biomedical Passionate Learner",
    desc: "Exploring the human body and tech.",
  },
  {
    icon: Heartbeat,
    title: "HealthTech Curious Explorer",
    desc: "Interested in new medical innovations.",
  },
  {
    icon: Student,
    title: "Student Guidance Consultant",
    desc: "Helping students choose better paths.",
  },
];

export default function CreativeJourney() {
  return (
    <AnimatedSection
      id="identity"
      className="mx-auto max-w-[1200px] px-6 py-24 md:px-8 md:py-32"
    >
      <AnimatedItem>
        <EyebrowBadge>Identity &amp; Interests</EyebrowBadge>
      </AnimatedItem>
      <AnimatedItem>
        <h2 className="mt-6 max-w-[18ch] text-4xl font-black leading-[1.05] tracking-tighter md:text-5xl">
          What drives me, every{" "}
          <span className="text-accent">day</span>.
        </h2>
      </AnimatedItem>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        {IDENTITIES.map((item) => {
          const Icon = item.icon;
          return (
            <AnimatedItem key={item.title}>
              <div className="neu group h-full rounded-[24px] p-7 transition-transform duration-300 hover:-translate-y-1 md:p-8">
                <span className="grid h-14 w-14 place-items-center rounded-2xl neu-sm text-accent">
                  <Icon size={28} weight="duotone" />
                </span>
                <h3 className="mt-7 text-xl font-bold leading-snug tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-muted">{item.desc}</p>
              </div>
            </AnimatedItem>
          );
        })}
      </div>
    </AnimatedSection>
  );
}
