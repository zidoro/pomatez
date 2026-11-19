"""Independently parse an exported file and compute its period totals."""
import argparse
import json
from datetime import datetime, timedelta, timezone
from pathlib import Path
from zoneinfo import ZoneInfo


def instant(value):
    assert value.endswith("Z"), value
    stamp = datetime.fromisoformat(value[:-1] + "+00:00")
    assert stamp.tzinfo == timezone.utc
    return (stamp - datetime(1970, 1, 1, tzinfo=timezone.utc)) // timedelta(milliseconds=1)


def pairs(items):
    result = {}
    for name, value in items:
        assert name not in result, f"Duplicate JSON key: {name}"
        result[name] = value
    return result


def reject_constant(value):
    raise ValueError(f"Invalid JSON constant: {value}")


def validate(path, source=None):
    data = path.read_bytes()
    assert data.endswith(b"\n")
    rows = [json.loads(line, object_pairs_hook=pairs, parse_constant=reject_constant)
            for line in data.decode("utf-8").splitlines()]
    assert all(isinstance(row, dict) for row in rows)
    header, *records = rows
    assert header["record_type"] == "export_header" and header["export_version"] == 1
    zone = ZoneInfo(header["reporting_timezone"])
    first = datetime.fromisoformat(header["first_date"]).replace(tzinfo=zone)
    end = datetime.fromisoformat(header["last_date"]).replace(tzinfo=zone) + timedelta(days=1)
    lo, hi = instant(header["start_at"]), instant(header["end_at"])
    assert lo == instant(first.astimezone(timezone.utc).isoformat().replace("+00:00", "Z"))
    assert hi == instant(end.astimezone(timezone.utc).isoformat().replace("+00:00", "Z"))
    if header["range"] == "week":
        assert first.weekday() == 0 and (end - first).days == 7
    elif header["range"] == "month":
        assert first.day == end.day == 1 and (end - first).days in range(28, 32)
    else:
        assert header["range"] == "day" and (end - first).days == 1

    events = [r for r in records if r["record_type"] != "coverage_gap"]
    gaps = [r for r in records if r["record_type"] == "coverage_gap"]
    assert records == events + gaps and len(events) == header["event_count"]
    ids = [(e["device_id"], e["event_id"]) for e in events]
    assert len(set(ids)) == len(ids)
    assert events == sorted(events, key=lambda e: (e["device_id"], e["sequence"], e["event_id"]))
    assert all(e["schema_version"] == 1 and e["source"] == "pomatez" for e in events)
    session = lambda row: (row["device_id"], row["session_id"])
    selected = {session(e) for e in events}
    for gap in gaps:
        assert gap["export_version"] == 1 and gap["source"] == "pomatez"
        assert session(gap) in selected
        instant(gap["from_at"])
        instant(gap["to_at"])
    focus = breaks = completed = interrupted = 0
    counted = set()
    for row in events:
        kind = row["record_type"]
        if kind == "active_segment":
            a, b = instant(row["started_at"]), instant(row["ended_at"])
            assert b - a == row["duration_ms"] > 0
            credited = max(0, min(hi, b) - max(lo, a))
            if row["phase"] == "focus":
                focus += credited
            else:
                breaks += credited
        elif kind == "session_ended" and lo <= instant(row["ended_at"]) < hi and session(row) not in counted:
            counted.add(session(row))
            completed += row["phase"] == "focus" and row["status"] == "completed"
            interrupted += row["status"] == "interrupted"
        else:
            assert kind in ("session_started", "session_ended")

    if source is not None:
        def touches(row):
            kind = row["record_type"]
            if kind == "active_segment":
                return instant(row["started_at"]) < hi and instant(row["ended_at"]) > lo
            field = "started_at" if kind == "session_started" else "ended_at"
            return lo <= instant(row[field]) < hi

        expected_sessions = {session(e) for e in source["records"] if touches(e)}
        assert selected == expected_sessions
        assert events == [e for e in source["records"] if session(e) in expected_sessions]
        expected = set()
        for item in source["coverage"]:
            for record in events:
                if record["session_id"] != item["sessionId"]:
                    continue
                for gap in item["gaps"]:
                    expected.add((session(record), gap["from"], gap["to"], gap["reason"]))
        assert expected == {(session(g), instant(g["from_at"]), instant(g["to_at"]), g["reason"]) for g in gaps}
    return {
        "events": len(events), "coverage_gaps": len(gaps), "focus_ms": focus,
        "break_ms": breaks, "ratio": focus / breaks if breaks else None,
        "completed_focus": completed, "interrupted": interrupted,
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("file", type=Path)
    parser.add_argument("--source", type=Path, help="Optional IndexedDB readHistory snapshot")
    parser.add_argument("--compare", type=Path, help="Require identical bytes after re-export")
    args = parser.parse_args()
    if args.compare:
        assert args.file.read_bytes() == args.compare.read_bytes()
    print(json.dumps(validate(args.file, json.loads(args.source.read_text()) if args.source else None), indent=2))
