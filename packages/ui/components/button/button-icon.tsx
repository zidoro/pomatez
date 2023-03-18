import { ForwardedRef, ReactNode } from "react";
import Button, { ButtonProps } from "./button";
import { withMemoRef } from "../../utils";

export type ButtonIconProps = {
  /**
   * For accessibility purposes
   */
  "aria-label": string;
  /**
   * The icon to render
   */
  icon: ReactNode;
} & ButtonProps;

function ButtonIcon(
  { icon, ...rest }: ButtonIconProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <Button {...rest} ref={ref}>
      {icon}
    </Button>
  );
}

export default withMemoRef(ButtonIcon, "Button.Icon");
