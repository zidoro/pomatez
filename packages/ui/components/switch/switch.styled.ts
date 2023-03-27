import * as Switch from "@radix-ui/react-switch";
import { addColorAlpha, hslToRgb } from "../../utils/color";
import { styled, theme, VariantProps } from "../../theme";

export const StyledSwitchLabel = styled("label", {
  width: "100%",
  height: "100%",

  display: "flex",
  alignItems: "center",

  cursor: "pointer",
  userSelect: "none",
});

export const StyledSwitchThumb = styled(Switch.Thumb, {
  display: "block",
  width: "1.6rem",
  height: "1.6rem",
  borderRadius: "$pill",
  border: "1px solid $$borderThumbColor",
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
    backgroundColor: "$$bgChecked",
  },

  "&:hover, &:focus": {
    [`& > ${StyledSwitchThumb}`]: {
      borderColor: "$$borderThumbColorHoverFocusActive",
      boxShadow: "0 0 0 0.3rem $$shadowColor",
    },
  },

  "&:active": {
    [`& > ${StyledSwitchThumb}`]: {
      borderColor: "$$borderThumbColorHoverFocusActive",
      boxShadow: "0 0 0 0.4rem $$shadowColorActive",
    },
  },

  variants: {
    appState: {
      stayFocused: {
        $$shadowColor: addColorAlpha(
          hslToRgb(theme.colors.blue9.value),
          0.16
        ),
        $$shadowColorActive: addColorAlpha(
          hslToRgb(theme.colors.blue9.value),
          0.24
        ),
        $$borderThumbColor: "$colors$blue9",
        $$borderThumbColorHoverFocusActive: "$colors$blue10",
        $$bgChecked: "$colors$blue9",
      },
      shortBreak: {
        $$shadowColor: addColorAlpha(
          hslToRgb(theme.colors.green9.value),
          0.16
        ),
        $$shadowColorActive: addColorAlpha(
          hslToRgb(theme.colors.green9.value),
          0.24
        ),
        $$borderThumbColor: "$colors$green9",
        $$borderThumbColorHoverFocusActive: "$colors$green10",
        $$bgChecked: "$colors$green9",
      },
      longBreak: {
        $$shadowColor: addColorAlpha(
          hslToRgb(theme.colors.brown9.value),
          0.16
        ),
        $$shadowColorActive: addColorAlpha(
          hslToRgb(theme.colors.brown9.value),
          0.24
        ),
        $$borderThumbColor: "$colors$brown9",
        $$borderThumbColorHoverFocusActive: "$colors$brown10",
        $$bgChecked: "$colors$brown9",
      },
    },
  },

  defaultVariants: {
    appState: "stayFocused",
  },
});

export type SwitchVariantProps = VariantProps<typeof StyledSwitchRoot>;
