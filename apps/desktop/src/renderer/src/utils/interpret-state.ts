import { SessionTypes } from "@renderer/@data/types";

type StateProps = {
  session: SessionTypes;
};

export const interpretState = <T>(state: T) =>
  state as unknown as StateProps;
