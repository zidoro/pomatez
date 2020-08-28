import styled from "styled-components/macro";
import { themes } from "styles/themes";

export const StyledTimer = styled.main`
	width: 100%;
	height: 100%;

	padding-top: 1.2rem;

	display: grid;
	grid-template-rows: 1fr;
	align-items: end;

	animation: enterFromBottom 160ms ease;

	@keyframes enterFromBottom {
		0% {
			opacity: 0;
			transform: translateY(1.2rem);
		}

		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}
`;

export const StyledPriorityCardContainer = styled.div`
	width: 100%;
	height: 5.6rem;

	padding: 0 1.6rem;
`;

export const StyledPriorityCardOption = styled.button`
	position: absolute;
	top: 0;
	right: 0;

	display: flex;
	align-items: center;
	justify-content: center;

	padding: 0.4rem 0rem;
	margin: 0.4rem 0.6rem;

	color: var(--color-body-text);

	border: none;
	background-color: transparent;

	transition: ${themes.transition};

	&:hover,
	&:focus {
		color: var(--color-primary);
	}

	& > svg {
		width: 1.6rem;
		height: 1.6rem;
		fill: currentColor;
	}
`;

export const StyledPriorityCardWrapper = styled.div`
	position: relative;

	width: 100%;
	height: 100%;

	display: flex;
	align-items: flex-start;
	justify-content: space-between;

	padding: 0.5rem 1rem;
	padding-bottom: 0.6rem;

	border-radius: 3px;
	border: 1px solid var(--color-border-secondary);
	background-color: var(--color-bg-secondary);
`;

export const StyledPriorityCardHeader = styled.header``;

export const StyledPriorityCardHeading = styled.h4`
	font-size: 1.5rem;
	font-weight: 500;
	color: var(--color-heading-text);
`;

export const StyledPriorityCardDescription = styled.p`
	color: var(--color-body-text);
`;
