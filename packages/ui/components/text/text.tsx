import { ForwardedRef, HTMLAttributes, ReactNode } from "react";
import { StyledText, TextVariantProps } from "./text.styled";
import { withMemoRef, cx } from "../../utils";
import { SxProps } from "../../theme";

type Props = {
  /**
   * Shorthand for `font-size` style property
   * @default "$sm"
   */
  size?: SxProps["fontSize"];
  /**
   * Shorthand for `font-weight` style property
   */
  weight?: SxProps["fontWeight"];
  /**
   * Shorthand for `text-align` style property
   * @default "left"
   */
  align?: SxProps["textAlign"];
  /**
   * Shorthand for `text-transform` style property
   */
  casing?: SxProps["textTransform"];
  /**
   * Shorthand for `text-decoration` style property
   */
  decoration?: SxProps["textDecoration"];
  /**
   * A `color` style property
   * @default "inherit"
   */
  color?: SxProps["color"];
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

export type TextProps = Props & NativeAttrs & TextVariantProps;

function Text(
  {
    size = "$sm",
    align = "left",
    color = "inherit",
    casing,
    weight,
    decoration,
    className,
    children,
    sx,
    ...rest
  }: TextProps,
  ref: ForwardedRef<HTMLParagraphElement>
) {
  const _className = cx("pomatez-text", className);

  return (
    <StyledText
      className={_className}
      css={{
        fontSize: size,
        fontWeight: weight,
        textAlign: align,
        textTransform: casing,
        textDecoration: decoration,
        color,
        ...sx,
      }}
      {...rest}
      ref={ref}
    >
      {children}
    </StyledText>
  );
}

export default withMemoRef(Text);
