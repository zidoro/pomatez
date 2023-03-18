import {
  ForwardRefExoticComponent,
  MemoExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from "react";
import ButtonMain, { ButtonProps } from "./button";
import ButtonIcon from "./button-icon";

export type { ButtonProps } from "./button";
export type { ButtonIconProps } from "./button-icon";

type ButtonComponent<T, P = {}> = MemoExoticComponent<
  ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>
> & {
  Icon: typeof ButtonIcon;
};

export const Button = ButtonMain as ButtonComponent<
  HTMLButtonElement,
  ButtonProps
>;

Button.Icon = ButtonIcon;
