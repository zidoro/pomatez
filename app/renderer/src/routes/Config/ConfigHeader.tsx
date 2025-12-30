import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "hooks/storeHooks";
import { restoreDefaultConfig } from "store";

import { StyledHeaderButton } from "styles";
import { Header } from "components";

const ConfigHeader: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [success, setSuccess] = useState(false);

  const restoreConfig = useCallback(() => {
    setSuccess(true);
    dispatch(restoreDefaultConfig());
    setTimeout(() => setSuccess(false), 1000);
  }, [dispatch]);

  return (
    <Header heading={t("config.title")}>
      <StyledHeaderButton success={success} onClick={restoreConfig}>
        {success ? t("config.restored") : t("config.restoreDefault")}
      </StyledHeaderButton>
    </Header>
  );
};

export default React.memo(ConfigHeader);
