import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "hooks/storeHooks";
import { setLanguage } from "store";
import { LanguageOption } from "store/settings/types";
import { StyledSelect, StyledSelectWrapper } from "styles";
import { supportedLanguages } from "i18n/languages";

import SettingSection from "./SettingSection";

const LanguageSection: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.settings.language);

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setLanguage(event.target.value as LanguageOption));
    },
    [dispatch]
  );

  return (
    <SettingSection heading={t("settings.language")}>
      <StyledSelectWrapper>
        <StyledSelect value={language} onChange={onChange}>
          <option value="auto">{t("settings.languageAuto")}</option>
          {supportedLanguages.map((option) => (
            <option key={option.code} value={option.code}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
      </StyledSelectWrapper>
    </SettingSection>
  );
};

export default React.memo(LanguageSection);
