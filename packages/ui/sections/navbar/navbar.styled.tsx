import { styled, VariantProps } from "../../theme";

export const StyledNavLink = styled("a", {
  width: "100%",
  height: "100%",

  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  flexDirection: "column",
  paddingTop: "$1",
  gap: "$1",

  position: "relative",
  cursor: "pointer",

  textDecoration: "none",
  color: "$gray11",

  transition: "all 160ms ease",

  "&::after": {
    content: "''",
    position: "absolute",
    left: 0,
    bottom: 0,

    width: "100%",
    height: "$px",

    bg: "transparent",
    zIndex: "$docked",

    transition: "all 160ms ease",
  },

  "& svg": {
    width: "1.4rem",
    height: "1.4rem",
    color: "currentColor",
  },

  variants: {
    appState: {
      stayFocused: {
        "&:hover": {
          color: "$blue10",
        },

        "&.active": {
          color: "$blue9",

          "&::after": {
            bg: "$blue9",
          },
        },
      },
      shortBreak: {
        "&:hover": {
          color: "$green10",
        },

        "&.active": {
          color: "$green9",

          "&::after": {
            bg: "$green9",
          },
        },
      },
      longBreak: {
        "&:hover": {
          color: "$brown10",
        },

        "&.active": {
          color: "$brown9",

          "&::after": {
            bg: "$brown9",
          },
        },
      },
    },
  },
  defaultVariants: {
    appState: "stayFocused",
  },
});

export type NavLinkVariantProps = VariantProps<typeof StyledNavLink>;
