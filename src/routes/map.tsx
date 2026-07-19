import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Panel, StatCard } from "@/components/ui-primitives";
import { StylizedMap } from "@/components/stylized-map";
import { cyclone } from "@/lib/mock";
import { Wind, Gauge, Navigation, Timer } from "lucide-react";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [{ title: "Live Cyclone Map · Cyclone C2" }, { name: "description", content: "Real-time cyclone tracking with impact zones, shelters, and rescue team locations." }],
  }),
  component: LiveMap,
});

function LiveMap() {
  return (
    <AppShell title="Live Cyclone Map" subtitle={`${cyclone.name} · Category ${cyclone.category} · Track ${cyclone.bearing}`}>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Wind speed"      value={`${cyclone.windSpeed} km/h`} intent="critical" icon={<Wind className="h-5 w-5" />} hint="Sustained · gusts to 240" />
        <StatCard label="Pressure"        value={`${cyclone.pressure} mb`}    intent="warning"  icon={<Gauge className="h-5 w-5" />} />
        <StatCard label="Forward speed"   value={`${cyclone.speed} km/h`}     intent="neutral"  icon={<Navigation className="h-5 w-5" />} hint={`Bearing ${cyclone.bearing}`} />
        <StatCard label="Landfall in"     value={`${Math.floor(cyclone.landfallHours)}h ${Math.round((cyclone.landfallHours%1)*60)}m`} intent="critical" icon={<Timer className="h-5 w-5" />} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-4">
        <Panel title="Bay of Bengal — Odisha coast" description="Impact zones · shelters · rescue teams" className="xl:col-span-3">
          <StylizedMap className="aspect-[16/10] w-full" />
        </Panel>

        <Panel title="Layers" description="Toggle map overlays">
          <ul className="space-y-2 text-sm">
            {[
              { label: "Impact zones",     on: true },
              { label: "Cyclone track",    on: true },
              { label: "Shelters",         on: true },
              { label: "Rescue teams",     on: true },
              { label: "Flood forecast",   on: true },
              { label: "Road status",      on: false },
              { label: "Vulnerable density", on: false },
              { label: "Hospitals",        on: false },
              { label: "WASH points",      on: false },
            ].map((l) => (
              <li key={l.label} className="flex items-center justify-between rounded-md border border-border bg-surface px-3 py-2">
                <span className="text-foreground">{l.label}</span>
                <button className={`relative h-5 w-9 rounded-full transition-colors ${l.on ? "bg-primary" : "bg-muted"}`}>
                  <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${l.on ? "left-[18px]" : "left-0.5"}`} />
                </button>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </AppShell>
  );
}
