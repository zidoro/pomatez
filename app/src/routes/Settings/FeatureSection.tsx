import React, { useCallback, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setAlwaysOnTop,
  setEnableStrictMode,
  AppStateTypes,
  setEnableTimerAnimation,
  SettingTypes,
  setNotificationProperty,
  setEnableFullscreenBreak,
  setUseNativeTitlebar,
  setEnableAutoUpdates,
} from "store";

import { Toggler, TogglerProps, Collapse, Radio } from "components";
import SettingSection from "./SettingSection";
import { ThemeContext } from "contexts";

const FeatureSection: React.FC = () => {
  const settings: SettingTypes = useSelector(
    (state: AppStateTypes) => state.settings
  );

  const dispatch = useDispatch();

  const { isDarkMode, toggleThemeAction } = useContext(ThemeContext);

  const featureList: TogglerProps[] = [
    {
      id: "always-on-top",
      label: "Always On Top",
      checked: settings.alwaysOnTop,
      onChange: useCallback(() => {
        dispatch(setAlwaysOnTop(!settings.alwaysOnTop));
      }, [dispatch, settings.alwaysOnTop]),
    },
    {
      id: "fullscreen-break",
      label: "Fullscreen Break",
      checked: settings.enableFullscreenBreak,
      onChange: useCallback(() => {
        dispatch(setEnableFullscreenBreak(!settings.enableFullscreenBreak));
      }, [dispatch, settings.enableFullscreenBreak]),
    },
    {
      id: "strict-mode",
      label: "Strict Mode",
      checked: settings.enableStrictMode,
      onChange: useCallback(() => {
        dispatch(setEnableStrictMode(!settings.enableStrictMode));
      }, [dispatch, settings.enableStrictMode]),
    },
    {
      id: "dark-theme",
      label: "Dark Theme",
      checked: isDarkMode,
      onChange: () => {
        if (toggleThemeAction) {
          toggleThemeAction();
        }
      },
    },
    {
      id: "native-titlebar",
      label: "Native Titlebar",
      checked: settings.useNativeTitlebar,
      onChange: useCallback(() => {
        dispatch(setUseNativeTitlebar(!settings.useNativeTitlebar));
      }, [dispatch, settings.useNativeTitlebar]),
    },
    {
      id: "timer-animation",
      label: "Timer Animation",
      checked: settings.enableTimerAnimation,
      onChange: useCallback(() => {
        dispatch(setEnableTimerAnimation(!settings.enableTimerAnimation));
      }, [dispatch, settings.enableTimerAnimation]),
    },
    {
      id: "auto-updates",
      label: "Auto Updates",
      checked: settings.enableAutoUpdates,
      onChange: useCallback(() => {
        dispatch(setEnableAutoUpdates(!settings.enableAutoUpdates));
      }, [dispatch, settings.enableAutoUpdates]),
    },
  ];

  const onChangeNotificationProps = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setNotificationProperty(e.target.value));
    },
    [dispatch]
  );

  return (
    <SettingSection heading="App Features">
      {featureList.map(({ id, label, checked, onChange }, index) => (
        <Toggler
          id={id}
          label={label}
          checked={checked}
          onChange={onChange}
          key={index}
        />
      ))}
      <Collapse>
        <Radio
          id="none"
          label="none"
          name="notification"
          value="none"
          checked={settings.notificationProperty === "none"}
          onChange={onChangeNotificationProps}
        />
        <Radio
          id="normal"
          label="normal"
          name="notification"
          value="normal"
          checked={settings.notificationProperty === "normal"}
          onChange={onChangeNotificationProps}
        />
        <Radio
          id="extra"
          label="extra"
          name="notification"
          value="extra"
          checked={settings.notificationProperty === "extra"}
          onChange={onChangeNotificationProps}
        />
      </Collapse>
    </SettingSection>
  );
};

export default FeatureSection;
