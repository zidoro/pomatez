import { assign, createMachine, raise } from "xstate";
import { interpretState, minutesToSeconds } from "@renderer/utils";
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
    /** @xstate-layout N4IgpgJg5mDOIC5QEMAOqDEBjA9gOwDMBLKAOiwAtk8YBtABgF1FRUdYiAXI-FkAD0QBGAEwBWAMykh9IQE4RQgOxKAbHLEAOMQBoQAT2GqxpJRqFi59TRIAstiWNUBfZ3rSZchEqQBOcME4GZiQQNg5uXlDBBDkhTVIROQdHWzEnIVVbPUMEIQklUlUJOLkJAvoNJTFXd3QMWEDuGlhyKhowYL5wrh48PhjVTSEiobElbXyJtJzhWVIyzVtNOWLHTSVbWpAPBqaiFr8AoKZu9l6o0BiJEVsF23pFIWX7EQlNWYQ1aUsRG2LNPQgbY5NsPKRuABbMC+DBQmFHRonEKsc6RfrRYRCCxFRxKEpA+g3SqfVTKUj0aqKYyyZSKMHoCFEaGw+G+Uh4MD8ZFnCJ9AZzESfbRSLKU8TyZaqJQiBmoJksuHMhEQACuvmQ6La1Dop1CPXRfFymyktme8S0IM0tw+AmESmepHSmmGZuKIK2bh2jLZpFQ-lQyF8BygGC6+rR-MxCDNCXoqjeqnjNjeSnougMiG0JhWlKJVis2blCoR-rAgeDNDDQhRYUjlztCAKIidizUWmeQNtuWx70SxjMagkFqExd9ZYrIbDIlrBqjV0QNqKynkWnxWTk2k+cnxFLkVlEmyBExqXvBvt8qrweCnvs4OCgUAANp09ai+Q2Yps7sPxCIHRI6Z-N2iA7vQpBLFYrzSuaspnj6yrspe163ohTJYAA1uG74XBiC55LIUgaPQtgqIogErCBCA2OBcSxpam42mOaHITeVYAFTYXWH54Y22LFK2JSZMYGgaNulikGkWi3EMIj-uozEsn6yCqo0EBKkp96Pi+XFzp+iDVKopA3A80kPEk-6fDIIIUr27xlHYqzFo0sAcPgeyuX0HJcjyEY8QKBEtoCJrKOmlhmBIVnhdIQIJjIw5kiUzlwG5eAealiKBLp9a8TEfxyNIxgrMY0rVOmVmOOBthki6ZLWComjJZ5+CkLAnDIPoABiOBYKpkDpV5nLctl-nRmkhRihMdjiOUchRfGrabviHaAUoTUZW1HXdb1akDS1Q1BDWvK4QF1UjDujj7loTgTHNmZ5A6JiVFoqhJmk+4uPB8qwDgV4QK1qBgMgGEwgA8mlP1-RCD7Pq+s45QF4iFGaZTqGRKgZrkSYtkSCbqCIYX5HBdTfb9eD-bAgPA2DBAEA0ZP-VpsMjSd0ZI5J8gSGjMoY58UrGU4cTjPkIlrV9pCQjgEBgKQ0sECpT6cBgkvS9D2lw8dhrRqIaRFNamS2HJxIKFFcQLICRIFA6cmguLKsy7gkKBlgSv22rzNvtxrP4TrJiyQbRsE8kVmkXc1ViB6+IWJscFengUtwHwHia-OjaqJ8w4jI46j2CuSwuqeJMlr4Kf6QgEefCaHOG-YyQkQ8o7i+OAZBiGpe5YuxjV9YpHyBsZrCpIRQPMtDhkssjdFxeV5sVA7cBWUJhiEC8SUhMMrB-dVR67ctwWDYGyKaWKlqfP0aWDm4dmvYNfWNuaYQSCohkhdKzE968q+mA5Nnz7dhSNmIYcR3Sb1yNvWS005LDCSuLFyqVf6NgjhBSkDhQrpB3IvKyIgEwLBqukUixQxDKHWl5TaXUep9QgAgvKCgijVGUNULmlIbBKCiobYyWQVxrmqjYEhLVYAUBwL4TgAAhfwwNqFZmsNIGQgsSJJEkHdHsEcWxczNI9fuQw+F4FIE+fAUAxFAwwpI6i2IILyDTKvOImRIr3UyGYR+wlNCvQcEsZyDMTFZCdBPM0y8lglFuBnTcEFBZJGSP+COEh3FQ0pkYsGvE9IdzyKIbxroLA9wCdke6ijCobE2PiZIaZGqwIZgDOJvhQa0xMYbQoqwbRiD+FKJInwI4-nEAmAkQJVjFKLvbExMgljGQmMoYY1hxhOAqs43BEcxT7meNaYsbs5YK04P0omQzhjDLGYZKKdhJJqANkVVcn1ekJ3IDgJ2yAXb9JKIUdMXSmHWmMLsoyO4yRZCORoT6rggA */
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
        | { type: "timer.reset" }
        | { type: "timer.next" }
        | { type: "timer.duration.change" }
        | { type: "session.next" }
        | { type: "session.reset" },
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
      updateSettings: assign((context, event, { state }) => {
        const sessionState = interpretState(state?.value).session;

        const shouldFullscreen =
          sessionState !== "stayFocused" &&
          event.values.fullscreenBreak;

        return {
          ...context,
          settings: event.values,
          timer: {
            ...context.timer,
            shouldFullScreenBreak: shouldFullscreen,
          },
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
      updateDuration: assign((context, _, { state }) => {
        const sessionState = interpretState(state?.value).session;

        return {
          ...context,
          timer: {
            ...context.timer,
            duration: minutesToSeconds(context.config[sessionState]),
          },
        };
      }),
      setFullScreenBreak: assign((context, _, { state }) => {
        const sessionState = interpretState(state?.value).session;

        const shouldFullscreen =
          sessionState === "stayFocused" &&
          context.settings.fullscreenBreak;

        return {
          ...context,
          timer: {
            ...context.timer,
            shouldFullScreenBreak: shouldFullscreen,
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
