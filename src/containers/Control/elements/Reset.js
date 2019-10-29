import React from "react";
import PropTypes from "prop-types";
import Ripple from "../../../components/Ripple";
import { addClass } from "../../_helpers";

Reset.propTypes = {
  timerType: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

function Reset({ timerType, onClick }) {
  return (
    <Ripple>
      <div className={`reset ${addClass(timerType)}`} onClick={onClick}>
        <svg className="reset__icon">
          <use xlinkHref="#icon-reset" />
        </svg>
      </div>
    </Ripple>
  );
}

export default React.memo(Reset);
