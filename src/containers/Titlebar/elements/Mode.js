import React from "react";
import PropTypes from "prop-types";

Mode.propTypes = {
  darkMode: PropTypes.bool,
  onClick: PropTypes.func
};

Mode.defaultProps = {
  darkMode: false
};

function Mode({ darkMode, onClick }) {
  return (
    <div className="mode" onClick={onClick}>
      {darkMode ? (
        <svg className="mode__icon">
          <use xlinkHref="#icon-moon" />
        </svg>
      ) : (
        <svg className="mode__icon">
          <use xlinkHref="#icon-sun" />
        </svg>
      )}
    </div>
  );
}

export default React.memo(Mode);
