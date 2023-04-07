import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { combineStyles } from "@/utils/combineStyles";

const Checkbox = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={combineStyles(
      "peer h-5 w-5 shrink-0 rounded-md border border-black-950 bg-white focus:outline-none " +
        " focus:ring-1 focus:ring-black-400" +
        "  disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={combineStyles("flex items-center justify-center")}>
      <Check size={12} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
