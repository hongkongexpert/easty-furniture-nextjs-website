import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("inline-flex items-center rounded-sm border border-border bg-surface-container px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground", className)} {...props} />;
}
