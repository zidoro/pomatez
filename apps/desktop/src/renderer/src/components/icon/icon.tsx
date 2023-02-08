import { SVGProps } from "react";
import {
  AddSVG,
  AlertSVG,
  ChevronDownSVG,
  CloseSVG,
  ConfigSVG,
  ExpandSVG,
  ExternalSVG,
  FastFoodSVG,
  LaptopSVG,
  MugSVG,
  NapSVG,
  OptionXSVG,
  OptionYSVG,
  PauseSVG,
  PencilSVG,
  PlaySVG,
  ProgressSVG,
  RefreshSVG,
  ResetSVG,
  SaveSVG,
  SettingsSVG,
  SkipSVG,
  TaskSVG,
  TimerSVG,
  TrashSVG,
  VolumeMuteSVG,
  VolumeOnSVG,
} from "./collections";

export type IconProps = {
  size?: number;
  style?: SVGProps<SVGElement>["style"];
  name?:
    | "laptop"
    | "mug"
    | "nap"
    | "config"
    | "option-x"
    | "option-y"
    | "pause"
    | "play"
    | "progress"
    | "reset"
    | "settings"
    | "skip"
    | "tasks"
    | "timer"
    | "volume-mute"
    | "volume-on"
    | "external"
    | "add"
    | "pencil"
    | "save"
    | "trash"
    | "close"
    | "fast-food"
    | "refresh"
    | "alert"
    | "chevron-down"
    | "expand";
};

export function Icon({ name, size, style }: IconProps) {
  switch (name) {
    case "laptop":
      return <LaptopSVG />;
    case "mug":
      return <MugSVG />;
    case "nap":
      return <NapSVG />;
    case "config":
      return <ConfigSVG />;
    case "option-x":
      return <OptionXSVG />;
    case "option-y":
      return <OptionYSVG />;
    case "pause":
      return <PauseSVG height={size} width={size} />;
    case "play":
      return <PlaySVG height={size} width={size} />;
    case "progress":
      return <ProgressSVG />;
    case "reset":
      return <ResetSVG />;
    case "settings":
      return <SettingsSVG />;
    case "skip":
      return <SkipSVG />;
    case "tasks":
      return <TaskSVG />;
    case "timer":
      return <TimerSVG />;
    case "volume-mute":
      return <VolumeMuteSVG />;
    case "volume-on":
      return <VolumeOnSVG />;
    case "external":
      return <ExternalSVG />;
    case "add":
      return <AddSVG />;
    case "pencil":
      return <PencilSVG />;
    case "save":
      return <SaveSVG />;
    case "trash":
      return <TrashSVG />;
    case "close":
      return <CloseSVG />;
    case "fast-food":
      return <FastFoodSVG />;
    case "refresh":
      return <RefreshSVG />;
    case "alert":
      return <AlertSVG />;
    case "chevron-down":
      return <ChevronDownSVG />;
    case "expand":
      return <ExpandSVG style={style} />;
    default:
      return null;
  }
}
