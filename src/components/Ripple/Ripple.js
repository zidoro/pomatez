import React from "react";
import ReactRipples from "react-ripples";

function Ripple({ children }) {
  return (
    <ReactRipples color="hsla(204, 100%, 50%, 0.1)">{children}</ReactRipples>
  );
}

export default Ripple;
