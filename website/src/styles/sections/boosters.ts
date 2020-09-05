import styled from "styled-components";
import { motion } from "framer-motion";

import { SectionStyle, SectionContentStyle } from "../mixins";
import { stagger, fadeFromBottom } from "../animate";

import media from "../media";

export const StyledBoosters = styled(motion.section).attrs(() => ({
	initial: "initial",
	variants: stagger,
}))`
	${SectionStyle};
`;

export const StyledBoosterContent = styled.div`
	${SectionContentStyle};
`;

export const StyledBoosterList = styled.ul`
	list-style: none;

	display: grid;
	grid-template-columns: repeat(2, 1fr);
	justify-items: center;
	align-content: start;
	column-gap: 2rem;
	row-gap: 8rem;

	${media.laptopSm} {
		column-gap: 4rem;
	}

	${media.laptopXs} {
		column-gap: 3.2rem;
	}

	${media.tabletLg} {
		grid-template-columns: 1fr;
	}
`;

export const StyledBoosterImage = styled.div`
	width: 28rem;
	height: 28rem;

	overflow: hidden;
	border-radius: 100rem;

	display: flex;
	align-items: center;
	justify-content: center;

	background-color: var(--bg-primary);
	box-shadow: 0 20px 40px var(--cl-shadow-primary);
	transition: all 320ms ease-out;

	${media.laptopSm} {
		width: 24rem;
		height: 24rem;
	}

	${media.laptopXs} {
		width: 20rem;
		height: 20rem;
	}

	${media.tabletLg} {
		width: 24rem;
		height: 24rem;
	}

	${media.mobileXl} {
		width: 20rem;
		height: 20rem;
		transform: scale(0.8);
	}

	${media.mobileMd} {
		width: 18rem;
		height: 18rem;
	}

	${media.mobileXs} {
		width: 16rem;
		height: 16rem;
	}
`;

export const StyledBoosterDescription = styled(motion.div).attrs(() => ({
	variants: fadeFromBottom,
}))`
	display: grid;
	row-gap: 1.2rem;
	align-content: start;

	& > h5 {
		font-size: 2.4rem;
		font-weight: 700;
		color: currentColor;
	}

	& > p {
		color: var(--cl-body-text);
	}

	& > a {
		font-weight: 700;
		color: var(--cl-body-text);

		&:hover {
			color: var(--cl-primary-variant);
			text-decoration: underline;
		}
	}
`;

export const StyledBoosterItem = styled(motion.li).attrs(() => ({
	variants: fadeFromBottom,
}))`
	max-width: 60rem;
	height: 100%;

	display: grid;
	grid-template-columns: repeat(2, 1fr);
	column-gap: 4.8rem;
	align-items: center;
	justify-items: center;

	color: var(--cl-display-text);

	border-radius: 3px;
	transition: all 200ms ease;

	${media.laptopSm} {
		column-gap: 4rem;
	}

	${media.laptopXs} {
		column-gap: 2.8rem;
	}

	${media.mobileXl} {
		gap: 0;
	}

	&:nth-child(odd) {
		${StyledBoosterImage} {
			grid-row: 1 / 2;
			grid-column: 2 / 3;
		}
		${StyledBoosterDescription} {
			grid-row: 1 / 2;
			grid-column: 1 / 2;
			text-align: end;
		}
	}
`;

export const StyledCompanyImage = styled(motion.div).attrs(() => ({
	variants: fadeFromBottom,
}))`
	width: 22.5rem;
	min-height: 7.1rem;
	margin-top: 2rem;
	overflow: hidden;
	background-color: white;
	opacity: var(--logo-opacity);

	${media.mobileXl} {
		width: 16rem;
		min-height: max-content;

		&:not(:last-of-type) {
			margin-right: 2rem;
		}
	}
`;

export const StyledCompanyWrapper = styled.div`
	display: grid;
	justify-items: center;
	row-gap: 2rem;
	text-align: center;

	margin-top: 8rem;

	& > div {
		max-width: 120rem;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
`;

export const StyledCompanyDescription = styled(motion.h6).attrs(() => ({
	variants: fadeFromBottom,
}))`
	font-size: 2.4rem;
	font-weight: 400;

	max-width: 72rem;

	line-height: 1.7;

	${media.tabletSm} {
		line-height: 1.5;
	}

	${media.mobileMd} {
		font-size: 2rem;
	}
`;
