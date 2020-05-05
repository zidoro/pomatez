import React from "react";
import { StyledHeader, StyledHeaderHeading } from "styles";

type Props = {
  heading: string;
  children?: React.ReactNode;
};

const Header: React.FC<Props> = ({ heading, children }) => {
  return (
    <StyledHeader>
      <StyledHeaderHeading>{heading}</StyledHeaderHeading>
      {children}
    </StyledHeader>
  );
};

export default React.memo(Header);
