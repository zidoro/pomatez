import { Temporal } from "@js-temporal/polyfill";

export type Range = "day" | "week" | "month";
const phases = ["focus", "short_break", "long_break", "special_break"];
const terminalReasons = [
  "completed",
  "skipped",
  "reset",
  "quit",
  "recovered",
  "special_break",
  "config_changed",
];
const segmentReasons = [
  ...terminalReasons,
  "paused",
  "suspended",
  "clock_changed",
  "observation_gap",
];
const flags = [
  "recovered",
  "clock_adjusted",
  "coverage_gap",
  "suspend_detected",
];
const iso = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
function instant(value: unknown) {
  if (typeof value !== "string" || !iso.test(value)) return NaN;
  try {
    return Temporal.Instant.from(value).epochMilliseconds;
  } catch {
    return NaN;
  }
}
const id = (value: unknown): value is string =>
  typeof value === "string" && value.length > 0 && value.length <= 128;
const positive = (value: unknown): value is number =>
  typeof value === "number" && Number.isSafeInteger(value) && value > 0;

function decode(value: unknown) {
  if (!value || typeof value !== "object") return;
  const r = value as Record<string, unknown>;
  if (
    r.schema_version !== 1 ||
    r.source !== "pomatez" ||
    !id(r.device_id) ||
    !id(r.session_id) ||
    !id(r.event_id) ||
    !positive(r.sequence) ||
    !Number.isFinite(instant(r.recorded_at)) ||
    (r.task_id !== null && !id(r.task_id)) ||
    typeof r.phase !== "string" ||
    !phases.includes(r.phase)
  )
    return;
  const common = {
    key: JSON.stringify([r.device_id, r.event_id]),
    session: JSON.stringify([r.device_id, r.session_id]),
    phase: r.phase,
  };
  if (r.record_type === "session_started") {
    return Number.isFinite(instant(r.started_at)) &&
      positive(r.configured_duration_ms) &&
      (r.round === null || positive(r.round))
      ? { ...common, kind: "start" as const }
      : undefined;
  }
  if (
    !Array.isArray(r.quality_flags) ||
    !r.quality_flags.every((f) => flags.includes(f)) ||
    new Set(r.quality_flags).size !== r.quality_flags.length
  )
    return;
  const end = instant(r.ended_at);
  if (!Number.isFinite(end) || typeof r.end_reason !== "string") return;
  if (r.record_type === "active_segment") {
    const start = instant(r.started_at);
    if (
      !positive(r.duration_ms) ||
      end - start !== r.duration_ms ||
      !Number.isFinite(instant(r.observed_ended_at)) ||
      !segmentReasons.includes(r.end_reason)
    )
      return;
    return {
      ...common,
      kind: "segment" as const,
      start,
      end,
      flagged: r.quality_flags.length > 0,
    };
  }
  if (
    r.record_type === "session_ended" &&
    terminalReasons.includes(r.end_reason) &&
    r.status ===
      (r.end_reason === "completed" ? "completed" : "interrupted")
  ) {
    return {
      ...common,
      kind: "end" as const,
      end,
      status: r.status,
      reason: r.end_reason,
      flags: r.quality_flags as string[],
    };
  }
}

export function summarize(
  records: readonly unknown[],
  date: Temporal.PlainDate,
  range: Range,
  zone: string
) {
  const first =
    range === "week"
      ? date.subtract({ days: date.dayOfWeek - 1 })
      : range === "month"
      ? date.with({ day: 1 })
      : date;
  const count =
    range === "week" ? 7 : range === "month" ? first.daysInMonth : 1;
  const startOf = (offset: number) =>
    first.add({ days: offset }).toZonedDateTime(zone).epochMilliseconds;
  const days = Array.from({ length: count }, (_, i) => ({
    date: first.add({ days: i }).toString(),
    start: startOf(i),
    end: startOf(i + 1),
    focus: 0,
    breaks: 0,
  }));
  const from = days[0].start;
  const until = days[days.length - 1].end;
  const seen = new Set<string>();
  const outcomes = new Map<
    string,
    Extract<NonNullable<ReturnType<typeof decode>>, { kind: "end" }>
  >();
  const creditedBySession = new Map<string, number>();
  let ignored = 0;
  let flagged = false;
  for (const value of records) {
    const event = decode(value);
    if (!event) {
      ignored++;
      continue;
    }
    if (seen.has(event.key)) continue;
    seen.add(event.key);
    if (event.kind === "segment") {
      creditedBySession.set(
        event.session,
        (creditedBySession.get(event.session) ?? 0) +
          event.end -
          event.start
      );
    }
    if (
      event.kind === "segment" &&
      event.end > from &&
      event.start < until
    ) {
      flagged = flagged || event.flagged;
      for (const day of days) {
        const credited = Math.max(
          0,
          Math.min(day.end, event.end) -
            Math.max(day.start, event.start)
        );
        if (event.phase === "focus") day.focus += credited;
        else day.breaks += credited;
      }
    } else if (
      event.kind === "end" &&
      event.end >= from &&
      event.end < until &&
      !outcomes.has(event.session)
    ) {
      outcomes.set(event.session, event);
    }
  }
  const sessions = Array.from(outcomes.values(), (outcome) => ({
    ...outcome,
    credited: creditedBySession.get(outcome.session) ?? 0,
  })).sort((a, b) => b.end - a.end);
  const focus = days.reduce((total, day) => total + day.focus, 0);
  const breaks = days.reduce((total, day) => total + day.breaks, 0);
  return {
    days,
    focus,
    breaks,
    ratio: breaks ? focus / breaks : null,
    ignored,
    sessions,
    completed: sessions.filter(
      (s) => s.phase === "focus" && s.status === "completed"
    ).length,
    interrupted: sessions.filter((s) => s.status === "interrupted")
      .length,
    flagged: flagged || sessions.some((s) => s.flags.length > 0),
  };
}

export function shiftDate(
  date: Temporal.PlainDate,
  range: Range,
  direction: number
) {
  return range === "month"
    ? date.add({ months: direction })
    : date.add({ days: direction * (range === "week" ? 7 : 1) });
}
