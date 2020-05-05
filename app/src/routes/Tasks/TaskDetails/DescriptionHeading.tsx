import React from "react";
import { StyledDescriptionHeading } from "styles";
import { Checkbox } from "components";

type Props = {} & React.HTMLProps<HTMLInputElement>;

const DescriptionHeading: React.FC<Props> = ({ disabled, onChange }) => {
  return (
    <StyledDescriptionHeading>
      Description
      <Checkbox label="preview" disabled={disabled} onChange={onChange} />
    </StyledDescriptionHeading>
  );
};

export default React.memo(DescriptionHeading);
