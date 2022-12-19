import { css } from "styled-components";
import media from "./media";

export const SectionStyle = css`
	position: relative;

	width: 100%;
	height: max-content;

	padding: 10rem 5.6rem;

	&:nth-child(even) {
		background: var(--bg-primary);
	}

	${media.laptopSm} {
		padding: 6.4rem 4rem;
	}

	${media.tabletSm} {
		padding: 5.6rem 2rem;
	}

	${media.mobileXs} {
		padding: 5.6rem 1.6rem;
	}
`;

export const SectionContentStyle = css`
	width: 100%;
	max-width: 130rem;
	height: 100%;

	margin: 0 auto;

	display: grid;
	row-gap: 6rem;
	align-content: start;
	animation: fadeIn ease 160ms;

	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	${media.laptopMd} {
		max-width: 116.8rem;
	}

	${media.laptopSm} {
		max-width: 106.8rem;
		row-gap: 4.8rem;
	}

	${media.laptopXs} {
		max-width: 90rem;
	}
`;
