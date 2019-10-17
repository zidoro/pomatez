import React from "react";
import PropTypes from "prop-types";
import Ripple from "../../Ripple";
import { addClass } from "../../_helpers";

Volume.propTypes = {
  silent: PropTypes.bool,
  timerType: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

Volume.defaultProps = {
  silent: false
};

function Volume({ silent, timerType, onClick }) {
  return (
    <Ripple>
      <div className={`volume ${addClass(timerType)}`} onClick={onClick}>
        {silent ? (
          <svg className="volume__on">
            <use xlinkHref="#icon-volume-off" />
          </svg>
        ) : (
          <svg className="volume__off">
            <use xlinkHref="#icon-volume-on" />
          </svg>
        )}
      </div>
    </Ripple>
  );
}

export default Volume;
