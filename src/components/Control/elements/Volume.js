import React from "react";
import PropTypes from "prop-types";
import Ripple from "../../Ripple";

Volume.propTypes = {
  silent: PropTypes.bool,
  onClick: PropTypes.func
};

Volume.defaultProps = {
  silent: false
};

function Volume({ silent, onClick }) {
  return (
    <Ripple>
      <div className="volume" onClick={onClick}>
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
