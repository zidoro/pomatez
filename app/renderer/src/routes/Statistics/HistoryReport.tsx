import React from "react";
import { summarize } from "../../features/sessionHistory/summary";

export type ReportState =
  | { kind: "loading" }
  | { kind: "error" }
  | { kind: "ready"; report: ReturnType<typeof summarize> };

function duration(ms: number) {
  if (!ms) return "0 min";
  if (ms < 1000) return "<1 sec";
  const seconds = Math.floor(ms / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds / 60) % 60;
  return [
    hours && hours + " h",
    minutes && minutes + " min",
    seconds % 60 && (seconds % 60) + " sec",
  ]
    .filter(Boolean)
    .join(" ");
}

const phaseLabels: Record<string, string> = {
  focus: "Focus",
  short_break: "Short break",
  long_break: "Long break",
  special_break: "Special break",
};
const reasonLabels: Record<string, string> = {
  skipped: "Skipped",
  reset: "Reset",
  quit: "Closed",
  recovered: "Recovered after shutdown",
  special_break: "Special break started",
  config_changed: "Timer settings changed",
};

export default function HistoryReport({
  state,
  zone,
  retry,
}: {
  state: ReportState;
  zone: string;
  retry: () => void;
}) {
  if (state.kind === "loading")
    return <p role="status">Loading session history…</p>;
  if (state.kind === "error")
    return (
      <div role="alert">
        <p>Session history could not be read.</p>
        <button onClick={retry}>Retry</button>
      </div>
    );
  const { report } = state;
  const max = Math.max(
    1,
    ...report.days.map((d) => d.focus + d.breaks)
  );
  const formatTime = new Intl.DateTimeFormat(undefined, {
    timeZone: zone,
    hour: "numeric",
    minute: "2-digit",
    month: "short",
    day: "numeric",
  });
  const hasActivity = report.focus + report.breaks > 0;
  return (
    <>
      {report.ignored > 0 && (
        <p role="status">
          {report.ignored} damaged or unsupported records were skipped.
        </p>
      )}
      {report.flagged && (
        <p>
          Some sessions contain recovered time or gaps. Totals include
          only credited time.
        </p>
      )}
      {!hasActivity && report.sessions.length === 0 && (
        <p>No recorded activity in this period.</p>
      )}
      <dl className="history-totals">
        <div>
          <dt>Focus time</dt>
          <dd>{duration(report.focus)}</dd>
        </div>
        <div>
          <dt>Break time</dt>
          <dd>{duration(report.breaks)}</dd>
        </div>
        <div>
          <dt>Completed focus sessions</dt>
          <dd>{report.completed}</dd>
        </div>
        <div>
          <dt>Interrupted sessions</dt>
          <dd>{report.interrupted}</dd>
        </div>
        <div>
          <dt>Focus to break ratio</dt>
          <dd>
            {report.ratio === null
              ? "No break time"
              : report.ratio.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                }) + " : 1"}
          </dd>
        </div>
      </dl>
      {hasActivity && (
        <section aria-label="Daily credited time">
          <h2>Daily credited time</h2>
          <p className="history-legend">
            <span>Focus</span>
            <span>Break</span>
          </p>
          <ul className="history-chart">
            {report.days.map((day) => (
              <li key={day.date}>
                <time dateTime={day.date}>{day.date.slice(5)}</time>
                <div className="history-bar" aria-hidden="true">
                  <span
                    style={{ width: (day.focus / max) * 100 + "%" }}
                  />
                  <span
                    style={{ width: (day.breaks / max) * 100 + "%" }}
                  />
                </div>
                <span className="history-bar-label">
                  {duration(day.focus)} focus · {duration(day.breaks)}{" "}
                  break
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
      <section aria-label="Session history">
        <h2>Session history</h2>
        <p>
          Sessions are listed by end time. Totals include closed
          segments in this period.
        </p>
        {report.sessions.length === 0 ? (
          <p>No sessions ended in this period.</p>
        ) : (
          <ul className="history-sessions">
            {report.sessions.map((session) => (
              <li key={session.session}>
                <time dateTime={new Date(session.end).toISOString()}>
                  {formatTime.format(session.end)}
                </time>
                <strong>{phaseLabels[session.phase]}</strong>
                <span>{duration(session.credited)} credited</span>
                <span>
                  {session.status === "completed"
                    ? "Completed"
                    : "Interrupted · " + reasonLabels[session.reason]}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
