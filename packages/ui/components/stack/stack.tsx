import {
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  memo,
  ReactNode,
} from "react";
import { StackVariantProps, StyledStack } from "./stack.styled";
import { withDefaults } from "../../utils/with-defaults";
import { cx } from "../../utils/string";
import { SxProps } from "../../theme";

type Props = {
  gap?: SxProps["gap"];
  align?: SxProps["alignItems"];
  justify?: SxProps["justifyContent"];
  wrap?: SxProps["flexWrap"];
  sx?: SxProps;
  as?: keyof JSX.IntrinsicElements;
  children?: ReactNode;
};

const defaultProps: Props = {
  gap: "$0",
  align: "center",
  justify: "center",
  wrap: "nowrap",
};

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;

export type StackProps = Props & NativeAttrs & StackVariantProps;

function Stack(
  {
    children,
    className,
    align,
    justify,
    wrap,
    gap,
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
        gap,
        ...sx,
      }}
      {...rest}
      ref={ref}
    >
      {children}
    </StyledStack>
  );
}

const MemoStack = memo(forwardRef(Stack));

export default withDefaults(MemoStack, defaultProps);
