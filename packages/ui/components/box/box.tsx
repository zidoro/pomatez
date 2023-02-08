import { memo, ReactNode } from "react";
import { BoxVariantProps, StyledBox } from "./box.styled";
import { withDefaults } from "../../utils";
import { SxProps } from "../../theme";

type Props = {
  sx?: SxProps;
  as?: keyof JSX.IntrinsicElements;
  children?: ReactNode;
};

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;

type BoxProps = Props & NativeAttrs & BoxVariantProps;

export function Box({ children, sx, ...rest }: BoxProps) {
  return (
    <StyledBox css={sx} {...rest}>
      {children}
    </StyledBox>
  );
}

Box.toString = () => ".pomatez-box";

const MemoBox = memo(Box);

export default withDefaults(MemoBox, {});
