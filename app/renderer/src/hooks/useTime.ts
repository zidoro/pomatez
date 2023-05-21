import { padNum } from "utils";

export const useTime = (n: number) => {
  const hours = Math.floor(n / 3600);
  const minutes = Math.floor((n % 3600) / 60);
  const seconds = n % 60;

  return {
    hours: padNum(hours),
    minutes: padNum(minutes),
    seconds: padNum(seconds),
  };
};
