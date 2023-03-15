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
    /** @xstate-layout N4IgpgJg5mDOIC5QEMAOqDEBjA9gOwDMBLKAOiwAtk8YBtABgF1FRUdYiAXI-FkAD0QAmAOz1S9AMwBOeiIBs0sUvoAOADQgAnsOnTSqgKzTJh46unyF8gL43NaTLkIlSAJzhhODZkhBsObl4-QQQhekNSABYFQ1Uow3kARnpRJM0dMKlSWXkhGSiooUUIuwd0DFgvbhpYcioaMB8+AK4ePD5Q4slSSRFDeiTrVSEU1UkMxBSRHMNJJKEhC0MxBLKQR0rqolr3T28mFvY24NBQpJMDXKj5kaT5eSjpSYQF9cdSbgBbMDcMCAArm5kEE8PVqHRDn5WqDOsJ5JEpLJVBc1Ep+i8RApSLE4iJpIZivQiu90J8iD8-t9fnsqgdfKxjrCQsIhgZjFEkqoRMVksUXvJVOIUUIYkkohFkiNSahyZT3AC8HgdlAMNS3J8cFAoAAbJpQxmBdpwrKqUjyejSTnEkSSSQo-EvFKyc0iLmLBJ5FYyuU0tyK5U0NUUmncLAAa2a0KZxpZCEkj1I+RuSmMCh5UXkLwJ+nuqkFFi5YlUqh96oVSpVGAAVFHDScOnGLlEcVIFlZ+pzLNmYkmi1ISwoliIyyGNahkACqhBg-LOFrdfqGf4Y6cBFMra35sUsYYu1ntFNieIhu7RZaHUIfbAcIqIKRYKgwMhw78APJ4Sq3vD3+favV1iuRprl04o5KM+ZDHEZj3FETrzJEeQXN0bqDJI17fvej7Pq+bhvgQBBfnemr-kuRzAY2Zysi20gQck-RGIYsFOsUkQLEWZiSFEIy2PYGxkl8OAQGApDCQQk46pwGCCcJJGLoBMKxlRrzchIJj9MUejxJmEyHggxjiNuYqmNIQwWD6MkibgXwTlgUmWXJAEGkBDYmkWal9ISijSNp8i6Zkcz6CKxkLLaBJ2HxeBCXAfCOORrlxgAtBcLwJi2wU8nMDxelEo6UvFzLKVxLxGPobrcsSTw5qkeV+gGKoFUp67xkopDOhKCiWHacxOvQFptRBESZokVojnxHzlhOU6QI1IGICMvUSq6XIxEKmamVe41kjed6zZRzVCM8elJEMMxIdyySZiI3K5Vtso7T+D5Pi+777Ypc0IFiLFukmESjLaEpGGN5T3ZhT04e+BF7SafQ9AiSEmH0oz5IY309GIhJDFxajendpCWdDcaHS8CRCL0CxirRMSDEkFnRaJYDiQCkmE8pX16XukTLGtCL2gspZ4w51m2ZwrPNVxSTLSWaXjKiIgvHuZoyHExK8yKAt2EAA */
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
                actions: "resetTimer",
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
        on: {
          "duration.change": {
            actions: "updateDuration",
          },
          "timer.reset": {
            actions: "resetTimer",
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
