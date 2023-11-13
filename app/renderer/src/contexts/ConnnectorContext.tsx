import React from "react";
import isElectron from "is-electron";
import {
  ElectronConnectorProvider,
  ElectronInvokeConnector,
} from "./connectors/ElectronConnector";
import {
  TauriDesktopConnectorProvider,
  TauriDesktopInvokeConnector,
} from "./connectors/TauriDesktopConnector";
import { detectOS } from "../utils";
import {
  TauriMobileConnectorProvider,
  TauriMobileInvokeConnector,
} from "./connectors/TauriMobileConnector";

export type ConnectorProps = {
  onMinimizeCallback?: () => void;
  onExitCallback?: () => void;
  openExternalCallback?: () => void;
};

export const ConnnectorContext = React.createContext<ConnectorProps>(
  {}
);

export function getInvokeConnector() {
  if (isElectron()) {
    return ElectronInvokeConnector;
  } else if (window.__TAURI__) {
    let os = detectOS();
    if (os === "iOS" || os === "Android")
      return TauriMobileInvokeConnector;
    return TauriDesktopInvokeConnector;
  }
  return undefined;
}

export const ConnectorProvider: React.FC = ({ children }) => {
  let Connector: React.FC<ConnectorProps> = () => <>{children}</>;
  if (isElectron()) {
    Connector = ElectronConnectorProvider;
  } else if (window.__TAURI__) {
    let os = detectOS();
    if (os === "iOS" || os === "Android") {
      Connector = TauriMobileConnectorProvider;
    } else {
      Connector = TauriDesktopConnectorProvider;
    }
  }

  return <Connector children={children} />;
};
