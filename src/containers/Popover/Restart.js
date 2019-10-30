import React from "react";
import { Modal } from "../../components";
import PropTypes from "prop-types";

Restart.propTypes = {
  onExit: PropTypes.func.isRequired
};

function Restart({ downloadCompleted, onExit }) {
  return (
    <Modal
      windowTitle="Updates Completed"
      onExit={onExit}
      isVisible={downloadCompleted}
    >
      <div className="restart">
        <div className="restart__header">
          <h3 className="restart__header--heading">Successfully updated</h3>
          <p className="restart__header--sub-heading">
            You may now restart the application.
          </p>
        </div>
        <div className="restart__cta">
          <button
            className="restart__cta--later-btn btn btn--secondary"
            onClick={onExit}
          >
            Restart Later
          </button>
          <button
            className="restart__cta--now-btn btn btn--primary"
            onClick={() => {
              const { ipcRenderer } = window.require("electron");
              ipcRenderer.send("restart-app");
              onExit();
            }}
          >
            Restart Now
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default React.memo(Restart);
