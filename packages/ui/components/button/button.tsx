import { ForwardedRef, HTMLAttributes, ReactNode } from "react";
import { ButtonVariantProps, StyledButton } from "./button.styled";
import { withMemoRef, cx } from "../../utils";
import { SxProps } from "../../theme";

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

function Button(
  {
    appState = "stayFocused",
    children,
    className,
    sx,
    ...rest
  }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const _className = cx("pomatez-button", className);

  return (
    <StyledButton
      appState={appState}
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

export default withMemoRef(Button);
