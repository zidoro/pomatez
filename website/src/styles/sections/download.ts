import styled from "styled-components";
import { SectionStyle, SectionContentStyle } from "../mixins";
import media from "../media";

export const StyledDownload = styled.section`
	${SectionStyle};

	${media.laptopSm} {
		padding-bottom: 8rem;
	}
`;

export const StyledDownloadContent = styled.div`
	${SectionContentStyle};
`;

export const StyledDownloadOSLogo = styled.div`
	& > svg {
		width: 12rem;
		height: 12rem;
		fill: currentColor;
	}
`;

export const StyledDownloadButtonWrapper = styled.div`
	display: grid;
	align-items: start;
	column-gap: 2rem;
	row-gap: 4rem;
	grid-template-columns: 1fr 2fr 1fr;

	${media.tabletMd} {
		grid-template-columns: 1fr;
	}
`;

export const StyledDownloadForWindows = styled.div`
	color: var(--cl-primary-variant);

	display: grid;
	row-gap: 4.8rem;
	justify-items: center;

	${media.tabletMd} {
		row-gap: 3.2rem;
	}
`;

export const StyledLinuxInstallerWrapper = styled.div`
	display: grid;
	align-items: center;
	justify-content: center;
	grid-template-columns: repeat(3, 1fr);
	gap: 2rem;

	& > a {
		min-width: max-content;
	}

	& > a#snap-store-btn {
		padding: 0 1.2rem;
	}

	${media.laptopXs} {
		grid-template-columns: repeat(2, 1fr);

		& > a:nth-last-of-type(2) {
			grid-row: 1 / 2;
			grid-column: 2 / -1;
		}

		& > a:nth-last-of-type(3) {
			grid-column: 1 / -1;
		}

		& > span {
			grid-column: 1 / -1 !important;
		}
	}

	${media.tabletMd} {
		width: 100%;
	}

	& > span {
		grid-column: 2 / 3;

		font-weight: 500;

		width: 100%;
		height: 2rem;

		display: flex;
		align-items: center;
		justify-content: center;

		${media.tabletXl} {
			grid-column: 1 / -1;
		}
	}

	#snap-store-btn {
		grid-column: 1 / -1;
		justify-self: center;

		width: max-content;
		padding: 0;

		display: flex;
		align-items: center;
		justify-content: center;

		overflow: hidden;

		& > span {
			width: 0;
			height: 0;
			opacity: 0;
		}

		& > svg {
			width: 182px;
			height: 56px;
			fill: transparent;

			margin: 0 auto;
		}
	}
`;

export const StyledDownloadForLinux = styled.div`
	display: grid;
	row-gap: 4.8rem;
	justify-items: center;

	${media.tabletMd} {
		row-gap: 3.2rem;
	}
`;

export const StyledDownloadForMac = styled.div`
	color: var(--cl-display-text);

	display: grid;
	row-gap: 4.8rem;
	justify-items: center;

	${media.tabletMd} {
		row-gap: 3.2rem;
	}
`;
