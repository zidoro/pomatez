import styled, { css } from "styled-components";
import { SectionStyle, SectionContentStyle } from "../mixins";

import WaterMarkLeft from "../../assets/images/watermark-left.svg";
import WaterMarkRight from "../../assets/images/watermark-right.svg";

import media from "../media";

export const StyledLanding = styled.section`
	${SectionStyle};
	position: relative;
	overflow: hidden;
	padding-top: 8rem;

	${media.laptopSm} {
		padding-top: 8rem;
		padding-bottom: 8rem;
	}
`;

export const StyledLandingContent = styled.div`
	${SectionContentStyle};
	row-gap: 10rem;
`;

const WaterMarkStyle = css`
	position: absolute;
	top: 0;

	${media.laptopXs} {
		width: 38rem;
		height: 38rem;
	}

	${media.tabletXl} {
		width: 32rem;
		height: 32rem;
	}

	${media.tabletMd} {
		width: 28rem;
		height: 28rem;
	}

	${media.tabletSm} {
		width: 24rem;
		height: 24rem;
	}

	${media.mobileLg} {
		width: 20rem;
		height: 20rem;
	}

	${media.mobileXs} {
		width: 16rem;
		height: 16rem;
	}
`;

export const StyledWaterMarkLeft = styled(WaterMarkLeft)`
	${WaterMarkStyle};
	left: 0;
	margin-left: -2.4rem;

	${media.laptopXs} {
		display: none;
	}
`;

export const StyledWaterMarkRight = styled(WaterMarkRight)`
	${WaterMarkStyle};
	right: 0;
	margin-right: -2.4rem;

	${media.laptopXs} {
		display: none;
	}
`;

export const StyledLandingCTAWrapper = styled.div`
	display: grid;
	row-gap: 4.8rem;
	justify-content: center;
	justify-items: center;

	position: relative;
	z-index: 10;
`;

export const StyledLandingHeader = styled.header`
	text-align: center;
	max-width: 56rem;

	margin: 0 auto;

	display: grid;
	row-gap: 2.4rem;

	& > h1 {
		font-size: 7.2rem;
		font-weight: 700;
		color: var(--cl-display-text);

		${media.tabletSm} {
			line-height: normal;
		}

		${media.mobileXl} {
			font-size: 6.4rem;
		}

		${media.mobileLg} {
			font-size: 5.6rem;
		}

		${media.mobileSm} {
			font-size: 4.8rem;
		}

		${media.mobileXs} {
			font-size: 4.2rem;
		}
	}

	& > h2 {
		font-size: 2.2rem;
		font-weight: 400;
		line-height: 1.7;

		${media.tabletSm} {
			line-height: 1.5;
		}

		${media.mobileXl} {
			font-size: 2rem;
		}
	}
`;

export const StyledLandingCtaWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(2, max-content);
	gap: 2rem;

	${media.tabletMd} {
		width: 100%;
		grid-template-columns: 1fr;
	}
`;

export const StyledPreviewWrapper = styled.div`
	position: relative;
	z-index: 10;

	display: grid;
	grid-template-columns: repeat(6, max-content);
	align-items: center;
	justify-content: center;

	${media.tabletLg} {
		grid-template-columns: repeat(3, max-content);
		row-gap: 3.2rem;
		column-gap: -2rem;
	}
