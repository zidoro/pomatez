import styled from "styled-components";
import { motion } from "framer-motion";
import { stagger } from "../animate";

export const StyledLayout = styled(motion.div).attrs(() => ({
	initial: "initial",
	animate: "animate",
	variants: stagger,
}))`
	width: 100%;
	height: 100%;
	min-height: 100vh;

	& > main {
		border-bottom: 1px solid var(--border-secondary);
	}
`;
