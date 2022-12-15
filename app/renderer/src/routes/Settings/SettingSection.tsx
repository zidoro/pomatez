import React from "react";
import { StyledSettingSection, StyledSectionHeading } from "styles";

type Props = {
  heading: string;
  children?: React.ReactNode;
};

const SettingSection: React.FC<Props> = ({ heading, children }) => (
  <StyledSettingSection>
    <StyledSectionHeading>{heading}</StyledSectionHeading>
    {children}
  </StyledSettingSection>
);

export default React.memo(SettingSection);
