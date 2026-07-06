"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Sheet = Dialog.Root;
const SheetTrigger = Dialog.Trigger;
const SheetClose = Dialog.Close;

const SheetContent = React.forwardRef<React.ElementRef<typeof Dialog.Content>, React.ComponentPropsWithoutRef<typeof Dialog.Content>>(({ className, children, ...props }, ref) => (
  <Dialog.Portal>
    <Dialog.Overlay className="fixed inset-0 z-50 bg-black/55" />
    <Dialog.Content ref={ref} className={cn("fixed right-0 top-0 z-50 h-full w-80 border-l border-border bg-background p-6 shadow-lg", className)} {...props}>
      {children}
      <Dialog.Close className="absolute right-4 top-4 rounded text-muted-foreground hover:text-primary">
        <X className="size-5" />
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
));
SheetContent.displayName = "SheetContent";
export { Sheet, SheetClose, SheetContent, SheetTrigger };
