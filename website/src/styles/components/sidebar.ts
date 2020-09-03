import styled from "styled-components";
import { motion } from "framer-motion";
import { SectionContentStyle } from "../mixins";
import { stagger } from "../animate";
import media from "../media";

export const StyledSidebar = styled(motion.aside).attrs(() => ({
	initial: "initial",
	animate: "animate",
	variants: stagger,
}))`
	padding: 0 5.6rem;

	background-color: var(--bg-primary);
	border-top: 1px solid var(--border-tertiary);

	position: fixed;
	top: 6.4rem;
	left: 0;
	width: 100%;
	min-height: calc(100% - 6.4rem);

	z-index: 80;

	${media.laptopSm} {
		padding: 0 4rem;
	}

	${media.tabletSm} {
		padding: 0 2rem;
	}

	${media.mobileXs} {
		padding: 0 1.6rem;
	}
`;

export const StyledSidebarList = styled.ul`
	${SectionContentStyle};

	max-width: 100rem;
	row-gap: 0 !important;

	list-style: none;

	& > li {
		padding: 1.6rem 0;
		font-size: 1.7rem;

		color: var(--cl-heading-text);

		position: relative;

		&::after {
			content: "";
			position: absolute;
			left: 0;
			bottom: 0;

			width: 100%;
			height: 1px;

			background-color: var(--border-secondary);
		}
	}
`;
