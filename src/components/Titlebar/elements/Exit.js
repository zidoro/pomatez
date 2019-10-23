import React from "react";
import PropTypes from "prop-types";

Exit.propTypes = {
  onClick: PropTypes.func
};

function Exit({ onClick }) {
  return (
    <div className="exit" onClick={onClick}>
      <svg className="exit__icon">
        <use xlinkHref="#icon-exit" />
      </svg>
    </div>
  );
}

export default Exit;
