import React, { useContext, useEffect } from "react";
import SettingSection from "./SettingSection";
import { ElectronContext } from "contexts";
import { Help } from "components";

const HelpSection: React.FC = () => {
	const { openExternalCallback } = useContext(ElectronContext);

	useEffect(() => {
		if (openExternalCallback) {
			openExternalCallback();
		}
	}, [openExternalCallback]);

	return (
		<SettingSection heading="Need Help ?">
			<Help
				label="Official website"
				link="https://roldanjr.github.io/productivity-timer/"
			/>
			<Help
				label="Open an issue"
				link="https://github.com/roldanjr/productivity-timer/issues"
			/>
			<Help
				label="Release notes"
				link="https://github.com/roldanjr/productivity-timer/releases/latest"
			/>
			<Help
				label="Support the app"
				link="https://www.paypal.me/roldanjrDevsLife2020"
			/>
			<Help
				label="Contact the developer"
				link="mailto:roldanjrmontilla@gmail.com"
			/>
		</SettingSection>
	);
};

export default HelpSection;
