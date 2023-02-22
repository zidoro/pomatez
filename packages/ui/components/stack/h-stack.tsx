import { forwardRef, memo } from "react";
import Stack, { StackProps } from "./stack";

const HStack = forwardRef<HTMLDivElement, StackProps>((props, ref) => (
  <Stack {...props} direction="row" ref={ref} />
));

const MemoHStack = memo(HStack);

MemoHStack.displayName = "HStack";

export default MemoHStack;
