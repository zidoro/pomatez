import { assign, createMachine } from "xstate";
import { ConfigProps, SettingsProps } from "./types";
import { defaultConfig, defaultSettings } from "./constants";

export const appMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QEMAOqDEBjA9gOwDMBLKAOiwAtk8YBtABgF1FRUdYiAXI-FkAD0QAmAOwBOUgFYhAZgAsMkZIA0IAJ6IAHPTml6ARkkA2IZIC+Z1Wky5CJUgCc4YTg2ZIQbDt14fBCAFp9ESNSMUkZfVNVDQRtXQNjUwsrdAxYF24aWHIqGjA3Pi8uHjw+f1EhUk1JMUUVdURJQ2qZIXpI5MsQa3TMomzHZ1cmIvYS31B-IM1NKRkxehMG2ObJVvbO8xSQPBwIOD5rMe9S8sR9YNI5ITEjTSUYxCMRBOWLCyA */
    id: "app",
    schema: {
      context: {} as {
        config: ConfigProps;
        settings: SettingsProps;
      },
      events: {} as
        | {
            type: "config.change";
            values: ConfigProps;
          }
        | {
            type: "config.reset";
          }
        | {
            type: "settings.change";
            values: SettingsProps;
          }
        | {
            type: "settings.reset";
          },
    },
    tsTypes: {} as import("./app.typegen").Typegen0,
    context: {
      config: defaultConfig,
      settings: defaultSettings,
    },
    on: {
      "config.change": {
        actions: "updateConfig",
      },
      "config.reset": {
        cond: "isNotDefaultConfig",
        actions: "resetConfig",
      },
      "settings.change": {
        actions: "updateSettings",
      },
      "settings.reset": {
        cond: "isNotDefaultSettings",
        actions: "resetSettings",
      },
    },
  },
  {
    guards: {
      isNotDefaultConfig: (context) => {
        return (
          JSON.stringify(context.config) !==
          JSON.stringify(defaultConfig)
        );
      },
      isNotDefaultSettings: (context) => {
        return (
          JSON.stringify(context.settings) !==
          JSON.stringify(defaultSettings)
        );
      },
    },
    actions: {
      updateConfig: assign((_, event) => {
        return {
          config: event.values,
        };
      }),
      resetConfig: assign((context) => {
        return {
          ...context,
          config: defaultConfig,
        };
      }),
      updateSettings: assign((_, event) => {
        return {
          settings: event.values,
        };
      }),
      resetSettings: assign((context) => {
        return {
          ...context,
          settings: defaultSettings,
        };
      }),
    },
  }
);
