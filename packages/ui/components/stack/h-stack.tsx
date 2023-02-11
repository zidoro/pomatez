import { ForwardedRef, forwardRef, memo } from "react";
import Stack, { StackProps } from "./stack";

function HStack(props: StackProps, ref: ForwardedRef<HTMLDivElement>) {
  return <Stack {...props} direction="row" ref={ref} />;
}

const MemoHStack = memo(forwardRef(HStack));

export default MemoHStack;
