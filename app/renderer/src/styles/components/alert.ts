import styled from "styled-components/macro";
import { themes } from "styles";

export const StyledAlert = styled.div`
	width: 100%;
	min-height: 4rem;

	margin-bottom: 1rem;
	padding: 0.8rem;

	border-radius: 2px;
	border: 1px solid rgba(var(--color-primary-rgb), 0.2);
	background-color: rgba(var(--color-primary-rgb), 0.1);

	position: relative;

	header {
		h3 {
			color: rgba(var(--color-primary-rgb), 1);
			font-size: 1.4rem;
			margin-bottom: 0.2rem;
		}

		p {
			color: rgba(var(--color-primary-rgb), 0.8);
		}

		a {
			font-weight: 500;
			color: rgba(var(--color-primary-rgb), 1);

			&:hover {
				text-decoration: underline;
			}
		}
	}
`;

export const StyledAlertCloseButton = styled.button`
	position: absolute;
	top: 0.4rem;
	right: 0.4rem;

	width: 2.4rem;
	height: 2.4rem;

	color: rgba(var(--color-primary-rgb), 1);

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
`;
