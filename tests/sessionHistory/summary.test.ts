import { strict as assert } from "node:assert";
import { test } from "node:test";
import { Temporal } from "@js-temporal/polyfill";
import { summarize } from "../../app/renderer/src/features/sessionHistory/summary.ts";

const base = {
  schema_version: 1,
  source: "pomatez",
  device_id: "desktop",
  session_id: "s",
  phase: "focus",
  task_id: null,
  recorded_at: "2026-03-09T04:00:00.000Z",
};
const segment = {
  ...base,
  event_id: "a",
  sequence: 1,
  record_type: "active_segment",
  started_at: "2026-03-08T04:30:00.000Z",
  ended_at: "2026-03-08T05:30:00.000Z",
  observed_ended_at: "2026-03-08T07:30:00.000Z",
  duration_ms: 3600000,
  end_reason: "clock_changed",
  quality_flags: ["clock_adjusted"],
};
const end = {
  ...base,
  event_id: "b",
  sequence: 2,
  record_type: "session_ended",
  ended_at: "2026-03-09T04:00:00.000Z",
  status: "completed",
  end_reason: "completed",
  quality_flags: [],
};
const day = (value: string) => Temporal.PlainDate.from(value);

test("credits midnight split, uses Monday weeks and counts completion on local day", () => {
  const records = [segment, end];
  const sunday = summarize(
    records,
    day("2026-03-08"),
    "week",
    "America/New_York"
  );
  assert.equal(sunday.days[0].date, "2026-03-02");
  assert.deepEqual(
    sunday.days.slice(-2).map((d) => d.focus),
    [1800000, 1800000]
  );
  assert.equal(sunday.completed, 0);
  const monday = summarize(
    records,
    day("2026-03-09"),
    "day",
    "America/New_York"
  );
  assert.equal(monday.completed, 1);
  assert.equal(monday.ratio, null);
});

test("rejects malformed durations and unsupported schemas, deduplicates and retains interruptions", () => {
  const recovered = {
    ...end,
    phase: "short_break",
    event_id: "c",
    session_id: "b",
    sequence: 3,
    status: "interrupted",
    end_reason: "recovered",
    quality_flags: ["recovered"],
  };
  const result = summarize(
    [
      segment,
      segment,
      recovered,
      { ...segment, event_id: "bad", duration_ms: 999999999 },
      { ...end, schema_version: 2 },
    ],
    day("2026-03-08"),
    "month",
    "America/New_York"
  );
  assert.equal(result.focus, 3600000);
  assert.equal(result.interrupted, 1);
  assert.equal(result.completed, 0);
  assert.equal(result.ignored, 2);
});

test("DST days use local boundaries and aggregate all break phases", () => {
  const zone = "America/New_York";
  for (const [date, hours] of [
    ["2026-03-08", 23],
    ["2026-11-01", 25],
  ] as const) {
    const local = day(date);
    const start = local.toZonedDateTime(zone).epochMilliseconds;
    const finish = local.add({ days: 1 }).toZonedDateTime(zone)
      .epochMilliseconds;
    const records = ["short_break", "long_break", "special_break"].map(
      (phase, i) => ({
        ...segment,
        phase,
        event_id: phase,
        sequence: i + 1,
        duration_ms: 60000,
        started_at: new Date(finish - 30000).toISOString(),
        ended_at: new Date(finish + 30000).toISOString(),
      })
    );
    const result = summarize(records, local, "day", zone);
    assert.equal(result.days[0].end - start, hours * 3600000);
    assert.equal(result.breaks, 90000);
    assert.equal(result.ratio, 0);
    assert.equal(
      summarize(records, local.add({ days: 1 }), "day", zone).breaks,
      90000
    );
  }
});
