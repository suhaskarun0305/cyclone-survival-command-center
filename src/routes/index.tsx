import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { StatCard, Panel, Badge, ProgressBar } from "@/components/ui-primitives";
import { StylizedMap } from "@/components/stylized-map";
import { cyclone, zones, incidents, shelters, resourceInventory, teams, evacuationTrend } from "@/lib/mock";
import { Siren, Users, Building2, Package, Wind, Droplets, Activity, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Area, AreaChart } from "recharts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Command Dashboard · Cyclone C2" },
      { name: "description", content: "Real-time cyclone situation, evacuation progress, SOS queue, and resource status." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const totalPop = zones.reduce((a, z) => a + z.population, 0);
  const evacuatedPop = zones.reduce((a, z) => a + Math.round((z.population * z.evacuated) / 100), 0);
  const evacRate = Math.round((evacuatedPop / totalPop) * 100);
  const totalShelterCap = shelters.reduce((a, s) => a + s.capacity, 0);
  const totalShelterOcc = shelters.reduce((a, s) => a + s.occupancy, 0);

  return (
    <AppShell
      title="Command Dashboard"
      subtitle="Unified situational awareness · District EOC Puri"
      actions={
        <Link
          to="/ai-command"
          className="hidden items-center gap-2 rounded-md bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 md:inline-flex"
        >
          <Sparkles className="h-4 w-4" />
          AI Command Center
        </Link>
      }
    >
      {/* Top stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Evacuation Rate"  value={`${evacRate}%`} delta={+8} deltaLabel="vs. 6h ago" intent="success" icon={<Users className="h-5 w-5" />} hint={`${evacuatedPop.toLocaleString()} of ${totalPop.toLocaleString()} people`} />
        <StatCard label="Active SOS"        value="12"  delta={+3} deltaLabel="last hour" intent="critical" icon={<Siren className="h-5 w-5" />} hint="4 auto-dispatched · 2 verifying" />
        <StatCard label="Shelter Occupancy" value={`${Math.round((totalShelterOcc / totalShelterCap) * 100)}%`} intent="warning" icon={<Building2 className="h-5 w-5" />} hint={`${totalShelterOcc.toLocaleString()} / ${totalShelterCap.toLocaleString()} beds`} />
        <StatCard label="Wind Speed"        value={`${cyclone.windSpeed} km/h`} intent="critical" icon={<Wind className="h-5 w-5" />} hint={`Cat ${cyclone.category} · ${cyclone.pressure} mb`} />
      </div>

      {/* Row: Map + right column */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel
          title="Live Cyclone Map"
          description={`${cyclone.name} · Landfall in ${Math.floor(cyclone.landfallHours)}h ${Math.round((cyclone.landfallHours % 1) * 60)}m · Track ${cyclone.bearing}`}
          className="xl:col-span-2"
          action={
            <Link to="/map" className="inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:underline">
              Expand <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          }
        >
          <StylizedMap className="aspect-[16/9] w-full" />
        </Panel>

        <Panel title="AI Recommendation" description="Confidence 88% · Updated 2 min ago"
          action={<Badge intent="primary">Zero-click ready</Badge>}
        >
          <div className="space-y-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recommended course of action</div>
              <div className="mt-1 text-base font-semibold text-foreground">COA 2 · Aggressive Landfall Prepositioning</div>
              <p className="mt-1 text-sm text-muted-foreground">
                Move 75% of surge resources to Zones A & B. Projected +1,730 lives saved vs. balanced plan; +12% resource waste risk if track shifts.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <MiniStat label="Lives saved" value="14,210" intent="success" />
              <MiniStat label="Evac rate"    value="91%" intent="success" />
              <MiniStat label="Waste risk"   value="24%" intent="warning" />
              <MiniStat label="Vuln. reach"  value="71%" intent="neutral" />
            </div>
            <Link to="/ai-command" className="flex items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              Review & execute plan <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Panel>
      </div>

      {/* Row: evacuation trend + zone table */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel title="Evacuation Trend" description="Percentage of population moved to safety">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={evacuationTrend} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="ev" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.55 0.20 260)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="oklch(0.55 0.20 260)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="t" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} width={30} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="pct" stroke="oklch(0.55 0.20 260)" strokeWidth={2} fill="url(#ev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Zone Status" description="Evacuation progress per impact zone" className="xl:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <th className="pb-3">Zone</th>
                  <th className="pb-3">Population</th>
                  <th className="pb-3 min-w-[180px]">Evacuation</th>
                  <th className="pb-3">Flood level</th>
                  <th className="pb-3">Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {zones.map((z) => (
                  <tr key={z.id}>
                    <td className="py-3 font-semibold text-foreground">Zone {z.id} · {z.name}</td>
                    <td className="py-3 text-muted-foreground">{z.population.toLocaleString()}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <ProgressBar value={z.evacuated} intent={z.evacuated >= 75 ? "success" : z.evacuated >= 50 ? "warning" : "critical"} />
                        <span className="w-9 text-right text-xs font-semibold text-foreground">{z.evacuated}%</span>
                      </div>
                    </td>
                    <td className="py-3"><span className="inline-flex items-center gap-1.5 text-muted-foreground"><Droplets className="h-3.5 w-3.5" />{z.flood}%</span></td>
                    <td className="py-3"><Badge intent={z.risk}>{z.risk.toUpperCase()}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>

      {/* Row: incidents + resources + teams */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel
          title="Recent Incidents"
          description="Unified command feed · priority-scored"
          action={<Link to="/incidents" className="text-xs font-semibold text-secondary hover:underline">View all →</Link>}
          className="xl:col-span-2"
        >
          <ul className="divide-y divide-border">
            {incidents.slice(0, 6).map((i) => (
              <li key={i.id} className="flex items-start gap-4 py-3 first:pt-0 last:pb-0">
                <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
                  i.level === "CRITICAL" ? "bg-critical/10 text-critical" :
                  i.level === "HIGH" ? "bg-warning/15 text-warning" :
                  i.level === "MEDIUM" ? "bg-info/10 text-info" : "bg-muted text-muted-foreground"
                }`}>
                  <Activity className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-muted-foreground">{i.id}</span>
                    <Badge intent={i.level === "CRITICAL" ? "critical" : i.level === "HIGH" ? "warning" : i.level === "MEDIUM" ? "info" : "neutral"}>{i.type}</Badge>
                    <span className="text-xs text-muted-foreground">Zone {i.zone} · {i.ts} ago</span>
                  </div>
                  <div className="mt-0.5 truncate text-sm font-medium text-foreground">{i.title}</div>
                  <div className="mt-0.5 truncate text-xs text-muted-foreground">{i.action}</div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-lg font-bold tabular-nums text-foreground">{i.priority}</div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">score</div>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <div className="space-y-6">
          <Panel title="Resource Levels" description="Warehouse on-hand vs. projected need"
            action={<Link to="/resources" className="text-xs font-semibold text-secondary hover:underline">Manage →</Link>}
          >
            <ul className="space-y-3.5">
              {resourceInventory.slice(0, 4).map((r) => {
                const pct = Math.min(100, Math.round((r.onHand / r.needed) * 100));
                return (
                  <li key={r.name}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-foreground"><Package className="h-3.5 w-3.5 text-muted-foreground" />{r.name}</span>
                      <span className="tabular-nums text-muted-foreground">{r.onHand.toLocaleString()} / {r.needed.toLocaleString()}</span>
                    </div>
                    <div className="mt-1.5"><ProgressBar value={pct} intent={r.intent} /></div>
                  </li>
                );
              })}
            </ul>
          </Panel>

          <Panel title="Team Status" description="6 units deployed"
            action={<Link to="/teams" className="text-xs font-semibold text-secondary hover:underline">All teams →</Link>}
          >
            <ul className="space-y-2.5">
              {teams.slice(0, 4).map((t) => (
                <li key={t.id} className="flex items-center gap-3 rounded-md border border-border bg-surface p-2.5">
                  <div className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                    t.status === "on-scene" ? "bg-critical" : t.status === "en-route" ? "bg-warning" : "bg-success"
                  }`} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-foreground">{t.name} <span className="ml-1 font-mono text-[11px] text-muted-foreground">{t.id}</span></div>
                    <div className="truncate text-xs text-muted-foreground">{t.capacity}</div>
                  </div>
                  <Badge intent={t.status === "on-scene" ? "critical" : t.status === "en-route" ? "warning" : "success"}>{t.status}</Badge>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}

function MiniStat({ label, value, intent }: { label: string; value: string; intent: "success" | "warning" | "critical" | "neutral" }) {
  const map: Record<string, string> = {
    success: "border-success/30 bg-success/5 text-success",
    warning: "border-warning/30 bg-warning/5 text-warning",
    critical: "border-critical/30 bg-critical/5 text-critical",
    neutral: "border-border bg-muted/40 text-foreground",
  };
  return (
    <div className={`rounded-md border px-3 py-2 ${map[intent]}`}>
      <div className="text-[10px] font-semibold uppercase tracking-wider opacity-80">{label}</div>
      <div className="mt-0.5 text-lg font-bold tabular-nums">{value}</div>
    </div>
  );
}
