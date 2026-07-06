"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Sheet = Dialog.Root;
const SheetTrigger = Dialog.Trigger;
const SheetClose = Dialog.Close;

type SheetContentProps = React.ComponentPropsWithoutRef<typeof Dialog.Content> & {
  side?: "left" | "right";
};

const SheetContent = React.forwardRef<React.ElementRef<typeof Dialog.Content>, SheetContentProps>(({ className, children, side = "right", ...props }, ref) => (
  <Dialog.Portal>
    <Dialog.Overlay className="fixed inset-0 z-50 bg-black/55" />
    <Dialog.Content
      ref={ref}
      className={cn(
        "fixed top-0 z-50 h-full w-80 bg-background p-6 shadow-lg",
        side === "right" ? "right-0 border-l border-border" : "left-0 border-r border-border",
        className,
      )}
      {...props}
    >
      {children}
      <Dialog.Close className="absolute right-4 top-4 rounded text-muted-foreground hover:text-primary">
        <X className="size-5" />
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
));
SheetContent.displayName = "SheetContent";
export { Sheet, SheetClose, SheetContent, SheetTrigger };
