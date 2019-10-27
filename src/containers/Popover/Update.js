import React, { useContext, useState, useEffect } from "react";
import { StoreContext, SET_UPDATING } from "../../models";
import { Modal } from "../../components";

const { ipcRenderer } = window.require("electron");

function Update() {
  const [progress, setProgress] = useState(0);

  const [{ updating }, dispatchUpdate] = useContext(StoreContext).update;

  useEffect(() => {
    let interval = setInterval(
      () => ipcRenderer.send("get-update-progress"),
      3000
    );
    ipcRenderer.send("get-update-progress");
    ipcRenderer.on("download-progress", (event, arg) => {
      setProgress(arg.percent);
    });

    return () => clearInterval(interval);
  }, [setProgress]);

  return (
    <Modal
      windowTitle="New updates available"
      onExit={() =>
        dispatchUpdate({
          type: SET_UPDATING,
          payload: false
        })
      }
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

export default Update;
