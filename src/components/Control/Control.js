import React, { useState } from "react";

import Reset from "./elements/Reset";
import Play from "./elements/Play";
import Next from "./elements/Next";
import Volume from "./elements/Volume";

function Control() {
  const [isPlaying, setPlaying] = useState(false);

  const [soundsOn, setSoundsOn] = useState(true);

  function onPlayClick() {
    setPlaying(prevIsPlaying => !prevIsPlaying);
  }

  function onSoundClick() {
    setSoundsOn(prevSoundsOn => !prevSoundsOn);
  }
  return (
    <div className="control">
      <div className="control__box">
        <div className="session">
          <p className="session__count">4 / 4</p>
          <p className="session__name">Sessions</p>
        </div>

        <div className="action">
          <div className="action__reset">
            <Reset />
          </div>

          <div className="action__play">
            <Play isPlaying={isPlaying} onClick={onPlayClick} />
          </div>

          <div className="action__right">
            <div className="action__next">
              <Next />
            </div>

            <div className="action__volume">
              <Volume soundsOn={soundsOn} onClick={onSoundClick} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Control;
