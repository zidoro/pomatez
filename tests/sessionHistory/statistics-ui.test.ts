import { strict as assert } from "node:assert";
import { test } from "node:test";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { buildSync } from "esbuild";
import React from "react";
import ReactDOMServer from "react-dom/server.js";
const { renderToStaticMarkup } = ReactDOMServer;
import { Temporal } from "@js-temporal/polyfill";
import { summarize } from "../../app/renderer/src/features/sessionHistory/summary.ts";

const [{ text }] = buildSync({
  entryPoints: [
    fileURLToPath(
      new URL(
        "../../app/renderer/src/routes/Statistics/HistoryReport.tsx",
        import.meta.url
      )
    ),
  ],
  bundle: true,
  external: ["react"],
  format: "cjs",
  write: false,
}).outputFiles;
const view = { exports: {} };
new Function("module", "exports", "require", text)(
  view,
  view.exports,
  createRequire(import.meta.url)
);
// The isolated component uses the same React instance as the application.
const HistoryReport = (
  view.exports as {
    default: React.ComponentType<any>;
  }
).default;

test("history reports loading, retry, empty period, and unsupported data", () => {
  const render = (state: unknown) =>
    renderToStaticMarkup(
      React.createElement(HistoryReport, {
        state,
        zone: "UTC",
        retry() {},
      })
    );
  assert.match(
    render({ kind: "loading" }),
    /role="status".*Loading session history/
  );
  assert.match(render({ kind: "error" }), /role="alert".*Retry/);
  const report = summarize(
    [{ schema_version: 2 }],
    Temporal.PlainDate.from("2026-11-19"),
    "day",
    "UTC"
  );
  const empty = render({ kind: "ready", report });
  assert.match(empty, /damaged or unsupported/);
  assert.match(empty, /No recorded activity/);
  assert.match(empty, /No break time/);
  assert.doesNotMatch(empty, /history-chart/);
});
