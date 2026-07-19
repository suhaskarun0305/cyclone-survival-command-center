import { createFileRoute, Link } from "@tanstack/react-router";
import { Siren, MapPin, Route as RouteIcon, Users, Droplets, BookOpen, Languages, Wind, ShieldCheck, Volume2, ChevronRight, Phone } from "lucide-react";

export const Route = createFileRoute("/public")({
  head: () => ({
    meta: [
      { title: "Public Portal · Cyclone MAHAVEG" },
      { name: "description", content: "Instant alerts, shelter locator, SOS, family reunification, and safe water for the coast." },
    ],
  }),
  component: PublicPortal,
});

function PublicPortal() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-2xl items-center gap-3 px-4">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Wind className="h-5 w-5" strokeWidth={2.25} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-foreground">Cyclone Survival</div>
            <div className="text-[11px] text-muted-foreground">NDMA · Official Portal</div>
          </div>
          <button className="flex items-center gap-1 rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs font-semibold">
            <Languages className="h-3.5 w-3.5" /> EN
          </button>
          <Link to="/" className="hidden text-xs font-semibold text-secondary hover:underline sm:inline">
            Officer portal →
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 pb-24 pt-6">
        {/* Emergency alert card */}
        <section className="overflow-hidden rounded-2xl border border-critical/30 bg-critical/5">
          <div className="flex items-center gap-2 bg-critical px-4 py-2 text-xs font-bold uppercase tracking-wider text-critical-foreground">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-critical-foreground pulse-dot" />
            Red Alert · Evacuation Order
          </div>
          <div className="p-5">
            <h1 className="text-2xl font-bold leading-tight text-foreground">
              Cyclone MAHAVEG is coming. <br /> Landfall in <span className="text-critical">14 hours</span>.
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Category 4 · Winds 195 km/h · Storm surge expected. Move to your nearest cyclone shelter now.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="flex items-center gap-1.5 rounded-md bg-foreground px-3 py-2 text-xs font-semibold text-background">
                <Volume2 className="h-3.5 w-3.5" /> Play voice instructions
              </button>
              <button className="flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold">
                What to do
              </button>
            </div>
          </div>
        </section>

        {/* GIANT SOS */}
        <button className="mt-6 flex w-full flex-col items-center justify-center gap-2 rounded-2xl bg-critical py-8 text-critical-foreground shadow-elevated transition-transform active:scale-[0.99]">
          <Siren className="h-14 w-14" strokeWidth={2.25} />
          <div className="text-2xl font-black tracking-tight">SOS · GET HELP NOW</div>
          <div className="text-xs opacity-90">Press and hold 3 seconds · CANCEL button will appear</div>
        </button>

        {/* Four main actions */}
        <section className="mt-6 grid grid-cols-2 gap-3">
          <ActionTile icon={<MapPin className="h-6 w-6" />}   label="Nearest Shelter" hint="1.4 km · 320 beds free" tone="primary" />
          <ActionTile icon={<RouteIcon className="h-6 w-6" />} label="Evacuation Route" hint="3 route options"       tone="secondary" />
          <ActionTile icon={<Users className="h-6 w-6" />}    label="Find Family"      hint="I am safe · Search"    tone="success" />
          <ActionTile icon={<Droplets className="h-6 w-6" />} label="Water & Aid"      hint="WASH points nearby"    tone="info" />
        </section>

        {/* Preparedness */}
        <section className="mt-6 rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-secondary" />
            <h2 className="text-sm font-semibold text-foreground">Prepare in 3 minutes</h2>
          </div>
          <ul className="mt-3 space-y-2 text-sm">
            {[
              "Charge phones and power banks",
              "Fill 5 litres of drinking water per person",
              "Pack important documents in a plastic bag",
              "Move livestock and vehicles to high ground",
            ].map((s) => (
              <li key={s} className="flex items-start gap-2">
                <ChevronRight className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <span className="text-foreground/90">{s}</span>
              </li>
            ))}
          </ul>
          <button className="mt-4 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm font-semibold hover:bg-accent">
            Watch full guide (offline video)
          </button>
        </section>

        {/* Emergency numbers */}
        <section className="mt-6 rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-secondary" />
            <h2 className="text-sm font-semibold text-foreground">Emergency numbers</h2>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[{n: "112", l: "All-in-one"}, {n: "108", l: "Ambulance"}, {n: "1077", l: "District EOC"}].map((e) => (
              <a key={e.n} href={`tel:${e.n}`} className="rounded-md border border-border bg-surface p-3 text-center hover:bg-accent">
                <div className="text-lg font-bold text-foreground">{e.n}</div>
                <div className="text-[11px] text-muted-foreground">{e.l}</div>
              </a>
            ))}
          </div>
        </section>

        {/* Trust footer */}
        <footer className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5" />
          Official Government of India · ncrmp.gov.in
        </footer>
      </main>

      {/* Sticky SOS bar on mobile */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden">
        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-critical py-3 text-sm font-bold text-critical-foreground">
          <Siren className="h-5 w-5" /> SOS
        </button>
      </div>
    </div>
  );
}

function ActionTile({ icon, label, hint, tone }: { icon: React.ReactNode; label: string; hint: string; tone: "primary" | "secondary" | "success" | "info" }) {
  const toneMap: Record<string, string> = {
    primary:   "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    success:   "bg-success/10 text-success",
    info:      "bg-info/10 text-info",
  };
  return (
    <button className="group flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/30">
      <div className={`grid h-11 w-11 place-items-center rounded-xl ${toneMap[tone]}`}>{icon}</div>
      <div className="min-w-0">
        <div className="text-sm font-semibold text-foreground">{label}</div>
        <div className="mt-0.5 text-xs text-muted-foreground">{hint}</div>
      </div>
    </button>
  );
}
