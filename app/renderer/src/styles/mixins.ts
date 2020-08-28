import { css } from "styled-components/macro";

export const StyledScrollbar = css`
	&:hover::-webkit-scrollbar {
		width: 0.6rem;
	}

	&:hover::-webkit-scrollbar-thumb {
		background-color: var(--color-disabled-text);
	}

	&:hover::-webkit-scrollbar-track {
		background-color: var(--color-bg-tertiary);
	}

	&::-webkit-scrollbar {
		width: 0.6rem;
	}

	&::-webkit-scrollbar-thumb {
		background-color: transparent;
	}

	&::-webkit-scrollbar-track {
		background-color: transparent;
	}
`;
