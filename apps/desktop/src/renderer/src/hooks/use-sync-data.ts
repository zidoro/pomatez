import { useContext } from "react";
import { SyncDataContext } from "@renderer/contexts/sync-data.context";

export const useSyncData = () => useContext(SyncDataContext);
