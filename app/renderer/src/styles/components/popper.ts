import styled from "styled-components/macro";
import { themes } from "styles";

export const StyledPopper = styled.div``;

export const StyledPopperContent = styled.div`
	min-width: 12rem;
	min-height: 3.2rem;

	position: absolute;

	padding-bottom: 0.4rem;

	border-radius: 2px;
	background-color: var(--color-bg-popper);
	box-shadow: 0 2px 12px -2px var(--color-shadow-primary);

	cursor: auto;
	z-index: 10;
`;

export const StyledPopperHeader = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;

	padding: 0.4rem 0.8rem;
	margin-bottom: 0.4rem;

	position: relative;

	&::before {
		content: "";
		position: absolute;
		bottom: 0;
		left: 0;

		width: 100%;
		height: 1px;

		background-color: var(--color-border-secondary);
	}

	& > h4 {
		font-weight: 400;
		color: var(--color-body-text);
	}

	& > button {
		position: absolute;
		top: 0.2rem;
		right: 0.2rem;

		width: 2.4rem;
		height: 2.4rem;

		border: none;
		border-radius: 10rem;
		background: transparent;

		display: flex;
		align-items: center;
		justify-content: center;

		&:hover {
			color: ${themes.color.close};
		}

		& > svg {
			width: 1.8rem;
			height: 1.8rem;
			fill: currentColor;
		}
	}
`;
