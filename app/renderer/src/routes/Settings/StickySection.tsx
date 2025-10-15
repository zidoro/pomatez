import React from "react";
import { StyledSectionSticky, StyledStarButton } from "styles";

const StickySection: React.FC = () => {
  return (
    <StyledSectionSticky>
      <StyledStarButton
        as="a"
        href="https://github.com/zidoro/pomatez"
        target="_blank"
      >
        Star it on GitHub
      </StyledStarButton>
      <StyledStarButton
        as="a"
        href="https://discord.gg/ZqPqN3hwcB"
        target="_blank"
      >
        Join us on Discord!
      </StyledStarButton>
    </StyledSectionSticky>
  );
};

export default StickySection;
