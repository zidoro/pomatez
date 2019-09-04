import React from "react";
import Ripple from "../../Ripple";

function Volume({ Sprite, soundsOn, onClick }) {
  return (
    <Ripple>
      <div className="volume" onClick={onClick}>
        {soundsOn ? (
          <svg className="volume__on">
            <use xlinkHref={Sprite + "#icon-volume-on"} />
          </svg>
        ) : (
          <svg className="volume__off">
            <use xlinkHref={Sprite + "#icon-volume-off"} />
          </svg>
        )}
      </div>
    </Ripple>
  );
}

export default Volume;
