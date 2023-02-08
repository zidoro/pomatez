import { styled, VariantProps } from "../../theme";

export const StyledBox = styled("div", {
  position: "relative",
  display: "flex",
});

export type BoxVariantProps = VariantProps<typeof StyledBox>;
