import styled from "styled-components/macro";
import { themes } from "styles/themes";

export const StyledHeader = styled.header`
	width: 100%;
	height: max-content;

	margin-top: 1.6rem;
	margin-bottom: 0.4rem;

	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const StyledHeaderHeading = styled.h3`
	font-size: 1.5rem;
	text-transform: uppercase;
`;

type HeaderButtonTypes = { success?: boolean };

export const StyledHeaderButton = styled.button<HeaderButtonTypes>`
	height: 3.2rem;

	font-weight: 500;
	border: none;
	background-color: transparent;

	transition: ${themes.transition};

	&,
	&:hover {
		color: ${(p) => p.success && "var(--color-green)"} !important;
	}

	&:hover,
	&:focus {
		color: var(--color-primary);
	}
`;
