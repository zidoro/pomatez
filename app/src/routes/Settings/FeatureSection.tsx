import React, { useCallback, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setAlwaysOnTop,
  setEnableSpecialBreaks,
  setEnableStrictMode,
  AppStateTypes,
  setEnableTimerAnimation,
  SettingTypes,
  setNotificationProperty,
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
      id: "on-top",
      label: "Always On Top",
      checked: settings.alwaysOnTop,
      onChange: useCallback(() => {
        dispatch(setAlwaysOnTop(!settings.alwaysOnTop));
      }, [dispatch, settings.alwaysOnTop]),
    },
    {
      id: "special-breaks",
      label: "Special Breaks",
      checked: settings.enableSpecialBreaks,
      onChange: useCallback(() => {
        dispatch(setEnableSpecialBreaks(!settings.enableSpecialBreaks));
      }, [dispatch, settings.enableSpecialBreaks]),
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
      id: "timer-animation",
      label: "Timer Animation",
      checked: settings.enableTimerAnimation,
      onChange: useCallback(() => {
        dispatch(setEnableTimerAnimation(!settings.enableTimerAnimation));
      }, [dispatch, settings.enableTimerAnimation]),
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
