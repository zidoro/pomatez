import { styled, VariantProps } from "../../theme";

export const StyledStack = styled("div", {
  display: "flex",
  variants: {
    direction: {
      column: {
        flexDirection: "column",
      },
      row: {
        flexDirection: "row",
      },
    },
  },

  defaultVariants: {
    direction: "column",
  },
});

export type StackVariantProps = VariantProps<typeof StyledStack>;
