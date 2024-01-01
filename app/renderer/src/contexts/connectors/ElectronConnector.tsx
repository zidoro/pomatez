import React, { useCallback } from "react";
import { ConnnectorContext } from "../ConnnectorContext";
import { useSelector } from "react-redux";
import { AppStateTypes, SettingTypes } from "../../store";
import { CLOSE_WINDOW, MINIMIZE_WINDOW } from "@pomatez/shareables";
import { ElectronInvoker } from "contexts/InvokeConnectors";

export const ElectronConnectorProvider: React.FC = ({ children }) => {
  const { electron } = window;

  const settings: SettingTypes = useSelector(
    (state: AppStateTypes) => state.settings
  );

  const onMinimizeCallback = useCallback(() => {
    ElectronInvoker.send(MINIMIZE_WINDOW, {
      minimizeToTray: settings.minimizeToTray,
    });
  }, [settings.minimizeToTray]);

  const onExitCallback = useCallback(() => {
    ElectronInvoker.send(CLOSE_WINDOW, {
      closeToTray: settings.closeToTray,
    });
  }, [settings.closeToTray]);

  const openExternalCallback = useCallback(() => {
    const links = document.querySelectorAll("a");

    Array.prototype.forEach.call(links, (link: HTMLAnchorElement) => {
      const url = link.getAttribute("href");
      if (url?.indexOf("http") === 0) {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          electron.openExternal(url);
        });
      }
    });
  }, [electron]);

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
