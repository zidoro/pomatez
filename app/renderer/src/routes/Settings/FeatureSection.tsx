import React, { useCallback, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setAlwaysOnTop,
  setEnableStrictMode,
  AppStateTypes,
  setEnableProgressAnimation,
  SettingTypes,
  setNotificationType,
  setEnableFullscreenBreak,
  setUseNativeTitlebar,
  setAutoStartWorkTime,
  setMinimizeToTray,
  setCloseToTray,
  setEnableVoiceAssistance,
  setEnableCompactMode,
} from "store";
import { Toggler, TogglerProps, Collapse, Radio } from "components";
import { ThemeContext } from "contexts";

import SettingSection from "./SettingSection";

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
      id: "compact-mode",
      label: "Compact Mode",
      checked: settings.compactMode,
      onChange: useCallback(() => {
        dispatch(setEnableCompactMode(!settings.compactMode));
      }, [dispatch, settings.compactMode]),
    },
    {
      id: "fullscreen-break",
      label: "Fullscreen Break",
      checked: settings.enableFullscreenBreak,
      onChange: useCallback(() => {
        dispatch(
          setEnableFullscreenBreak(!settings.enableFullscreenBreak)
        );
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
      id: "progress-animation",
      label: "Progress Animation",
      checked: settings.enableProgressAnimation,
      onChange: useCallback(() => {
        dispatch(
          setEnableProgressAnimation(!settings.enableProgressAnimation)
        );
      }, [dispatch, settings.enableProgressAnimation]),
    },
    {
      id: "auto-start-work-time",
      label: "Auto-start Work Time",
      checked: settings.autoStartWorkTime,
      onChange: useCallback(() => {
        dispatch(setAutoStartWorkTime(!settings.autoStartWorkTime));
      }, [dispatch, settings.autoStartWorkTime]),
    },
    {
      id: "minimize-to-tray",
      label: "Minimize To Tray",
      checked: settings.minimizeToTray,
      onChange: useCallback(() => {
        dispatch(setMinimizeToTray(!settings.minimizeToTray));
      }, [dispatch, settings.minimizeToTray]),
    },
    {
      id: "close-to-tray",
      label: "Close To Tray",
      checked: settings.closeToTray,
      onChange: useCallback(() => {
        dispatch(setCloseToTray(!settings.closeToTray));
      }, [dispatch, settings.closeToTray]),
    },
    {
      id: "voice-assistance",
      label: "Voice Assistance",
      checked: settings.enableVoiceAssistance,
      onChange: useCallback(() => {
        dispatch(
          setEnableVoiceAssistance(!settings.enableVoiceAssistance)
        );
      }, [dispatch, settings.enableVoiceAssistance]),
    },
  ];

  const onChangeNotificationProps = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setNotificationType(e.target.value));
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
          checked={settings.notificationType === "none"}
          onChange={onChangeNotificationProps}
        />
        <Radio
          id="normal"
          label="normal"
          name="notification"
          value="normal"
          checked={settings.notificationType === "normal"}
          onChange={onChangeNotificationProps}
        />
        <Radio
          id="extra"
          label="extra"
          name="notification"
          value="extra"
          checked={settings.notificationType === "extra"}
          onChange={onChangeNotificationProps}
        />
      </Collapse>
    </SettingSection>
  );
};

export default FeatureSection;
