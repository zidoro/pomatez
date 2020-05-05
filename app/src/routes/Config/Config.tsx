import React from "react";
import { RouteComponentProps } from "react-router-dom";

import { StyledConfig } from "styles";

import SpecialBreakMemo from "./SpecialBreaks";
import SliderSection from "./SliderSection";
import ConfigHeader from "./ConfigHeader";

type Props = {} & RouteComponentProps;

const Config: React.FC<Props> = () => {
  return (
    <StyledConfig>
      <ConfigHeader />
      <SliderSection />
      <SpecialBreakMemo />
    </StyledConfig>
  );
};

export default Config;
