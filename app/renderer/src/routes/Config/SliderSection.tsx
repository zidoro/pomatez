import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AppStateTypes,
  setStayFocus,
  setSessionRounds,
  setShorBreak,
  setLongBreak,
} from "store";
import { StyledConfigSliderSection } from "styles";
import ConfigSlider, { ConfigSliderProps } from "./ConfigSlider";

const SliderSection: React.FC = () => {
  const { stayFocus, shortBreak, longBreak, sessionRounds } =
    useSelector(({ config }: AppStateTypes) => ({
      stayFocus: config.stayFocus,
      shortBreak: config.shortBreak,
      longBreak: config.longBreak,
      sessionRounds: config.sessionRounds,
    }));

  const dispatch = useDispatch();

  const sliderRangeList: ConfigSliderProps[] = [
    {
      label: "Stay focus",
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
      label: "Short break",
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
      label: "Long break",
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
      label: "Session rounds",
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
