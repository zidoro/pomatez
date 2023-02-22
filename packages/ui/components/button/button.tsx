import { forwardRef, HTMLAttributes, memo, ReactNode } from "react";
import { ButtonVariantProps, StyledButton } from "./button.styled";
import { SxProps } from "../../theme";
import { cx } from "../../utils/string";

type Props = {
  /**
   * For additional styles
   */
  sx?: SxProps;
  /**
   * The HTML element to render
   */
  children?: ReactNode;
};

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;

export type ButtonProps = Props & NativeAttrs & ButtonVariantProps;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, sx, ...rest }, ref) => {
    const _className = cx("pomatez-button", className);

    return (
      <StyledButton
        className={_className}
        css={{
          ...sx,
        }}
        {...rest}
        ref={ref}
      >
        {children}
      </StyledButton>
    );
  }
);

const MemoButton = memo(Button);

MemoButton.displayName = "Button";

export default MemoButton;
