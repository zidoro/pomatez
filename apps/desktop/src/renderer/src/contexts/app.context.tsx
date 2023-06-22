import { createContext, ReactNode } from "react";
import { useMachine } from "@xstate/react";
import { InterpreterFrom } from "xstate";

import {
  appMachine,
  defaultMachineContextData,
  getContextDataSync,
  SYNC_DATA_STORAGE_NAME,
} from "@renderer/@data/machine";
import { useLocalStorage } from "@pomatez/ui";

const AppContext = createContext(
  {} as {
    state: (typeof appMachine)["context"];
    send: InterpreterFrom<typeof appMachine>["send"];
  }
);

const persistedContext = getContextDataSync();

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, send] = useMachine(appMachine, {
    devTools: true,
    state: persistedContext
      ? {
          ...appMachine.initialState,
          context: persistedContext,
        }
      : appMachine.initialState,
  });

  const latestMachineContextData = state.context;

  const syncedStorageData = useLocalStorage(
    SYNC_DATA_STORAGE_NAME,
    latestMachineContextData,
    defaultMachineContextData
  );

  return (
    <AppContext.Provider value={{ state: syncedStorageData, send }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
