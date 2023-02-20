import {
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  memo,
  ReactNode,
} from "react";
import { GridItemVariantProps, StyledGridItem } from "./grid.styled";
import { withDefaults } from "../../utils/with-defaults";
import { cx } from "../../utils/string";
import { SxProps } from "../../theme";

type Props = {
  column?: SxProps["gridColumn"];
  row?: SxProps["gridRow"];
  align?: SxProps["alignSelf"];
  justify?: SxProps["justifySelf"];
  sx?: SxProps;
  as?: keyof JSX.IntrinsicElements;
  children?: ReactNode;
};

const defaultProps: Props = {
  align: "center",
  justify: "start",
};

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;

export type GridItemProps = Props & NativeAttrs & GridItemVariantProps;

function GridItem(
  {
    children,
    className,
    align,
    justify,
    column,
    row,
    sx,
    ...rest
  }: GridItemProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const _className = cx("pomatez-grid-item", className);

  return (
    <StyledGridItem
      className={_className}
      css={{
        alignSelf: align,
        justifySelf: justify,
        gridColumn: column,
        gridRow: row,
        ...sx,
      }}
      {...rest}
      ref={ref}
    >
      {children}
    </StyledGridItem>
  );
}

const MemoGridItem = memo(forwardRef(GridItem));

export default withDefaults(MemoGridItem, defaultProps);
