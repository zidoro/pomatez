import styled, { css } from "styled-components/macro";

type TimeWrapperProps = { disabled?: boolean };

export const StyledTimeWrapper = styled.div<TimeWrapperProps>`
	width: 100%;
	height: max-content;

	display: grid;
	row-gap: 0.4rem;

	& > input[type="time"] {
		color: ${(p) => p.disabled && "transparent"};
		background-color: ${(p) => p.disabled && "var(--color-bg-tertiary)"};
	}
`;

export const StyledTimeInput = styled.input<{ error?: boolean }>`
	width: 100%;

	padding: 0.6rem 0.8rem;

	border-radius: 2px;
	border: 1px solid var(--color-border-secondary);
	background-color: var(--color-bg-secondary);
	box-shadow: 0 0 0 0 rgba(var(--color-primary-rgb), 0.16);

	&::-webkit-datetime-edit-fields-wrapper {
		color: ${(p) => p.error && "var(--color-pink)"};
	}

	&::-webkit-datetime-edit-text {
		margin: 0 0.2rem;
	}

	&::-webkit-calendar-picker-indicator {
		margin-top: 1px;
	}

	&:focus {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.16);
	}

	&:focus ~ label {
		color: var(--color-primary);
	}

	${(p) =>
		p.error &&
		css`
			border-color: var(--color-pink) !important;
			box-shadow: 0 0 0 2px rgba(var(--color-pink-rgb), 0.16) !important;

			& ~ label {
				color: var(--color-pink) !important;
			}
		`}
`;

export const StyledTimeInputLabel = styled.label`
	grid-row: 1 / 2;

	font-size: 1.1rem;
	font-weight: 500;
	text-transform: capitalize;
`;
