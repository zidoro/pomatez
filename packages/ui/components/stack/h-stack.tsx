import { ForwardedRef } from "react";
import { withMemoRef } from "../../utils";
import Stack, { StackProps } from "./stack";

function HStack(props: StackProps, ref: ForwardedRef<HTMLDivElement>) {
  return <Stack {...props} direction="row" ref={ref} />;
}

export default withMemoRef(HStack);
