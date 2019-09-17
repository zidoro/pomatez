import React from "react";
import PropTypes from "prop-types";
import Ripple from "../../Ripple";

Play.propTypes = {
  isPlaying: PropTypes.bool,
  onClick: PropTypes.func
};

Play.defaultProps = {
  isPlaying: false
};

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
