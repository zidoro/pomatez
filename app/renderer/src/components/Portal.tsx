/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

type PortalProps = { id: string; children: React.ReactNode };

// https://medium.com/@jc_perez_ch/dynamic-react-portals-with-hooks-ddeb127fa516
const DynamicPortal: React.FC<PortalProps> = ({ id, children }) => {
  const el = useRef(
    document.getElementById(id) || document.createElement("div")
  );

  const [dynamic] = useState(!el.current.parentElement);

  useEffect(() => {
    if (dynamic) {
      el.current.id = id;
      document.body.appendChild(el.current);
    }

    return () => {
      if (dynamic && el.current.parentElement) {
        el.current.parentElement.removeChild(el.current);
      }
    };
  }, [id]);

  return ReactDOM.createPortal(children, el.current);
};

export default React.memo(DynamicPortal);
