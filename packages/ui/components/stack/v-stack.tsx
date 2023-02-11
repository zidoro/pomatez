import { ForwardedRef, forwardRef, memo } from "react";
import Stack, { StackProps } from "./stack";

function VStack(props: StackProps, ref: ForwardedRef<HTMLDivElement>) {
  return <Stack {...props} direction="column" ref={ref} />;
}

const MemoVStack = memo(forwardRef(VStack));

export default MemoVStack;
