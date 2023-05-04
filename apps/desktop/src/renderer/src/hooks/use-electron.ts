import { useContext } from "react";
import { ElectronContext } from "@renderer/contexts/electron.context";

export const useElectron = () => useContext(ElectronContext);
