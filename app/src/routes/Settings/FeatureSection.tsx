import React, { useCallback, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setAlwaysOnTop,
  setEnableNotifications,
  setEnableSpecialBreaks,
  setEnableStrictMode,
  AppStateTypes,
  lockSettings,
  setEnableTimerAnimation,
} from "store";

import { Toggler, TogglerProps } from "components";
import SettingSection from "./SettingSection";
import { ThemeContext } from "contexts";

const FeatureSection: React.FC = () => {
  const settings = useSelector((state: AppStateTypes) => state.settings);

  const dispatch = useDispatch();

  const { isDarkMode, toggleThemeAction } = useContext(ThemeContext);

  const featureList: TogglerProps[] = [
    {
      id: "on-top",
      label: "Always On Top",
      checked: settings.alwaysOnTop,
      onChange: useCallback(() => {
        if (!settings.isSettingLock) {
          dispatch(setAlwaysOnTop(!settings.alwaysOnTop));
        }
      }, [dispatch, settings.alwaysOnTop, settings.isSettingLock]),
    },
    {
      id: "show-notification",
      label: "Notifications",
      checked: settings.enableNotifications,
      onChange: useCallback(() => {
        if (!settings.isSettingLock) {
          dispatch(setEnableNotifications(!settings.enableNotifications));
        }
      }, [dispatch, settings.enableNotifications, settings.isSettingLock]),
    },
    {
      id: "special-breaks",
      label: "Special Breaks",
      checked: settings.enableSpecialBreaks,
      onChange: useCallback(() => {
        if (!settings.isSettingLock) {
          dispatch(setEnableSpecialBreaks(!settings.enableSpecialBreaks));
        }
      }, [dispatch, settings.enableSpecialBreaks, settings.isSettingLock]),
    },
    {
      id: "strict-mode",
      label: "Strict Mode",
      checked: settings.enableStrictMode,
      onChange: useCallback(() => {
        if (!settings.isSettingLock) {
          dispatch(setEnableStrictMode(!settings.enableStrictMode));
        }
      }, [dispatch, settings.enableStrictMode, settings.isSettingLock]),
    },
    {
      id: "dark-theme",
      label: "Dark Theme",
      checked: isDarkMode,
      onChange: () => {
        if (!settings.isSettingLock && toggleThemeAction) {
          toggleThemeAction();
        }
      },
    },
    {
      id: "lock-settings",
      label: "Lock Settings",
      checked: settings.isSettingLock,
      onChange: useCallback(() => {
        dispatch(lockSettings(!settings.isSettingLock));
      }, [dispatch, settings.isSettingLock]),
    },
    {
      id: "timer-animation",
      label: "Timer Animation",
      checked: settings.enableTimerAnimation,
      onChange: useCallback(() => {
        if (!settings.isSettingLock) {
          dispatch(setEnableTimerAnimation(!settings.enableTimerAnimation));
        }
      }, [dispatch, settings.enableTimerAnimation, settings.isSettingLock]),
    },
  ];

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
    </SettingSection>
  );
};

export default FeatureSection;
