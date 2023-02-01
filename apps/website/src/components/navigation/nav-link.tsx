import React from "react";
import { StyledNavLinkItem, StyledNavLinkAnchor } from "../../styles";
import { useContextProvider } from "../../hooks";
import { NAV_LINKS } from "../../config";

export function NavLinks() {
  const { closeMenu } = useContextProvider();

  return (
    <>
      {NAV_LINKS.map((nav, index) =>
        nav.offset ? (
          <StyledNavLinkItem key={index}>
            <StyledNavLinkAnchor
              href="/"
              onClick={closeMenu}
              to={nav.link}
              offset={nav.offset}
              duration={420}
              smooth
            >
              {nav.label}
            </StyledNavLinkAnchor>
          </StyledNavLinkItem>
        ) : (
          <StyledNavLinkItem key={index}>
            <a
              href={nav.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {nav.label}
            </a>
          </StyledNavLinkItem>
        )
      )}
    </>
  );
}
