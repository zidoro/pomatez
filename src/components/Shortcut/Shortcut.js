import React from "react";
import PropTypes from "prop-types";

function Shortcut({ shortcutName, shortcutKey }) {
  return (
    <div className="shortcut">
      <label className="shortcut__name">{shortcutName}</label>
      <p className="shortcut__key">{shortcutKey}</p>
    </div>
  );
}

Shortcut.propTypes = {
  shortcutName: PropTypes.string,
  shortcutKey: PropTypes.string
};

export default Shortcut;
