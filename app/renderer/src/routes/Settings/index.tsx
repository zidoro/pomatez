import React, { useState } from "react";
import { getFromStorage, saveToStorage } from "utils";
import { StyledSettings } from "styles";
import { Alert } from "components";

import FeatureSection from "./FeatureSection";
import HelpSection from "./HelpSection";
import ShortcutSection from "./ShortcutSection";
import StickySection from "./StickySection";
import SettingHeader from "./SettingHeader";

export default function Settings() {
  const alertState = getFromStorage("alert") || null;

  const [alert, setAlert] = useState(alertState);

  return (
    <StyledSettings>
      <SettingHeader />
      {alert === null && (
        <Alert
          heading="Hi 👋,"
          body="If you liked this app, please consider starring this project on GitHub to show your ❤️ and
				support."
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
}
