import { decode, periodDays } from "./summary";
import type { Range } from "./summary";
import { Temporal } from "@js-temporal/polyfill";

const common = [
  "schema_version",
  "source",
  "device_id",
  "session_id",
  "phase",
  "task_id",
  "recorded_at",
  "event_id",
  "sequence",
  "record_type",
];
const fields = {
  start: ["started_at", "configured_duration_ms", "round"],
  segment: [
    "started_at",
    "ended_at",
    "observed_ended_at",
    "duration_ms",
    "end_reason",
    "quality_flags",
  ],
  end: ["ended_at", "status", "end_reason", "quality_flags"],
};
const lexical = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);
const utc = (milliseconds: number) =>
  new Date(milliseconds).toISOString();

export function makeExport(
  records: readonly unknown[],
  coverage: readonly unknown[],
  scope: { date: Temporal.PlainDate; range: Range; zone: string }
) {
  const days = periodDays(scope.date, scope.range, scope.zone);
  const first = days[0];
  const last = days[days.length - 1];
  const inPeriod = (time: number) =>
    time >= first.start && time < last.end;
  const sessions = new Set<string>();
  const byId = new Map<
    string,
    {
      event: NonNullable<ReturnType<typeof decode>>;
      line: string;
      sequence: number;
      device: string;
      session: string;
    }
  >();
  let ignored = 0;
  for (const record of records) {
    const event = decode(record);
    if (!event) {
      ignored++;
      continue;
    }
    const row = record as Record<string, unknown>;
    // Allowlist schema fields, protecting against accidental private metadata.
    const line = JSON.stringify(
      Object.fromEntries(
        [...common, ...fields[event.kind]].map((key) => [key, row[key]])
      )
    );
    const previous = byId.get(event.key);
    if (previous) {
      if (previous.line !== line)
        throw new Error("Conflicting session history records");
      continue;
    }
    byId.set(event.key, {
      event,
      line,
      sequence: row.sequence as number,
      device: row.device_id as string,
      session: row.session_id as string,
    });
    const touches =
      event.kind === "segment"
        ? event.end > first.start && event.start < last.end
        : event.kind === "end"
        ? inPeriod(event.end)
        : inPeriod(Date.parse(row.started_at as string));
    if (touches) sessions.add(event.session);
  }

  const selected = Array.from(byId.values())
    .filter((value) => sessions.has(value.event.session))
    .sort(
      (a, b) =>
        lexical(a.device, b.device) ||
        a.sequence - b.sequence ||
        lexical(a.event.key, b.event.key)
    );
  const header = {
    record_type: "export_header",
    export_version: 1,
    source: "pomatez",
    reporting_timezone: scope.zone,
    range: scope.range,
    first_date: first.date,
    last_date: last.date,
    start_at: utc(first.start),
    end_at: utc(last.end),
    event_count: selected.length,
    ignored_records: ignored,
  };
  const bySessionId = new Map<string, Set<string>>();
  for (const event of selected) {
    const devices = bySessionId.get(event.session) ?? new Set<string>();
    devices.add(event.device);
    bySessionId.set(event.session, devices);
  }
  const gaps = new Set<string>();
  let ignoredCoverage = 0;
  for (const row of coverage) {
    if (!row || typeof row !== "object") {
      ignoredCoverage++;
      continue;
    }
    const { sessionId, gaps: entries } = row as {
      sessionId?: string;
      gaps?: unknown[];
    };
    if (typeof sessionId !== "string" || !Array.isArray(entries)) {
      ignoredCoverage++;
      continue;
    }
    const devices = bySessionId.get(sessionId);
    if (!devices) continue;
    if (devices.size !== 1)
      throw new Error("Ambiguous session identity for coverage");
    for (const item of entries) {
      const gap = item as {
        from?: number;
        to?: number;
        reason?: string;
      } | null;
      if (
        !gap ||
        typeof gap.from !== "number" ||
        typeof gap.to !== "number" ||
        ![gap.from, gap.to].every(
          (ms) =>
            Number.isSafeInteger(ms) && Math.abs(ms) <= 8640000000000000
        ) ||
        !["observation_gap", "clock_changed", "suspended"].includes(
          gap.reason ?? ""
        )
      ) {
        ignoredCoverage++;
        continue;
      }
      gaps.add(
        JSON.stringify({
          record_type: "coverage_gap",
          export_version: 1,
          source: "pomatez",
          device_id: Array.from(devices)[0],
          session_id: sessionId,
          from_at: utc(gap.from),
          to_at: utc(gap.to),
          reason: gap.reason,
        })
      );
    }
  }
  return {
    filename: `pomatez-${first.date}_${last.date}.jsonl`,
    contents:
      [
        JSON.stringify({
          ...header,
          ignored_coverage: ignoredCoverage,
        }),
        ...selected.map((value) => value.line),
        ...Array.from(gaps).sort(lexical),
      ].join("\n") + "\n",
    eventCount: selected.length,
    ignored: ignored + ignoredCoverage,
  };
}
