import { Repository, WriterBusy } from "./repository";
import { Tracker } from "./tracker";
import type { Writer } from "./repository";
import type { Snapshot } from "./tracker";

let current: Tracker | undefined;
let database: Promise<Repository> | undefined;
let queue = Promise.resolve();
let pending = 0;
let unavailable = false;
let owner: string;
let contender: { writer: Writer; since: number } | undefined;
let owned = false;
let closing = false;
let observationEpoch = 0;

function commit(snapshot?: Snapshot, release = false) {
  if (unavailable) return;
  // A stalled database must not grow an unbounded retry queue.
  if (pending >= 16) {
    unavailable = true;
    console.error(
      "Session history recording stopped: database writes stalled"
    );
    return;
  }
  const epoch = observationEpoch;
  pending++;
  queue = queue
    .then(async () => {
      if (unavailable || (release && !owned)) return;
      owner ??= crypto.randomUUID();
      database ??= Repository.open(
        indexedDB,
        "pomatez-session-history"
      );
      const db = await database;
      const takeover =
        contender && performance.now() - contender.since >= 30000
          ? contender.writer
          : undefined;
      try {
        await db.update(
          owner,
          takeover || epoch !== observationEpoch ? undefined : snapshot,
          takeover,
          Date.now(),
          release
        );
        if (takeover) {
          current = undefined;
          observationEpoch++;
        }
        contender = undefined;
        owned = true;
      } catch (error) {
        if (error instanceof WriterBusy && !owned) {
          current = undefined;
          observationEpoch++;
          if (
            contender?.writer.revision !== error.writer.revision ||
            contender?.writer.owner !== error.writer.owner
          ) {
            contender = {
              writer: error.writer,
              since: performance.now(),
            };
          }
          return;
        }
        throw error;
      }
    })
    .catch((error) => {
      unavailable = true;
      console.error("Session history recording stopped", error);
    })
    .finally(() => {
      pending--;
    });
}

export function finishRecording(reason: string) {
  if (!current) return;
  current.end(Date.now(), performance.now(), reason);
  commit(current.snapshot());
  current = undefined;
}

export function closeRecording() {
  if (closing) return queue;
  closing = true;
  current?.end(Date.now(), performance.now(), "quit");
  commit(current?.snapshot(), true);
  current = undefined;
  return queue;
}

export function syncRecording(
  phase: string,
  playing: boolean,
  duration: number,
  round: number,
  remaining: number
) {
  if (closing || contender || unavailable) return;
  duration = Math.round(duration);
  if (current && current.phase !== phase)
    finishRecording(
      phase === "special_break" ? "special_break" : "config_changed"
    );
  if (current && current.configuredMs !== duration)
    finishRecording("config_changed");

  if (
    playing &&
    duration > 0 &&
    remaining > 0 &&
    Number.isFinite(duration)
  ) {
    current ??= new Tracker(
      phase,
      crypto.randomUUID(),
      duration,
      round
    );
    if (current.status === "paused") {
      current.start(Date.now(), performance.now(), remaining);
      commit(current.snapshot());
    }
  } else if (!playing && current?.status === "active") {
    current.pause(Date.now(), performance.now());
    commit(current.snapshot());
  }
}

export function observeRecording() {
  current?.sample(Date.now(), performance.now());
}

export function checkpointRecording() {
  if (closing) return queue;
  observeRecording();
  commit(current?.snapshot());
  return queue;
}

export function recordSuspend(suspended: boolean, remaining: number) {
  if (!current) return;
  const wall = Date.now();
  const mono = performance.now();
  if (suspended) current.suspend(wall, mono);
  else current.resumeFromSleep(wall, mono, remaining);
  commit(current.snapshot());
}
