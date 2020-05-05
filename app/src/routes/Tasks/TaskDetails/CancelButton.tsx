import React from "react";
import { StyledButtonNormal } from "styles";

type Props = {} & React.HTMLProps<HTMLButtonElement>;

const CancelButton: React.FC<Props> = ({ onClick }) => {
  return (
    <StyledButtonNormal type="reset" onClick={onClick}>
      Cancel
    </StyledButtonNormal>
  );
};

export default React.memo(CancelButton);
