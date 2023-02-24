import { forwardRef, HTMLAttributes, memo, ReactNode } from "react";
import { styled, SxProps } from "../../theme";
import { cx } from "../../utils/string";

const StyledBox = styled("div");

type Props = {
  /**
   * For additional styles
   */
  sx?: SxProps;
  /**
   *
   */
  as?: keyof JSX.IntrinsicElements;
  /**
   * The content of the component
   */
  children?: ReactNode;
};

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;

export type BoxProps = Props & NativeAttrs;

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ children, className, sx, ...rest }, ref) => {
    const _className = cx("pomatez-box", className);

    return (
      <StyledBox className={_className} css={sx} {...rest} ref={ref}>
        {children}
      </StyledBox>
    );
  }
);

const MemoBox = memo(Box);

MemoBox.displayName = "Box";

export default MemoBox;
