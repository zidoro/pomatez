import styled from "styled-components/macro";
import { themes, StyledTextArea, StyledButtonDanger } from "styles";
import { StyledScrollbar } from "styles/mixins";

export const StyledDetailContainer = styled.div`
	position: absolute;
	top: 0;
	left: 0;

	width: 100%;
	height: 100%;

	z-index: 100;

	padding: 1.8rem 2rem;

	display: grid;
	row-gap: 1.2rem;
	align-content: start;
	align-items: start;
	grid-template-rows: max-content 1fr max-content;

	background-color: var(--color-bg-primary);

	overflow: hidden auto;

	${StyledScrollbar};

	animation: enter 180ms ease;

	@keyframes enter {
		0% {
			opacity: 0;
			margin-top: 1rem;
		}
		100% {
			opacity: 1;
			margin: 0;
		}
	}
`;

export const StyledDetailHeader = styled.textarea`
	width: calc(100% - 3.2rem);
	height: 2.3rem;

	resize: none;

	font-size: 1.5rem;
	font-weight: 500;

	color: var(--color-heading-text);

	border: none;
	background-color: transparent;
`;

export const StyledDetailCloseButton = styled.button`
	position: absolute;
	top: 1.5rem;
	right: 1.5rem;

	width: 2.4rem;
	height: 2.4rem;

	border: none;
	border-radius: 10rem;
	background: var(--color-bg-secondary);

	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		color: ${themes.color.close};
		background: var(--color-bg-tertiary);
	}

	& > svg {
		width: 1.8rem;
		height: 1.8rem;
		fill: currentColor;
	}
`;

export const StyledDescriptionWrappper = styled.div`
	display: grid;
	row-gap: 1rem;
`;

export const StyledDescriptionHeading = styled.h4`
	font-size: 1.4rem;
	font-weight: 400;
	color: var(--color-body-text);
	text-transform: capitalize;

	display: flex;
	align-items: center;
	justify-content: space-between;

	& > label {
		font-size: 1.3rem;
	}
`;

export const StyledDescriptionForm = styled.form`
	display: grid;
	row-gap: 1rem;
	column-gap: 0.8rem;
	grid-template-columns: repeat(4, 1fr);

	& > .md-previewer {
		grid-column: 1 / -1;
	}
`;

export const StyledDescriptionArea = styled(StyledTextArea)`
	grid-column: 1 / -1;

	min-height: 7.2rem;
	max-height: 15.4rem;
	background-color: var(--color-bg-secondary);
`;

export const StyledDescriptionFormatHelp = styled.a`
	grid-column: 3 / -1;
	justify-self: end;

	font-size: 1.2rem;
	font-weight: 400;
	color: var(--color-body-text);

	height: max-content;

	padding: 0 0.4rem;

	&:hover {
		color: var(--color-primary);
	}
`;

export const StyledDescriptionPreviewer = styled.div<{ hasValue?: boolean }>`
	width: 100%;
	min-height: 7.2rem;
	max-height: 20rem;

	padding: 0.5rem 1rem;
	padding-bottom: 1rem;

	display: grid;
	row-gap: 0.8rem;

	border-radius: 3px;
	border: 1px solid var(--color-border-primary);
	background-color: var(--color-bg-secondary);

	overflow: hidden auto;

	${StyledScrollbar};

	p {
		color: ${(p) => !p.hasValue && "var(--color-disabled-text)"};
	}

	h1 {
		font-size: 1.6rem;
	}

	h2 {
		font-size: 1.5rem;
	}

	h3 {
		font-size: 1.4rem;
	}

	h4 {
		font-size: 1.3rem;
	}

	h5 {
		font-size: 1.2rem;
	}

	h6 {
		font-size: 1.1rem;
	}

	ol {
		list-style: none;

		li {
			position: relative;
			counter-increment: item 1;

			&::before {
				content: counter(item) ".";
				text-align: left;
				color: var(--color-body-text);
				margin-right: 5px;
			}
		}
	}

	ul {
		list-style: none;
		position: relative;

		li::before {
			content: "";
			display: inline-block;
			width: 0.4em;
			height: 0.4em;
			margin-right: 8px;
			margin-bottom: 0.15em;
			border-radius: 50%;
			background-color: var(--color-body-text);
		}
	}

	del {
		color: var(--color-green);
	}

	a {
		color: var(--color-primary);
		&:hover {
			text-decoration: underline;
		}
	}

	code {
		padding: 0.1em 0.4em;

		line-height: 1.7;
		white-space: pre-wrap;

		border-radius: 3px;
		border: 1px solid var(--color-border-primary);
		background-color: var(--color-bg-code);
	}

	pre {
		padding: 0.1em 0.4em;

		color: var(--color-green);

		border-radius: 3px;
		border: 1px solid var(--color-border-primary);
		background-color: var(--color-bg-code);

		code {
			line-height: 1.7;
			white-space: pre-wrap;

			border: none;
			background: transparent;
		}
	}

	table {
		overflow: auto;
		border-spacing: 0;
		border-collapse: collapse;

		margin-top: 0.5rem;
		margin-bottom: 1rem;

		thead {
			tr {
				background-color: var(--color-bg-primary);
				border-top: 1px solid var(--color-border-primary);

				th {
					padding: 0.5rem 1rem;
					text-align: start !important;
					font-weight: 500;
				}
			}
		}

		tbody {
			tr {
				background-color: var(--color-bg-primary);
				border-top: 1px solid var(--color-border-primary);

				&:nth-child(odd) {
					background-color: var(--color-bg-tertiary);
				}

				td {
					padding: 0.5rem 1rem;
					text-align: start !important;
				}
			}
		}

		th,
		td {
			border: 1px solid var(--color-border-primary);
		}
	}

	blockquote {
		padding: 0 1em;
		color: rgba(var(--color-primary-rgb), 0.8);
		border-left: 0.25em solid rgba(var(--color-primary-rgb), 0.2);
	}

	dt {
		font-size: 1.4rem;
		font-weight: 500;
		font-style: italic;
		color: var(--color-heading-text);

		margin-top: 0.8rem;
	}

	dd {
		padding: 0 0.8rem;
		margin-bottom: 0.8rem;
	}

	hr {
		width: 100%;
		height: 1px;

		border: 1px solid rgba(var(--color-primary-rgb), 0.16);
	}
`;

export const StyledDeleteButton = styled(StyledButtonDanger)`
	margin-top: 0.4rem;
	margin-bottom: 2rem;
`;
