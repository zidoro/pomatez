import styled, { keyframes } from "styled-components";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion";
import { ButtonStyles } from "./button";
import { SectionContentStyle } from "../mixins";
import { stagger, fadeFromTop } from "../animate";
import media from "../media";

type MenuProps = {
	isMenuOpen?: boolean;
};

export const StyledNav = styled(motion.nav).attrs(() => ({
	initial: "initial",
	animate: "animate",
	variants: stagger,
}))<MenuProps>`
	width: 100%;
	height: 6.4rem;

	padding: 0 5.6rem;

	background-color: ${(p) =>
		p.isMenuOpen ? "var(--bg-primary)" : "rgba(var(--bg-primary-rgb), 0.8)"};
	backdrop-filter: saturate(180%) blur(5px);

	position: sticky;
	top: 0;
	left: 0;
	z-index: 100;

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

export const StyledNavHeader = styled(motion.header).attrs(() => ({}))`
	${SectionContentStyle};

	max-width: 100rem;

	align-content: center;
	grid-template-columns: max-content 1fr;
	column-gap: 4rem;

	${media.laptopMd} {
		max-width: 90rem;
	}

	${media.laptopSm} {
		column-gap: 2.8rem;
	}
`;

export const StyledNavLogo = styled(motion.div).attrs(() => ({
	variants: fadeFromTop,
}))`
	display: flex;
	align-items: center;

	& > a {
		display: grid;
		align-items: center;
		grid-auto-flow: column;

		font-size: 2rem;
		font-weight: 700;

		text-transform: capitalize;
		color: var(--cl-display-text);

		& > svg {
			width: 1.5em;
			height: 1.5em;
			margin-right: 1rem;
			color: var(--cl-primary);
			background-color: transparent;
		}
	}
`;

export const StyledNavContent = styled(motion.div).attrs(() => ({}))`
	display: grid;
	align-content: start;
	justify-items: end;
	grid-auto-flow: column;
	column-gap: 4rem;

	margin-bottom: -4px;

	${media.laptopSm} {
		column-gap: 2.8rem;
	}

	${media.laptopXs} {
		display: none;
	}
`;

export const StyledNavLinks = styled(motion.ul).attrs(() => ({}))`
	width: max-content;
	justify-self: start;

	list-style: none;
	display: flex;
	align-items: center;

	font-size: 1.6rem;
	font-weight: 500;
	color: var(--cl-heading-text);

	cursor: pointer;

	${media.laptopXs} {
		width: 100%;
		display: grid;
		row-gap: 2rem;
		padding-left: 6.4rem;

		font-weight: 500;

		& > li:not(:last-of-type) {
			margin-right: 0;
		}
	}

	& > li:not(:last-of-type) {
		margin-right: 2rem;

		${media.laptopSm} {
			margin-right: 1.6rem;
		}
	}

	& > li a:hover,
	& > li a.active {
		color: var(--cl-primary-variant);
	}
`;

export const StyledNavLinkItem = styled(motion.li).attrs(() => ({
	variants: fadeFromTop,
}))``;

export const StyledNavLinkAnchor = styled(ScrollLink)``;

export const StyledNavButtonWrapper = styled(motion.div).attrs(() => ({}))`
	display: grid;
	align-items: center;
	grid-template-columns: repeat(2, max-content);
	column-gap: 2rem;

	${media.laptopXs} {
		grid-template-columns: 1fr;
		row-gap: 2rem;
		max-width: 92rem;
		margin-top: 4rem;
		margin-bottom: 0.8rem;
		margin-left: auto;
		margin-right: auto;
	}

	${media.tabletXl} {
		max-width: 77.6rem;
	}
`;

export const StyledNavThemeToggler = styled(motion.button).attrs(() => ({
	variants: fadeFromTop,
}))`
	padding: 0.8rem 1.2rem;

	border: none;
	border-radius: 10rem;

	display: flex;
	align-items: center;
	justify-content: center;

	font-size: 1.6rem;
	color: var(--cl-heading-text);
	background-color: transparent;

	${media.laptopXs} {
		border: 1px solid var(--border-secondary);
		padding: 1rem;
	}

	&:hover {
		color: var(--cl-display-text);
	}

	&:hover > svg {
		fill: var(--cl-heading-text);
	}

	& > svg {
		width: 1.25em;
		height: 1.25em;

		margin-left: 1.2rem;

		fill: var(--cl-body-text);
	}
`;

export const StyledScrollToDownload = styled(motion.div).attrs(() => ({
	variants: fadeFromTop,
}))`
	& > a {
		${ButtonStyles};
		font-size: 1.4rem;
		border-radius: 10rem;
		color: #fff;
		background: var(--bg-btn-primary);
		box-shadow: 0 0 0 0 var(--cl-shadow-secondary);

		&:hover {
			background: var(--bg-btn-primary-hover);
			box-shadow: 0 4px 16px 0 var(--cl-shadow-secondary);
		}

		${media.laptopXs} {
			margin-top: 4rem;
			padding: 1.2rem;
			max-width: 92rem;
			margin-left: auto;
			margin-right: auto;
		}

		${media.tabletXl} {
			max-width: 77.6rem;
		}
	}
`;

export const StyledBackButton = styled.button`
	${ButtonStyles};
	font-size: 1.4rem;
	border-radius: 10rem;
	color: #fff;
	background: var(--bg-btn-primary);
	box-shadow: 0 0 0 0 var(--cl-shadow-secondary);

	&:hover {
		background: var(--bg-btn-primary-hover);
		box-shadow: 0 4px 16px 0 var(--cl-shadow-secondary);
	}
`;

const menuFromTop = keyframes`
	from {
		transform: translateY(-60px);
		opacity: 0;
	}
	to {
		transform: translateY(0);
		opacity: 1;
	}
`;

export const StyledNavMenu = styled.div<MenuProps>`
	justify-self: end;
	border: none;
	border-radius: 3px;
	background-color: transparent;

	display: none;
	row-gap: 4px;
	align-content: center;

	animation: ${menuFromTop} 1s cubic-bezier(0.6, -0.05, 0.01, 0.99);

	${media.laptopXs} {
		display: grid;
	}

	& > span {
		width: 24px;
		height: 3px;

		border-radius: 3px;
		background-color: ${(p) =>
			p.isMenuOpen ? "var(--cl-primary)" : "var(--cl-body-text)"};
		transition: all 160ms ease;

		&:nth-of-type(1) {
			transform-origin: left;
			transform: ${(p) => (p.isMenuOpen ? "rotate(45deg)" : "rotate(0deg)")};
			margin-bottom: ${(p) => (p.isMenuOpen ? "1.5px" : "0")};
		}

		&:nth-of-type(2) {
			opacity: ${(p) => (p.isMenuOpen ? "0" : "1")};
			transform: ${(p) =>
				p.isMenuOpen ? "translateX(12px)" : "translateX(0)"};
		}

		&:nth-of-type(3) {
			transform-origin: left;
			transform: ${(p) => (p.isMenuOpen ? "rotate(-45deg)" : "rotate(0deg)")};
			margin-top: ${(p) => (p.isMenuOpen ? "1.5px" : "0")};
		}
	}
`;
