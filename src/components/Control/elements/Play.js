import React from "react";
import Ripple from "../../Ripple";

function Play({ isPlaying, onClick }) {
  return (
    <Ripple>
      <div className="play" onClick={onClick}>
        {isPlaying ? (
          <svg className="play__pause-btn">
            <use xlinkHref="#icon-pause" />
          </svg>
        ) : (
          <svg className="play__play-btn">
            <use xlinkHref="#icon-play" />
          </svg>
        )}
      </div>
    </Ripple>
  );
}

export default Play;
