import { ForwardedRef } from "react";
import { withMemoRef } from "../../utils";
import Stack, { StackProps } from "./stack";

function VStack(props: StackProps, ref: ForwardedRef<HTMLDivElement>) {
  return <Stack {...props} direction="column" ref={ref} />;
}

export default withMemoRef(VStack);
