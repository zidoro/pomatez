import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "hooks/storeHooks";
import {
  setFirstSpecialBreak,
  setSecondSpecialBreak,
  setThirdSpecialBreak,
  setFourthSpecialBreak,
} from "store";
import {
  StyledConfigSpecialBreaks,
  StyledSpecialBreakHeading,
} from "styles";

import SpecialField from "./SpecialField";

const SpecialBreaks: React.FC = () => {
  const { t } = useTranslation();
  const config = useAppSelector((state) => state.config);

  const dispath = useAppDispatch();

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
      <StyledSpecialBreakHeading>
        {t("config.specialBreaks")}
      </StyledSpecialBreakHeading>

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
