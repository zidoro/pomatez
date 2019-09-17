import React from "react";
import PropTypes from "prop-types";
import Ripple from "../../Ripple";

Volume.propTypes = {
  isSoundON: PropTypes.bool,
  onClick: PropTypes.func
};

Volume.defaultProps = {
  isSoundON: false
};

function Volume({ isSoundON, onClick }) {
  return (
    <Ripple>
      <div className="volume" onClick={onClick}>
        {isSoundON ? (
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
