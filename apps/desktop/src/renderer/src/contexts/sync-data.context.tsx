import { createContext, ReactNode } from "react";
import { appMachine } from "@renderer/@data/machine";
import { useAppMachine } from "@renderer/hooks";

const SyncDataContext = createContext({} as typeof appMachine.context);

const SyncDataProvider = ({ children }: { children: ReactNode }) => {
  const { state } = useAppMachine();

  return (
    <SyncDataContext.Provider value={state}>
      {children}
    </SyncDataContext.Provider>
  );
};

export { SyncDataProvider, SyncDataContext };
