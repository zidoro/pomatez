import { createContext, ReactNode, useContext } from "react";
import { useInterpret } from "@xstate/react";
import { InterpreterFrom } from "xstate";

import { appMachine } from "@renderer/@data/machine";

const AppContext = createContext(
  {} as InterpreterFrom<typeof appMachine>
);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const appActor = useInterpret(appMachine);

  return (
    <AppContext.Provider value={appActor}>
      {children}
    </AppContext.Provider>
  );
};

const useAppMachine = () => useContext(AppContext);

export { AppProvider, useAppMachine };
