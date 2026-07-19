import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Panel, StatCard } from "@/components/ui-primitives";
import { evacuationTrend } from "@/lib/mock";
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Timer, Users, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [{ title: "Analytics · Cyclone C2" }, { name: "description", content: "Response time, evacuation speed, resource utilization." }],
  }),
  component: Analytics,
});

const sosByHour = [
  { h: "-6", n: 4 }, { h: "-5", n: 6 }, { h: "-4", n: 8 }, { h: "-3", n: 14 },
  { h: "-2", n: 18 }, { h: "-1", n: 27 }, { h: "0", n: 32 },
];

const dispatch = [
  { name: "Auto (< 2s)", v: 62, color: "oklch(0.62 0.16 148)" },
  { name: "Manual < 5m",  v: 28, color: "oklch(0.55 0.20 260)" },
  { name: "Manual > 5m",  v: 10, color: "oklch(0.78 0.16 78)" },
];

function Analytics() {
  return (
    <AppShell title="Analytics" subtitle="Response performance · resource efficiency · alert reach">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Median SOS response" value="1m 47s" intent="success" icon={<Timer className="h-5 w-5" />} delta={-18} deltaLabel="vs. last cyclone" />
        <StatCard label="Evacuation speed"    value="4.2k /hr" intent="success" icon={<Users className="h-5 w-5" />} delta={+22} deltaLabel="vs. baseline" />
        <StatCard label="Resource utilization" value="88%" intent="warning" icon={<TrendingUp className="h-5 w-5" />} hint="12% projected waste" />
        <StatCard label="Auto-dispatch share" value="62%" intent="success" icon={<ShieldCheck className="h-5 w-5" />} hint="Of CRITICAL SOS" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel title="Evacuation trajectory" description="Cumulative % moved to safety" className="xl:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={evacuationTrend} margin={{ top: 10, right: 8, left: -20 }}>
                <defs>
                  <linearGradient id="a1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.55 0.20 260)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="oklch(0.55 0.20 260)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="t" stroke="var(--color-muted-foreground)" fontSize={11} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} axisLine={false} tickLine={false} width={30} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="pct" stroke="oklch(0.55 0.20 260)" strokeWidth={2} fill="url(#a1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Dispatch mix" description="How SOS cases were dispatched">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dispatch} dataKey="v" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                  {dispatch.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Legend verticalAlign="bottom" wrapperStyle={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="SOS volume by hour" description="Last 6 hours to landfall" className="xl:col-span-3">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sosByHour} margin={{ top: 10, right: 8, left: -20 }}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="h" stroke="var(--color-muted-foreground)" fontSize={11} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} axisLine={false} tickLine={false} width={30} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="n" fill="oklch(0.55 0.20 260)" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
