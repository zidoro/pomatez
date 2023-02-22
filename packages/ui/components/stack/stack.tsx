import { forwardRef, HTMLAttributes, memo, ReactNode } from "react";
import { StackVariantProps, StyledStack } from "./stack.styled";
import { withDefaults } from "../../utils/with-defaults";
import { cx } from "../../utils/string";
import { SxProps } from "../../theme";

type Props = {
  /**
   * Flex `gap` style property
   * @default "$0"
   */
  gap?: SxProps["gap"];
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

const defaultProps: Props = {
  gap: "$0",
  align: "center",
  justify: "center",
  wrap: "nowrap",
};

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;

export type StackProps = Props & NativeAttrs & StackVariantProps;

const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    { children, className, align, justify, wrap, gap, sx, ...rest },
    ref
  ) => {
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
);

const MemoStack = memo(Stack);

MemoStack.displayName = "Stack";

export default withDefaults(MemoStack, defaultProps);
