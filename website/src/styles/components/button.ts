import styled, { css } from "styled-components";
import { Link } from "react-scroll";
import media from "../media";

export const ButtonStyles = css`
	padding: 1rem 2rem;

	border: none;
	border-radius: 3px;

	display: flex;
	align-items: center;
	justify-content: center;

	font-weight: 500;

	transition: box-shadow 200ms ease;

	& > svg {
		width: 1.25em;
		height: 1.25em;

		margin-right: 0.8rem;
		margin-left: -0.4rem;

		fill: currentColor;
	}
`;

export const StyledButtonPrimary = styled.button`
	${ButtonStyles};

	color: white;
	background: var(--bg-btn-primary);

	&:hover {
		background: var(--bg-btn-primary-hover);
	}
`;

export const StyledDownloadButton = styled(Link)`
	${ButtonStyles};

	min-height: 4.8rem;
	min-width: 20rem;
	font-size: 1.6rem;
	padding: 1.2rem 2.4rem;

	color: white;
	border-radius: 100px;
	background: var(--bg-btn-primary);
	box-shadow: 0 4px 16px 0 var(--cl-shadow-secondary);

	&:hover {
		background: var(--bg-btn-primary-hover);
		box-shadow: 0 8px 40px 0 var(--cl-shadow-secondary);
	}

	& > svg {
		width: 2.2rem;
		height: 2.2rem;
		margin-right: 1rem;
		margin-left: -0.6rem;
	}

	${media.laptopSm} {
		min-width: 24rem;
	}
`;

export const StyledCTADownloader = styled(StyledDownloadButton)`
	min-width: 25rem;
`;

export const StyledGithubLink = styled.button`
	${ButtonStyles};

	min-height: 4.8rem;
	min-width: 25rem;
	font-size: 1.6rem;
	padding: 1.2rem 2.4rem;
	border-radius: 10rem;
	color: var(--cl-github-btn);
	background: var(--bg-github-btn);
	box-shadow: 0 4px 16px 0 var(--cl-shadow-secondary);

	&:hover {
		background: var(--bg-github-btn-hover);
		box-shadow: 0 8px 40px 0 var(--cl-shadow-secondary);
	}

	& > svg {
		width: 2.2rem;
		height: 2.2rem;
		margin-right: 1rem;
	}

	${media.laptopSm} {
		min-width: 24rem;
	}
`;
