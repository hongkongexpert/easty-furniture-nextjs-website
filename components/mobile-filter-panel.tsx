"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileFilterPanelProps {
  filterLabel: string;
  activeLabel: string;
  children: React.ReactNode;
}

export function MobileFilterPanel({ filterLabel, activeLabel, children }: MobileFilterPanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4 md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded border border-border bg-surface-container-low px-4 py-3 text-sm font-bold uppercase tracking-wider"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-primary" />
          {filterLabel}
          <span className="ml-1 font-normal normal-case text-muted-foreground">— {activeLabel}</span>
        </span>
        {open ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
      </button>

      {open && (
        <div className="mt-1 rounded border border-border bg-surface-container-lowest p-4 shadow-industrial">
          {children}
        </div>
      )}
    </div>
  );
}
