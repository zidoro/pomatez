import * as Switch from "@radix-ui/react-switch";
import { addColorAlpha, hslToRgb } from "../../utils/color";
import { styled, theme } from "../../theme";

export const StyledSwitchLabel = styled("label", {
  width: "100%",
  cursor: "pointer",
  userSelect: "none",
});

export const StyledSwitchThumb = styled(Switch.Thumb, {
  display: "block",
  width: "1.6rem",
  height: "1.6rem",
  borderRadius: "$pill",
  border: "1px solid $blue9",
  backgroundColor: "$white",

  transition: "all 140ms ease",
  transform: "translateX(-0.2rem)",

  '&[data-state="checked"]': { transform: "translateX(1rem)" },
});

export const StyledSwitchRoot = styled(Switch.Root, {
  all: "unset",
  width: "2.6rem",
  height: "1.4rem",
  position: "relative",
  backgroundColor: "$gray6",
  borderRadius: "$pill",

  display: "flex",
  alignItems: "center",

  transition: "all 160ms ease",

  '&[data-state="checked"]': {
    backgroundColor: "$blue9",
  },

  "&:hover, &:focus": {
    [`& > ${StyledSwitchThumb}`]: {
      borderColor: "$blue10",
      boxShadow: `0 0 0 0.3rem ${addColorAlpha(
        hslToRgb(theme.colors.blue10.value),
        0.16
      )}`,
    },
  },

  "&:active": {
    [`& > ${StyledSwitchThumb}`]: {
      borderColor: "$blue10",
      boxShadow: `0 0 0 0.4rem ${addColorAlpha(
        hslToRgb(theme.colors.blue10.value),
        0.24
      )}`,
    },
  },
});
