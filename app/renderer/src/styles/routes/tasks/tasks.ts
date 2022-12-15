import styled, { css } from "styled-components/macro";
import { StyledButtonNormal, StyledInput, StyledTextArea } from "styles";
import { themes } from "styles/themes";
import { StyledScrollbar } from "styles/mixins";

export const StyledTaskMain = styled.main`
	position: relative;
	overflow: hidden;
	flex: 1 1;
`;

export const StyledTaskContainer = styled.div`
	width: 100%;
	height: 100%;

	padding-left: 2rem;
	padding-right: 1.4rem;

	background-color: var(--color-bg-primary);

	animation: 320ms ${themes.enterFromLeft} ease;

	overflow: hidden scroll;

	${StyledScrollbar};
`;

export const StyledTaskWrapper = styled.div``;

export const StyledTaskSection = styled.section`
	width: 100%;
	height: calc(100% + 6.4rem);

	display: grid;
	align-content: start;

	padding-top: 1rem;

	& > div[data-rbd-draggable-context-id] {
		margin: 0.6rem 0;
	}
`;

type SectionTypes = {
	isDragging?: boolean;
	priority?: boolean;
};

export const StyledTaskSectionItem = styled.div<SectionTypes>`
	width: 100%;
	height: max-content;
	min-height: 7.8rem;

	padding: 1rem;

	border-radius: 1px;
	border-bottom: 2px solid
		${(p) => (p.priority && "var(--color-yellow)") || "var(--color-primary)"};

	background-color: var(--color-bg-task-list);
	box-shadow: 0 0px 0px var(--color-shadow-primary);

	transition: all 320ms ease-out;

	${(p) =>
		p.isDragging &&
		css`
			border-bottom-color: var(--color-bg-task-list);
			box-shadow: 0 2px 8px -2px rgba(0, 0, 0, 0.24);
		`};
`;

export const StyledTaskHeader = styled.header`
	display: grid;
	align-items: center;
	grid-template-columns: 1fr max-content;
	column-gap: 0.5rem;

	margin-bottom: 0.8rem;

	position: relative;

	&:hover > button,
	&:focus > button,
	&:active > button {
		color: var(--color-body-text);
	}
`;

export const StyledTaskHeading = styled.h3`
	padding: 0.6rem;

	font-size: 1.4rem;
	font-weight: 500;
	text-transform: uppercase;
	color: var(--color-heading-text);
`;

export const StyledTaskHeadeInput = styled(StyledInput)`
	padding: 0.5rem;

	height: max-content;

	font-size: 1.4rem;
	font-weight: 500;
	text-transform: uppercase;
	color: var(--color-heading-text);
`;

export const StyledTaskHeaderOption = styled.button`
	align-self: start;

	width: 3.2rem;
	min-height: 3.2rem;

	display: flex;
	align-items: center;
	justify-content: center;

	border: none;
	border-radius: 50%;
	background-color: transparent;

	transition: ${themes.transition};

	&:hover {
		color: var(--color-primary) !important;
		background-color: var(--color-border-primary);
	}

	& > svg {
		width: 1.4rem;
		height: 1.4rem;

		fill: currentColor;
	}
`;

export const StyledTaskStickySection = styled.div`
	position: sticky;
	bottom: 0;
	left: 0;

	width: 100%;
	height: max-content;
	min-height: 6.4rem;

	padding-top: 1.2rem;
	padding-bottom: 2rem;

	backdrop-filter: blur(12px);
	background-color: rgba(var(--color-bg-primary-rgb), 0.8);
`;

export const StyledTaskForm = styled.form`
	width: 100%;
	height: max-content;

	display: grid;
	row-gap: 1rem;
	column-gap: 0.8rem;
	grid-template-columns: repeat(2, 1fr);
`;

export const StyledTaskInput = styled(StyledInput)`
	grid-column: 1 / -1;
	padding: 0.6rem 1.2rem;
	background-color: transparent;
`;

export const StyledTaskTextArea = styled(StyledTextArea)`
	grid-column: 1 / -1;

	border-color: var(--color-border-input-primary);
	border-bottom-color: var(--color-border-input-secondary);
`;

export const StyledTaskCardCancel = styled(StyledButtonNormal)`
	border-color: var(--color-border-input-primary);
`;

export const StyledTaskDimmer = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;

	z-index: 100;

	/* padding: 1.6rem 2rem; */

	background-color: rgba(0, 0, 0, 0.16);
	backdrop-filter: blur(12px);
`;

export const StyledTaskDetailContainer = styled.div`
	position: sticky;
	top: 0;
	left: 0;

	width: 100%;
	height: 100%;

	padding: 0.4rem;

	background-color: var(--color-bg-detail-container);
	box-shadow: 0 4px 12px -4px var(--color-shadow-primary);
`;
