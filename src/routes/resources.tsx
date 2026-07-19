import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Panel, Badge, ProgressBar, StatCard } from "@/components/ui-primitives";
import { resourceInventory } from "@/lib/mock";
import { Package, AlertTriangle, TrendingDown, Truck } from "lucide-react";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [{ title: "Resource Inventory · Cyclone C2" }, { name: "description", content: "Track drinking water, food, medicine, and supplies with auto-prepositioning." }],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  const critical = resourceInventory.filter((r) => r.intent === "critical").length;
  return (
    <AppShell title="Resource Inventory" subtitle="Auto-prepositioning engine active · 48h forecast">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="SKUs tracked"       value={resourceInventory.length} intent="neutral"  icon={<Package className="h-5 w-5" />} />
        <StatCard label="Critical shortages" value={critical}                 intent="critical" icon={<AlertTriangle className="h-5 w-5" />} hint="Auto-orders placed" />
        <StatCard label="Prepositioned"      value="82%"                      intent="success"  icon={<Truck className="h-5 w-5" />} hint="Of forecast need" />
        <StatCard label="Waste projection"   value="12%"                      intent="warning"  icon={<TrendingDown className="h-5 w-5" />} hint="If track holds" />
      </div>

      <Panel title="On-hand vs. projected need" description="Live inventory across 3 warehouses" className="mt-6">
        <ul className="space-y-4">
          {resourceInventory.map((r) => {
            const pct = Math.min(100, Math.round((r.onHand / r.needed) * 100));
            return (
              <li key={r.name} className="grid grid-cols-1 gap-3 rounded-md border border-border bg-surface p-4 md:grid-cols-[1fr_auto]">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{r.name}</span>
                    <Badge intent={r.intent}>{pct}% of need</Badge>
                  </div>
                  <div className="mt-2"><ProgressBar value={pct} intent={r.intent} /></div>
                  <div className="mt-1.5 text-xs text-muted-foreground">
                    On hand <b className="font-semibold text-foreground">{r.onHand.toLocaleString()}</b> {r.unit} · required <b className="font-semibold text-foreground">{r.needed.toLocaleString()}</b> {r.unit}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-semibold hover:bg-accent">Transfer</button>
                  <button className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90">Order more</button>
                </div>
              </li>
            );
          })}
        </ul>
      </Panel>
    </AppShell>
  );
}
