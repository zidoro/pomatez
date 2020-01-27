import React from "react";
import PropTypes from "prop-types";

Shortcut.propTypes = {
  shortcutName: PropTypes.string.isRequired,
  shortcutKey: PropTypes.string.isRequired
};

function Shortcut({ shortcutName, shortcutKey }) {
  return (
    <div className="shortcut">
      <label className="shortcut__name">{shortcutName}</label>
      <p className="shortcut__key">{shortcutKey}</p>
    </div>
  );
}

export default React.memo(Shortcut);
