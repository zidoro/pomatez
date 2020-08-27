import React from "react";
import { StyledSettings } from "styles";
import { Alert } from "components";

import FeatureSection from "./FeatureSection";
import HelpSection from "./HelpSection";
import ShortcutSection from "./ShortcutSection";
import StickySection from "./StickySection";
import SettingHeader from "./SettingHeader";

export default () => {
	return (
		<StyledSettings>
			<SettingHeader />
			<Alert
				heading="Announcement"
				body={
					<>
						This app might no longer get an update starting on{" "}
						<span>September 01, 2020</span>.{" "}
						<a
							href="https://github.com/roldanjr/pomatez/releases/tag/v3.2.0"
							target="_blank"
							rel="noopener noreferrer"
						>
							See Details
						</a>
					</>
				}
			/>
			<FeatureSection />
			<ShortcutSection />
			<HelpSection />
			<StickySection />
		</StyledSettings>
	);
};
