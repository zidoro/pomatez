import { ipcMain, IpcMainEvent } from "electron";
import * as RPC from "discord-rpc";
import {
  SET_RPC_ACTIVITY,
  RELEASE_NOTES_LINK,
  DISCORD_LINK,
} from "@pomatez/shareables";

const clientId = "1416789071350730762";
const rpc = new RPC.Client({ transport: "ipc" });

type RpcActivityType = "Idle" | "Focus" | "Break";

interface RpcActivityData {
  type: RpcActivityType;
  start?: Date;
  end?: Date;
}

interface Button {
  label: string;
  url: string;
}

interface DiscordActivity {
  details: string;
  state: string;
  largeImageKey: string;
  largeImageText: string;
  startTimestamp: number;
  endTimestamp: number;
  instance: boolean;
  detailsUrl: string;
  buttons: [Button, Button];
}

const DefaultActivity: DiscordActivity = {
  details: "Open Source Pomodoro Timer",
  detailsUrl: RELEASE_NOTES_LINK,
  state: "Idling",
  largeImageKey: "logo_pomatez_dark",
  largeImageText: "Pomatez",
  instance: false,
  startTimestamp: Date.now(),
  endTimestamp: Date.now(),
  buttons: [
    { label: "Download Pomatez", url: RELEASE_NOTES_LINK },
    { label: "Join Discord", url: DISCORD_LINK },
  ],
};

const presetActivities: Record<RpcActivityType, DiscordActivity> = {
  Idle: {
    ...DefaultActivity,
    state: "Idling",
  },
  Focus: {
    ...DefaultActivity,
    state: "Staying Focused",
  },
  Break: {
    ...DefaultActivity,
    state: "Taking a break",
  },
};

rpc.on("ready", () => {
  setActivity("Idle");
});

export function setActivity(
  type: RpcActivityType,
  start?: Date,
  end?: Date
): void {
  const baseActivity = presetActivities[type];
  const activity = {
    ...baseActivity,
    startTimestamp: start || Date.now(),
    endTimestamp: end,
  };
  rpc.setActivity(activity).catch(console.error);
}

export function initializeRPC(): void {
  rpc.login({ clientId }).catch(console.error);
}

ipcMain.on(
  SET_RPC_ACTIVITY,
  (event: IpcMainEvent, data: RpcActivityData) => {
    setActivity(data.type, data.start, data.end);
  }
);
