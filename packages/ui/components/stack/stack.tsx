import {
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  memo,
  ReactNode,
} from "react";
import { StackVariantProps, StyledStack } from "./stack.styled";
import { withDefaults } from "../../utils/with-defaults";
import {
  AlignItems,
  FlexWrap,
  JustifyContent,
} from "../../utils/prop-types";
import { cx } from "../../utils/string";
import { CSSGapUnit, SxProps } from "../../theme";

type Props = {
  gap?: CSSGapUnit;
  align?: AlignItems;
  justify?: JustifyContent;
  wrap?: FlexWrap;
  sx?: SxProps;
  as?: keyof JSX.IntrinsicElements;
  children?: ReactNode;
};

const defaultProps = {
  gap: "$0" as CSSGapUnit,
  align: "center" as AlignItems,
  justify: "center" as JustifyContent,
  wrap: "nowrap" as FlexWrap,
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
