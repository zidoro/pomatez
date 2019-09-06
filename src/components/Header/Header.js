import React from "react";
import PropTypes from "prop-types";

function Header({ title }) {
  return (
    <div className="header">
      <h3 className="header__title">{title}</h3>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string
};

export default Header;
