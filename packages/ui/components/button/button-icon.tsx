import { forwardRef, memo, ReactNode } from "react";
import Button, { ButtonProps } from "./button";

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

export const ButtonIcon = forwardRef<
  HTMLButtonElement,
  ButtonIconProps
>(({ icon, ...rest }, ref) => {
  return (
    <Button {...rest} ref={ref}>
      {icon}
    </Button>
  );
});

const MemoButtonIcon = memo(ButtonIcon);

MemoButtonIcon.displayName = "ButtonIcon";

export default MemoButtonIcon;
