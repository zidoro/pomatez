import styled from "styled-components/macro";
import { SHORT_BREAK, LONG_BREAK, SPECIAL_BREAK } from "store";
import { NavLink } from "react-router-dom";
import { themes } from "../themes";

export const StyledNav = styled.nav<{ useNativeTitlebar: boolean }>`
  width: 100%;
  height: ${({ useNativeTitlebar }) =>
    useNativeTitlebar ? "5.6rem" : "4.8rem"};
  position: relative;

  &::before {
    content: "";

    position: absolute;
    left: 0;
    bottom: 0;

    width: 100%;
    height: 1px;

    background-color: var(--color-border-primary);
  }
`;

export const StyledNavList = styled.ul`
  width: 100%;
  height: 100%;

  list-style: none;
  font-family: Typo-Round, sans-serif;
  font-size: 1.2rem;
  font-weight: 400;

  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const StyledNavListItem = styled.li`
  width: 100%;
  height: 100%;
`;

type NavLinkProps = { type?: string };

export const StyledNavLink = styled(NavLink)<NavLinkProps>`
  width: 100%;
  height: 100%;

  display: grid;
  justify-items: center;
  row-gap: 0.4rem;

  position: relative;
  cursor: pointer;

  transition: ${themes.transition};

  &:hover {
    color: var(--color-primary);
  }

  &.active {
    color: ${(p) =>
      (p.type === SHORT_BREAK &&
        p.to === "/" &&
        "var(--color-green)") ||
      (p.type === LONG_BREAK &&
        p.to === "/" &&
        "var(--color-yellow)") ||
      (p.type === SPECIAL_BREAK &&
        p.to === "/" &&
        "var(--color-yellow)") ||
      "var(--color-primary)"};

    &::after {
      background-color: currentColor;
    }
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;

    width: 100%;
    height: 1px;

    background-color: transparent;
  }

  svg {
    width: 1.4rem;
    height: 1.4rem;
    align-self: end;
  }
`;
