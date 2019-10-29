import React from "react";
import PropTypes from "prop-types";

Menu.propTypes = {
  showConfig: PropTypes.bool,
  onClick: PropTypes.func
};

Menu.defaultProps = {
  showConfig: false
};

function Menu({ showConfig, onClick }) {
  return (
    <div className={`menu ${showConfig ? "active" : ""}`} onClick={onClick}>
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
  );
}

export default React.memo(Menu);
