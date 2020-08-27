import React from "react";
import { StyledAlert } from "styles";

type Props = {
	heading: string;
	body: string | React.ReactNode;
};

export const Alert: React.FC<Props> = ({ heading, body }) => {
	return (
		<StyledAlert>
			<header>
				<h3>{heading}</h3>
				<p>{body}</p>
			</header>
		</StyledAlert>
	);
};

export default Alert;
