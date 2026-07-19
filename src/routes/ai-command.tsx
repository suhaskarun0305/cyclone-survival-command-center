import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Panel, Badge, ProgressBar, StatCard } from "@/components/ui-primitives";
import { coaOptions } from "@/lib/mock";
import { Sparkles, Play, ShieldCheck, TrendingUp, Users, AlertTriangle, Info, ChevronRight, Cpu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ai-command")({
  head: () => ({
    meta: [
      { title: "AI Command Center · Cyclone C2" },
      { name: "description", content: "AI-generated courses of action with lives-saved forecasts, resource projections, and one-click execution." },
    ],
  }),
  component: AICommandCenter,
});

function AICommandCenter() {
  const [selected, setSelected] = useState("coa-2");
  const active = coaOptions.find((c) => c.id === selected)!;

  return (
    <AppShell
      title="AI Command Center"
      subtitle="Predictive engine · v4.2 · Trained on 22 years of Bay of Bengal cyclones"
      actions={
        <button className="hidden items-center gap-2 rounded-md bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 md:inline-flex">
          <Play className="h-4 w-4" fill="currentColor" /> Execute selected plan
        </button>
      }
    >
      {/* Model status banner */}
      <div className="mb-6 flex flex-col items-start justify-between gap-3 rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 p-4 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground shadow-soft">
            <Cpu className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              Prediction engine online <Badge intent="success">88% confidence</Badge>
            </div>
            <div className="text-xs text-muted-foreground">3 courses of action generated in 24.7s · Last refresh 2 min ago · 14h 32m to landfall</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-semibold hover:bg-accent">Regenerate</button>
          <button className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-semibold hover:bg-accent">Tune parameters</button>
        </div>
      </div>

      {/* Top KPIs for selected COA */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Projected Lives Saved" value={active.livesSaved.toLocaleString()} intent="success" icon={<ShieldCheck className="h-5 w-5" />} hint="vs. no-intervention baseline" />
        <StatCard label="Evacuation Rate"       value={`${active.evacuationRate}%`} intent="neutral" icon={<Users className="h-5 w-5" />} hint="of vulnerable population" />
        <StatCard label="Resource Waste Risk"   value={`${active.resourceWaste}%`} intent={active.resourceWaste > 20 ? "warning" : "success"} icon={<AlertTriangle className="h-5 w-5" />} hint="If track shifts > 40 km" />
        <StatCard label="Model Confidence"      value={`${active.confidence}%`} intent="success" icon={<TrendingUp className="h-5 w-5" />} hint="Bayesian ensemble" />
      </div>

      {/* COA comparison cards */}
      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {coaOptions.map((coa) => {
          const isSelected = coa.id === selected;
          return (
            <button
              key={coa.id}
              onClick={() => setSelected(coa.id)}
              className={cn(
                "panel group relative overflow-hidden text-left transition-all",
                isSelected ? "ring-2 ring-primary" : "hover:border-primary/40"
              )}
            >
              <div className={cn(
                "absolute inset-x-0 top-0 h-1",
                coa.tone === "critical" && "bg-critical",
                coa.tone === "success" && "bg-success",
                coa.tone === "info" && "bg-secondary",
              )} />
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <Badge intent={coa.tone === "info" ? "primary" : coa.tone}>{coa.tag}</Badge>
                  {isSelected && <Badge intent="primary">Selected</Badge>}
                </div>
                <h3 className="mt-3 text-base font-semibold text-foreground">{coa.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{coa.summary}</p>

                <dl className="mt-4 grid grid-cols-2 gap-3">
                  <MetricRow label="Lives saved"   value={coa.livesSaved.toLocaleString()} />
                  <MetricRow label="Evac rate"     value={`${coa.evacuationRate}%`} />
                  <MetricRow label="Waste"         value={`${coa.resourceWaste}%`} />
                  <MetricRow label="Vuln. reach"   value={`${coa.vulnerableReach}%`} />
                </dl>

                <div className="mt-4">
                  <div className="mb-1 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    <span>Recommendation score</span>
                    <span className="tabular-nums text-foreground">{coa.confidence}</span>
                  </div>
                  <ProgressBar value={coa.confidence} intent={coa.tone === "info" ? "neutral" : coa.tone} />
                </div>

                <ul className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                  {coa.tradeoffs.map((t) => (
                    <li key={t} className="flex items-start gap-1.5">
                      <ChevronRight className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail: comparison matrix + explanation */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel title="Comparison Matrix" description="Side-by-side outcome forecast" className="xl:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <th className="pb-3">Metric</th>
                  {coaOptions.map((c) => <th key={c.id} className="pb-3">{c.name.split(" · ")[0]}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <MatrixRow label="Projected lives saved" values={coaOptions.map((c) => c.livesSaved.toLocaleString())} highlight={selected} ids={coaOptions.map(c => c.id)} />
                <MatrixRow label="Evacuation rate"       values={coaOptions.map((c) => `${c.evacuationRate}%`)} highlight={selected} ids={coaOptions.map(c => c.id)} />
                <MatrixRow label="Resource waste risk"   values={coaOptions.map((c) => `${c.resourceWaste}%`)} highlight={selected} ids={coaOptions.map(c => c.id)} />
                <MatrixRow label="Vulnerable reach"      values={coaOptions.map((c) => `${c.vulnerableReach}%`)} highlight={selected} ids={coaOptions.map(c => c.id)} />
                <MatrixRow label="Model confidence"      values={coaOptions.map((c) => `${c.confidence}%`)} highlight={selected} ids={coaOptions.map(c => c.id)} />
                <MatrixRow label="Ambulance surge"       values={["12 units", "18 units", "14 units"]} highlight={selected} ids={coaOptions.map(c => c.id)} />
                <MatrixRow label="Water pre-position"    values={["220 kL", "310 kL", "240 kL"]} highlight={selected} ids={coaOptions.map(c => c.id)} />
                <MatrixRow label="Alert reach"           values={["3.4M", "3.7M", "3.5M"]} highlight={selected} ids={coaOptions.map(c => c.id)} />
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="AI Explanation" description="Why this recommendation" action={<Badge intent="primary"><Sparkles className="h-3 w-3" /> XAI</Badge>}>
          <div className="space-y-4 text-sm">
            <div className="rounded-md border border-info/20 bg-info/5 p-3 text-info">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0" />
                <div className="text-info-foreground">
                  <b className="text-info">Model rationale.</b>{" "}
                  <span className="text-foreground/90">
                    Historic Category-4 landfalls within 40 km of the predicted track have caused
                    surge-related mortality clustered in Zones A/B within the first 4 hours. Concentrated pre-positioning
                    reduces expected mortality by an estimated 1,730 lives vs. balanced distribution.
                  </span>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Top signals used</div>
              <ul className="space-y-2">
                <SignalRow label="Storm surge forecast (SLOSH)" weight={94} />
                <SignalRow label="Vulnerable person density"    weight={81} />
                <SignalRow label="Shelter coverage gap"          weight={72} />
                <SignalRow label="Road network resilience"       weight={64} />
                <SignalRow label="Historical evacuation compliance" weight={57} />
              </ul>
            </div>

            <button className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              <Play className="h-4 w-4" fill="currentColor" /> Execute {active.name.split(" · ")[0]}
            </button>
            <div className="text-center text-[11px] text-muted-foreground">
              Executing triggers 6 downstream actions · 5-minute override window
            </div>
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-lg font-bold tabular-nums text-foreground">{value}</div>
    </div>
  );
}

function MatrixRow({ label, values, ids, highlight }: { label: string; values: string[]; ids: string[]; highlight: string }) {
  return (
    <tr>
      <td className="py-2.5 text-muted-foreground">{label}</td>
      {values.map((v, i) => (
        <td key={i} className={cn("py-2.5 font-semibold tabular-nums", ids[i] === highlight ? "text-primary" : "text-foreground")}>{v}</td>
      ))}
    </tr>
  );
}

function SignalRow({ label, weight }: { label: string; weight: number }) {
  return (
    <li className="flex items-center gap-3">
      <span className="w-40 shrink-0 truncate text-xs text-foreground">{label}</span>
      <ProgressBar value={weight} intent="neutral" />
      <span className="w-8 text-right text-xs font-semibold tabular-nums text-muted-foreground">{weight}</span>
    </li>
  );
}
