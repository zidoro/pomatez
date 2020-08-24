import React from "react";
import styled from "styled-components/macro";

const Styled = {
	AlertContainer: styled.div`
		width: 100%;
		min-height: 4rem;

		margin-bottom: 1rem;
		padding: 0.8rem;

		border-radius: 2px;
		border: 1px solid rgba(var(--color-primary-rgb), 0.2);
		background-color: rgba(var(--color-primary-rgb), 0.1);

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
	`,
};

type Props = {
	heading: string;
	body: string | React.ReactNode;
};

export const Alert: React.FC<Props> = ({ heading, body }) => {
	return (
		<Styled.AlertContainer>
			<header>
				<h3>{heading}</h3>
				<p>{body}</p>
			</header>
		</Styled.AlertContainer>
	);
};

export default Alert;
