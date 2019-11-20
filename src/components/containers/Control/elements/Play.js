import React from "react";
import PropTypes from "prop-types";
import { Ripple } from "../../../common";
import { addClass } from "../../../../helpers";

Play.propTypes = {
  running: PropTypes.bool,
  timerType: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

Play.defaultProps = {
  running: false
};

function Play({ running, timerType, onClick }) {
  return (
    <Ripple>
      <div className={`play ${addClass(timerType)}`} onClick={onClick}>
        {running ? (
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

export default React.memo(Play);
