import React, { useContext, useEffect } from "react";
import SettingSection from "./SettingSection";
import { Help } from "components";
import { ElectronContext } from "contexts";

const HelpSection: React.FC = () => {
  const { openExternalCallback } = useContext(ElectronContext);

  useEffect(() => {
    if (openExternalCallback) {
      openExternalCallback();
    }
  }, [openExternalCallback]);

  return (
    <SettingSection heading="Need Help ?">
      <Help
        label="Documentation"
        link="https://github.com/roldanjrCodeArts9711/productivity-timer"
      />
      <Help
        label="Open an issue"
        link="https://github.com/roldanjrCodeArts9711/productivity-timer/issues"
      />
      <Help
        label="Donate on Paypal"
        link="https://www.paypal.me/roldanjrDevsLife2020"
      />
    </SettingSection>
  );
};

export default HelpSection;
