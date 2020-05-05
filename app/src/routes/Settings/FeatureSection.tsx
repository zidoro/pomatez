import React, { useCallback, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setAlwaysOnTop,
  setEnableNotifications,
  setEnableSpecialBreaks,
  setEnableStrictMode,
  AppStateTypes,
  lockSettings,
} from "store";

import { Toggler, TogglerProps } from "components";
import SettingSection from "./SettingSection";
import { ThemeContext } from "contexts";

const FeatureSection: React.FC = () => {
  const state = useSelector(({ settings }: AppStateTypes) => ({
    alwaysOnTop: settings.alwaysOnTop,
    enableNotifications: settings.enableNotifications,
    enableSpecialBreaks: settings.enableSpecialBreaks,
    enableStickyNotes: settings.enableStickyNotes,
    enableStrictMode: settings.enableStrictMode,
    enableWebBlocker: settings.enableWebBlocker,
    isSettingLock: settings.isSettingLock,
  }));

  const dispatch = useDispatch();

  const { isDarkMode, toggleThemeAction } = useContext(ThemeContext);

  const featureList: TogglerProps[] = [
    {
      id: "on-top",
      label: "Always On Top",
      checked: state.alwaysOnTop,
      onChange: useCallback(() => {
        if (!state.isSettingLock) {
          dispatch(setAlwaysOnTop(!state.alwaysOnTop));
        }
      }, [dispatch, state.alwaysOnTop, state.isSettingLock]),
    },
    {
      id: "show-notification",
      label: "Notifications",
      checked: state.enableNotifications,
      onChange: useCallback(() => {
        if (!state.isSettingLock) {
          dispatch(setEnableNotifications(!state.enableNotifications));
        }
      }, [dispatch, state.enableNotifications, state.isSettingLock]),
    },
    {
      id: "special-breaks",
      label: "Special Breaks",
      checked: state.enableSpecialBreaks,
      onChange: useCallback(() => {
        if (!state.isSettingLock) {
          dispatch(setEnableSpecialBreaks(!state.enableSpecialBreaks));
        }
      }, [dispatch, state.enableSpecialBreaks, state.isSettingLock]),
    },
    {
      id: "strict-mode",
      label: "Strict Mode",
      checked: state.enableStrictMode,
      onChange: useCallback(() => {
        if (!state.isSettingLock) {
          dispatch(setEnableStrictMode(!state.enableStrictMode));
        }
      }, [dispatch, state.enableStrictMode, state.isSettingLock]),
    },
    {
      id: "dark-theme",
      label: "Dark Theme",
      checked: isDarkMode,
      onChange: () => {
        if (!state.isSettingLock && toggleThemeAction) {
          toggleThemeAction();
        }
      },
    },
    {
      id: "lock-settings",
      label: "Lock Settings",
      checked: state.isSettingLock,
      onChange: useCallback(() => {
        dispatch(lockSettings(!state.isSettingLock));
      }, [dispatch, state.isSettingLock]),
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
