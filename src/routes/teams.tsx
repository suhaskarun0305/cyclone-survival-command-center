import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Panel, Badge, StatCard } from "@/components/ui-primitives";
import { teams } from "@/lib/mock";
import { Users, Radio, MapPin, Timer } from "lucide-react";

export const Route = createFileRoute("/teams")({
  head: () => ({
    meta: [{ title: "Rescue Teams · Cyclone C2" }, { name: "description", content: "Rescue team status, deployment, and live tracking." }],
  }),
  component: TeamsPage,
});

function TeamsPage() {
  return (
    <AppShell title="Rescue Team Tracking" subtitle={`${teams.length} units · NDRF, ODRAF, Fire, Coast Guard`}>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total units" value={teams.length}                     intent="neutral"  icon={<Users className="h-5 w-5" />} />
        <StatCard label="Available"   value={teams.filter(t=>t.status==="available").length}  intent="success"  icon={<Radio className="h-5 w-5" />} />
        <StatCard label="En route"    value={teams.filter(t=>t.status==="en-route").length}   intent="warning"  icon={<Timer className="h-5 w-5" />} />
        <StatCard label="On scene"    value={teams.filter(t=>t.status==="on-scene").length}   intent="critical" icon={<MapPin className="h-5 w-5" />} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {teams.map((t) => (
          <div key={t.id} className="panel p-5">
            <div className="flex items-center justify-between">
              <Badge intent={t.status === "on-scene" ? "critical" : t.status === "en-route" ? "warning" : "success"}>
                {t.status.toUpperCase()}
              </Badge>
              <span className="font-mono text-xs text-muted-foreground">{t.id}</span>
            </div>
            <h3 className="mt-3 text-base font-semibold text-foreground">{t.name}</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">{t.capacity}</p>

            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Zone</dt>
                <dd className="mt-0.5 font-semibold text-foreground">Zone {t.zone}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">ETA</dt>
                <dd className="mt-0.5 font-semibold text-foreground">{t.eta}</dd>
              </div>
            </dl>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-semibold hover:bg-accent">Contact</button>
              <button className="flex-1 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90">Assign</button>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
