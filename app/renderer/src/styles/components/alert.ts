import styled from "styled-components/macro";

export const StyledAlert = styled.div`
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
`;