`;

export const StyledPreviewImage = styled.div`
	background-color: var(--bg-primary);
	position: relative;

	&:nth-child(1),
	&:nth-child(6) {
		width: 20rem;
		height: max-content;
		z-index: 2;
		box-shadow: 0 20px 40px var(--cl-shadow-primary);

		${media.laptopSm} {
			width: 18rem;
		}

		@media screen and (max-width: 420px) {
			width: 16rem !important;
		}
	}

	&:nth-child(1) {
		/* Task List */
		margin-right: -1.6rem;

		${media.laptopMd} {
			margin-right: -4.8rem;
		}

		${media.laptopXs} {
			margin-right: -9rem;
		}

		${media.tabletXl} {
			margin-right: -12.2rem;
		}

		${media.tabletLg} {
			grid-column: 1 / 2;

			width: 20rem;
			margin-right: -2.4rem;
		}

		${media.tabletMd} {
			grid-column: 1 / 2;

			width: 20rem;
			margin-right: -10.4rem;
			transform: skewX(8deg) skewY(-8deg);
		}

		@media screen and (max-width: 420px) {
			margin-right: -7.2rem;
		}

		${media.mobileMd} {
			margin-right: -10rem;
		}
	}

	&:nth-child(6) {
		/* Long Break */
		margin-left: -1.6rem;

		${media.laptopMd} {
			margin-left: -4.8rem;
		}

		${media.laptopXs} {
			margin-left: -9rem;
		}

		${media.tabletXl} {
			margin-left: -12.2rem;
		}

		${media.tabletLg} {
			grid-row: 1 / 2;
			grid-column: 3 / 4;

			width: 20rem;
			margin-left: -2.4rem;
		}

		${media.tabletMd} {
			grid-row: 1 / 2;
			grid-column: 3 / 4;

			width: 20rem;
			margin-left: -10.4rem;
			transform: skewX(-8deg) skewY(8deg);
		}

		@media screen and (max-width: 420px) {
			margin-left: -7.2rem;
		}

		${media.mobileMd} {
			margin-left: -10rem;
		}
	}

	&:nth-child(2),
	&:nth-child(5) {
		width: 22rem;
		height: max-content;
		z-index: 4;
		box-shadow: 0 20px 40px var(--cl-shadow-primary);

		${media.laptopSm} {
			width: 20rem;
		}

		@media screen and (max-width: 420px) {
			width: 16rem !important;
		}
	}

	&:nth-child(2) {
		/* Settings */
		margin-right: -1.6rem;

		${media.laptopMd} {
			margin-right: -4.8rem;
		}

		${media.laptopXs} {
			margin-right: -9rem;
		}

		${media.tabletXl} {
			margin-right: -12.2rem;
		}

		${media.tabletLg} {
			grid-row: 2 / 3;
			grid-column: 3 / 4;

			margin: 0;
			margin-left: -2.4rem;
		}

		${media.tabletMd} {
			grid-row: 2 / 3;
			grid-column: 3 / 4;

			margin: 0;
			margin-left: -10.4rem;
			transform: skewX(-8deg) skewY(8deg);
		}

		@media screen and (max-width: 420px) {
			margin-left: -7.2rem;
		}

		${media.mobileMd} {
			margin-left: -10rem;
		}
	}

	&:nth-child(5) {
		/* Short Break */
		margin-left: -1.6rem;

		${media.laptopMd} {
			margin-left: -4.8rem;
		}

		${media.laptopXs} {
			margin-left: -9rem;
		}

		${media.tabletXl} {
			margin-left: -12.2rem;
		}

		${media.tabletLg} {
			grid-row: 1 / 2;
			grid-column: 1 / 2;

			margin: 0;
			margin-right: -2.4rem;
		}

		${media.tabletMd} {
			grid-row: 1 / 2;
			grid-column: 1 / 2;

			margin: 0;
			margin-right: -10.4rem;
			transform: skewX(8deg) skewY(-8deg);
		}

		@media screen and (max-width: 420px) {
			margin-right: -7.2rem;
		}

		${media.mobileMd} {
			margin-right: -10rem;
		}
	}

	&:nth-child(3),
	&:nth-child(4) {
		width: 25rem;
		height: max-content;
		z-index: 8;
		box-shadow: 0 20px 40px var(--cl-shadow-primary);

		${media.laptopSm} {
			width: 24rem;
		}

		@media screen and (max-width: 420px) {
			width: 20rem !important;
		}
	}

	&:nth-child(3) {
		/* Config */
		margin-right: 2rem;

		${media.tabletLg} {
			grid-row: 2 / 3;
			grid-column: 2 / 3;

			margin: 0;
		}
	}

	&:nth-child(4) {
		/* Work Time */
		${media.tabletLg} {
			grid-row: 1 / 2;
			grid-column: 2 / 3;

			margin: 0;
		}
	}
`;
