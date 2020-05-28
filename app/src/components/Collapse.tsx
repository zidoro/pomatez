import React, { useState } from "react";
import {
  StyledCollapse,
  StyledCollapseHeading,
  StyledCollapseContent,
} from "styles";
import { SVG } from "components";

type Props = {
  children?: React.ReactNode;
};

const Collapse: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const toggleCollapse = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <StyledCollapse>
      <StyledCollapseHeading open={open} onClick={toggleCollapse}>
        Notification Property
        <SVG name="chevron-down" />
      </StyledCollapseHeading>
      {open && <StyledCollapseContent>{children}</StyledCollapseContent>}
    </StyledCollapse>
  );
};

export default React.memo(Collapse);
