import React from "react";
import { StyledButtonPrimary } from "styles";

type Props = {};

const SubmitButton: React.FC<Props> = () => {
  return <StyledButtonPrimary type="submit">Save</StyledButtonPrimary>;
};

export default React.memo(SubmitButton);
