import { useEffect, useRef } from "react";

import VideoMp4 from "assets/videos/muted-blank.mp4";
import VideoOGV from "assets/videos/muted-blank.ogv";

const useSleepMode = () => {
  const _video = useRef(document.createElement("video"));

  useEffect(() => {
    const _videoStyle: React.CSSProperties = {
      position: "absolute",
      top: "0",
      left: "0",
      width: "0",
      height: "0",
    };

    Object.assign(_video.current.style, _videoStyle);

    const _source_mp4 = document.createElement("source");
    _source_mp4.setAttribute("src", VideoMp4);
    _source_mp4.setAttribute("type", "video/mp4");

    _video.current.appendChild(_source_mp4);

    const _source_ogg = document.createElement("source");
    _source_ogg.setAttribute("src", VideoOGV);
    _source_ogg.setAttribute("type", "video/ogg");

    _video.current.appendChild(_source_ogg);

    document.body.appendChild(_video.current);
  }, [_video]);

  const preventSleep = () => {
    _video.current.setAttribute("loop", "loop");
    _video.current.play();
  };

  const allowSleep = () => {
    _video.current.removeAttribute("loop");
    _video.current.pause();
  };

  return { preventSleep, allowSleep };
};

export { useSleepMode };
