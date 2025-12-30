import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { restoreDefaultSettings } from "store";
import { useAppDispatch } from "hooks/storeHooks";

import { Header } from "components";
import { StyledHeaderButton } from "styles";

const SettingHeader: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [success, setSuccess] = useState(false);

  const restoreSettings = useCallback(() => {
    setSuccess(true);
    dispatch(restoreDefaultSettings());
    setTimeout(() => setSuccess(false), 1000);
  }, [dispatch]);

  return (
    <Header heading={t("settings.title")}>
      <StyledHeaderButton success={success} onClick={restoreSettings}>
        {success
          ? t("settings.restored")
          : t("settings.restoreDefault")}
      </StyledHeaderButton>
    </Header>
  );
};

export default React.memo(SettingHeader);
