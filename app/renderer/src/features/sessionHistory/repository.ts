import type { Segment, Snapshot } from "./tracker";

/** Transactional timer history and restart recovery. */
export class Repository {
  private db: IDBDatabase;
  private constructor(db: IDBDatabase) {
    this.db = db;
  }

  static open(factory: IDBFactory, name: string): Promise<Repository> {
    return new Promise((resolve, reject) => {
      const request = factory.open(name, 4);
      request.onupgradeneeded = () => {
        if (!request.result.objectStoreNames.contains("coverage")) {
          request.result.createObjectStore("coverage", {
            keyPath: "sessionId",
          });
        }
        if (!request.result.objectStoreNames.contains("events")) {
          const events = request.result.createObjectStore("events", {
            keyPath: "event_id",
          });
          events.createIndex("sequence", "sequence", { unique: true });
        }
        if (!request.result.objectStoreNames.contains("checkpoint"))
          request.result.createObjectStore("checkpoint");
        if (!request.result.objectStoreNames.contains("meta"))
          request.result.createObjectStore("meta");
      };
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(new Repository(request.result));
    });
  }

  /**
   * Ownership and history share one transaction. A contender may replace
   * only the exact heartbeat it observed remain unchanged.
   */
  update(
    owner: string,
    snapshot?: Snapshot,
    takeover?: Writer,
    now = Date.now()
  ): Promise<Writer> {
    return new Promise((resolve, reject) => {
      const stores = ["meta", "events", "checkpoint", "coverage"];
      let tx: IDBTransaction;
      try {
        tx = this.db.transaction(stores, "readwrite", {
          durability: "strict",
        });
      } catch (error) {
        if (!(error instanceof TypeError)) throw error;
        tx = this.db.transaction(stores, "readwrite");
      }
      const meta = tx.objectStore("meta");
      const checkpoints = tx.objectStore("checkpoint");
      const events = tx.objectStore("events");
      let writer: Writer;
      let failure: unknown;
      tx.oncomplete = () => resolve(writer);
      tx.onabort = () =>
        reject(
          failure ||
            tx.error ||
            new Error("History transaction aborted")
        );
      const read = meta.get("history");
      read.onsuccess = () => {
        const previous = read.result as Metadata | undefined;
        const current = previous?.writer;
        const sameOwner = current?.owner === owner;
        if (
          current &&
          !sameOwner &&
          (takeover?.owner !== current.owner ||
            takeover.revision !== current.revision)
        ) {
          failure = new WriterBusy(current);
          tx.abort();
          return;
        }
        writer = { owner, revision: (current?.revision ?? 0) + 1 };
        const deviceId = previous?.deviceId ?? owner;
        let sequence = previous?.sequence ?? 0;
        let finished = previous?.finished;
        const pending = checkpoints.get("session");
        pending.onsuccess = () => {
          try {
            let saved = pending.result as Saved | undefined;
            const emit = (
              session: Snapshot,
              suffix: string,
              fields: Record<string, unknown>
            ) => {
              events.add({
                schema_version: 1,
                source: "pomatez",
                device_id: deviceId,
                event_id: session.sessionId + ":" + suffix,
                sequence: ++sequence,
                recorded_at: iso(now),
                session_id: session.sessionId,
                phase: session.phase,
                task_id: null,
                ...fields,
              });
            };
            const segment = (
              session: Snapshot,
              value: Segment,
              index: number,
              observed: number
            ) => {
              if (!value.duration) return;
              emit(session, "segment:" + index, {
                record_type: "active_segment",
                started_at: iso(value.startedAt),
                ended_at: iso(value.endedAt),
                observed_ended_at: iso(observed),
                duration_ms: value.duration,
                end_reason: value.reason,
                quality_flags: flags(session, value.reason),
              });
            };
            const finish = (
              session: Snapshot,
              reason: string,
              end: number
            ) => {
              emit(session, "end", {
                record_type: "session_ended",
                ended_at: iso(end),
                status:
                  reason === "completed" ? "completed" : "interrupted",
                end_reason: reason,
                quality_flags: flags(session, reason),
              });
              finished = session.sessionId;
              checkpoints.delete("session");
            };
            if (saved && !sameOwner) {
              const session = saved.snapshot;
              if (session.active)
                segment(
                  session,
                  session.active,
                  session.segments.length,
                  session.observedAt
                );
              finish(session, "recovered", session.observedAt);
              saved = undefined;
            }
            if (
              snapshot?.startedAt !== undefined &&
              snapshot.sessionId !== finished
            ) {
              if (
                saved &&
                saved.snapshot.sessionId !== snapshot.sessionId
              )
                throw new Error(
                  "Previous session must be closed before starting another"
                );
              if (!saved)
                emit(snapshot, "start", {
                  record_type: "session_started",
                  started_at: iso(snapshot.startedAt),
                  configured_duration_ms: snapshot.configuredMs,
                  round: snapshot.round,
                });
              if (snapshot.gaps.length) {
                tx.objectStore("coverage").put({
                  sessionId: snapshot.sessionId,
                  gaps: snapshot.gaps,
                });
              }
              snapshot.segments
                .slice(saved?.written ?? 0)
                .forEach((value, index) =>
                  segment(
                    snapshot,
                    value,
                    index + (saved?.written ?? 0),
                    value.observedAt ?? value.endedAt
                  )
                );
              if (snapshot.reason)
                finish(snapshot, snapshot.reason, snapshot.endedAt);
              else
                checkpoints.put(
                  { snapshot, written: snapshot.segments.length },
                  "session"
                );
            }
            meta.put(
              { writer, deviceId, sequence, finished },
              "history"
            );
          } catch (error) {
            failure = error;
            tx.abort();
          }
        };
      };
    });
  }

  records(): Promise<Record<string, unknown>[]> {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction("events");
      const request = tx
        .objectStore("events")
        .index("sequence")
        .getAll();
      tx.oncomplete = () => resolve(request.result);
      tx.onabort = () => reject(tx.error);
    });
  }

  close(): void {
    this.db.close();
  }
}

export type Writer = { owner: string; revision: number };
type Metadata = {
  writer: Writer;
  deviceId: string;
  sequence: number;
  finished?: string;
};
type Saved = { snapshot: Snapshot; written: number };

export class WriterBusy extends Error {
  readonly writer: Writer;
  constructor(writer: Writer) {
    super("Another renderer owns session history");
    this.writer = writer;
  }
}

const iso = (time: number) => new Date(time).toISOString();

function flags(session: Snapshot, reason: string): string[] {
  const result: string[] = [];
  if (session.gaps.length) result.push("coverage_gap");
  if (session.gaps.some((gap) => gap.reason === "clock_changed"))
    result.push("clock_adjusted");
  if (
    reason === "suspended" ||
    session.gaps.some((gap) => gap.reason === "suspended")
  )
    result.push("suspend_detected");
  if (reason === "recovered") result.push("recovered");
  return result;
}
