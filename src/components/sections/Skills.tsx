"use client";

import { motion } from "framer-motion";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import EyebrowBadge from "@/components/ui/EyebrowBadge";

const SKILLS = [
  "Fast learner",
  "Research-driven",
  "Team leadership",
  "Growth mindset",
  "Intellectual curiosity",
  "Collaborative achievement",
  "Continuous learning",
  "Biomedical engineering",
  "Health technology",
  "Student admission consultancy",
  "Positive impact",
];

export default function Skills() {
  return (
    <AnimatedSection
      id="skills"
      className="mx-auto max-w-[1200px] px-6 py-24 md:px-8 md:py-32"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <AnimatedItem>
            <EyebrowBadge>Strengths</EyebrowBadge>
          </AnimatedItem>
          <AnimatedItem>
            <h2 className="mt-6 max-w-[16ch] text-4xl font-black leading-[1.05] tracking-tighter md:text-5xl">
              The mindset behind the{" "}
              <span className="text-accent">work</span>.
            </h2>
          </AnimatedItem>

          <AnimatedItem>
            <div className="mt-10 flex flex-wrap gap-3">
              {SKILLS.map((s) => (
                <span
                  key={s}
                  className="neu-sm rounded-full px-5 py-2.5 text-sm text-muted transition-colors hover:text-accent"
                >
                  {s}
                </span>
              ))}
            </div>
          </AnimatedItem>
        </div>

        {/* Rotating circular wordmark — like the reference */}
        <AnimatedItem className="lg:col-span-5">
          <div className="relative mx-auto grid aspect-square w-full max-w-[360px] place-items-center">
            <div className="neu absolute inset-[18%] rounded-full" />
            <div className="absolute inset-[34%] grid place-items-center rounded-full bg-accent accent-glow">
              <span className="text-3xl font-black tracking-tighter text-black">
                AN
              </span>
            </div>
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 28, ease: "linear", repeat: Infinity }}
            >
              <CircularText text="MED-TECH EXPLORER · BIOMEDICAL · " />
            </motion.div>
          </div>
        </AnimatedItem>
      </div>
    </AnimatedSection>
  );
}

function CircularText({ text }: { text: string }) {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <defs>
        <path
          id="circlePath"
          d="M 50,50 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0"
          fill="none"
        />
      </defs>
      <text
        className="fill-muted"
        style={{ fontSize: "5px", letterSpacing: "0.5px" }}
      >
        <textPath href="#circlePath" startOffset="0">
          {text}
        </textPath>
      </text>
    </svg>
  );
}
