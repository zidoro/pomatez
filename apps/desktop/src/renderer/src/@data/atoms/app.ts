import { atomWithMachine } from "jotai-xstate";

import { appMachine } from "../machine";

export const appMachineAtom = atomWithMachine(appMachine);
