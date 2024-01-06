import React, { useCallback, useState } from "react";
import { useAppDispatch } from "hooks/storeHooks";
import { restoreDefaultConfig } from "store";

import { StyledHeaderButton } from "styles";
import { Header } from "components";

const ConfigHeader: React.FC = () => {
  const dispatch = useAppDispatch();

  const [success, setSuccess] = useState(false);

  const restoreConfig = useCallback(() => {
    setSuccess(true);
    dispatch(restoreDefaultConfig());
    setTimeout(() => setSuccess(false), 1000);
  }, [dispatch]);

  return (
    <Header heading="Rules">
      <StyledHeaderButton success={success} onClick={restoreConfig}>
        {success ? "Restored Successfully" : "Restore Default"}
      </StyledHeaderButton>
    </Header>
  );
};

export default React.memo(ConfigHeader);
