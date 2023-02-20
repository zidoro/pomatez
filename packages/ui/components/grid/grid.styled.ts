import { styled, VariantProps } from "../../theme";

export const StyledGridContainer = styled("div", {
  display: "grid",
});

export const StyledGridItem = styled("div", {});

export type GridContainerVariantProps = VariantProps<
  typeof StyledGridContainer
>;
export type GridItemVariantProps = VariantProps<typeof StyledGridItem>;
