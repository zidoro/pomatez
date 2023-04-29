import { assign, createMachine, raise } from "xstate";
import { minutesToSeconds } from "@renderer/utils";
import {
  ConfigProps,
  SettingsProps,
  TimerProps,
  defaultConfig,
  defaultSettings,
  defaultTimer,
} from "./contexts";
import { SessionType } from "../types";

type MachineContextProps = {
  config: ConfigProps;
  settings: SettingsProps;
  timer: TimerProps;
};

const defaultMachineContextData = {
  settings: defaultSettings,
  config: defaultConfig,
  timer: defaultTimer,
};

const SYNC_DATA_STORAGE_NAME = "sync-data";

const getContextDataSync = (): MachineContextProps => {
  const dataSync = localStorage.getItem(SYNC_DATA_STORAGE_NAME);

  const dataParsed =
    dataSync && (JSON.parse(dataSync) as MachineContextProps);

  if (dataParsed) {
    const { config, settings } = dataParsed;
    return {
      config,
      settings,
      timer: {
        ...defaultTimer,
        duration: minutesToSeconds(config.stayFocused),
      },
    };
  }

  return defaultMachineContextData;
};

const appMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QEMAOqDEBjA9gOwDMBLKAOiwAtk8YBtABgF1FRUdYiAXI-FkAD0QBGAEwA2ACykRADgCsYuTKEBmERLEqZAGhABPYSpWkVAdnkqhATjFj6Z+wF9HutJlyESpAE5wwnBmYkEDYObl5gwQQrESETGVMJWKs5K1MVOVNdAwQhehFpdXyZdTlrenlnV3QMWH9uGlhyKhowQL5Qrh48PiixGRl4oTlY01F+iuzEUytSRRF6JQkre1N7GSqQN1r6okafPwCmDvYuiNAotVNSOQk1iXllcyEZCSmEDRNl5ZUxIRmRvRJJs3KRuABbMDeDAQqEHOpHIKsU7hHqRYRCYZzDLpFb0ewLKzvP7XeimEZCRT0TGmWIg9BgoiQ6Gw7ykPBgfiIk5hbq9YT5d4WOYSMkiMpWB5iWn01CM5kwplwiAAV28yFRzWodGOwU6qL4OUSxgkQlNj2WJQeuii-zNNyUylNmm+svlcNQvlQyG8eygGHaepRfPRHxepCBIl+QJkagcciFcjkpBkKzWKhWK3kcjdrNInrA3t9NADQiRIWD5wEiDMUkSZueIhmIhWb30GIUhTUSl+hNMYlzSrZBaLfoDInL+pDF0Q6kGJOsSnSkis8neaWM9CsK1EiXx5hzLi2DLz3hVeDwY7znBwUCgABs2rrkbyq1FyQVyQ3MlYjCkVOu+LSHY5I2HIZi2KYg7Mj456XiW15EFgADWgYvmcaIzrk1LGCk9B3LSqgVKuQoqPQpBWGaLxLKuc7QXCZ4XmOABUaEVq+mHVrklLGKkGaUooKQpOuqSkBISZWv0IhNmIVj0cOyAqnUECKjBN53o+bFTm+0wjKQX53D+f7ge8eSZHMwzigshmJAOR6gnUsAcPgOxOd07KctyQYcfy2EFDIZISJYaxJmkv6mak1x5JGeSWH8GZuo5zl4K5yXwv4WmVpxUSyLMlJKGB0rkospkZORGgvDIfwVKY5iJXAaWwJwyB6AAYjgWBKZAqXuRyXKZT5obidckhkrGSTgRmEVAjc24JBkyhkVB9kMkl7lNS17WdcpPX4B5-VljyGG+RVFHpKkKTyNKqamWMyZbkotj4RddnVHKsA4OeECkLAqBgMgyFQgA8ilH1fWCt4Pk+k5Zb54piBGsjDH8MSWDY7wKLMAXzWmNjioln14N9v3-YD3hAwQBC1IT33qVDA3HaG8OI8oCjWFG1hiO84lSKIv7ZgktWqMtb2kOCOAQGApCSwQin3pwGDi5LEMadDR0GqGqhYkmZXiqmLyaKZdjJi8q5bmowwyitcpK1LuDgt6WAK7bKv08+7GM1hWvJjrcj5AVBumUFUgaHcTZs8smLOEeeAS3AfBuOr05cVz7YIE2eUtloEiR6uYzyUnOkILc7zGmJVG1YsAIzPJ+Zej6fqF9ls6KOXoqvGMeemomxijedQV-A8Qi14x8FQE3vm-j7+IvGS5i0pKIkjVa6jDLGCS196XUQBPoapMmryKKaOdJO365rCmkfiNY6SpiItdgETu9eyoQUpkm-SUS6i9pyky9RkkaSi05LWx+g1ZO2lm7FykAFY0-xFiRSnqZcQBQbAvFKEmO4ah6puT2htNqHVt7Py4i2Ao0oyi1XAiBWMWQ07DCSCYSQdolwaFjDgxqFAcDeE4AAIV8ADYhURsakExIsWS+EWzgSJHQ24BRfimjugkVh7D3L3nwFAPhpNBGIGUHEZQaRqQBUojxI2MxL4CSqpIbOBMvraIQJoERmMM4Z3XrQnIvwEZiCzrGfiFQgo2KJj9P6ANgacUgb5TEcRkYxGbDMVxGMZqSlEDneKSh1CvWPO9GmQTSbA0pnYpICNMi7ngTnMkJc05lAKFuIxZhEgLCqm6W2di8ivBMM8Z4FRMgKFKp8GwBFFwPBKE0uO0swCyxVPLFpqg5EdOUF08kqccjDFfmJfslINBKEXBk0ELt7aO04C0hQJohK2BiMoC5EUGHyOksHVMkZo6OCAA */
    id: "app",
    schema: {
      context: {} as MachineContextProps,

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
        | { type: "timer.reset" }
        | { type: "timer.next" }
        | { type: "timer.duration.change" }
        | { type: "session.next" }
        | { type: "session.reset" },
    },

    context: getContextDataSync(),

    tsTypes: {} as import("./app.typegen").Typegen0,

    predictableActionArguments: true,

    preserveActionOrder: true,

    type: "parallel",

    states: {
      timer: {
        initial: "paused",
        states: {
          preparing: {
            always: [
              {
                cond: "shouldAutoStartBreak",
                target: "running",
              },
              {
                cond: "shouldAutoStartWork",
                target: "running",
              },
              {
                target: "paused",
              },
            ],
          },
          running: {
            invoke: {
              src: "startTimer",
            },
            on: {
              "*": {
                cond: "timerIsDone",
                actions: "resetTimer",
                target: "end",
              },
              "timer.toggle": {
                target: "paused",
                actions: "toggleTimer",
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
                actions: "toggleTimer",
              },
            },
          },
          end: {
            entry: "callNextSession",
          },
        },
        on: {
          "timer.reset": {
            actions: "resetTimer",
          },
          "timer.next": {
            target: "timer.preparing",
          },
          "timer.duration.change": {
            actions: "updateDuration",
          },
        },
      },

      session: {
        initial: "stayFocused",
        states: {
          stayFocused: {
            on: {
              "session.next": [
                {
                  cond: "isNotLastSession",
                  target: "shortBreak",
                  actions: [
                    "resetTimer",
                    "callTimerNext",
                    "callUpdateDuration",
                    "setFullScreenBreak",
                  ],
                },
                {
                  target: "longBreak",
                  actions: [
                    "resetTimer",
                    "callTimerNext",
                    "callUpdateDuration",
                    "setFullScreenBreak",
                  ],
                },
              ],
            },
          },
          shortBreak: {},
          longBreak: {},
        },
        on: {
          "session.next": {
            target: "session.stayFocused",
            actions: [
              "resetTimer",
              "incrementRound",
              "callTimerNext",
              "callUpdateDuration",
              "setFullScreenBreak",
            ],
          },
          "session.reset": {
            target: "session.stayFocused",
            actions: ["resetTimer", "resetRound"],
          },
        },
      },

      sound: {
        initial: "speakerOn",
        states: {
          speakerOn: {
            on: {
              "sound.toggle": {
                target: "speakerOff",
                actions: "toggleSpeaker",
              },
            },
          },
          speakerOff: {
            on: {
              "sound.toggle": {
                target: "speakerOn",
                actions: "toggleSpeaker",
              },
            },
          },
        },
      },

      mode: {
        initial: "default",
        states: {
          default: {
            on: {
              "mode.toggle": {
                target: "compact",
                actions: "toggleMode",
              },
            },
          },
          compact: {
            on: {
              "mode.toggle": {
                target: "default",
                actions: "toggleMode",
              },
            },
          },
        },
      },
    },

    on: {
      "config.change": {
        actions: ["updateConfig", "callUpdateDuration"],
      },
      "config.reset": {
        cond: "isNotDefaultConfig",
        actions: ["resetConfig", "callUpdateDuration"],
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
      timerNotYetDone: (context) => {
        return context.timer.elapsed < context.timer.duration;
      },
      timerIsDone: (context) => {
        return context.timer.elapsed >= context.timer.duration;
      },
      isNotLastSession: (context) => {
        return (
          context.timer.sessionRound < context.config.sessionRounds
        );
      },
      shouldAutoStartBreak: (context, _, { state }) => {
        return (
          context.settings.autoStartBreak &&
          !state.matches("session.stayFocused")
        );
      },
      shouldAutoStartWork: (context, _, { state }) => {
        return (
          context.settings.autoStartWork &&
          state.matches("session.stayFocused")
        );
      },
    },

    actions: {
      updateConfig: assign((context, event) => {
        return {
          ...context,
          config: event.values,
          timer: {
            ...context.timer,
            sessionRound:
              context.timer.sessionRound >= context.config.sessionRounds
                ? defaultTimer.sessionRound
                : context.timer.sessionRound,
          },
        };
      }),
      resetConfig: assign((context) => {
        return {
          ...context,
          config: defaultConfig,
        };
      }),
      updateSettings: assign((context, event) => {
        const shouldFullScreenBreak =
          context.timer.sessionType !== "stayFocused" &&
          event.values.fullscreenBreak;

        return {
          ...context,
          settings: event.values,
          timer: {
            ...context.timer,
            shouldFullScreenBreak,
          },
        };
      }),
      resetSettings: assign((context) => {
        return {
          ...context,
          settings: defaultSettings,
        };
      }),
      toggleSpeaker: assign((context) => {
        return {
          ...context,
          settings: {
            ...context.settings,
            isMuted: !context.settings.isMuted,
          },
        };
      }),
      toggleMode: assign((context) => {
        return {
          ...context,
          settings: {
            ...context.settings,
            isCompact: !context.settings.isCompact,
          },
        };
      }),
      toggleTimer: assign((context) => {
        return {
          ...context,
          timer: {
            ...context.timer,
            isRunning: !context.timer.isRunning,
          },
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
      updateDuration: assign((context) => {
        return {
          ...context,
          timer: {
            ...context.timer,
            elapsed: defaultTimer.elapsed,
            duration: minutesToSeconds(
              context.config[context.timer.sessionType]
            ),
          },
        };
      }),
      setFullScreenBreak: assign((context) => {
        let sessionType: SessionType;

        switch (context.timer.sessionType) {
          case "shortBreak":
          case "longBreak":
            sessionType = "stayFocused";
            break;
          case "stayFocused":
            if (
              context.timer.sessionRound < context.config.sessionRounds
            ) {
              sessionType = "shortBreak";
            } else {
              sessionType = "longBreak";
            }
            break;
          default:
            sessionType = "stayFocused";
        }

        const shouldFullScreenBreak =
          sessionType !== "stayFocused" &&
          context.settings.fullscreenBreak;

        return {
          ...context,
          timer: {
            ...context.timer,
            shouldFullScreenBreak,
            sessionType,
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
      incrementRound: assign((context) => {
        return {
          ...context,
          timer: {
            ...context.timer,
            sessionRound:
              context.timer.sessionRound < context.config.sessionRounds
                ? context.timer.sessionRound + 1
                : defaultTimer.sessionRound,
          },
        };
      }),
      resetRound: assign((context) => {
        return {
          ...context,
          timer: {
            ...context.timer,
            sessionRound: defaultTimer.sessionRound,
          },
        };
      }),
      callTimerNext: raise({ type: "timer.next" }),
      callNextSession: raise({ type: "session.next" }),
      callUpdateDuration: raise({ type: "timer.duration.change" }),
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

export {
  appMachine,
  SYNC_DATA_STORAGE_NAME,
  defaultMachineContextData,
};
