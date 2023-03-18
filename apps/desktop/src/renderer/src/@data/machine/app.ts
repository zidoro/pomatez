import { assign, createMachine } from "xstate";
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
    /** @xstate-layout N4IgpgJg5mDOIC5QEMAOqDEBjA9gOwDMBLKAOiwAtk8YBtABgF1FRUdYiAXI-FkAD0QBmAOwBOUgFYhY+gA4AbApFyhAJjmSANCACeiNWImaxQyZLGSAjGrVmAvvZ1pMuQiVIAnOGE4NmSCBsHNy8gYIIQlYALKRiIgqSqtFy8ZJqCjr6CGr0QnH0ChnyKUKqQtGOzugYsL7cNLDkVDRg-nzBXDx4fBGiaqRyIpL00RkxItHRVlmIVvQicdJWQqNq02JWylUgLrX1RI1ePn5MHexdYaB9eaQyhSNlVmLRCnKzCDY7LqTcALZgTwYCAAV08yFCeGa1DoZ0CnUhvWEIgGeVkYjUVlSViskgSHxECVICTxZTkGg0Y2+6F+RABQP+gOOdVOAVYF0R4WEmykJgUFTseS2Ig+b3ogxsChKo3oGMk1NQtPpXhBeDwhygGEZnl+OCgUAANm04eyQt0kTl5KQpaZzMoRLKkkIPvNZNaUfRcZiYmJtk5djTtSq1RqtXSmdwsABrdrwjnmrmRBSxOzRIQKUxmV5Yj6WCRbVKSKapX1iBVKpmeVXqmgYABUsdNlx6ieesQdUTUCTe4nE2j0iBei0xciG4no1jR5aDqGQILqEDDys4esNxrZQXjVwEcxexKFXaUQ3ilhdMtIVg96yUmOsanLdVgHHw+yf3VIeDA-FZ5zN24ihIumUizpOSKgjNEKhYg+cDPngr5wcyviNpuf4ttciCAQOnwZJIF62J6SheiiMFvvgpCwJwyC6AAYjgWDzpACHvp+34oQiCYYZERikLKogPLY5Lkpk2E2OIF5yM8k70OMCikYhlHUXRDELsx5GsX4Vgbhx-7chIfEOokgkUiJ2QrMMF5mJ6CxyNMowiA+OCqhAFGoGAyBRoCADy8GwE5eAuSu+pGuxW7oTuOQxHEI43nkox4tEHwWOKnZFiiNijJU-o-H5zmue5nmeF5BAELU-mBauIUmqhzYWpisQYlisWrNECVJTIErrIonpGJY8rZTSfw4BAYCkCNBBzganAYENI26sF66-rVrZDLxpgosMhRlEYiWiUoEimMWRFjGU5azaNuB-LOWDTed81rqFaEWliiwGV2Iz8iWu1mQozykGmUy+oUKRyo4-p4MNcB8C4S2clxAC0zwfOmsSSV1-LDNMH3TuGniw5xEUVB8JjEliihyuswxyDjypViGND47p3GLK6KOeioJ5nlK+G5DEXYxHickDYqM5zgujPhRE5JntE4rKLk15FLiVjyQTOmSwYYgupeixFLkCy+hkUyq+Rim0fRjEQBLdXpFIuK-W8oirOkQFWuS1gjCI8zrP11SKo+CkUDgnicAAQt4HnW4mDrGJtl5CGYhbvKJqwDLLtmaL9ihDELfsUbB74GvgUDhwVUdcTHgxxyICdJJYydmTIch3L9RZFvQ7O5wG-vleXEWGB8rUDJ2kE18o6aTI5eWwG5HneeF6sWlh2Rt4M9fSLKlhe-ewsUeV+Vz0VJV930NfWpIRRlKsybKN9iBFs3MhJBvRh4l8u-nSfmsusscQVCkkwbBGyynnO641JqcC-ggZecwih4WsCoLs5IojCjOpDcgOArrIBulAioVh3QvVxJ3eKLoijN3ZmBZBOI-SOCAA */
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

      session: {
        initial: "stayFocused",
        states: {
          stayFocused: {
            on: {
              "session.next": [
                {
                  cond: "isNotLastSession",
                  target: ["shortBreak", "#app.timer.running"],
                  actions: "resetTimer",
                },
                {
                  target: ["longBreak", "#app.timer.running"],
                  actions: "resetTimer",
                },
              ],
            },
          },
          shortBreak: {},
          longBreak: {},
        },
        on: {
          "session.next": {
            target: ["#app.session.stayFocused", "#app.timer.running"],
            actions: ["resetTimer", "incrementRound"],
          },
          "session.reset": {
            target: ["#app.session.stayFocused", "#app.timer.paused"],
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
