import React from "react";
import { StyledDeleteButton } from "styles";
import { SVG } from "components";

type Props = {
  onClick?: () => void;
};

const DeleteButton: React.FC<Props> = ({ onClick }) => {
  return (
    <StyledDeleteButton onClick={onClick}>
      <SVG name="trash" /> Delete Card
    </StyledDeleteButton>
  );
};

export default React.memo(DeleteButton);
