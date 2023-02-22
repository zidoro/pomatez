import { forwardRef, HTMLAttributes, memo, ReactNode } from "react";
import { cx } from "../../utils/string";
import { SxProps } from "../../theme";
import {
  GridContainerVariantProps,
  StyledGridContainer,
} from "./grid.styled";
import { withDefaults } from "../../utils/with-defaults";

type Props = {
  /**
   * Shorthand for `grid-template-columns` style property
   */
  templateColumns?: SxProps["gridTemplateColumns"];
  /**
   * Shorthand for `grid-template-rows` style property
   */
  templateRows?: SxProps["gridTemplateRows"];
  /**
   * Shorthand for `grid-auto-flow` style property
   * @default "column"
   */
  autoFlow?: SxProps["gridAutoFlow"];
  /**
   * Grid `gap` style property
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
   * @default "start"
   */
  justify?: SxProps["justifyContent"];
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
  justify: "start",
  autoFlow: "column",
};

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;

export type GridContainerProps = Props &
  NativeAttrs &
  GridContainerVariantProps;

const GridContainer = forwardRef<HTMLDivElement, GridContainerProps>(
  (
    {
      children,
      className,
      align,
      justify,
      templateColumns,
      templateRows,
      autoFlow,
      gap,
      sx,
      ...rest
    },
    ref
  ) => {
    const _className = cx("pomatez-grid", className);

    return (
      <StyledGridContainer
        className={_className}
        css={{
          alignItems: align,
          justifyContent: justify,
          gridTemplateColumns: templateColumns,
          gridTemplateRows: templateRows,
          gridAutoFlow: autoFlow,
          gap,
          ...sx,
        }}
        {...rest}
        ref={ref}
      >
        {children}
      </StyledGridContainer>
    );
  }
);

const MemoGridContainer = memo(GridContainer);

export default withDefaults(MemoGridContainer, defaultProps);
