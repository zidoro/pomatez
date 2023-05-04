import { useContext } from "react";
import { AppContext } from "@renderer/contexts/app.context";

export const useAppMachine = () => useContext(AppContext);
