import React, { useCallback, useEffect } from "react";
import { ConnnectorContext } from "../ConnnectorContext";
import { useDispatch, useSelector } from "react-redux";
import { AppStateTypes, SettingTypes } from "../../store";
import {
  CHECK_FOR_UPDATES,
  CLOSE_WINDOW,
  MINIMIZE_WINDOW,
  UPDATE_AVAILABLE,
} from "@pomatez/shareables";
import {
  enable,
  disable,
  isEnabled,
} from "@tauri-apps/plugin-autostart";

import { listen } from "@tauri-apps/api/event";
import { open } from "@tauri-apps/plugin-shell";
import { setUpdateBody, setUpdateVersion } from "../../store/update";
import { TauriInvoker } from "contexts/InvokeConnectors";

export const TauriConnectorProvider: React.FC = ({ children }) => {
  const dispatch = useDispatch();

  const settings: SettingTypes = useSelector(
    (state: AppStateTypes) => state.settings
  );

  // Prevent webpage behavior (naitive apps shouldn't refresh with F5 or Ctrl+R)
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (
        (event.ctrlKey && event.code === "KeyR") ||
        event.code === "F5"
      ) {
        event.preventDefault();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /**
   * Apparently you can just use _blank as the target though it definitely isn't working on windows.
   *
   * This is a workaround :)
   */
  useEffect(() => {
    function urlClickHandler(e: MouseEvent) {
      const target = e.target as HTMLAnchorElement;
      if (
        target &&
        target.tagName === "A" &&
        target.href.startsWith("http") &&
        target.target === "_blank"
      ) {
        e.preventDefault();
        open(target.href); // Use Tauri's shell module to open external links
      }
    }
    window.addEventListener("click", urlClickHandler);
    return () => {
      window.removeEventListener("click", urlClickHandler);
    };
  }, []);

  useEffect(() => {
    // The autostart-plugin fails when trying to disble if it is already disabled
    // https://github.com/tauri-apps/plugins-workspace/issues/24#issuecomment-1528958008
    isEnabled().then((enabled) => {
      if (settings.openAtLogin) {
        if (!enabled)
          enable()
            .then(() => {
              console.log("Enabled autostart");
            })
            .catch((err) => console.error(err));
      } else {
        if (enabled)
          disable()
            .then(() => {
              console.log("Disabled autostart");
            })
            .catch((err) => console.error(err));
      }
    });
  }, [settings.openAtLogin]);

  const onMinimizeCallback = useCallback(() => {
    TauriInvoker.send(MINIMIZE_WINDOW, {
      minimizeToTray: settings.minimizeToTray,
    });
    console.log("Minimize callback");
  }, [settings.minimizeToTray]);

  const onExitCallback = useCallback(() => {
    TauriInvoker.send(CLOSE_WINDOW, {
      closeToTray: settings.closeToTray,
    });
  }, [settings.closeToTray]);

  /**
   * Not needed as tauri already opens these externally.
   */
  const openExternalCallback = useCallback(() => {}, []);

  // Workaround to make sure it only calls once on mount
  const checkUpdate = useCallback(() => {
    TauriInvoker.send(CHECK_FOR_UPDATES, {
      ignoreVersion: settings.ignoreUpdate || "",
    });
  }, [settings.ignoreUpdate]);

  useEffect(() => {
    checkUpdate();
  }, [checkUpdate]);

  useEffect(() => {
    const unlisten = listen<{ body: string; version: string }>(
      UPDATE_AVAILABLE,
      (updateInfo) => {
        console.log("Update Info", updateInfo.payload);
        dispatch(setUpdateVersion(updateInfo?.payload?.version));
        dispatch(setUpdateBody(updateInfo?.payload?.body));
      }
    );
    return () => {
      unlisten.then((f) => f());
    };
  }, [dispatch]);

  return (
    <ConnnectorContext.Provider
      value={{
        onMinimizeCallback,
        onExitCallback,
        openExternalCallback,
      }}
    >
      {children}
    </ConnnectorContext.Provider>
  );
};
