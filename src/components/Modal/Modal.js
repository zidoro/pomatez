import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { animated, useTransition, config } from "react-spring";

import { Minimize, Exit } from "../../containers/Titlebar/elements";
import appIcon from "../../assets/icons/32x32.png";

Modal.propTypes = {
  windowTitle: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onExit: PropTypes.func.isRequired,
  isVisible: PropTypes.bool
};

Modal.defaultProps = {
  isVisible: false
};

function Modal({ windowTitle, children, onExit, isVisible }) {
  let portalId = "portal-root";
  let portalRoot = document.getElementById(portalId);

  if (!portalRoot) {
    portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", portalId);

    document.body.appendChild(portalRoot);
  }

  const modalTransition = useTransition(isVisible, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.stiff
  });

  const windowTransition = useTransition(isVisible, null, {
    from: { opacity: 0, transform: "translate(-50%, -50%)" },
    enter: { opacity: 1, transform: "translate(-50%, -80%)" },
    leave: { opacity: 0, transform: "translate(-50%, -50%)" },
    config: config.stiff
  });

  return ReactDOM.createPortal(
    modalTransition.map(
      ({ item, key, props }) =>
        item && (
          <animated.div className="modal" key={key} style={props}>
            {windowTransition.map(
              ({ item, key, props }) =>
                item && (
                  <animated.div className="window" key={key} style={props}>
                    <div className="window__titlebar">
                      <img
                        src={appIcon}
                        alt="application icon"
                        className="window__icon"
                      />
                      <div className="window__title">{windowTitle}</div>
                      <Minimize />
                      <Exit onClick={onExit} />
                    </div>
                    <div className="window__body">{children}</div>
                  </animated.div>
                )
            )}
          </animated.div>
        )
    ),
    portalRoot
  );
}

export default Modal;
