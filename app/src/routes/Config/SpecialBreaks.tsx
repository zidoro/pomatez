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
  const { enableSpecialBreaks, specialBreaks } = useSelector(
    ({ settings, config }: AppStateTypes) => ({
      enableSpecialBreaks: settings.enableSpecialBreaks,
      specialBreaks: config.specialBreaks,
    })
  );

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
      <StyledSpecialBreakHeading disabled={!enableSpecialBreaks}>
        Special Breaks
      </StyledSpecialBreakHeading>

      <SpecialField
        time={specialBreaks.firstBreak?.time}
        duration={specialBreaks.firstBreak?.duration}
        disabled={!enableSpecialBreaks}
        onFieldSubmit={setFirstSpecialBreakCallback}
      />
      <SpecialField
        time={specialBreaks.secondBreak?.time}
        duration={specialBreaks.secondBreak?.duration}
        disabled={!enableSpecialBreaks}
        onFieldSubmit={setSecondSpecialBreakCallback}
      />
      <SpecialField
        time={specialBreaks.thirdBreak?.time}
        duration={specialBreaks.thirdBreak?.duration}
        disabled={!enableSpecialBreaks}
        onFieldSubmit={setThirdSpecialBreakCallback}
      />
      <SpecialField
        time={specialBreaks.fourthBreak?.time}
        duration={specialBreaks.fourthBreak?.duration}
        disabled={!enableSpecialBreaks}
        onFieldSubmit={setFourthSpecialBreakCallback}
      />
    </StyledConfigSpecialBreaks>
  );
};

export default React.memo(SpecialBreaks);
