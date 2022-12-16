import styled from "styled-components/macro";
import { themes } from "../themes";

export const StyledRangeContainer = styled.div`
  width: 100%;
  height: max-content;

  display: grid;
  row-gap: 0.8rem;

  padding: 0.8rem 0;
`;

export const StyledRangeWrapper = styled.div`
  width: 100%;
  height: 0.6rem;

  position: relative;
`;

type FillTypes = { value: number; minValue: number; maxValue: number };

export const StyledRangeSliderFill = styled.div<FillTypes>`
  position: absolute;
  top: 0;
  left: 0;

  width: ${({ value, minValue, maxValue }) => {
    if (maxValue >= 60 && value <= 6) {
      const finalValue =
        (value - minValue) / (maxValue - minValue - value);

      if (value <= 3) return `calc((${finalValue} * 100%) + 16px)`;

      return `calc(${finalValue} * 100%)`;
    }

    return `calc((${value - minValue} / ${
      maxValue - minValue
    }) * 100%)`;
  }};
  height: 0.6rem;

  border-radius: 10rem;
  background-color: var(--color-primary);

  z-index: 1;
`;

export const StyledRangeSlider = styled.input`
  width: 100%;
  height: 0.6rem;

  appearance: none;
  border-radius: 0.3rem;
  background-color: var(--color-border-primary);

  position: absolute;
  top: 0;
  left: 0;

  &::-webkit-slider-thumb {
    appearance: none;

    width: 2rem;
    height: 1.2rem;

    border-radius: 10rem;
    border: 1px solid var(--color-primary);
    background-color: var(--color-bg-slider-thumb);

    box-shadow: 0 0 0 0 rgba(var(--color-primary-rgb), 0.16);

    transition: box-shadow 160ms ${themes.easing};

    cursor: pointer;

    position: relative;
    z-index: 2;

    &:hover {
      box-shadow: 0 0 0 0.4rem rgba(var(--color-primary-rgb), 0.16);
    }
  }

  &:focus::-webkit-slider-thumb {
    box-shadow: 0 0 0 0.4rem rgba(var(--color-primary-rgb), 0.16);
  }

  &:active::-webkit-slider-thumb {
    box-shadow: 0 0 0 0.6rem rgba(var(--color-primary-rgb), 0.24);
  }
`;

export const StyledRangeInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledRangeInputLabel = styled.p``;

export const StyledRangeInputValue = styled.p``;
