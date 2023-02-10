import { HTMLAttributes, memo, ReactNode } from "react";
import { BoxVariantProps, StyledBox } from "./box.styled";
import { withDefaults } from "../../utils/with-defaults";
import { SxProps } from "../../theme";

type Props = {
  sx?: SxProps;
  as?: keyof JSX.IntrinsicElements;
  children?: ReactNode;
};

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;

export type BoxProps = Props & NativeAttrs & BoxVariantProps;

function Box({ children, sx, ...rest }: BoxProps) {
  return (
    <StyledBox css={sx} {...rest}>
      {children}
    </StyledBox>
  );
}

const MemoBox = memo(Box);

MemoBox.toString = () => ".pomatez-box";

export default withDefaults(MemoBox, {});
