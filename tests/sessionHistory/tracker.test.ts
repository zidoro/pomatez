import { strict as assert } from "node:assert";
import { test } from "node:test";
import { Tracker } from "../../app/renderer/src/features/sessionHistory/tracker.ts";

test("pause excludes idle time and resume retains session", () => {
  const t = new Tracker("focus", "session");
  t.start(1000, 1000);
  t.pause(2000, 2000);
  t.start(12000, 12000);
  t.end(14000, 14000, "completed");
  assert.equal(
    t.segments.reduce((n, s) => n + s.duration, 0),
    3000
  );
  assert.equal(t.segments.length, 2);
  assert.equal(t.status, "completed");
});

test("long unobserved gap is excluded and flagged", () => {
  const t = new Tracker("focus", "session");
  t.start(1000, 1000);
  t.sample(2000, 2000);
  t.sample(12000, 12000);
  t.end(13000, 13000, "reset");
  assert.equal(
    t.segments.reduce((n, s) => n + s.duration, 0),
    2000
  );
  assert.equal(t.gaps.length, 1);
  assert.equal(t.status, "interrupted");
});

test("reset while paused and repeated completion preserve terminal state", () => {
  const tracker = new Tracker("focus", "focus");
  tracker.start(1000, 0);
  tracker.pause(2000, 1000);
  tracker.end(3000, 2000, "reset");
  tracker.end(4000, 3000, "completed");
  assert.equal(tracker.snapshot().reason, "reset");
  assert.equal(tracker.segments.length, 1);
});

test("clock jump is recorded and completion is capped", () => {
  const tracker = new Tracker("focus", "focus", 2000);
  tracker.start(1000, 0);
  tracker.sample(2000, 1000);
  tracker.sample(500, 2000);
  tracker.end(3500, 5000, "completed");
  assert.equal(tracker.gaps[0].reason, "clock_changed");
  assert.equal(
    tracker.segments.reduce(
      (total, segment) => total + segment.duration,
      0
    ),
    2000
  );
});

test("native suspension excludes even a short sleep", () => {
  const tracker = new Tracker("focus", "focus");
  tracker.start(1000, 0);
  tracker.suspend(2000, 1000);
  tracker.sample(3500, 2500);
  tracker.resumeFromSleep(4000, 3000, 150000);
  tracker.end(5000, 4000, "quit");
  assert.deepEqual(
    tracker.segments.map((segment) => segment.duration),
    [1000, 1000]
  );
  assert.equal(tracker.gaps[0].reason, "suspended");
});
