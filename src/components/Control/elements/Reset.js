import React from "react";
import Ripple from "../../Ripple";

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
