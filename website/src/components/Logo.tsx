import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { StyledNavLogo } from "../styles";
import SVG from "./SVG";

type Props = {
  name: string;
  isHome?: boolean;
};

export const Logo: React.FC<Props> = ({ name, isHome }) => {
  return (
    <StyledNavLogo>
      <ScrollLink
        href="/"
        to="landing"
        offset={-64}
        duration={420}
        smooth
      >
        <SVG name="pomatez" />
        <label>{name}</label>
      </ScrollLink>
    </StyledNavLogo>
  );
};

export default Logo;
