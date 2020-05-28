import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AppStateTypes,
  setFirstSpecialBreak,
  setSecondSpecialBreak,
  setThirdSpecialBreak,
  setFourthSpecialBreak,
  SettingTypes,
} from "store";
import { StyledConfigSpecialBreaks, StyledSpecialBreakHeading } from "styles";

import SpecialField from "./SpecialField";

const SpecialBreaks: React.FC = () => {
  const config = useSelector((state: AppStateTypes) => state.config);

  const settings: SettingTypes = useSelector(
    (state: AppStateTypes) => state.settings
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
      <StyledSpecialBreakHeading disabled={!settings.enableSpecialBreaks}>
        Special Breaks
      </StyledSpecialBreakHeading>

      <SpecialField
        time={config.specialBreaks.firstBreak?.time}
        duration={config.specialBreaks.firstBreak?.duration}
        disabled={!settings.enableSpecialBreaks}
        onFieldSubmit={setFirstSpecialBreakCallback}
      />
      <SpecialField
        time={config.specialBreaks.secondBreak?.time}
        duration={config.specialBreaks.secondBreak?.duration}
        disabled={!settings.enableSpecialBreaks}
        onFieldSubmit={setSecondSpecialBreakCallback}
      />
      <SpecialField
        time={config.specialBreaks.thirdBreak?.time}
        duration={config.specialBreaks.thirdBreak?.duration}
        disabled={!settings.enableSpecialBreaks}
        onFieldSubmit={setThirdSpecialBreakCallback}
      />
      <SpecialField
        time={config.specialBreaks.fourthBreak?.time}
        duration={config.specialBreaks.fourthBreak?.duration}
        disabled={!settings.enableSpecialBreaks}
        onFieldSubmit={setFourthSpecialBreakCallback}
      />
    </StyledConfigSpecialBreaks>
  );
};

export default React.memo(SpecialBreaks);
