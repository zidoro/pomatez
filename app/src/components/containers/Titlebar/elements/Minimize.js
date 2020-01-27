import React from "react";
import PropTypes from "prop-types";

Minimize.propTypes = {
  onClick: PropTypes.func
};

function Minimize({ onClick }) {
  return (
    <div className="minimize" onClick={onClick}>
      <svg className="minimize__icon">
        <use xlinkHref="#icon-minimize" />
      </svg>
    </div>
  );
}

export default React.memo(Minimize);
