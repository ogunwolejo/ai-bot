"use client";

import clsx from "clsx";
import {NamedExoticComponent, ComponentProps, memo} from "react";

export const Textarea: NamedExoticComponent<ComponentProps<"textarea">> = ({
  className,
  ...props
}) => {
  return (
    <textarea
      data-slot="textarea"
      className={clsx(
        "font-mono border placeholder:text-muted aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive  flex field-sizing-content w-full rounded-md bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
};

Textarea.displayName = "Textarea";
