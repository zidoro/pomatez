import { styled, theme, VariantProps } from "../../theme";
import { addColorAlpha, hslToRgb } from "../../utils";

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

  variants: {
    appState: {
      stayFocused: {
        $$color: "$colors$blue9",
        $$colorHoverFocus: "$colors$blue10",
        $$colorActive: "$colors$blue9",
        $$borderColor: "$colors$blue8",
        $$shadowColorHoverFocus: addColorAlpha(
          hslToRgb(theme.colors.blue9.value),
          0.16
        ),
        $$shadowColorActive: addColorAlpha(
          hslToRgb(theme.colors.blue9.value),
          0.24
        ),
      },
      shortBreak: {
        $$color: "$colors$green9",
        $$colorHoverFocus: "$colors$green10",
        $$colorActive: "$colors$green9",
        $$borderColor: "$colors$green8",
        $$shadowColorHoverFocus: addColorAlpha(
          hslToRgb(theme.colors.green9.value),
          0.16
        ),
        $$shadowColorActive: addColorAlpha(
          hslToRgb(theme.colors.green9.value),
          0.24
        ),
      },
      longBreak: {
        $$color: "$colors$brown9",
        $$colorHoverFocus: "$colors$brown10",
        $$colorActive: "$colors$brown9",
        $$borderColor: "$colors$brown8",
        $$shadowColorHoverFocus: addColorAlpha(
          hslToRgb(theme.colors.brown9.value),
          0.16
        ),
        $$shadowColorActive: addColorAlpha(
          hslToRgb(theme.colors.brown9.value),
          0.24
        ),
      },
    },

    variant: {
      solid: {},

      outline: {
        color: "$$color",
        border: "1px solid $$borderColor",
        borderRadius: "$sm",

        "&:hover, &:focus": {
          outline: "none",
          color: "$$colorHoverFocus",
          boxShadow: "0 0 0 0.3rem $$shadowColorHoverFocus",
        },

        "&:active": {
          color: "$$colorActive",
          boxShadow: "0 0 0 0.4rem $$shadowColorActive",
        },
      },

      ghost: {},

      link: {
        "&:hover": {
          color: "$$colorHoverFocus",
        },
        "&:active": {
          color: "$$colorActive",
        },
      },
    },

    size: {
      sm: {},
      md: {
        height: "$10",
        px: "$4",
        py: "$2",
      },
      lg: {},
      xl: {},
    },

    fullWidth: {
      true: {
        width: "$full",
      },
    },
  },

  defaultVariants: {
    appState: "stayFocused",
  },
});

export type ButtonVariantProps = VariantProps<typeof StyledButton>;
