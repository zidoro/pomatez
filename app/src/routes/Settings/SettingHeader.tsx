import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { restoreDefaultSettings, AppStateTypes } from "store";

import { Header } from "components";
import { StyledHeaderButton } from "styles";

const SettingHeader: React.FC = () => {
  const dispatch = useDispatch();

  const isSettingLock = useSelector(
    (state: AppStateTypes) => state.settings.isSettingLock
  );

  const [success, setSuccess] = useState(false);

  const restoreSettings = useCallback(() => {
    if (!isSettingLock) {
      setSuccess(true);
      dispatch(restoreDefaultSettings());
      setTimeout(() => setSuccess(false), 1000);
    }
  }, [dispatch, isSettingLock]);

  return (
    <Header heading="Settings">
      <StyledHeaderButton success={success} onClick={restoreSettings}>
        {success ? "Restored Successfully" : "Restore Default"}
      </StyledHeaderButton>
    </Header>
  );
};

export default React.memo(SettingHeader);
