import React from "react";
import { useTranslation } from "react-i18next";
import { StyledSectionSticky, StyledStarButton } from "styles";

const StickySection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <StyledSectionSticky>
      <StyledStarButton
        as="a"
        href="https://github.com/zidoro/pomatez"
        target="_blank"
      >
        {t("sticky.starGithub")}
      </StyledStarButton>
      <StyledStarButton
        as="a"
        href="https://discord.gg/ZqPqN3hwcB"
        target="_blank"
      >
        {t("sticky.joinDiscord")}
      </StyledStarButton>
    </StyledSectionSticky>
  );
};

export default StickySection;
