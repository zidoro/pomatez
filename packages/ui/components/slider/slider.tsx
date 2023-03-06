import { memo } from "react";
import { HStack, VStack } from "../stack";
import { Text } from "../text";
import {
  StyledSliderRange,
  StyledSliderRoot,
  StyledSliderThumb,
  StyledSliderTrack,
} from "./slider.styled";

export type SliderProps = {
  /**
   * The header of the slider.
   */
  header: {
    /**
     * The title of the slider.
     */
    label: string;
    /**
     * The value of the slider with a unit.
     */
    valueInterpreter: string;
  };
  /**
   * The minimum value of the slider.
   * @default 0
   */
  min?: number;
  /**
   * The maximum value of the slider.
   * @default 120
   */
  max?: number;
  /**
   * The granularity that the value must adhere to.
   * @default 1
   */
  step?: number;
  /**
   * The current value of the slider.
   * @default 0
   */
  value?: number;
  /**
   * The default value of the slider.
   */
  defaultValue?: number;
  /**
   * Event handler called when the value changes.
   */
  onValueChange?(value: number): void;
  /**
   * Event handler called when the value changes at the end of an interaction.
   */
  onValueCommit?(value: number): void;
};

const defaultProps: Partial<SliderProps> = {
  min: 0,
  max: 120,
  step: 1,
  defaultValue: 60,
};

export const Slider = ({
  header,
  value,
  min = 0,
  max = 120,
  step = 1,
  defaultValue = 60,
  onValueChange,
  onValueCommit,
  ...rest
}: SliderProps) => {
  const getValidValue = (value?: number) => {
    if (value) return [value];
  };

  return (
    <VStack
      as="form"
      spacing="$1"
      sx={{ width: "100%", height: "max-content" }}
    >
      <HStack justify="space-between" sx={{ width: "100%" }}>
        <Text>{header.label}</Text>
        <Text>{header.valueInterpreter}</Text>
      </HStack>

      <StyledSliderRoot
        min={min}
        max={max}
        step={step}
        value={getValidValue(value)}
        defaultValue={getValidValue(defaultValue)}
        onValueChange={(values) => {
          onValueChange?.(values[0]);
        }}
        onValueCommit={(values) => {
          onValueCommit?.(values[0]);
        }}
        {...rest}
      >
        <StyledSliderTrack>
          <StyledSliderRange />
        </StyledSliderTrack>

        <StyledSliderThumb />
      </StyledSliderRoot>
    </VStack>
  );
};

const MemoSlider = memo(Slider);

MemoSlider.displayName = "Slider";

export default MemoSlider;
