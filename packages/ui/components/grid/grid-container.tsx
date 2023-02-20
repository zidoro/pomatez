import {
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  memo,
  ReactNode,
} from "react";
import { cx } from "../../utils/string";
import { SxProps } from "../../theme";
import {
  GridContainerVariantProps,
  StyledGridContainer,
} from "./grid.styled";
import { withDefaults } from "../../utils/with-defaults";

type Props = {
  templateColumns?: SxProps["gridTemplateColumns"];
  templateRows?: SxProps["gridTemplateRows"];
  autoFlow?: SxProps["gridAutoFlow"];
  gap?: SxProps["gap"];
  align?: SxProps["alignItems"];
  justify?: SxProps["justifyContent"];
  sx?: SxProps;
  as?: keyof JSX.IntrinsicElements;
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

function GridContainer(
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
  }: GridContainerProps,
  ref: ForwardedRef<HTMLDivElement>
) {
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

const MemoGridContainer = memo(forwardRef(GridContainer));

export default withDefaults(MemoGridContainer, defaultProps);
