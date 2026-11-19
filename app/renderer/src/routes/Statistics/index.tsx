import React, { useEffect, useMemo, useState } from "react";
import { Temporal } from "@js-temporal/polyfill";
import { StyledSettings } from "styles";
import { Repository } from "../../features/sessionHistory/repository";
import {
  shiftDate,
  summarize,
} from "../../features/sessionHistory/summary";
import { Range } from "../../features/sessionHistory/summary";
import { makeExport } from "../../features/sessionHistory/export";
import { saveExport } from "../../features/sessionHistory/saveExport";
import HistoryReport from "./HistoryReport";
import { ReportState } from "./HistoryReport";
import "./statistics.css";

const zoneKey = "pomatez.reporting-time-zone";
function validZone(zone: string) {
  if (!zone || /^[+-]/.test(zone)) return false;
  try {
    new Intl.DateTimeFormat(undefined, { timeZone: zone });
    return true;
  } catch {
    return false;
  }
}
function initialZone() {
  const systemZone = Temporal.Now.timeZoneId();
  try {
    const saved = localStorage.getItem(zoneKey);
    if (saved && validZone(saved)) return saved;
    localStorage.setItem(zoneKey, systemZone);
  } catch {
    /* The current view remains usable without writable settings. */
  }
  return systemZone;
}

type ReadState =
  | { kind: "ready"; records: unknown[]; coverage: unknown[] }
  | { kind: "error" }
  | { kind: "loading" };

export default function Statistics() {
  const [zone, setZone] = useState(initialZone);
  const [zoneText, setZoneText] = useState(zone);
  const [zoneError, setZoneError] = useState("");
  const [date, setDate] = useState(() =>
    Temporal.Now.plainDateISO(zone)
  );
  const [range, setRange] = useState<Range>("week");
  const [reading, setReading] = useState<ReadState>({
    kind: "loading",
  });
  const [saving, setSaving] = useState(false);
  const [exportMessage, setExportMessage] = useState("");
  const [exportError, setExportError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    setExportMessage("");
    setExportError(false);
  }, [date, range, zone, attempt]);

  useEffect(() => {
    let cancelled = false;
    let repository: Repository | undefined;
    const timeout = window.setTimeout(() => {
      if (!cancelled) setReading({ kind: "error" });
    }, 10000);
    async function read() {
      try {
        repository = await Repository.open(
          indexedDB,
          "pomatez-session-history"
        );
        if (cancelled) return;
        const history = await repository.readHistory();
        if (!cancelled) setReading({ kind: "ready", ...history });
      } catch {
        if (!cancelled) setReading({ kind: "error" });
      } finally {
        repository?.close();
        window.clearTimeout(timeout);
      }
    }
    void read();
    return () => {
      cancelled = true;
      repository?.close();
      window.clearTimeout(timeout);
    };
  }, [attempt]);
  const report = useMemo(
    () =>
      reading.kind === "ready"
        ? summarize(reading.records, date, range, zone)
        : null,
    [reading, date, range, zone]
  );
  const state: ReportState = report
    ? { kind: "ready", report }
    : { kind: reading.kind === "error" ? "error" : "loading" };
  const refresh = () => {
    setReading({ kind: "loading" });
    setAttempt((value) => value + 1);
  };

  const exportPeriod = async () => {
    if (saving || reading.kind !== "ready") return;
    setSaving(true);
    setExportMessage("");
    setExportError(false);
    try {
      const file = makeExport(reading.records, reading.coverage, {
        date,
        range,
        zone,
      });
      if (!file.eventCount) {
        setExportMessage(
          file.ignored
            ? "No valid session records to export."
            : "No session records in this period."
        );
        return;
      }
      if (
        new TextEncoder().encode(file.contents).byteLength >
        32 * 1024 * 1024
      ) {
        setExportError(true);
        setExportMessage(
          "This export exceeds 32 MiB. Select a shorter period."
        );
        return;
      }
      const result = await saveExport(file.filename, file.contents);
      if (result.status === "saved") {
        setExportMessage(
          "Saved " +
            result.path +
            (file.ignored
              ? ". Skipped " +
                file.ignored +
                " damaged or unsupported entries."
              : ".")
        );
      } else if (result.status === "cancelled") {
        setExportMessage("Export cancelled.");
      } else {
        setExportError(true);
        setExportMessage(
          "A file with that name already exists. Choose a different filename."
        );
      }
    } catch (error) {
      setExportError(true);
      setExportMessage(
        error instanceof Error &&
          /Conflicting|Ambiguous/.test(error.message)
          ? "Session history has conflicting records. No file was saved."
          : "Could not save JSONL. Check the destination and try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <StyledSettings className="history-page">
      <h1>Statistics</h1>
      <div className="history-controls">
        <label>
          Range{" "}
          <select
            value={range}
            onChange={(e) => setRange(e.target.value as Range)}
          >
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </label>
        <button onClick={refresh}>Refresh</button>
      </div>
      <div className="history-controls">
        <button
          aria-label="Previous period"
          onClick={() => setDate(shiftDate(date, range, -1))}
        >
          ‹
        </button>
        <span aria-live="polite">
          {report
            ? report.days[0].date +
              (report.days.length > 1
                ? " – " + report.days[report.days.length - 1].date
                : "")
            : date.toString()}
        </span>
        <button
          aria-label="Next period"
          onClick={() => setDate(shiftDate(date, range, 1))}
        >
          ›
        </button>
        <button
          onClick={() => setDate(Temporal.Now.plainDateISO(zone))}
        >
          Today
        </button>
      </div>
      <form
        className="history-controls"
        onSubmit={(event) => {
          event.preventDefault();
          const selected = zoneText.trim();
          if (!validZone(selected)) {
            setZoneError(
              "Enter an IANA timezone, such as Europe/Paris."
            );
            return;
          }
          setZone(selected);
          setZoneText(selected);
          try {
            localStorage.setItem(zoneKey, selected);
            setZoneError("");
          } catch {
            setZoneError(
              "Timezone changed for this view. It could not be saved."
            );
          }
        }}
      >
        <label>
          Reporting timezone{" "}
          <input
            value={zoneText}
            onChange={(e) => setZoneText(e.target.value)}
          />
        </label>
        <button type="submit">Apply</button>
      </form>
      {zoneError && <p role="status">{zoneError}</p>}
      <div className="history-controls">
        <button
          disabled={reading.kind !== "ready" || saving}
          onClick={() => void exportPeriod()}
        >
          {saving ? "Exporting…" : "Export JSONL"}
        </button>
        <span>
          Selected period in {zone}.{" "}
          {window.electron?.saveHistoryJsonl
            ? "Choose where to save."
            : "Saves to Downloads."}
        </span>
      </div>
      {exportMessage && (
        <p
          className="history-export-message"
          role={exportError ? "alert" : "status"}
        >
          {exportMessage}
        </p>
      )}
      <HistoryReport state={state} zone={zone} retry={refresh} />
    </StyledSettings>
  );
}
