import React from "react";
import PropTypes from "prop-types";
import Ripple from "../../Ripple";

Menu.propTypes = {
  showConfig: PropTypes.bool,
  onClick: PropTypes.func
};

Menu.defaultProps = {
  showConfig: false
};

function Menu({ showConfig, onClick }) {
  return (
    <Ripple>
      <div className="menu" onClick={onClick}>
        <div className="menu-box">
          <div
            className={`menu-box__icon menu-box__icon--1 ${
              showConfig ? "active" : ""
            }`}
          ></div>
          <div
            className={`menu-box__icon menu-box__icon--2 ${
              showConfig ? "active" : ""
            }`}
          ></div>
        </div>
      </div>
    </Ripple>
  );
}

export default Menu;
