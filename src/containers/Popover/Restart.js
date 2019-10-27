import React, { useContext } from "react";
import { StoreContext, SET_DOWNLOAD_COMPLETED } from "../../models";
import { Modal } from "../../components";

const { ipcRenderer } = window.require("electron");

function Restart() {
  const [{ downloadCompleted }, dispatchUpdate] = useContext(
    StoreContext
  ).update;
  return (
    <Modal
      windowTitle="Updates Completed"
      onExit={() =>
        dispatchUpdate({
          type: SET_DOWNLOAD_COMPLETED,
          payload: false
        })
      }
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
            onClick={() =>
              dispatchUpdate({
                type: SET_DOWNLOAD_COMPLETED,
                payload: false
              })
            }
          >
            Restart Later
          </button>
          <button
            className="restart__cta--now-btn btn btn--primary"
            onClick={() => {
              ipcRenderer.send("restart-app");
              dispatchUpdate({
                type: SET_DOWNLOAD_COMPLETED,
                payload: false
              });
            }}
          >
            Restart Now
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default Restart;
