import React from "react";
import isElectron from "is-electron";
import {
  ElectronConnectorProvider,
  ElectronInvokeConnector,
} from "./connectors/ElectronConnector";
import {
  TauriConnectorProvider,
  TauriInvokeConnector,
} from "./connectors/TauriConnector";

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
    return TauriInvokeConnector;
  }
  return undefined;
}

export const ConnectorProvider: React.FC = ({ children }) => {
  let Connector: React.FC<ConnectorProps> = () => <>{children}</>;
  if (isElectron()) {
    Connector = ElectronConnectorProvider;
  } else if (window.__TAURI__) {
    Connector = TauriConnectorProvider;
  }

  return <Connector>{children}</Connector>;
};
