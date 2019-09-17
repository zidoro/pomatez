import React, { useContext } from "react";
import { StoreContext, SET_PLAYING, SET_SOUND_ON } from "../../models";
import { Next, Play, Reset, Volume } from "./elements";

function Control() {
  const [{ isPlaying, isSoundON }, dispatch] = useContext(StoreContext).control;
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
            <Play
              isPlaying={isPlaying}
              onClick={() => dispatch({ type: SET_PLAYING })}
            />
          </div>

          <div className="action__right">
            <div className="action__next">
              <Next />
            </div>

            <div className="action__volume">
              <Volume
                isSoundON={isSoundON}
                onClick={() => dispatch({ type: SET_SOUND_ON })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Control;
