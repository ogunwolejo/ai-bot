"use client";

import {InputHTMLAttributes, memo, NamedExoticComponent} from "react";
import clsx from "clsx";

export const Button: NamedExoticComponent<
  InputHTMLAttributes<HTMLButtonElement>
> = memo(({children, ...props}) => (
  <button
    {...props}
    className={clsx(
      "text-roboto text-base lg:text-lg cursor-pointer disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
      props.className,
    )}
  >
    {children}
  </button>
));

Button.displayName = "Button";
