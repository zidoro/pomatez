import React from "react";
import Portal from "./Portal";
import { StyledDimmer } from "styles";

type Props = {
  visible?: boolean;
};

export const Dimmer: React.FC<Props> = ({ visible, children }) => {
  return visible ? (
    <Portal id="portal">
      <StyledDimmer>{children}</StyledDimmer>
    </Portal>
  ) : null;
};

export default Dimmer;
