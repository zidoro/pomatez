import { styled } from "@pomatez/ui";

export const StyledTitlebar = styled("div", {
  width: "100%",
  height: "4rem",

  display: "flex",
  justifyContent: "space-between",
  alignContent: "center",

  "-webkit-app-region": "drag",
  cursor: "pointer",
});
