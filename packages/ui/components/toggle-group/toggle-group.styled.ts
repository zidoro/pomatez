import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { styled, theme } from "../../theme";
import { addColorAlpha, hslToRgb } from "../../utils/color";

export const StyledToggleGroup = styled(ToggleGroup.Root, {
  display: "flex",
  height: "$10",
});

export const StyledGroupItem = styled(ToggleGroup.Item, {
  all: "unset",
  dflex: "center",

  width: "100%",
  px: "$4",
  py: "$2",
  bg: "$gray3",
  border: "1px solid $gray6",

  fontSize: "$sm",
  fontWeight: "$medium",

  transition: "all 160ms ease",

  "&:first-child": {
    marginLeft: 0,
    borderTopLeftRadius: "$sm",
    borderBottomLeftRadius: "$sm",
    borderRightColor: "transparent",
  },

  "&:last-child": {
    borderTopRightRadius: "$sm",
    borderBottomRightRadius: "$sm",
    borderLeftColor: "transparent",
  },

  "&:hover": { bg: "$blue4" },

  "&:focus": {
    position: "relative",
    borderColor: "$blue8",
    boxShadow: `0 0 0 0.3rem ${addColorAlpha(
      hslToRgb(theme.colors.blue10.value),
      0.16
    )}`,
    color: "$blue10",
  },

  "&:active": {
    borderColor: "$blue8",
    boxShadow: `0 0 0 0.3rem ${addColorAlpha(
      hslToRgb(theme.colors.blue10.value),
      0.16
    )}`,
    color: "$blue10",
  },

  "&[data-state=on]": {
    backgroundColor: "$white",
    color: "$blue11",
  },
});
