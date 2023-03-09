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
    variant: {
      solid: {},

      outline: {
        color: "$blue9",
        border: "1px solid $blue8",
        borderRadius: "$sm",

        "&:hover, &:focus": {
          outline: "none",
          color: "$blue10",
          boxShadow: `0 0 0 0.3rem ${addColorAlpha(
            hslToRgb(theme.colors.blue10.value),
            0.16
          )}`,
        },

        "&:active": {
          color: "$blue10",
          boxShadow: `0 0 0 0.4rem ${addColorAlpha(
            hslToRgb(theme.colors.blue10.value),
            0.24
          )}`,
        },
      },

      ghost: {},

      link: {
        "&:hover": {
          color: "$blue10",
        },
        "&:active": {
          color: "$blue9",
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
});

export type ButtonVariantProps = VariantProps<typeof StyledButton>;
