import { createContext, ReactNode, useContext } from "react";
import { useLocalStorage } from "@pomatez/ui";
import { useSelector } from "@xstate/react";
import {
  appMachine,
  defaultConfig,
  defaultSettings,
  defaultTimer,
  SYNC_DATA_STORAGE_NAME,
} from "@renderer/@data/machine";
import { useAppMachine } from "./app.context";

const defaultSyncData = {
  settings: defaultSettings,
  config: defaultConfig,
  timer: defaultTimer,
};

const SyncDataContext = createContext({} as typeof appMachine.context);

const SyncDataProvider = ({ children }: { children: ReactNode }) => {
  const machineActor = useAppMachine();

  const syncData = useSelector(machineActor, (state) => state.context);

  const { value } = useLocalStorage(
    SYNC_DATA_STORAGE_NAME,
    syncData,
    defaultSyncData
  );

  return (
    <SyncDataContext.Provider value={value}>
      {children}
    </SyncDataContext.Provider>
  );
};

const useSyncData = () => useContext(SyncDataContext);

export { SyncDataProvider, useSyncData, SYNC_DATA_STORAGE_NAME };
