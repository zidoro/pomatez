import styled, { css } from "styled-components/macro";
import { LONG_BREAK, SHORT_BREAK, SPECIAL_BREAK } from "store";
import { ProgressSVG } from "assets/icons";

export type ProgressProps = { offset: number; animate: "true" | "false" };

export const StyledCounterProgress = styled(ProgressSVG)<ProgressProps>`
	#progress {
		stroke: ${(p) =>
			(p.type === SHORT_BREAK && "var(--color-green)") ||
			(p.type === LONG_BREAK && "var(--color-yellow)") ||
			(p.type === SPECIAL_BREAK && "var(--color-yellow)") ||
			"var(--color-primary)"};
		stroke-width: 0.6rem;
		stroke-linecap: round;
		stroke-dasharray: 674px;
		stroke-dashoffset: ${(p) => `${p.offset}px`};
		transition: ${(p) => p.animate === "true" && "stroke-dashoffset 1s linear"};
	}
`;

export const StyledCounterWrapper = styled.div`
	width: 100%;
	height: 100%;

	position: absolute;
	top: 0;
	left: 0;

	display: grid;
	align-content: center;
	justify-content: center;
	justify-items: center;

	margin-top: -0.8rem;
`;

type CounterContainerProps = {
	fullscreen?: boolean;
};

export const StyledCounterContainer = styled.div<CounterContainerProps>`
  width: 100%;
  height: 100%;

  padding: 2rem;

  background-color: var(--color-bg-primary);

  position: relative;

  ${(p) =>
		p.fullscreen &&
		css`
			position: fixed !important;
			top: 0 !important;
			left: 0 !important;
			right: 0 !important;
			bottom: 0 !important;
			z-index: 1000 !important;

			&::before,
			${StyledCounterProgress} {
				margin-top: -2.3rem !important;
			}

			${StyledCounterWrapper} {
				margin-top: -3.1rem !important;
			}
		`}

  &::before,
  ${StyledCounterProgress} {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotateY(-180deg) rotateZ(-90deg);

    width: 22rem;
    height: 22rem;
  }

  &::before {
    content: "";

    border-radius: 50%;
    border: 6px solid var(--color-border-primary);
  }

	&.compact {
		padding: 16px;
		display: flex;
		flex: 0;
		&::before {
			display: none;
		}
	}
`;

export const StyledCounterType = styled.div`
	color: #666;
	text-align: center;
	padding-bottom: 0.8rem;
`;

type TimerProps = { type?: string };

export const StyledCounterTimer = styled.h3<TimerProps>`
	font-size: 4rem;
	font-weight: 400;
	color: ${(p) =>
		(p.type === SHORT_BREAK && "var(--color-green)") ||
		(p.type === LONG_BREAK && "var(--color-yellow)") ||
		(p.type === SPECIAL_BREAK && "var(--color-yellow)") ||
		"var(--color-primary)"};

	line-height: 1.2;

	width: 20rem;

	display: grid;
	align-items: center;
	justify-items: start;
	grid-template-columns: 1fr max-content 1fr;
	column-gap: 0.8rem;

	& > span:first-of-type {
		justify-self: end;
	}

	&.compact {
		font-size: 2.5rem;
		width: unset;
		display: flex;
		gap: 0.25rem;
	}
`;

export const StyledCounterLabel = styled.p`
	font-size: 1.8rem;
	text-transform: capitalize;
`;
