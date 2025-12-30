import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "hooks/storeHooks";
import {
  setStayFocus,
  setSessionRounds,
  setShorBreak,
  setLongBreak,
} from "store";
import { StyledConfigSliderSection } from "styles";
import ConfigSlider, { ConfigSliderProps } from "./ConfigSlider";

const SliderSection: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { stayFocus, shortBreak, longBreak, sessionRounds } =
    useAppSelector(({ config }) => ({
      stayFocus: config.stayFocus,
      shortBreak: config.shortBreak,
      longBreak: config.longBreak,
      sessionRounds: config.sessionRounds,
    }));

  const sliderRangeList: ConfigSliderProps[] = [
    {
      label: t("config.stayFocused"),
      valueType: "mins",
      minValue: 1,
      maxValue: 120,
      value: stayFocus,
      handleConfigChange: useCallback(
        (value) => dispatch(setStayFocus(parseInt(value))),
        [dispatch]
      ),
    },
    {
      label: t("config.shortBreak"),
      valueType: "mins",
      minValue: 1,
      maxValue: 60,
      value: shortBreak,
      handleConfigChange: useCallback(
        (value) => dispatch(setShorBreak(parseInt(value))),
        [dispatch]
      ),
    },
    {
      label: t("config.longBreak"),
      valueType: "mins",
      minValue: 1,
      maxValue: 60,
      value: longBreak,
      handleConfigChange: useCallback(
        (value) => dispatch(setLongBreak(parseInt(value))),
        [dispatch]
      ),
    },
    {
      label: t("config.sessionRounds"),
      valueType: "rounds",
      minValue: 1,
      maxValue: 10,
      value: sessionRounds,
      handleConfigChange: useCallback(
        (value) => dispatch(setSessionRounds(parseInt(value))),
        [dispatch]
      ),
    },
  ];

  return (
    <StyledConfigSliderSection>
      {sliderRangeList.map(
        (
          {
            label,
            valueType,
            minValue,
            maxValue,
            value,
            handleConfigChange,
          },
          index
        ) => (
          <ConfigSlider
            label={label}
            value={value}
            minValue={minValue}
            valueType={valueType}
            maxValue={maxValue}
            handleConfigChange={handleConfigChange}
            key={index}
          />
        )
      )}
    </StyledConfigSliderSection>
  );
};

export default React.memo(SliderSection);
