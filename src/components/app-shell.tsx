import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Radio,
  Siren,
  Map,
  Building2,
  Package,
  Users,
  Sparkles,
  BellRing,
  BarChart3,
  Globe,
  Settings,
  Search,
  Bell,
  Wind,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; badge?: string; group: string };

const NAV: NavItem[] = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, group: "Operations" },
  { to: "/map", label: "Live Cyclone Map", icon: Map, group: "Operations" },
  { to: "/incidents", label: "Incident Feed", icon: Radio, badge: "47", group: "Operations" },
  { to: "/sos", label: "SOS Queue", icon: Siren, badge: "12", group: "Operations" },

  { to: "/ai-command", label: "AI Command Center", icon: Sparkles, group: "Intelligence" },
  { to: "/alerts", label: "Predictive Alerts", icon: BellRing, group: "Intelligence" },

  { to: "/shelters", label: "Shelters", icon: Building2, group: "Resources" },
  { to: "/resources", label: "Resource Inventory", icon: Package, group: "Resources" },
  { to: "/teams", label: "Rescue Teams", icon: Users, group: "Resources" },

  { to: "/analytics", label: "Analytics", icon: BarChart3, group: "Insights" },
  { to: "/public", label: "Public Portal", icon: Globe, group: "Insights" },
];

const GROUPS = ["Operations", "Intelligence", "Resources", "Insights"];

export function AppShell({ children, title, subtitle, actions }: {
  children: ReactNode;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "sticky top-0 z-30 hidden h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200 md:flex",
          collapsed ? "w-[72px]" : "w-[260px]"
        )}
      >
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-4">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-secondary text-secondary-foreground shadow-soft">
            <Wind className="h-5 w-5" strokeWidth={2.25} />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold leading-tight">Cyclone C2</div>
              <div className="truncate text-[11px] text-sidebar-foreground/60">NDMA · Command Center</div>
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-3">
          {GROUPS.map((group) => (
            <div key={group} className="mb-4">
              {!collapsed && (
                <div className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
                  {group}
                </div>
              )}
              <ul className="space-y-0.5">
                {NAV.filter((n) => n.group === group).map((item) => {
                  const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
                  const Icon = item.icon;
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className={cn(
                          "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          active
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                        )}
                      >
                        <Icon className={cn("h-4 w-4 shrink-0", active && "text-secondary")} />
                        {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                        {!collapsed && item.badge && (
                          <span className="ml-auto rounded-full bg-critical px-1.5 py-0.5 text-[10px] font-semibold text-critical-foreground">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-sidebar-border p-2">
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
          >
            {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
            {!collapsed && <span>Collapse</span>}
          </button>
          <Link
            to="/settings"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
          >
            <Settings className="h-4 w-4" />
            {!collapsed && <span>Settings</span>}
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur-md md:px-8">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <span className="relative inline-flex h-2 w-2 rounded-full bg-critical text-critical pulse-dot" />
                <span className="font-semibold text-critical">RED ALERT</span>
              </span>
              <span>·</span>
              <span>Cyclone <b className="text-foreground">MAHAVEG</b> · Cat 4 · Landfall in 14h 32m</span>
            </div>
            <h1 className="mt-0.5 truncate text-lg font-semibold tracking-tight text-foreground md:text-xl">
              {title}
            </h1>
            {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search zones, teams, SOS…"
                className="h-9 w-72 rounded-md border border-input bg-surface pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <button className="relative grid h-9 w-9 place-items-center rounded-md border border-border bg-surface text-muted-foreground hover:text-foreground">
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-critical px-1 text-[10px] font-bold text-critical-foreground">
              9
            </span>
          </button>

          <div className="hidden items-center gap-2 rounded-md border border-border bg-surface px-2.5 py-1.5 sm:flex">
            <div className="grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              KS
            </div>
            <div className="hidden text-xs leading-tight md:block">
              <div className="font-semibold text-foreground">Collector Singh</div>
              <div className="text-muted-foreground">District EOC · Puri</div>
            </div>
          </div>

          {actions}
        </header>

        <main className="min-w-0 flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
