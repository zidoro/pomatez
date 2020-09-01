import styled from "styled-components/macro";

export const StyledShortcutWrapper = styled.div`
	width: 100%;
	height: 4rem;

	display: grid;
	align-items: center;
	grid-template-columns: 1fr max-content;

	position: relative;

	&::after {
		content: "";
		position: absolute;
		bottom: 0;
		left: 0;

		width: 100%;
		height: 0.1rem;

		background-color: var(--color-border-secondary);
	}
`;

export const StyledShortcutName = styled.label`
	width: 100%;
	height: 100%;

	display: flex;
	align-items: center;
`;

export const StyledShortcutKey = styled.input`
	width: max-content;
	max-width: 15rem;
	padding: 0.4rem 0.8rem;

	text-align: center;
	text-transform: capitalize;

	border: none;
	border-radius: 0.3rem;
	background-color: var(--color-bg-secondary);
`;
