import { SessionType } from "@renderer/@data/types";

type StateProps = {
  session: SessionType;
};

export const interpretState = <T>(state: T) =>
  state as unknown as StateProps;
