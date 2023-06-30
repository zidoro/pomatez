import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { runOnElectron } from "@renderer/utils";
import {
  resetTimerAtom,
  settingsAtom,
  timerAtom,
} from "@renderer/@data/atoms";

type ElectronContextProps = {
  onMinimizeWindow?: () => void;
  onCloseWindow?: () => void;
};

const ElectronContext = createContext<ElectronContextProps>({});

const ElectronProvider = ({ children }: { children: ReactNode }) => {
  const resetTimer = useSetAtom(resetTimerAtom);

  const settings = useAtomValue(
    useMemo(() => atom((get) => get(settingsAtom)), [])
  );

  const timer = useAtomValue(
    useMemo(() => atom((get) => get(timerAtom)), [])
  );

  const onMinimizeWindow = useCallback(() => {
    runOnElectron(() => {
      window.api.send("minimize-window");
    });
  }, []);

  const onCloseWindow = useCallback(() => {
    resetTimer();
    runOnElectron(() => {
      window.api.send("close-window");
    });
  }, [resetTimer]);

  useEffect(() => {
    window.addEventListener("beforeunload", resetTimer);
    return () => {
      window.removeEventListener("beforeunload", resetTimer);
    };
  }, [resetTimer]);

  useEffect(() => {
    runOnElectron(() => {
      window.api.send("set-always-on-top", {
        alwaysOnTop: settings.alwaysOnTop,
      });
    });
  }, [settings.alwaysOnTop]);

  useEffect(() => {
    runOnElectron(() => {
      window.api.send("set-fullscreen-break", {
        shouldFullScreenBreak: timer.shouldFullScreenBreak,
      });
    });
  }, [timer.shouldFullScreenBreak]);

  return (
    <ElectronContext.Provider
      value={{ onMinimizeWindow, onCloseWindow }}
    >
      {children}
    </ElectronContext.Provider>
  );
};

export { ElectronProvider, ElectronContext };
