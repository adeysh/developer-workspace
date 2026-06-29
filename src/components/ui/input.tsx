"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full rounded-lg border bg-card text-foreground placeholder:text-muted-foreground transition-[border-color,box-shadow] duration-200 outline-none disabled:cursor-not-allowed disabled:opacity-50 hover:border-layout-border focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      variant: {
        default: "border-border",
      },

      size: {
        sm: "h-9 px-3 text-sm",
        default: "h-10 px-3 text-sm",
        lg: "h-11 px-4 text-base",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type InputProps = React.ComponentProps<"input"> &
  VariantProps<typeof inputVariants>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        data-variant={variant}
        data-size={size}
        className={cn(inputVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input, inputVariants };
