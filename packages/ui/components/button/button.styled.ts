import { styled, VariantProps } from "../../theme";

export const StyledButton = styled("button", {
  dflex: "center",

  position: "relative",
  overflow: "hidden",

  background: "none",
  appearance: "none",
  userSelect: "none",
  border: "none",

  fontSize: "$sm",
  fontWeight: "$medium",

  textAlign: "center",
  whiteSpace: "nowrap",

  cursor: "pointer",
  transition: "$button",
});

export type ButtonVariantProps = VariantProps<typeof StyledButton>;
