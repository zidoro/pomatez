import { forwardRef, HTMLAttributes, memo, ReactNode } from "react";
import { StyledText, TextVariantProps } from "./text.styled";
import { withDefaults } from "../../utils/with-defaults";
import { cx } from "../../utils/string";
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

const defaultProps: Props = {
  size: "$sm",
  align: "left",
  color: "inherit",
};

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;

export type TextProps = Props & NativeAttrs & TextVariantProps;

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      children,
      className,
      size,
      weight,
      align,
      casing,
      decoration,
      color,
      sx,
      ...rest
    },
    ref
  ) => {
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
);

const MemoText = memo(Text);

MemoText.displayName = "Text";

export default withDefaults(MemoText, defaultProps);
