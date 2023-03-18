import { ForwardedRef, HTMLAttributes, ReactNode } from "react";
import { withMemoRef, cx } from "../../utils";
import { styled, SxProps } from "../../theme";

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

function Box(
  { children, className, sx, ...rest }: BoxProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const _className = cx("pomatez-box", className);

  return (
    <StyledBox className={_className} css={sx} {...rest} ref={ref}>
      {children}
    </StyledBox>
  );
}

export default withMemoRef(Box);
