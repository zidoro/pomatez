import styled, { css } from "styled-components/macro";
import { StyledButton, StyledButtonPrimary } from "styles";

export const StyledCardText = styled.p<{ done?: boolean }>`
	min-height: 2.4rem;
	margin-right: 5px;

	display: flex;
	align-items: center;

	${(p) =>
		p.done &&
		css`
			color: var(--color-green);
			text-decoration: line-through;
		`}
`;

export const StyledCardTextArea = styled.textarea`
	resize: none;
	border: none;
	background-color: transparent;

	flex-grow: 2;
	margin-right: 5px;
`;

const ButtonCardStyles = css`
	align-self: start;

	width: 2.4rem;
	min-height: 2.4rem;
	height: max-content;

	padding: 0;

	display: flex;
	align-items: center;
	justify-content: center;

	border: none;
	border-radius: 3px;

	& > svg {
		margin: 0;
	}
`;

export const StyledCardActionWrapper = styled.div`
	width: max-content;
	height: 100%;

	display: flex;
	align-items: center;
`;

export const StyledCardEditButton = styled(StyledButton)`
	${ButtonCardStyles};
	color: transparent;
	background-color: transparent;
`;

export const StyledCardDeleteButton = styled(StyledButton)`
	${ButtonCardStyles};
	color: transparent;
	background-color: transparent;

	&:hover {
		color: var(--color-pink) !important;
	}
`;

export const StyledCardSaveButton = styled(StyledButtonPrimary)`
	${ButtonCardStyles};
	box-shadow: 0 2px 4px -2px var(--color-shadow-primary);
`;

type CardProps = {
	isDragging?: boolean;
	focused?: boolean;
};

export const StyledCard = styled.div<CardProps>`
	width: 100%;
	height: 3.6rem;
	height: max-content;

	padding: 0.5rem;
	padding-left: 1rem;
	margin-bottom: 0.8rem;

	display: flex;
	align-items: flex-start;
	justify-content: space-between;

	border-radius: 3px;
	border: 1px solid var(--color-border-input-primary);
	border-bottom-color: var(--color-border-input-secondary);
	background-color: var(--color-bg-task-card);

	transition: box-shadow 320ms ease-out, background-color 320ms ease-out,
		border-color 320ms ease-out;

	${(p) =>
		(p.isDragging &&
			css`
				border-color: var(--color-bg-task-card-focus) !important;
				background-color: var(--color-bg-task-card-focus) !important;
				box-shadow: 0 2px 8px -2px var(--color-shadow-primary);
			`) ||
		(p.focused &&
			css`
				border-color: var(--color-bg-task-card-focus) !important;
				background-color: var(--color-bg-task-card-focus) !important;
				box-shadow: 0 2px 4px -2px var(--color-shadow-primary);
			`)}

	&:hover,
  &:focus,
  &:active {
		background-color: var(--color-bg-task-card-hover);

		${StyledCardEditButton}, ${StyledCardDeleteButton} {
			color: var(--color-body-text);
		}
	}
`;

export const StyledCardWrapper = styled.div``;
