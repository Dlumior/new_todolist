import * as React from "react";
import { combineStyles } from "@/utils/combineStyles";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      className={combineStyles(
        "flex h-10 w-full rounded-md border border-primary-200 bg-transparent px-3 py-2 text-sm" +
          " placeholder:text-white" +
          " focus:outline-none focus:ring-2 focus:ring-primary-100  disabled:cursor-not-allowed" +
          " disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
