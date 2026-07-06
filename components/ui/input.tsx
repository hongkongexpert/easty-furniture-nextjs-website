import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, type, ...props }, ref) => (
  <input type={type} className={cn("h-12 w-full rounded border border-input bg-white px-3 text-sm outline-none transition focus:border-foreground focus:ring-2 focus:ring-ring/20", className)} ref={ref} {...props} />
));
Input.displayName = "Input";
export { Input };
