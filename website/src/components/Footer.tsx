import React from "react";
import {
	StyledFooter,
	StyledFooterContent,
	StyledFooterNote,
	StyledCopyrightText,
} from "../styles";
import { SVG } from "../components";
import { APP_NAME } from "../config";

type Props = {};

export const Footer: React.FC<Props> = () => {
	return (
		<StyledFooter>
			<StyledFooterContent>
				<a
					href="https://github.com/roldanjr/pomatez"
					target="_blank"
					rel="noopener noreferrer"
				>
					<SVG name="github" />
					<StyledCopyrightText>
						{APP_NAME} © {new Date().getFullYear()}
					</StyledCopyrightText>
				</a>

				<StyledFooterNote>
					Developed and Maintained by <br />
					<a
						href="https://github.com/roldanjr"
						target="_blank"
						rel="noopener noreferrer"
					>
						Roldan Montilla Jr
					</a>
				</StyledFooterNote>
			</StyledFooterContent>
		</StyledFooter>
	);
};

export default React.memo(Footer);
