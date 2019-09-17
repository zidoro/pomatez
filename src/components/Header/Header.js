import React from "react";
import PropTypes from "prop-types";

Header.propTypes = {
  title: PropTypes.string
};

Header.defaultProps = {
  title: "Header"
};

function Header({ title }) {
  return (
    <div className="header">
      <h3 className="header__title">{title}</h3>
    </div>
  );
}

export default Header;
