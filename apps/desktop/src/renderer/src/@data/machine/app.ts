import { assign, createMachine } from "xstate";
import { raise } from "xstate/lib/actions";
import {
  ConfigProps,
  SettingsProps,
  TimerProps,
  defaultConfig,
  defaultSettings,
  defaultTimer,
  SessionProps,
  defaultSession,
} from "./contexts";

export const appMachine = createMachine(
  {
    /** @xstate-layout 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 */
    id: "app",
    schema: {
      context: {} as {
        config: ConfigProps;
        settings: SettingsProps;
        session: SessionProps;
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
        | { type: "timer.reset" }
        | { type: "timer.next" }
        | { type: "session.next" }
        | { type: "session.reset" },
    },

    tsTypes: {} as import("./app.typegen").Typegen0,

    context: {
      config: defaultConfig,
      settings: defaultSettings,
      session: defaultSession,
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
          "duration.change": {
            actions: "updateDuration",
          },
          "timer.reset": {
            actions: "resetTimer",
          },
          "timer.next": {
            target: "timer.preparing",
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
                  actions: ["resetTimer", "callTimerNext"],
                },
                {
                  target: "longBreak",
                  actions: ["resetTimer", "callTimerNext"],
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
            actions: ["resetTimer", "incrementRound", "callTimerNext"],
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
      isNotLastSession: (context) => {
        return context.session.round < context.config.sessionRounds;
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
      incrementRound: assign((context) => {
        return {
          ...context,
          session: {
            ...context.session,
            round:
              context.session.round < context.config.sessionRounds
                ? context.session.round + 1
                : 1,
          },
        };
      }),
      resetRound: assign((context) => {
        return {
          ...context,
          session: defaultSession,
        };
      }),
      callNextSession: raise({ type: "session.next" }),
      callTimerNext: raise({ type: "timer.next" }),
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
