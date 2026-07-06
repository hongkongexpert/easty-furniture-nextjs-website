import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => (
  <textarea className={cn("min-h-32 w-full rounded border border-input bg-white px-3 py-3 text-sm outline-none transition focus:border-foreground focus:ring-2 focus:ring-ring/20", className)} ref={ref} {...props} />
));
Textarea.displayName = "Textarea";
export { Textarea };
