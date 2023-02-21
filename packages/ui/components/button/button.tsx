import {
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  memo,
  ReactNode,
} from "react";
import { SxProps } from "../../theme";
import { cx } from "../../utils/string";
import { ButtonVariantProps, StyledButton } from "./button.styled";

type Props = {
  sx?: SxProps;
  children?: ReactNode;
};

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;

export type ButtonProps = Props & NativeAttrs & ButtonVariantProps;

function Button(
  { children, className, sx, ...rest }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
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

const MemoButton = memo(forwardRef(Button));

export default MemoButton;
