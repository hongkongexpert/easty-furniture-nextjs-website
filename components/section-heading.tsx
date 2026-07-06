import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({ eyebrow, title, children, className, bordered = false }: { eyebrow?: string; title: string; children?: ReactNode; className?: string; bordered?: boolean }) {
  return (
    <div className={cn("max-w-3xl", bordered && "border-l-4 border-primary pl-4", className)}>
      {eyebrow ? <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</p> : null}
      <h2 className="mt-2 text-[32px] font-bold leading-10 tracking-normal text-foreground">{title}</h2>
      {children ? <p className="mt-3 text-base leading-6 text-muted-foreground">{children}</p> : null}
    </div>
  );
}
