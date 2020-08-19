import React from "react";
import { StyledDetailCloseButton } from "styles";
import { SVG } from "components";

type Props = {
  onClick?: () => void;
};

const CloseButton: React.FC<Props> = ({ onClick }) => {
  return (
    <StyledDetailCloseButton onClick={onClick}>
      <SVG name="close" />
    </StyledDetailCloseButton>
  );
};

export default React.memo(CloseButton);
