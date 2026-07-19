import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Panel, Badge, StatCard } from "@/components/ui-primitives";
import { sosCases } from "@/lib/mock";
import { Siren, Phone, MapPin, Clock, ShieldCheck, Zap, Filter } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/sos")({
  head: () => ({
    meta: [
      { title: "SOS Queue · Cyclone C2" },
      { name: "description", content: "Verified SOS requests with priority scoring, GPS, and one-click dispatch." },
    ],
  }),
  component: SOSQueue,
});

const FILTERS = ["All", "CRITICAL", "HIGH", "MEDIUM", "LOW"] as const;

function SOSQueue() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [selected, setSelected] = useState(sosCases[0].id);
  const visible = filter === "All" ? sosCases : sosCases.filter((s) => s.priority === filter);
  const active = sosCases.find((s) => s.id === selected)!;

  return (
    <AppShell
      title="SOS Queue"
      subtitle="Verified emergency requests · zero-click dispatch active for CRITICAL"
    >
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Active cases"     value="12" intent="critical" icon={<Siren className="h-5 w-5" />} hint="+3 in last hour" />
        <StatCard label="Auto-dispatched"  value="4"  intent="success"  icon={<Zap className="h-5 w-5" />} hint="Avg 1.8s to team assign" />
        <StatCard label="Awaiting verify"  value="2"  intent="warning"  icon={<ShieldCheck className="h-5 w-5" />} hint="OTP callback pending" />
        <StatCard label="Median response"  value="1m 47s" intent="success" icon={<Clock className="h-5 w-5" />} hint="Target: < 2 min" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-5">
        <Panel
          title="Queue"
          description={`${visible.length} of ${sosCases.length} cases`}
          className="xl:col-span-3"
          action={
            <div className="flex items-center gap-1 rounded-md border border-border bg-surface p-0.5">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "rounded px-2.5 py-1 text-[11px] font-semibold transition-colors",
                    filter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          }
        >
          <ul className="divide-y divide-border">
            {visible.map((s) => {
              const isSelected = s.id === selected;
              return (
                <li key={s.id}>
                  <button
                    onClick={() => setSelected(s.id)}
                    className={cn(
                      "flex w-full items-start gap-4 px-1 py-4 text-left transition-colors",
                      isSelected ? "bg-primary/5" : "hover:bg-muted/40"
                    )}
                  >
                    <div className={cn(
                      "grid h-10 w-10 shrink-0 place-items-center rounded-lg text-sm font-bold",
                      s.priority === "CRITICAL" ? "bg-critical text-critical-foreground" :
                      s.priority === "HIGH" ? "bg-warning text-warning-foreground" :
                      s.priority === "MEDIUM" ? "bg-info text-info-foreground" : "bg-muted text-muted-foreground"
                    )}>
                      {s.score}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-muted-foreground">{s.id}</span>
                        <Badge intent={s.priority === "CRITICAL" ? "critical" : s.priority === "HIGH" ? "warning" : s.priority === "MEDIUM" ? "info" : "neutral"}>{s.priority}</Badge>
                        <Badge intent={s.status === "auto-dispatched" ? "success" : s.status === "verifying" ? "warning" : "neutral"}>{s.status}</Badge>
                      </div>
                      <div className="mt-0.5 flex items-center gap-2 text-sm font-semibold text-foreground">
                        {s.name} <span className="text-muted-foreground font-normal">· age {s.age}</span>
                      </div>
                      <div className="mt-0.5 truncate text-xs text-muted-foreground">{s.reason}</div>
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="text-xs font-semibold text-foreground">Zone {s.zone}</div>
                      <div className="text-[11px] text-muted-foreground">{s.ts}</div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </Panel>

        <Panel title="Case detail" description={active.id} className="xl:col-span-2">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold text-foreground">{active.name}</div>
                <div className="text-xs text-muted-foreground">Age {active.age} · Zone {active.zone}</div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold tabular-nums text-foreground">{active.score}</div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Priority score</div>
              </div>
            </div>

            <div className="rounded-md border border-critical/20 bg-critical/5 p-3">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-critical">Reason</div>
              <div className="mt-1 text-sm text-foreground">{active.reason}</div>
            </div>

            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"><Phone className="h-3 w-3" /> Phone</dt>
                <dd className="mt-0.5 font-mono text-foreground">{active.phone}</dd>
              </div>
              <div>
                <dt className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"><MapPin className="h-3 w-3" /> GPS</dt>
                <dd className="mt-0.5 font-mono text-foreground">19.813°, 85.831°</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Verification</dt>
                <dd className="mt-0.5"><Badge intent="success">SMS confirmed</Badge></dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Assigned team</dt>
                <dd className="mt-0.5 font-semibold text-foreground">{active.team}</dd>
              </div>
            </dl>

            <div>
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Timeline</div>
              <ol className="space-y-3 border-l border-border pl-4">
                {[
                  { t: "12s ago", label: "Auto-dispatched to RESCUE-07", ok: true },
                  { t: "18s ago", label: "SMS verification: YES", ok: true },
                  { t: "24s ago", label: "SOS triggered (triple power press)", ok: true },
                ].map((e) => (
                  <li key={e.label} className="relative">
                    <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-success ring-4 ring-success/15" />
                    <div className="text-sm font-medium text-foreground">{e.label}</div>
                    <div className="text-xs text-muted-foreground">{e.t}</div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Reassign team</button>
              <button className="rounded-md border border-border bg-surface px-3 py-2 text-sm font-semibold hover:bg-accent">Mark resolved</button>
            </div>
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
