import React from "react";
import PropTypes from "prop-types";
import Ripple from "../../Ripple";

Reset.propTypes = {
  onClick: PropTypes.func
};

function Reset({ onClick }) {
  return (
    <Ripple>
      <div className="reset" onClick={onClick}>
        <svg className="reset__icon">
          <use xlinkHref="#icon-reset" />
        </svg>
      </div>
    </Ripple>
  );
}

export default Reset;
