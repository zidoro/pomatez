import React from "react";
import PropTypes from "prop-types";
import Ripple from "../../Ripple";

Play.propTypes = {
  running: PropTypes.bool,
  onClick: PropTypes.func
};

Play.defaultProps = {
  running: false
};

function Play({ running, onClick }) {
  return (
    <Ripple>
      <div className="play" onClick={onClick}>
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

export default Play;
