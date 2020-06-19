import { ConfigSliderProps } from "routes";

export const rangeConfig: ConfigSliderProps[] = [
  {
    label: "Stay focus",
    valueType: "mins",
    minValue: 0,
    maxValue: 60,
    value: 30,
  },
  {
    label: "Short break",
    valueType: "mins",
    minValue: 0,
    maxValue: 60,
    value: 5,
  },
  {
    label: "Long break",
    valueType: "mins",
    minValue: 0,
    maxValue: 60,
    value: 15,
  },
  {
    label: "Session rounds",
    valueType: "rounds",
    minValue: 0,
    maxValue: 10,
    value: 4,
  },
];
