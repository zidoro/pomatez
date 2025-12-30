import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "hooks/storeHooks";
import {
  setAlwaysOnTop,
  setEnableStrictMode,
  setEnableProgressAnimation,
  setNotificationType,
  setEnableFullscreenBreak,
  setUseNativeTitlebar,
  setAutoStartWorkTime,
  setMinimizeToTray,
  setCloseToTray,
  setEnableVoiceAssistance,
  setEnableCompactMode,
  setOpenAtLogin,
  setEnableRPC,
  setFollowSystemTheme,
} from "store";
import { Toggler, TogglerProps, Collapse, Radio } from "components";
import { ThemeContext } from "contexts";

import SettingSection from "./SettingSection";
import { detectOS } from "utils";
import { NotificationTypes } from "store/settings/types";

const FeatureSection: React.FC = () => {
  const { t } = useTranslation();
  const settings = useAppSelector((state) => state.settings);

  const dispatch = useAppDispatch();

  const { isDarkMode, toggleThemeAction } = useContext(ThemeContext);

  const featureList: TogglerProps[] = [
    {
      id: "always-on-top",
      label: t("settings.alwaysOnTop"),
      checked: settings.alwaysOnTop,
      onChange: useCallback(() => {
        dispatch(setAlwaysOnTop(!settings.alwaysOnTop));
      }, [dispatch, settings.alwaysOnTop]),
    },
    {
      id: "compact-mode",
      label: t("settings.compactMode"),
      checked: settings.compactMode,
      onChange: useCallback(() => {
        dispatch(setEnableCompactMode(!settings.compactMode));
      }, [dispatch, settings.compactMode]),
    },
    {
      id: "fullscreen-break",
      label: t("settings.fullscreenBreak"),
      checked: settings.enableFullscreenBreak,
      onChange: useCallback(() => {
        dispatch(
          setEnableFullscreenBreak(!settings.enableFullscreenBreak)
        );
      }, [dispatch, settings.enableFullscreenBreak]),
    },
    {
      id: "strict-mode",
      label: t("settings.strictMode"),
      checked: settings.enableStrictMode,
      onChange: useCallback(() => {
        dispatch(setEnableStrictMode(!settings.enableStrictMode));
      }, [dispatch, settings.enableStrictMode]),
    },
    {
      id: "dark-theme",
      label: t("settings.darkTheme"),
      checked: isDarkMode,
      disabled: settings.followSystemTheme,
      onChange: () => {
        if (toggleThemeAction) {
          toggleThemeAction();
        }
      },
    },
    {
      id: "follow-system-theme",
      label: t("settings.followSystemTheme"),
      checked: settings.followSystemTheme,
      onChange: useCallback(() => {
        dispatch(setFollowSystemTheme(!settings.followSystemTheme));
      }, [dispatch, settings.followSystemTheme]),
    },
    {
      id: "native-titlebar",
      label: t("settings.nativeTitlebar"),
      checked: settings.useNativeTitlebar,
      onChange: useCallback(() => {
        dispatch(setUseNativeTitlebar(!settings.useNativeTitlebar));
      }, [dispatch, settings.useNativeTitlebar]),
    },
    {
      id: "progress-animation",
      label: t("settings.progressAnimation"),
      checked: settings.enableProgressAnimation,
      onChange: useCallback(() => {
        dispatch(
          setEnableProgressAnimation(!settings.enableProgressAnimation)
        );
      }, [dispatch, settings.enableProgressAnimation]),
    },
    {
      id: "auto-start-work-time",
      label: t("settings.autoStartWorkTime"),
      checked: settings.autoStartWorkTime,
      onChange: useCallback(() => {
        dispatch(setAutoStartWorkTime(!settings.autoStartWorkTime));
      }, [dispatch, settings.autoStartWorkTime]),
    },
    {
      id: "minimize-to-tray",
      label: t("settings.minimizeToTray"),
      checked: settings.minimizeToTray,
      onChange: useCallback(() => {
        dispatch(setMinimizeToTray(!settings.minimizeToTray));
      }, [dispatch, settings.minimizeToTray]),
    },
    {
      id: "close-to-tray",
      label: t("settings.closeToTray"),
      checked: settings.closeToTray,
      onChange: useCallback(() => {
        dispatch(setCloseToTray(!settings.closeToTray));
      }, [dispatch, settings.closeToTray]),
    },
    {
      id: "voice-assistance",
      label: t("settings.voiceAssistance"),
      checked: settings.enableVoiceAssistance,
      onChange: useCallback(() => {
        dispatch(
          setEnableVoiceAssistance(!settings.enableVoiceAssistance)
        );
      }, [dispatch, settings.enableVoiceAssistance]),
    },
    {
      id: "open-at-login",
      label: t("settings.openAtLogin"),
      checked: settings.openAtLogin,
      onChange: useCallback(() => {
        dispatch(setOpenAtLogin(!settings.openAtLogin));
      }, [dispatch, settings.openAtLogin]),
      style: {
        ...(detectOS() === "Linux" && {
          display: "none",
        }),
      },
    },
    {
      id: "enable-rpc",
      label: t("settings.enableRichPresence"),
      checked: settings.enableRPC,
      onChange: useCallback(() => {
        dispatch(setEnableRPC(!settings.enableRPC));
      }, [dispatch, settings.enableRPC]),
    },
  ];

  const onChangeNotificationProps = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        setNotificationType(e.target.value as NotificationTypes)
      );
    },
    [dispatch]
  );

  return (
    <SettingSection heading={t("settings.appFeatures")}>
      {featureList.map(
        (
          { id, label, checked, onChange, disabled = false, ...rest },
          index
        ) => (
          <Toggler
            id={id}
            key={index}
            label={label}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            {...rest}
          />
        )
      )}
      <Collapse>
        <Radio
          id="none"
          label={t("settings.notificationNone")}
          name="notification"
          value={NotificationTypes.NONE}
          checked={settings.notificationType === NotificationTypes.NONE}
          onChange={onChangeNotificationProps}
        />
        <Radio
          id="normal"
          label={t("settings.notificationNormal")}
          name="notification"
          value={NotificationTypes.NORMAL}
          checked={
            settings.notificationType === NotificationTypes.NORMAL
          }
          onChange={onChangeNotificationProps}
        />
        <Radio
          id="extra"
          label={t("settings.notificationExtra")}
          name="notification"
          value={NotificationTypes.EXTRA}
          checked={
            settings.notificationType === NotificationTypes.EXTRA
          }
          onChange={onChangeNotificationProps}
        />
      </Collapse>
    </SettingSection>
  );
};

export default FeatureSection;
