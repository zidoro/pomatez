import { assign, createMachine } from "xstate";
import {
  ConfigProps,
  SettingsProps,
  TimerProps,
  defaultConfig,
  defaultSettings,
  defaultTimer,
} from "./contexts";

export const appMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QEMAOqDEBjA9gOwDMBLKAOiwAtk8YBtABgF1FRUdYiAXI-FkAD0QAmAGwB2UgFYAzAE569aQEZpkkfRHSANCACeiACyylpMSLWKAHCM2X6SkQF9HOtJlyESpAE5wwnBmYkEDYObl5gwQQheiFSWTNJIQM1JSVJSzFtPUQ5SVJLJWSxWQMxazEDJWdXdAxYf24aWHIqGjBAvlCuHjw+KNF6AsrS9VVJNUts-WjZWQLJWWkRNPT7QpqQN3rGomafPwCmLvYeiNAopWNSOXo1VIylEunhRXiNIWWxISyi6pctnUIABXbzIcJ4VrUOjHYLdCH9YTqUiKeTFWxiK46GZKegSWQyNKfOTqdQGTbbbgAWzA3gODSOQVYpwRkWEJSklgy1mSRXUQkk2MQRQp6FI1NpPmBeDweygGAldM4OCgUAANh1Ycywr1EdE3uolgKsushAkhQhcVlTEIlJYBWkFJjRahxUQaXTvNLZTQFe7JdwsABrTpwlm6tkIVTzT4GIRcyrSAz0TIW0pxW2ZePSbNiSTkgFuN0eqUyuUYABUoe1Zz6kbt8zEijSBISIk+QjTeZtTxE1mUkjtYhdxclqGQwIaED9JeVqo11ZC4fOAmFlkbzauizMHYtuM+pCEtvKBhzxhTI9gOGlEFIsFQYGQQdpAHk8PVr3hb3P1ZqmUudRXAYlAMeJM3XK40gMdtBRyS0zUsUhxDtXEVCPSQNEvT9b3vR9n28F8CAID8b3FFVf0XeEIwuYQQLAu0IOMECYL3ZJEKeXslkHeMzBHKkcAgMBSEEggJzVTgMH4wSyPnP8TkAusaMtTIUSWSpbTxMoqksC1ygzIdYhsO0Mj4gShNwKlxywCSpKEn8Fy1ADaz1IdVOkdSrS0u1dOUUwh1xPEzwMSxnABPAzPgYI3Hk5zIwAWixOCJhEPzMgcGJFh5EdFRi1klLNC0uVAzFrAJAV6DjNJsv9T1vTlXLqNXKNZDiXEWq5Qcm1kdRYJxCrpFIDjrDKERtPSaqS3HSdIAaoDEDEMQ91iAbvieSxTzNXEQsLMUrxvWbFKagq4LSZFkKmURHmkaQsNI3Cn1fQ6qLmhAFtY-NDwmNrgpA4Lbq-O8HwegiiIOvV3IG8wYKM8xviWd6UrzQd6FKQoDD+nbXVssHI2OmZRtAzNvkHTJKjuUzpJEsTOBxpS3rgrIJDsGJKsxaRLGsCnzJwSzkGs2mmqTExzrMYL1ruWRdOTG5Ygq48VA5pxQqAA */
    id: "app",
    schema: {
      context: {} as {
        config: ConfigProps;
        settings: SettingsProps;
        timer: TimerProps;
      },

      events: {} as
        | {
            type: "config.change";
            values: ConfigProps;
          }
        | { type: "config.reset" }
        | {
            type: "settings.change";
            values: SettingsProps;
          }
        | { type: "settings.reset" }
        | { type: "timer.toggle" }
        | { type: "sound.toggle" }
        | { type: "mode.toggle" }
        | { type: "timer.tick" }
        | {
            type: "duration.change";
            value: number;
          }
        | { type: "timer.reset" },
    },

    tsTypes: {} as import("./app.typegen").Typegen0,

    context: {
      config: defaultConfig,
      settings: defaultSettings,
      timer: defaultTimer,
    },

    type: "parallel",

    states: {
      timer: {
        initial: "paused",
        states: {
          running: {
            invoke: {
              src: "startTimer",
            },
            on: {
              "*": {
                cond: "timerIsDone",
                target: "paused",
              },
              "timer.toggle": {
                target: "paused",
              },
              "timer.tick": {
                cond: "timerNotYetDone",
                actions: "updateTimer",
              },
            },
          },
          paused: {
            on: {
              "timer.toggle": {
                target: "running",
              },
            },
          },
        },
      },

      sound: {
        initial: "speakerOn",
        states: {
          speakerOn: {
            on: {
              "sound.toggle": "speakerOff",
            },
          },
          speakerOff: {
            on: {
              "sound.toggle": "speakerOn",
            },
          },
        },
      },

      mode: {
        initial: "default",
        states: {
          default: {
            on: {
              "mode.toggle": "compact",
            },
          },
          compact: {
            on: {
              "mode.toggle": "default",
            },
          },
        },
      },
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
      "duration.change": {
        actions: "updateDuration",
      },
      "timer.reset": {
        actions: "resetTimer",
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
      timerNotYetDone: (context) => {
        return context.timer.elapsed < context.timer.duration;
      },
      timerIsDone: (context) => {
        return context.timer.elapsed >= context.timer.duration;
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
      updateTimer: assign((context) => {
        return {
          ...context,
          timer: {
            ...context.timer,
            elapsed: context.timer.elapsed + 1,
          },
        };
      }),
      updateDuration: assign((context, event) => {
        return {
          ...context,
          timer: {
            ...context.timer,
            duration: event.value,
          },
        };
      }),
      resetTimer: assign((context) => {
        return {
          ...context,
          timer: {
            ...context.timer,
            elapsed: 0,
          },
        };
      }),
    },

    services: {
      startTimer: (context) => (sendBack) => {
        const interval = setInterval(() => {
          sendBack("timer.tick");
        }, context.timer.interval * 1000);

        return () => {
          clearInterval(interval);
        };
      },
    },
  }
);
