import React from "react";
import isElectron from "is-electron";
import { ElectronConnectorProvider } from "./connectors/ElectronConnector";
import { TauriConnectorProvider } from "./connectors/TauriConnector";

export type ConnectorProps = {
  onMinimizeCallback?: () => void;
  onExitCallback?: () => void;
  openExternalCallback?: () => void;
};

export const ConnnectorContext = React.createContext<ConnectorProps>(
  {}
);

export const ConnectorProvider: React.FC = ({ children }) => {
  let Connector: React.FC<ConnectorProps> = () => <>{children}</>;
  if (isElectron()) {
    Connector = ElectronConnectorProvider;
  } else if (window.__TAURI__) {
    Connector = TauriConnectorProvider;
  }

  return <Connector children={children} />;
};
