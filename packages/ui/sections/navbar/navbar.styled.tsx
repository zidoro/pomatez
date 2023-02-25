import { styled, VariantProps } from "../../theme";

export const StyledNavLink = styled("a", {
  width: "100%",
  height: "100%",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
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
      "stay-focused": {
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
      "short-break": {
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
      "long-break": {
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
      "special-break": {
        "&:hover": {
          color: "$violet10",
        },

        "&.active": {
          color: "$violet9",

          "&::after": {
            bg: "$violet9",
          },
        },
      },
    },
  },
  defaultVariants: {
    appState: "stay-focused",
  },
});

export type NavLinkVariantProps = VariantProps<typeof StyledNavLink>;
