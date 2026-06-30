import type { ReactNode } from "react";

/** Small uppercase label with a leading accent dot — section eyebrows. */
export default function EyebrowBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full neu-sm px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-muted">
      <span className="h-1.5 w-1.5 rounded-full bg-accent accent-glow" />
      {children}
    </span>
  );
}
