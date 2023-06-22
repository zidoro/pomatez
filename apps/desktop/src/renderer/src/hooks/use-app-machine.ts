import { useAtom, useAtomValue } from "jotai";
import { appMachineAtom } from "@renderer/@data/machine";

export const useAppMachine = () => useAtom(appMachineAtom);

export const useAppMachineValue = () => useAtomValue(appMachineAtom);
