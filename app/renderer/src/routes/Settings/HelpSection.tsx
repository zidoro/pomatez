import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import SettingSection from "./SettingSection";
import { ConnnectorContext } from "contexts";
import { Help } from "components";

const HelpSection: React.FC = () => {
  const { t } = useTranslation();
  const { openExternalCallback } = useContext(ConnnectorContext);

  useEffect(() => {
    if (openExternalCallback) {
      openExternalCallback();
    }
  }, [openExternalCallback]);

  return (
    <SettingSection heading={t("help.heading")}>
      <Help
        label={t("help.officialWebsite")}
        link="https://zidoro.github.io/pomatez/"
      />
      <Help
        label={t("help.openIssue")}
        link="https://github.com/zidoro/pomatez/issues"
      />
      <Help
        label={t("help.releaseNotes")}
        link="https://github.com/zidoro/pomatez/releases/latest"
      />
    </SettingSection>
  );
};

export default HelpSection;
