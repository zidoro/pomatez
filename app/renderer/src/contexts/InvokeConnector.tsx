/**
 * Explicitly for calling invokes from the trigger rather than a setting change.
 */
export type InvokeConnector = {
  send: (event: string, ...payload: any) => void;
};
