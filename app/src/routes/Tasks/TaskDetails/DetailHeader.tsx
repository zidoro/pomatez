import React from "react";
import { StyledDetailHeader } from "styles";

type Props = {} & React.HTMLProps<HTMLTextAreaElement>;

const DetailHeader = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ onBlur }, ref) => {
    return <StyledDetailHeader ref={ref} onBlur={onBlur} />;
  }
);

export default React.memo(DetailHeader);
