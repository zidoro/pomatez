import styled from "styled-components/macro";

export const StyledOptionList = styled.ul`
	list-style: none;
	text-transform: capitalize;

	& > li {
		width: 100%;
		height: 100%;

		padding: 0.4rem 0.8rem;

		display: flex;
		align-items: center;
		justify-content: flex-start;

		border: none;
		background: transparent;

		& > svg {
			width: 0.8em;
			height: 0.8em;
			fill: currentColor;

			margin-right: 8px;
		}
	}

	& > li > button {
		width: 100%;
		height: 100%;

		padding: 0.4rem 0.8rem;

		display: flex;
		align-items: center;
		justify-content: flex-start;

		border: none;
		background: transparent;

		&:hover {
			background-color: var(--color-bg-secondary);
		}

		& > svg {
			width: 0.8em;
			height: 0.8em;
			fill: currentColor;

			margin-right: 8px;
		}
	}
`;

export const StyledOptionPriority = styled.li`
	&:hover {
		color: var(--color-yellow);
	}
`;

export const StyledOptionDone = styled.li`
	&:hover {
		color: var(--color-green);
	}
`;

export const StyledOptionDelete = styled.li`
	&:hover {
		color: var(--color-pink);
	}
`;
