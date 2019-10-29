import React from "react";
import PropTypes from "prop-types";
import Ripple from "../../../components/Ripple";
import { addClass } from "../../_helpers";

Next.propTypes = {
  timerType: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

function Next({ timerType, onClick }) {
  return (
    <Ripple>
      <div className={`next ${addClass(timerType)}`} onClick={onClick}>
        <svg className="next__icon">
          <use xlinkHref="#icon-next" />
        </svg>
      </div>
    </Ripple>
  );
}

export default React.memo(Next);
