import React, { useCallback, useState } from "react";
import { restoreDefaultSettings } from "store";
import { useAppDispatch } from "hooks/storeHooks";

import { Header } from "components";
import { StyledHeaderButton } from "styles";

const SettingHeader: React.FC = () => {
  const dispatch = useAppDispatch();

  const [success, setSuccess] = useState(false);

  const restoreSettings = useCallback(() => {
    setSuccess(true);
    dispatch(restoreDefaultSettings());
    setTimeout(() => setSuccess(false), 1000);
  }, [dispatch]);

  return (
    <Header heading="Settings">
      <StyledHeaderButton success={success} onClick={restoreSettings}>
        {success ? "Restored Successfully" : "Restore Default"}
      </StyledHeaderButton>
    </Header>
  );
};

export default React.memo(SettingHeader);
