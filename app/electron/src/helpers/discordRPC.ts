import { ipcMain, IpcMainEvent } from "electron";
import * as RPC from "discord-rpc";
import {
  SET_RPC_ACTIVITY,
  RELEASE_NOTES_LINK,
  DISCORD_LINK,
} from "@pomatez/shareables";

const clientId = "1416789071350730762";
let rpc: RPC.Client | undefined;
let currentActivity: RpcActivityData;

type RpcActivityType = "Idle" | "Focus" | "Break";

interface RpcActivityData {
  type: RpcActivityType;
  start?: Date;
  end?: Date;
  round?: number;
  sessionRounds?: number;
}

interface Button {
  label: string;
  url: string;
}

interface DiscordActivity {
  details: string;
  state?: string;
  largeImageKey: string;
  largeImageText: string;
  startTimestamp?: number;
  endTimestamp?: number;
  instance: boolean;
  buttons: [Button, Button];
}

const DefaultActivity: DiscordActivity = {
  details: "Idling",
  largeImageKey: "logo_pomatez_dark",
  largeImageText: "Pomatez",
  instance: true,
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
    details: "Idling",
    state: "Open Source Pomodoro Timer",
  },
  Focus: {
    ...DefaultActivity,
    details: "Staying focused",
    state: "Session",
  },
  Break: {
    ...DefaultActivity,
    details: "Taking a break",
    state: "Break",
  },
};

export function setActivity(data: RpcActivityData): void {
  if (!(rpc instanceof RPC.Client)) {
    return;
  }

  const baseActivity = presetActivities[data.type];
  const state = presetActivities[data.type].state;
  const activity = {
    ...baseActivity,
    state:
      data.type === "Idle"
        ? undefined
        : `${state} (${data.round} of ${data.sessionRounds})`,
    startTimestamp: Date.now(),
    endTimestamp:
      data.end instanceof Date ? data.end.getTime() : undefined, //this is supposed to make it count down, but its not working
  };

  rpc.setActivity(activity).catch(console.error);
}

export function initializeRPC(): void {
  if (rpc instanceof RPC.Client) {
    return;
  }

  rpc = new RPC.Client({ transport: "ipc" });

  rpc.login({ clientId }).catch(console.error);

  rpc.on("ready", () => {
    setActivity(currentActivity || { type: "Idle" });
  });
}

export function uninitializeRPC(): void {
  if (rpc instanceof RPC.Client) {
    rpc.destroy().catch(console.error);
    rpc = undefined;
  }
}

ipcMain.on(
  SET_RPC_ACTIVITY,
  (event: IpcMainEvent, data: RpcActivityData) => {
    currentActivity = data;
    setActivity(data);
  }
);
