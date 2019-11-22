import React, { useState, useEffect } from "react";
import { ipcRenderer } from "window-electron";

import { Modal } from "../../common";
import PropTypes from "prop-types";

Update.propTypes = {
  updating: PropTypes.bool.isRequired,
  onExit: PropTypes.func.isRequired
};

function Update({ updating, onExit }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    ipcRenderer.on("download-progress", (event, arg) => {
      setProgress(arg.percent);
    });
  }, [setProgress]);

  return (
    <Modal
      windowTitle="New updates available"
      onExit={onExit}
      isVisible={updating}
    >
      <div className="update">
        <div className="update__label">
          <h3 className="update__label--heading">Updating now...</h3>
          <p className="update__label--indicator">{progress}%</p>
        </div>
        <div className="update__progress">
          <div className="update__progress--base"></div>
          <div
            className="update__progress--indicator"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </Modal>
  );
}

export default React.memo(Update);
