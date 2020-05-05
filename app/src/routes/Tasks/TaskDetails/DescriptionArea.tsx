import React from "react";
import { StyledDescriptionArea } from "styles";

type Props = {} & React.HTMLProps<HTMLTextAreaElement>;

const DescriptionArea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ value, onChange }, ref) => {
    return (
      <StyledDescriptionArea
        placeholder="Add a more detailed description..."
        value={value}
        onChange={onChange}
        ref={ref}
      />
    );
  }
);

export default React.memo(DescriptionArea);
