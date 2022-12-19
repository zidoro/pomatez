import styled from "styled-components";
import { Link } from "gatsby";

import { SectionStyle, SectionContentStyle } from "../mixins";
import { ButtonStyles } from "../components";

import { StyledLandingHeader } from "./landing";

export const StyledPageNotFound = styled.section`
	${SectionStyle};
	min-height: calc(100vh - 14.9rem - 5.6rem);
	position: relative;
	overflow: hidden;
`;

export const Styled404Content = styled.div`
	${SectionContentStyle};
	row-gap: 4.8rem;
	justify-content: center;
`;

export const Styled404Header = styled(StyledLandingHeader)`
	justify-items: center;

	& > svg {
		width: 16rem;
		height: 16rem;
		fill: currentColor;
	}
`;

export const Styled404ActionWrapper = styled.div``;

export const Styled404HomeLink = styled(Link)`
	${ButtonStyles};

	min-height: 4.8rem;
	min-width: 25rem;
	font-size: 1.6rem;
	padding: 1.2rem 2.4rem;

	color: white;
	background: var(--bg-btn-primary);
	box-shadow: 0 2px 4px 0 var(--cl-shadow-secondary);

	&:hover {
		box-shadow: 0 3px 6px 0 var(--cl-shadow-secondary);
	}

	& > svg {
		width: 2.2rem;
		height: 2.2rem;
		margin-right: 1rem;
		margin-left: -0.6rem;
	}
`;
