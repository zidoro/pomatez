import {
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  memo,
  ReactNode,
} from "react";
import { SxProps } from "../../theme";
import { cx } from "../../utils/string";
import { withDefaults } from "../../utils/with-defaults";
import { StyledText, TextVariantProps } from "./text.styled";

type Props = {
  size?: SxProps["fontSize"];
  weight?: SxProps["fontWeight"];
  align?: SxProps["textAlign"];
  casing?: SxProps["textTransform"];
  decoration?: SxProps["textDecoration"];
  color?: SxProps["color"];
  sx?: SxProps;
  as?: keyof JSX.IntrinsicElements;
  children?: ReactNode;
};

const defaultProps: Props = {
  size: "$sm",
  align: "left",
  casing: "none",
  color: "inherit",
};

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;

export type TextProps = Props & NativeAttrs & TextVariantProps;

function Text(
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

const MemoText = memo(forwardRef(Text));

export default withDefaults(MemoText, defaultProps);
