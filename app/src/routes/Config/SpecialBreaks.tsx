import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AppStateTypes,
  setFirstSpecialBreak,
  setSecondSpecialBreak,
  setThirdSpecialBreak,
  setFourthSpecialBreak,
} from "store";
import { StyledConfigSpecialBreaks, StyledSpecialBreakHeading } from "styles";

import SpecialField from "./SpecialField";

const SpecialBreaks: React.FC = () => {
  const config = useSelector((state: AppStateTypes) => state.config);

  const dispath = useDispatch();

  const setFirstSpecialBreakCallback = useCallback(
    (values) => {
      dispath(setFirstSpecialBreak(values));
    },
    [dispath]
  );

  const setSecondSpecialBreakCallback = useCallback(
    (values) => {
      dispath(setSecondSpecialBreak(values));
    },
    [dispath]
  );

  const setThirdSpecialBreakCallback = useCallback(
    (values) => {
      dispath(setThirdSpecialBreak(values));
    },
    [dispath]
  );

  const setFourthSpecialBreakCallback = useCallback(
    (values) => {
      dispath(setFourthSpecialBreak(values));
    },
    [dispath]
  );

  return (
    <StyledConfigSpecialBreaks>
      <StyledSpecialBreakHeading>Special Breaks</StyledSpecialBreakHeading>

      <SpecialField
        fromTime={config.specialBreaks.firstBreak?.fromTime}
        toTime={config.specialBreaks.firstBreak?.toTime}
        duration={config.specialBreaks.firstBreak?.duration}
        onFieldSubmit={setFirstSpecialBreakCallback}
      />
      <SpecialField
        fromTime={config.specialBreaks.secondBreak?.fromTime}
        toTime={config.specialBreaks.secondBreak?.toTime}
        duration={config.specialBreaks.secondBreak?.duration}
        onFieldSubmit={setSecondSpecialBreakCallback}
      />
      <SpecialField
        fromTime={config.specialBreaks.thirdBreak?.fromTime}
        toTime={config.specialBreaks.thirdBreak?.toTime}
        duration={config.specialBreaks.thirdBreak?.duration}
        onFieldSubmit={setThirdSpecialBreakCallback}
      />
      <SpecialField
        fromTime={config.specialBreaks.fourthBreak?.fromTime}
        toTime={config.specialBreaks.fourthBreak?.toTime}
        duration={config.specialBreaks.fourthBreak?.duration}
        onFieldSubmit={setFourthSpecialBreakCallback}
      />
    </StyledConfigSpecialBreaks>
  );
};

export default React.memo(SpecialBreaks);
