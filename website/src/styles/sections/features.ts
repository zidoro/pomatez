import styled, { css } from "styled-components";
import { SectionStyle, SectionContentStyle } from "../mixins";
import media from "../media";

export const StyledFeatures = styled.section`
	${SectionStyle};
`;

export const StyledFeatureContent = styled.div`
	${SectionContentStyle};
`;

export const StyledFeatureContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	column-gap: 2rem;

	${media.tabletMd} {
		grid-template-columns: 1fr;
	}
`;

export const StyledStickyContainer = styled.div`
	${media.tabletMd} {
		display: none;
	}
`;

export const StyledFeaturedImageWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	justify-items: end;

	margin-right: 4rem;

	position: sticky;
	top: 8rem;

	${media.laptopSm} {
		margin-right: 2rem;
	}
`;

export const StyledFeaturedImage = styled.div`
	width: 34rem;
	height: 48rem;
	background-color: var(--bg-primary);
	box-shadow: 0 20px 40px var(--cl-shadow-primary);

	${media.laptopXs} {
		width: 30rem;
		height: max-content;
	}

	${media.tabletLg} {
		width: 26.4rem;
		height: max-content;
	}

	&:nth-child(1) {
		margin-right: -16rem;
		z-index: 10;
	}

	&:nth-child(2) {
		margin-top: 16rem;
		z-index: 20;
	}
`;

export const StyledFeatureList = styled.ul`
	list-style: none;

	max-width: 40rem;

	display: grid;
	align-content: start;
	justify-content: center;
	gap: 4rem;

	margin-bottom: 8rem;

	${media.laptopMd} {
		gap: 4rem;
	}

	${media.laptopSm} {
		gap: 3.2rem;
	}

	${media.tabletMd} {
		max-width: 100%;
		margin-bottom: 0;
		gap: 2.4rem;
	}

	${media.tabletSm} {
		grid-template-columns: 1fr;
	}
`;

const FeatureItemStyle = css`
	position: relative;
	height: 100%;

	display: grid;
	align-content: start;
	row-gap: 1.2rem;

	color: var(--cl-display-text);

	border-radius: 3px;
	box-shadow: 0 0 0 0 var(--cl-primary-variant);
	transition: all 200ms ease;

	&:hover {
		color: var(--cl-primary-variant);
	}

	&:last-of-type {
		cursor: pointer;
		height: max-content;
	}

	& > h5 {
		font-size: 2.4rem;
		font-weight: 700;

		display: flex;
		flex-direction: column;

		color: currentColor;
		z-index: 1;
	}

	& > p {
		color: var(--cl-body-text);
		z-index: 1;
	}
`;

export const StyledFeatureItem = styled.li`
	${FeatureItemStyle};

	${media.tabletMd} {
		border-radius: 3px;
		background-color: var(--bg-card);
		box-shadow: 0 10px 40px -10px var(--cl-shadow-primary);
		padding: 2rem 2.4rem;
		padding-top: 1.8rem;
		row-gap: 0.8rem;
	}

	& > a {
		font-size: 2rem;
		font-weight: 700;
		color: var(--cl-body-text);

		&:hover {
			color: var(--cl-primary-variant);
			text-decoration: underline;
		}
	}
`;
