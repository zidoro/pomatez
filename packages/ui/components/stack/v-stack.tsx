import { forwardRef, memo } from "react";
import Stack, { StackProps } from "./stack";

const VStack = forwardRef<HTMLDivElement, StackProps>((props, ref) => (
  <Stack {...props} direction="column" ref={ref} />
));

const MemoVStack = memo(VStack);

MemoVStack.displayName = "VStack";

export default MemoVStack;
