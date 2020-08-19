import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { StyledSettings } from "styles";

import FeatureSection from "./FeatureSection";
import HelpSection from "./HelpSection";
import ShortcutSection from "./ShortcutSection";
import StickySection from "./StickySection";
import SettingHeader from "./SettingHeader";

type Props = {} & RouteComponentProps;

const Settings: React.FC<Props> = () => {
  return (
    <StyledSettings>
      <SettingHeader />
      <FeatureSection />
      <ShortcutSection />
      <HelpSection />
      <StickySection />
    </StyledSettings>
  );
};

export default Settings;
