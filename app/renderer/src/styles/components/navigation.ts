import styled from "styled-components/macro";
import { TimerStatus } from "store/timer/types";
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

type NavLinkProps = { type?: TimerStatus };

export const StyledNavIconWrapper = styled.div`
  position: relative;
  box-sizing: content-box;
  width: fit-content;
  left: 50%;
  transform: translateX(-50%);
  height: 14px;
  margin-bottom: 0.4rem;
`;

export const StyledNavLink = styled(NavLink)<NavLinkProps>`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  text-align: center;

  position: relative;
  cursor: pointer;

  transition: ${themes.transition};

  &:hover {
    color: var(--color-primary);
  }

  &.active {
    color: ${(p) =>
      (p.type === TimerStatus.SHORT_BREAK &&
        p.to === "/" &&
        "var(--color-green)") ||
      (p.type === TimerStatus.LONG_BREAK &&
        p.to === "/" &&
        "var(--color-yellow)") ||
      (p.type === TimerStatus.SPECIAL_BREAK &&
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
