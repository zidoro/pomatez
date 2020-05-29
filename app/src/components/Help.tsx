import React from "react";
import { StyledHelpWrapper, StyledHelpLabel, StyledHelpExternal } from "styles";
import SVG from "./SVG";

type Props = {
  label: string;
  link: string;
};

const Help: React.FC<Props> = ({ label, link }) => {
  return (
    <StyledHelpWrapper href={link} target="_blank" rel="noopener noreferrer">
      <StyledHelpLabel>
        {label}
        <StyledHelpExternal>
          <SVG name="external" />
        </StyledHelpExternal>
      </StyledHelpLabel>
    </StyledHelpWrapper>
  );
};

export default React.memo(Help);
