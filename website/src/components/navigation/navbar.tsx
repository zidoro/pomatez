import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { useContextProvider } from "../../hooks";
import {
  StyledNav,
  StyledNavHeader,
  StyledNavContent,
  StyledNavLinks,
  StyledNavButtonWrapper,
  StyledNavThemeToggler,
  StyledScrollToDownload,
  StyledNavMenu,
} from "../../styles";
import { Logo } from "../logo";
import { NavLinks } from "../navigation";
import { SVG } from "../svg";

export function Navbar() {
  const { isDarkMode, themeToggler, isMenuOpen, toggleMenu } =
    useContextProvider();

  return (
    <StyledNav isMenuOpen={isMenuOpen}>
      <StyledNavHeader>
        <Logo />

        <StyledNavContent>
          <StyledNavLinks>
            <NavLinks />
          </StyledNavLinks>

          <StyledNavButtonWrapper>
            <StyledNavThemeToggler onClick={themeToggler}>
              Mode
              <SVG name={isDarkMode ? "moon" : "sunny"} />
            </StyledNavThemeToggler>
            <StyledScrollToDownload>
              <ScrollLink
                href="/"
                to="installers"
                offset={-24}
                duration={420}
                smooth
              >
                <SVG name="download" />
                See Installers
              </ScrollLink>
            </StyledScrollToDownload>
          </StyledNavButtonWrapper>
        </StyledNavContent>

        <StyledNavMenu isMenuOpen={isMenuOpen} onClick={toggleMenu}>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
        </StyledNavMenu>
      </StyledNavHeader>
    </StyledNav>
  );
}
