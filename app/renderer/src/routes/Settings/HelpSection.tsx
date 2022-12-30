import React, { useContext, useEffect } from "react";
import SettingSection from "./SettingSection";
import { ConnnectorContext } from "contexts";
import { Help } from "components";

const HelpSection: React.FC = () => {
  const { openExternalCallback } = useContext(ConnnectorContext);

  useEffect(() => {
    if (openExternalCallback) {
      openExternalCallback();
    }
  }, [openExternalCallback]);

  return (
    <SettingSection heading="Need Help ?">
      <Help
        label="Official website"
        link="https://zidoro.github.io/pomatez/"
      />
      <Help
        label="Open an issue"
        link="https://github.com/zidoro/pomatez/issues"
      />
      <Help
        label="Release notes"
        link="https://github.com/zidoro/pomatez/releases/latest"
      />
    </SettingSection>
  );
};

export default HelpSection;
