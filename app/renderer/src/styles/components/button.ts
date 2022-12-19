import styled, { css } from "styled-components/macro";
import { themes } from "styles/themes";

const ButtonStyles = css`
	position: relative;

	width: 100%;
	min-width: max-content;
	height: 3.6rem;

	padding: 0.6rem 1.2rem;

	display: flex;
	align-items: center;
	justify-content: center;

	font-weight: 500;

	border-radius: 3px;
	border: 0.1rem solid transparent;
	background-color: transparent;

	& > svg {
		width: 1.2rem;
		height: 1.2rem;

		margin-right: 1rem;

		fill: currentColor;
	}

	transition: ${themes.transition};
`;

export const StyledButton = styled.button`
	${ButtonStyles};
	color: var(--color-body-text);

	&:hover,
	&:focus {
		background-color: var(--color-border-primary);
	}
	&:active {
		background-color: var(--color-border-secondary);
	}
`;

export const StyledButtonNormal = styled.button`
	${ButtonStyles};
	color: var(--color-body-text);
	border-color: var(--color-border-primary);
	background-color: var(--color-bg-button-normal);
	box-shadow: 0 0 0 0 rgba(var(--color-primary-rgb), 0.16);

	&:hover,
	&:focus {
		color: var(--color-primary);
		border-color: var(--color-primary);
		box-shadow: 0 0 0 0.2rem rgba(var(--color-primary-rgb), 0.16);
	}

	&:active {
		color: var(--color-primary);
		border-color: var(--color-primary);
		box-shadow: 0 0 0 0.4rem rgba(var(--color-primary-rgb), 0.16);
	}
`;

export const StyledButtonPrimary = styled.button`
	${ButtonStyles};
	color: var(--color-primary-button);
	border-color: var(--color-primary);
	background-color: var(--color-primary);
	box-shadow: 0 0 0 0 rgba(var(--color-primary-rgb), 0.16);

	&:hover,
	&:focus {
		box-shadow: 0 0 0 0.2rem rgba(var(--color-primary-rgb), 0.16);
	}

	&:active {
		box-shadow: 0 0 0 0.4rem rgba(var(--color-primary-rgb), 0.16);
	}
`;

export const StyledButtonSecondary = styled.button`
	${ButtonStyles};
	color: var(--color-primary);
	border-color: var(--color-primary);
	box-shadow: 0 0 0 0 rgba(var(--color-primary-rgb), 0.16);

	&:hover,
	&:focus {
		box-shadow: 0 0 0 0.2rem rgba(var(--color-primary-rgb), 0.16);
	}

	&:active {
		box-shadow: 0 0 0 0.4rem rgba(var(--color-primary-rgb), 0.16);
	}
`;

export const StyledButtonDanger = styled.button`
	${ButtonStyles};
	color: var(--color-body-text);
	border-color: var(--color-border-primary);
	background-color: var(--color-bg-button-normal);
	box-shadow: 0 0 0 0 rgba(var(--color-pink-rgb), 0.16);

	&:hover,
	&:focus {
		color: var(--color-pink);
		border-color: var(--color-pink);
		box-shadow: 0 0 0 0.2rem rgba(var(--color-pink-rgb), 0.16);
	}

	&:active {
		color: var(--color-pink);
		border-color: var(--color-pink);
		box-shadow: 0 0 0 0.4rem rgba(var(--color-pink-rgb), 0.16);
	}
`;
