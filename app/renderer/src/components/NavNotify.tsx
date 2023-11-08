import React from "react";
import styled from "styled-components/macro";

/**
 * This is very roughly positioned atm though adding divs around the nav items breaks the layout
 */
const NavNotify: React.FC = styled.div`
  background: var(--color-primary);
  width: 8px;
  height: 8px;
  top: 0;
  right: 0;
  position: absolute;
  transform: translate(50%, -50%);
  border-radius: 50%;
`;

export default NavNotify;
