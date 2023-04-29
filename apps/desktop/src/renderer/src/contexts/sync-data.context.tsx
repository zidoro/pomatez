import { createContext, ReactNode, useContext } from "react";
import { useLocalStorage } from "@pomatez/ui";
import { useSelector } from "@xstate/react";
import {
  appMachine,
  defaultMachineContextData,
  SYNC_DATA_STORAGE_NAME,
} from "@renderer/@data/machine";
import { useAppMachine } from "./app.context";

const SyncDataContext = createContext({} as typeof appMachine.context);

const SyncDataProvider = ({ children }: { children: ReactNode }) => {
  const machineActor = useAppMachine();

  const latestMachineContextData = useSelector(
    machineActor,
    (state) => state.context
  );

  const syncedStorageData = useLocalStorage(
    SYNC_DATA_STORAGE_NAME,
    latestMachineContextData,
    defaultMachineContextData
  );

  return (
    <SyncDataContext.Provider value={syncedStorageData}>
      {children}
    </SyncDataContext.Provider>
  );
};

const useSyncData = () => useContext(SyncDataContext);

export { SyncDataProvider, useSyncData, SYNC_DATA_STORAGE_NAME };
