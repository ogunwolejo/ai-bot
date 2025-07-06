"use client";

import {ButtonHTMLAttributes, memo, NamedExoticComponent} from "react";
import clsx from "clsx";

export const Button: NamedExoticComponent<
  ButtonHTMLAttributes<HTMLButtonElement>
> = memo(({children, ...props}) => (
  <button
    {...props}
    className={clsx(
      "text-roboto text-base lg:text-lg cursor-pointer disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
      props.className,
    )}
    type={props.type}
  >
    {children}
  </button>
));

Button.displayName = "Button";
