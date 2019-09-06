import React from "react";
import Ripple from "../../Ripple";

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
