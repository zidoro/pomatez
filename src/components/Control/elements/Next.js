import React from "react";
import PropTypes from "prop-types";
import Ripple from "../../Ripple";

Next.propTypes = {
  onClick: PropTypes.func
};

function Next({ onClick }) {
  return (
    <Ripple>
      <div className="next" onClick={onClick}>
        <svg className="next__icon">
          <use xlinkHref="#icon-next" />
        </svg>
      </div>
    </Ripple>
  );
}

export default Next;
