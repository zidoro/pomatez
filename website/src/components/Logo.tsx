import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { StyledNavLogo } from "../styles";
import { APP_NAME } from "../config";
import { SVG } from "./svg";

export function Logo() {
  return (
    <StyledNavLogo>
      <ScrollLink href="/" to="hero" offset={-64} duration={420} smooth>
        <SVG name="pomatez" />
        <p>{APP_NAME}</p>
      </ScrollLink>
    </StyledNavLogo>
  );
}
