import { CounterContext } from "contexts";
import { useEffect, useContext } from "react";
import { useAppSelector } from "./storeHooks";
import { TraySVG } from "components";
import { encodeSvg } from "utils";

export const useTrayIconUpdates = (
  onNewIcon: (dataUrl: string) => void
) => {
  const timer = useAppSelector((state) => state.timer);

  const { count, duration, timerType } = useContext(CounterContext);
  const dashOffset = (duration - count) * (24 / duration);

  useEffect(() => {
    if (timer.playing) {
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
    }
  }, [onNewIcon, timer.playing, timerType, dashOffset]);
};
