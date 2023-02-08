import { styled } from "@pomatez/ui";
import { NavLink } from "react-router-dom";

export const StyledNavbar = styled("nav", {
  width: "100%",
  height: "4.8rem",
  position: "relative",

  "&::before": {
    content: "''",
    position: "absolute",

    left: 0,
    bottom: 0,

    width: "100%",
    height: "0.1rem",

    backgroundColor: "$borderPrimary",
  },
});

export const StyledNavList = styled("ul", {
  width: "100%",
  height: "100%",

  listStyle: "none",
  fontFamily: "Typo-Round, sans-serif",
  fontSize: "1.2rem",
  fontWeight: 400,

  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",

  "& > li": {
    width: "100%",
    height: "100%",
  },
});

export const StyledNavLink = styled(NavLink, {
  width: "100%",
  height: "100%",

  display: "grid",
  justifyItems: "center",
  rowGap: "0.4rem",

  position: "relative",
  cursor: "pointer",

  transition: "all 160ms ease",

  "&:hover": {
    color: "$primary",
  },

  "&::after": {
    content: "''",
    position: "absolute",

    left: 0,
    bottom: 0,

    width: "100%",
    height: "0.1rem",

    backgroundColor: "transparent",

    transition: "all 160ms ease",
  },

  "& svg": {
    width: "1.4rem",
    height: "1.4rem",
    alignSelf: "end",
  },

  "&.active": {
    color: "$primary",

    "&::after": {
      backgroundColor: "$primary",
    },
  },
});
