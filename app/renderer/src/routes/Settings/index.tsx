import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { getFromStorage, saveToStorage } from "utils";
import { StyledSettings } from "styles";
import { Alert } from "components";

import FeatureSection from "./FeatureSection";
import LanguageSection from "./LanguageSection";
import HelpSection from "./HelpSection";
import ShortcutSection from "./ShortcutSection";
import StickySection from "./StickySection";
import SettingHeader from "./SettingHeader";
import { useAppSelector } from "hooks/storeHooks";
import { Updater } from "../../components";

export default function Settings() {
  const { t } = useTranslation();
  const alertState = getFromStorage("alert") || null;

  const update = useAppSelector((state) => state.update);

  const [alert, setAlert] = useState(alertState);

  return update.updateBody ? (
    <Updater />
  ) : (
    <StyledSettings>
      <SettingHeader />
      {alert === null && (
        <Alert
          heading={t("settings.alertHeading")}
          body={t("settings.alertBody")}
          onClose={() => {
            saveToStorage("alert", "hide");
            setAlert("hide");
          }}
        />
      )}
      <LanguageSection />
      <FeatureSection />
      <ShortcutSection />
      <HelpSection />
      <StickySection />
    </StyledSettings>
  );
}
