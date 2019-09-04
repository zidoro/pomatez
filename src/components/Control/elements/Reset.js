import React from "react";
import Ripple from "../../Ripple";

function Reset({ Sprite, onClick }) {
  return (
    <Ripple>
      <div className="reset" onClick={onClick}>
        <svg className="reset__icon">
          <use xlinkHref={Sprite + "#icon-reset"} />
        </svg>
      </div>
    </Ripple>
  );
}

export default Reset;
