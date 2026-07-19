import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Panel, Badge, ProgressBar, StatCard } from "@/components/ui-primitives";
import { shelters } from "@/lib/mock";
import { Building2, HeartPulse, Droplets, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/shelters")({
  head: () => ({
    meta: [{ title: "Shelters · Cyclone C2" }, { name: "description", content: "Shelter capacity, occupancy, and medical status." }],
  }),
  component: SheltersPage,
});

function SheltersPage() {
  const totalCap = shelters.reduce((a, s) => a + s.capacity, 0);
  const totalOcc = shelters.reduce((a, s) => a + s.occupancy, 0);
  const over = shelters.filter((s) => s.occupancy > s.capacity).length;
  const medical = shelters.filter((s) => s.medical).length;

  return (
    <AppShell title="Shelter Management" subtitle="8 operational shelters · 5 zones">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total capacity" value={totalCap.toLocaleString()} intent="neutral"  icon={<Building2 className="h-5 w-5" />} />
        <StatCard label="Currently housing" value={totalOcc.toLocaleString()} intent="warning" icon={<Users className="h-5 w-5" />} hint={`${Math.round((totalOcc/totalCap)*100)}% utilized`} />
        <StatCard label="Over capacity"   value={over} intent="critical" icon={<Users className="h-5 w-5" />} hint="Redirect flow active" />
        <StatCard label="Medical camps"   value={medical} intent="success" icon={<HeartPulse className="h-5 w-5" />} hint="Doctor + supplies onsite" />
      </div>

      <Panel title="All shelters" description="Sortable list · click to view details" className="mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                <th className="pb-3">ID</th>
                <th className="pb-3">Shelter</th>
                <th className="pb-3">Zone</th>
                <th className="pb-3 min-w-[200px]">Occupancy</th>
                <th className="pb-3 min-w-[140px]">Water</th>
                <th className="pb-3">Medical</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {shelters.map((s) => {
                const pct = Math.round((s.occupancy / s.capacity) * 100);
                const over = s.occupancy > s.capacity;
                return (
                  <tr key={s.id} className="hover:bg-muted/40">
                    <td className="py-3 font-mono text-xs text-muted-foreground">{s.id}</td>
                    <td className="py-3 font-semibold text-foreground">{s.name}</td>
                    <td className="py-3 text-muted-foreground">Zone {s.zone}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <ProgressBar value={Math.min(100, pct)} intent={over ? "critical" : pct > 85 ? "warning" : "success"} />
                        <span className={cn("w-24 shrink-0 text-right text-xs font-semibold tabular-nums", over ? "text-critical" : "text-foreground")}>
                          {s.occupancy.toLocaleString()} / {s.capacity.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="inline-flex items-center gap-1.5 text-muted-foreground"><Droplets className="h-3.5 w-3.5" />{s.water}%</span>
                    </td>
                    <td className="py-3">
                      {s.medical
                        ? <Badge intent="success"><HeartPulse className="h-3 w-3" /> Camp</Badge>
                        : <span className="text-xs text-muted-foreground">—</span>}
                    </td>
                    <td className="py-3">
                      <Badge intent={s.status === "over-capacity" ? "critical" : s.status === "standby" ? "neutral" : "success"}>
                        {s.status}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>
    </AppShell>
  );
}
