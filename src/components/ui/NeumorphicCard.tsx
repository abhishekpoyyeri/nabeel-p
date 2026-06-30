import type { ReactNode } from "react";

/** Raised neumorphic surface card. The building block for every section. */
export default function NeumorphicCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`neu rounded-[24px] p-7 md:p-8 ${className}`}>
      {children}
    </div>
  );
}
