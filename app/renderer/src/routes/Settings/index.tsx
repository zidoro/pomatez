import React, { useState } from "react";
import { getFromStorage, saveToStorage } from "utils";
import { StyledSettings } from "styles";
import { Alert } from "components";

import FeatureSection from "./FeatureSection";
import HelpSection from "./HelpSection";
import ShortcutSection from "./ShortcutSection";
import StickySection from "./StickySection";
import SettingHeader from "./SettingHeader";

export default () => {
  const alertState = getFromStorage("alert") || null;

  const [alert, setAlert] = useState(alertState);

  return (
    <StyledSettings>
      <SettingHeader />
      {alert === null && (
        <Alert
          heading="Hello Friends,"
          body="Please consider starring this project on GitHub to show 💙 and
				support. It will inspire the developer to continue improving the app
				for best user experience."
          onClose={() => {
            saveToStorage("alert", "hide");
            setAlert("hide");
          }}
        />
      )}
      <FeatureSection />
      <ShortcutSection />
      <HelpSection />
      <StickySection />
    </StyledSettings>
  );
};
