export type Segment = {
  startedAt: number;
  endedAt: number;
  duration: number;
  reason: string;
  observedAt?: number;
};
export type Gap = { from: number; to: number; reason: string };

/** Isolated elapsed-time accounting. Persistence and timer integration are separate. */
export class Tracker {
  readonly segments: Segment[] = [];
  readonly gaps: Gap[] = [];
  status: "active" | "paused" | "completed" | "interrupted" = "paused";
  private anchorWall = 0;
  private anchorMono = 0;
  private lastWall = 0;
  private startedAt: number | undefined;
  private endedAt = 0;
  private reason = "";
  private elapsed = 0;
  private activeLimit = Infinity;
  private fraction = 0;
  private suspendedAt: number | undefined;
  private lastMono = 0;

  readonly phase: string;
  readonly sessionId: string;
  readonly configuredMs: number;
  readonly round: number;
  constructor(
    phase: string,
    sessionId: string,
    configuredMs = 1500000,
    round = 1
  ) {
    this.phase = phase;
    this.configuredMs = configuredMs;
    this.round = round;
    this.sessionId = sessionId;
  }

  start(
    wall: number,
    mono: number,
    remaining = this.configuredMs
  ): void {
    if (this.status !== "paused") return;
    this.startedAt ??= wall;
    this.activeLimit = remaining;
    this.anchorWall = this.lastWall = wall;
    this.anchorMono = this.lastMono = mono;
    this.status = "active";
  }

  suspend(wall: number, mono: number): void {
    if (this.status !== "active" || this.suspendedAt !== undefined)
      return;
    this.sample(wall, mono);
    this.close("suspended");
    this.suspendedAt = wall;
    this.anchorWall = wall;
    this.anchorMono = mono;
  }

  resumeFromSleep(wall: number, mono: number, remaining: number): void {
    if (this.suspendedAt === undefined) return;
    this.gaps.push({
      from: this.suspendedAt,
      to: wall,
      reason: "suspended",
    });
    this.suspendedAt = undefined;
    this.anchorWall = this.lastWall = wall;
    this.anchorMono = this.lastMono = mono;
    this.activeLimit = remaining;
  }

  sample(wall: number, mono: number): void {
    if (this.status !== "active" || this.suspendedAt !== undefined)
      return;
    const wallDelta = wall - this.lastWall;
    const monoDelta = mono - this.lastMono;
    const clockChanged =
      wallDelta < 0 || Math.abs(wallDelta - monoDelta) > 1000;
    if (
      wallDelta < 0 ||
      monoDelta < 0 ||
      wallDelta > 5000 ||
      monoDelta > 5000 ||
      Math.abs(wall - (this.anchorWall + mono - this.anchorMono)) > 1000
    ) {
      const reason = clockChanged ? "clock_changed" : "observation_gap";
      this.close(reason);
      this.gaps.push({ from: this.lastWall, to: wall, reason });
      this.activeLimit = Math.max(
        0,
        this.activeLimit - Math.max(0, wallDelta)
      );
      this.anchorWall = wall;
      this.anchorMono = mono;
    }
    this.lastWall = wall;
    this.lastMono = mono;
  }

  pause(wall: number, mono: number): void {
    if (this.status !== "active") return;
    this.sample(wall, mono);
    this.close("paused");
    this.status = "paused";
  }

  end(wall: number, mono: number, reason: string): void {
    if (this.status === "completed" || this.status === "interrupted")
      return;
    if (this.status === "active") {
      this.sample(wall, mono);
      this.close(reason);
    }
    this.endedAt = wall;
    this.reason = reason;
    this.status = reason === "completed" ? "completed" : "interrupted";
  }

  snapshot() {
    return {
      phase: this.phase,
      sessionId: this.sessionId,
      configuredMs: this.configuredMs,
      round: this.round,
      startedAt: this.startedAt,
      endedAt: this.endedAt,
      reason: this.reason,
      status: this.status,
      observedAt: this.lastWall,
      segments: [...this.segments],
      gaps: [...this.gaps],
      active:
        this.status === "active" ? this.segment("recovered") : null,
    };
  }

  private segment(reason: string): Segment {
    const duration = Math.floor(this.measured() + this.fraction);
    return {
      startedAt: this.anchorWall,
      endedAt: this.anchorWall + duration,
      duration,
      reason,
      observedAt: this.lastWall,
    };
  }

  private measured() {
    return Math.max(
      0,
      Math.min(
        this.lastMono - this.anchorMono,
        this.activeLimit,
        this.configuredMs - this.elapsed
      )
    );
  }

  private close(reason: string): void {
    const segment = this.segment(reason);
    const measured = this.measured();
    this.fraction += measured - segment.duration;
    this.elapsed += segment.duration;
    this.activeLimit = Math.max(0, this.activeLimit - measured);
    if (segment.duration) this.segments.push(segment);
  }
}

export type Snapshot = ReturnType<Tracker["snapshot"]>;
