"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textareaVariants = cva(
  "flex w-full rounded-lg border bg-card text-foreground placeholder:text-muted-foreground transition-[border-color,box-shadow] duration-200 outline-none disabled:cursor-not-allowed disabled:opacity-50 hover:border-layout-border focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 resize-none leading-relaxed",
  {
    variants: {
      variant: {
        default: "border-border",
      },

      size: {
        sm: "min-h-24 px-3 py-2 text-sm",
        default: "min-h-32 px-3 py-2 text-sm",
        lg: "min-h-40 px-4 py-3 text-base",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type TextareaProps = React.ComponentProps<"textarea"> &
  VariantProps<typeof textareaVariants>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        data-slot="textarea"
        data-variant={variant}
        data-size={size}
        className={cn(textareaVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
