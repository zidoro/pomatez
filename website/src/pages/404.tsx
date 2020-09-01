import React from "react";
import { Layout, PageHead, SVG } from "../components";
import {
	StyledPageNotFound,
	Styled404Header,
	StyledWaterMarkLeft,
	StyledWaterMarkRight,
	Styled404ActionWrapper,
	Styled404HomeLink,
	Styled404Content,
} from "../styles";

const NotFoundPage = () => (
	<Layout>
		<PageHead title="404: Page Not found" />
		<StyledPageNotFound>
			<Styled404Content>
				<StyledWaterMarkLeft />
				<StyledWaterMarkRight />

				<Styled404Header>
					<SVG name="alert" />
					<h1>PAGE NOT FOUND</h1>
					<p>You just hit a route that doesn&#39;t exist... the sadness.</p>
				</Styled404Header>

				<Styled404ActionWrapper>
					<Styled404HomeLink to="/">
						<SVG name="arrow-back" />
						Go back to Landing Page
					</Styled404HomeLink>
				</Styled404ActionWrapper>
			</Styled404Content>
		</StyledPageNotFound>
	</Layout>
);

export default NotFoundPage;
