import React from "react";
import { PageHead, Layout } from "../components";
import { Landing, Features, Boosters, Roadmap, Download } from "../sections";

export default () => {
	return (
		<Layout>
			<PageHead />
			<Landing />
			<Features />
			<Boosters />
			<Roadmap />
			<Download />
		</Layout>
	);
};
