import React from "react";
import { StyledConfig } from "styles";

import SpecialBreakMemo from "./SpecialBreaks";
import SliderSection from "./SliderSection";
import ConfigHeader from "./ConfigHeader";

export * from "./ConfigSlider";

export default function Config() {
  return (
    <StyledConfig>
      <ConfigHeader />
      <SliderSection />
      <SpecialBreakMemo />
    </StyledConfig>
  );
}
