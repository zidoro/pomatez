import React from "react";
import { StyledAlert, StyledAlertCloseButton } from "styles";
import SVG from "./SVG";

type Props = {
  heading: string;
  body: string | React.ReactNode;
  onClose?: () => void;
};

export const Alert: React.FC<Props> = ({ heading, body, onClose }) => {
  return (
    <StyledAlert>
      <header>
        <h3>{heading}</h3>
        <p>{body}</p>
      </header>
      <StyledAlertCloseButton onClick={onClose}>
        <SVG name="close" />
      </StyledAlertCloseButton>
    </StyledAlert>
  );
};

export default Alert;
