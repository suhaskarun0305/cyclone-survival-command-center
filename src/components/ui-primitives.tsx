import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

export function StatCard({
  label,
  value,
  delta,
  deltaLabel,
  intent = "neutral",
  icon,
  hint,
}: {
  label: string;
  value: string | number;
  delta?: number;
  deltaLabel?: string;
  intent?: "neutral" | "success" | "warning" | "critical";
  icon?: ReactNode;
  hint?: string;
}) {
  const intentBar: Record<string, string> = {
    neutral: "bg-secondary",
    success: "bg-success",
    warning: "bg-warning",
    critical: "bg-critical",
  };
  return (
    <div className="stat-card relative overflow-hidden">
      <div className={cn("absolute inset-x-0 top-0 h-0.5", intentBar[intent])} />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="mt-2 text-3xl font-bold tracking-tight text-foreground">{value}</div>
          {hint && <div className="mt-0.5 text-xs text-muted-foreground">{hint}</div>}
        </div>
        {icon && (
          <div className={cn(
            "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
            intent === "critical" && "bg-critical/10 text-critical",
            intent === "warning" && "bg-warning/15 text-warning",
            intent === "success" && "bg-success/10 text-success",
            intent === "neutral" && "bg-secondary/10 text-secondary"
          )}>
            {icon}
          </div>
        )}
      </div>
      {typeof delta === "number" && (
        <div className="mt-3 flex items-center gap-1.5 text-xs">
          <span className={cn(
            "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-semibold",
            delta >= 0 ? "bg-success/10 text-success" : "bg-critical/10 text-critical"
          )}>
            {delta >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
            {Math.abs(delta)}%
          </span>
          {deltaLabel && <span className="text-muted-foreground">{deltaLabel}</span>}
        </div>
      )}
    </div>
  );
}

export function Panel({
  title,
  description,
  action,
  children,
  className,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("panel", className)}>
      {(title || action) && (
        <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
          <div className="min-w-0">
            {title && <h3 className="truncate text-sm font-semibold text-foreground">{title}</h3>}
            {description && <p className="mt-0.5 truncate text-xs text-muted-foreground">{description}</p>}
          </div>
          {action}
        </div>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}

export function Badge({
  children,
  intent = "neutral",
  className,
}: {
  children: ReactNode;
  intent?: "neutral" | "success" | "warning" | "critical" | "info" | "primary";
  className?: string;
}) {
  const map: Record<string, string> = {
    neutral: "bg-muted text-muted-foreground border-border",
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/15 text-warning border-warning/25",
    critical: "bg-critical/10 text-critical border-critical/20",
    info: "bg-info/10 text-info border-info/20",
    primary: "bg-primary/10 text-primary border-primary/20",
  };
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold", map[intent], className)}>
      {children}
    </span>
  );
}

export function ProgressBar({ value, intent = "neutral", showLabel }: {
  value: number;
  intent?: "neutral" | "success" | "warning" | "critical";
  showLabel?: boolean;
}) {
  const barMap: Record<string, string> = {
    neutral: "bg-secondary",
    success: "bg-success",
    warning: "bg-warning",
    critical: "bg-critical",
  };
  return (
    <div className="w-full">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className={cn("h-full rounded-full transition-all", barMap[intent])} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
      </div>
      {showLabel && <div className="mt-1 text-[11px] font-medium text-muted-foreground">{value}%</div>}
    </div>
  );
}
