import { keyframes, styled } from "@pomatez/ui";

export const StyledTimer = styled("div", {
  width: "100%",
  height: "100%",
  flex: "1 1",
  padding: "2rem 1.6rem",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  animation: `${keyframes({
    "0%": {
      opacity: 0,
      transform: "translateY(1.2rem)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)",
    },
  })} 160ms ease`,
});
