import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Panel, Badge, StatCard } from "@/components/ui-primitives";
import { predictiveAlerts } from "@/lib/mock";
import { BellRing, Radio, Send, Clock, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [{ title: "Predictive Alerts · Cyclone C2" }, { name: "description", content: "Time-phased alerts (24h/12h/6h) via Cell Broadcast, SMS, radio, and sirens." }],
  }),
  component: AlertsPage,
});

function AlertsPage() {
  return (
    <AppShell title="Predictive Alert Engine" subtitle="Cell Broadcast · SMS · Radio · Sirens · reach 3.7M devices">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Alerts issued (24h)" value="3" intent="success" icon={<Send className="h-5 w-5" />} />
        <StatCard label="Devices reached"      value="3.6M" intent="success" icon={<Radio className="h-5 w-5" />} hint="Cell Broadcast" />
        <StatCard label="Delivery rate"        value="98.2%" intent="success" icon={<CheckCircle2 className="h-5 w-5" />} hint="Target ≥ 90%" />
        <StatCard label="Next auto-alert"      value="6h" intent="warning" icon={<Clock className="h-5 w-5" />} hint="Evacuation order" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel title="Time-phased alert schedule" description="Auto-issued by predictive engine" className="xl:col-span-2">
          <ol className="space-y-4">
            {predictiveAlerts.map((a, i) => (
              <li key={a.window} className="flex gap-4 rounded-lg border border-border bg-surface p-4">
                <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg text-sm font-bold ${
                  a.status === "issued" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                }`}>
                  {a.window.split(" ")[0]}
                  <span className="sr-only">{a.window}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{a.window} window · {a.severity}</span>
                    <Badge intent={a.status === "issued" ? "success" : "warning"}>{a.status}</Badge>
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    {a.status === "issued" ? "Issued" : "Scheduled"} at {a.issuedAt} · {a.reach}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {a.channels.map((c) => <Badge key={c} intent="neutral">{c}</Badge>)}
                  </div>
                </div>
                {a.status === "scheduled" && (
                  <button className="self-center rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90">
                    Push now
                  </button>
                )}
              </li>
            ))}
          </ol>
        </Panel>

        <Panel title="Compose alert" description="Send Cell Broadcast to targeted zones">
          <form className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Severity</label>
              <select className="w-full rounded-md border border-input bg-surface px-3 py-2 text-sm">
                <option>Evacuation order</option>
                <option>Warning</option>
                <option>Advisory</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Target zones</label>
              <div className="flex flex-wrap gap-2">
                {["A", "B", "C", "D", "E"].map((z) => (
                  <button key={z} type="button" className="rounded-md border border-border bg-surface px-3 py-1 text-xs font-semibold hover:bg-accent">Zone {z}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</label>
              <textarea rows={4} defaultValue="EVACUATE NOW. Move to nearest cyclone shelter. Landfall in 6 hours. Follow instructions from officials." className="w-full rounded-md border border-input bg-surface px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Channels</label>
              <div className="flex flex-wrap gap-2">
                {["Cell Broadcast", "SMS", "Radio", "Sirens"].map((c) => (
                  <label key={c} className="flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1 text-xs">
                    <input type="checkbox" defaultChecked className="accent-primary" /> {c}
                  </label>
                ))}
              </div>
            </div>
            <button type="button" className="flex w-full items-center justify-center gap-2 rounded-md bg-critical px-3 py-2.5 text-sm font-semibold text-critical-foreground hover:bg-critical/90">
              <BellRing className="h-4 w-4" /> Broadcast now
            </button>
          </form>
        </Panel>
      </div>
    </AppShell>
  );
}
