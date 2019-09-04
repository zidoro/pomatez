import React from "react";
import Ripple from "../../Ripple";

function Next({ Sprite, onClick }) {
  return (
    <Ripple>
      <div className="next" onClick={onClick}>
        <svg className="next__icon">
          <use xlinkHref={Sprite + "#icon-next"} />
        </svg>
      </div>
    </Ripple>
  );
}

export default Next;
