import {
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  memo,
  ReactNode,
} from "react";
import { cx } from "../../utils/string";
import { styled, SxProps } from "../../theme";

const StyledBox = styled("div");

type Props = {
  sx?: SxProps;
  as?: keyof JSX.IntrinsicElements;
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

const MemoBox = memo(forwardRef(Box));

export default MemoBox;
