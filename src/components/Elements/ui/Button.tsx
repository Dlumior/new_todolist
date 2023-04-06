import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { combineStyles } from "@/utils/combineStyles";

const buttonVariants = cva(
  "inline-flex items-center justify-center  text-sm font-medium transition-colors focus:outline-none" +
    "focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:hover:bg-slate-800 dark:hover:text-slate-100" +
    "disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900" +
    "data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800",
  {
    variants: {
      variant: {
        default: "bg-primary-200 text-black-950 hover:bg-primary-100 dark:bg-primary-800 dark:text-white",
        light: "bg-white text-black-950 hover:bg-black-50",
        dark: "bg-black-950 text-white hover:bg-black-500",
        outline:
          "bg-transparent border border-primary-200 hover:bg-primary-100 hover:text-black-950 dark:border-primary-700" +
          " dark:text-slate-100",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-7 px-2",
        lg: "h-11 px-8",
      },
      round: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      round: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, round, ...props }, ref) => {
    return (
      <button className={combineStyles(buttonVariants({ variant, size, round, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
