import { ForwardedRef, HTMLAttributes, ReactNode } from "react";
import { StackVariantProps, StyledStack } from "./stack.styled";
import { withMemoRef, cx } from "../../utils";
import { SxProps } from "../../theme";

type Props = {
  /**
   * Shorthand for flex `gap` style property
   * @default "$0"
   */
  spacing?: SxProps["spacing"];
  /**
   * Shorthand for `align-items` style property
   * @default "center"
   */
  align?: SxProps["alignItems"];
  /**
   * Shorthand for `justify-content` style property
   * @default "center"
   */
  justify?: SxProps["justifyContent"];
  /**
   * Shorthand for `flex-wrap` style property
   * @default "nowrap"
   */
  wrap?: SxProps["flexWrap"];
  /**
   * For additional styles
   */
  sx?: SxProps;
  /**
   * The HTML element to render
   */
  as?: keyof JSX.IntrinsicElements;
  /**
   * The content of the component
   */
  children?: ReactNode;
};

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;

export type StackProps = Props & NativeAttrs & StackVariantProps;

function Stack(
  {
    spacing = "$0",
    align = "center",
    justify = "center",
    wrap = "nowrap",
    className,
    children,
    sx,
    ...rest
  }: StackProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const _className = cx("pomatez-stack", className);

  return (
    <StyledStack
      className={_className}
      css={{
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap,
        gap: spacing,
        ...sx,
      }}
      {...rest}
      ref={ref}
    >
      {children}
    </StyledStack>
  );
}

export default withMemoRef(Stack);
