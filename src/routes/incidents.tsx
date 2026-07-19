import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Panel, Badge, StatCard } from "@/components/ui-primitives";
import { incidents } from "@/lib/mock";
import { Activity, AlertTriangle, TrendingUp, Filter, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/incidents")({
  head: () => ({
    meta: [
      { title: "Incident Feed · Cyclone C2" },
      { name: "description", content: "Unified incident command feed with priority scoring and AI insights." },
    ],
  }),
  component: IncidentFeed,
});

const LEVELS = ["ALL", "CRITICAL", "HIGH", "MEDIUM", "LOW"] as const;

function IncidentFeed() {
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("ALL");
  const visible = level === "ALL" ? incidents : incidents.filter((i) => i.level === level);

  return (
    <AppShell title="Unified Incident Feed" subtitle="All events · priority-scored · real-time">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Active events" value="47" intent="critical" icon={<Activity className="h-5 w-5" />} hint="+12 in last 30 min" />
        <StatCard label="Critical"      value="6"  intent="critical" icon={<AlertTriangle className="h-5 w-5" />} />
        <StatCard label="Auto-actions"  value="18" intent="success"  icon={<TrendingUp className="h-5 w-5" />} hint="Executed w/o officer" />
        <StatCard label="Acknowledged"  value="34" intent="neutral"  icon={<Filter className="h-5 w-5" />} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel
          title="Feed"
          description={`${visible.length} events`}
          className="xl:col-span-2"
          action={
            <div className="flex items-center gap-1 rounded-md border border-border bg-surface p-0.5">
              {LEVELS.map((l) => (
                <button key={l} onClick={() => setLevel(l)} className={cn(
                  "rounded px-2.5 py-1 text-[11px] font-semibold transition-colors",
                  level === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                )}>
                  {l}
                </button>
              ))}
            </div>
          }
        >
          <ol className="relative">
            {visible.map((i, idx) => (
              <li key={i.id} className="relative flex gap-4 pb-6 last:pb-0">
                {idx < visible.length - 1 && <span className="absolute left-[19px] top-10 h-full w-px bg-border" />}
                <div className={cn(
                  "z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full text-[11px] font-bold ring-4",
                  i.level === "CRITICAL" && "bg-critical text-critical-foreground ring-critical/15",
                  i.level === "HIGH" && "bg-warning text-warning-foreground ring-warning/15",
                  i.level === "MEDIUM" && "bg-info text-info-foreground ring-info/15",
                  i.level === "LOW" && "bg-muted text-muted-foreground ring-border",
                )}>
                  {i.priority}
                </div>
                <div className="min-w-0 flex-1 rounded-lg border border-border bg-surface p-3.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[11px] text-muted-foreground">{i.id}</span>
                    <Badge intent={i.level === "CRITICAL" ? "critical" : i.level === "HIGH" ? "warning" : i.level === "MEDIUM" ? "info" : "neutral"}>{i.type}</Badge>
                    <span className="text-[11px] text-muted-foreground">Zone {i.zone} · {i.ts} ago</span>
                  </div>
                  <div className="mt-1 text-sm font-semibold text-foreground">{i.title}</div>
                  <div className="mt-1 text-xs text-muted-foreground">↳ {i.action}</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-semibold hover:bg-accent">Acknowledge</button>
                    <button className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-semibold hover:bg-accent">Assign</button>
                    <button className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-semibold hover:bg-accent">Escalate</button>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Panel>

        <div className="space-y-6">
          <Panel title="AI Insights" description="Patterns detected across events"
            action={<Badge intent="primary"><Sparkles className="h-3 w-3" /> Live</Badge>}
          >
            <ul className="space-y-3 text-sm">
              {[
                { intent: "critical" as const, title: "Resource overload risk",
                  body: "10 CRITICAL events active in Zone A within 12 min — likely surge water arrival. Recommend deploying reserve teams." },
                { intent: "warning" as const, title: "Water shortage cluster",
                  body: "Drinking water < 30% at S-03, S-02, S-01 (all Zone A). Auto-preposition triggered from WH-01." },
                { intent: "info" as const, title: "Response time drift",
                  body: "5 SOS responses exceeded 15-min target in the last hour. Traffic on NH-316 is the primary cause." },
              ].map((ins) => (
                <li key={ins.title} className={cn(
                  "rounded-md border p-3",
                  ins.intent === "critical" && "border-critical/25 bg-critical/5",
                  ins.intent === "warning" && "border-warning/25 bg-warning/5",
                  ins.intent === "info" && "border-info/25 bg-info/5",
                )}>
                  <div className="text-xs font-semibold text-foreground">{ins.title}</div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{ins.body}</p>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Volume by type" description="Last 60 min">
            <ul className="space-y-2 text-sm">
              {[
                { t: "SOS", n: 12 },
                { t: "Public Reports", n: 18 },
                { t: "Medical", n: 5 },
                { t: "Resource", n: 4 },
                { t: "Road / Infra", n: 6 },
                { t: "Weather", n: 2 },
              ].map((r) => (
                <li key={r.t} className="flex items-center gap-3">
                  <span className="w-28 shrink-0 text-xs text-muted-foreground">{r.t}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-secondary" style={{ width: `${(r.n / 18) * 100}%` }} />
                  </div>
                  <span className="w-6 text-right text-xs font-semibold tabular-nums">{r.n}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}
