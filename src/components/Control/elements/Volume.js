import React from "react";
import Ripple from "../../Ripple";

function Volume({ soundsOn, onClick }) {
  return (
    <Ripple>
      <div className="volume" onClick={onClick}>
        {soundsOn ? (
          <svg className="volume__on">
            <use xlinkHref="#icon-volume-on" />
          </svg>
        ) : (
          <svg className="volume__off">
            <use xlinkHref="#icon-volume-off" />
          </svg>
        )}
      </div>
    </Ripple>
  );
}

export default Volume;
