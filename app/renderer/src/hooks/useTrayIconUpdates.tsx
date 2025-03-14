import { CounterContext } from "contexts";
import { useEffect, useContext } from "react";
import { useAppSelector } from "./storeHooks";
import { TraySVG } from "components";
import { encodeSvg } from "utils";
import { useTime } from "./useTime";

export const useTrayIconUpdates = (
  onNewIcon: (dataUrl: string) => void,
  onTitleUpdate?: (title: string) => void
) => {
  const timer = useAppSelector((state) => state.timer);

  const { count, duration, timerType } = useContext(CounterContext);
  const dashOffset = (duration - count) * (24 / duration);
  const { hours, minutes, seconds } = useTime(count);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 16;
    canvas.height = 16;

    let svgXML = encodeSvg(
      <TraySVG timerType={timerType} dashOffset={dashOffset} />
    );

    const img = new Image();
    img.src = svgXML;

    img.onload = function () {
      ctx?.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL("image/png");

      onNewIcon(dataUrl);
    };

    // Update tray title with remaining time or empty string if not playing
    if (onTitleUpdate) {
      if (timer.playing) {
        let timeDisplay = "";
        if (hours !== "00") {
          timeDisplay = `${hours}:${minutes}:${seconds}`;
        } else {
          timeDisplay = `${minutes}:${seconds}`;
        }
        onTitleUpdate(timeDisplay);
      } else {
        // Set empty string to restore the normal icon
        onTitleUpdate("");
      }
    }
  }, [
    onNewIcon,
    onTitleUpdate,
    timer.playing,
    timerType,
    dashOffset,
    hours,
    minutes,
    seconds,
  ]);
};
