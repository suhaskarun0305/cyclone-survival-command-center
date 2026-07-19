import { cn } from "@/lib/utils";

// Stylized SVG map — coastline + cyclone track + zones + shelter pins.
// Not a real GIS map, but reads as a mission-critical situation display.
export function StylizedMap({ className, minimal = false }: { className?: string; minimal?: boolean }) {
  return (
    <div className={cn("relative overflow-hidden rounded-lg border border-border bg-[oklch(0.20_0.03_240)]", className)}>
      <svg viewBox="0 0 800 500" className="h-full w-full">
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.65 0.22 27)" stopOpacity="0.55" />
            <stop offset="60%" stopColor="oklch(0.65 0.22 27)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="oklch(0.65 0.22 27)" stopOpacity="0" />
          </radialGradient>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="oklch(1 0 0 / 0.05)" strokeWidth="1" />
          </pattern>
          <linearGradient id="land" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.28 0.04 260)" />
            <stop offset="100%" stopColor="oklch(0.24 0.04 260)" />
          </linearGradient>
        </defs>

        <rect width="800" height="500" fill="url(#grid)" />

        {/* Landmass */}
        <path
          d="M 0,340 Q 90,300 180,320 T 360,300 Q 460,280 540,310 T 720,300 L 800,320 L 800,500 L 0,500 Z"
          fill="url(#land)"
          stroke="oklch(0.42 0.06 260 / 0.7)"
          strokeWidth="1"
        />
        {/* Second landmass strip */}
        <path
          d="M 60,180 Q 160,150 260,175 T 460,170 Q 560,165 640,190 L 720,220 L 720,260 Q 600,240 500,250 T 300,255 Q 180,250 80,240 Z"
          fill="oklch(0.26 0.04 260)"
          opacity="0.6"
        />

        {/* Impact zones */}
        <circle cx="620" cy="370" r="80" fill="oklch(0.65 0.22 27)" opacity="0.14" />
        <circle cx="620" cy="370" r="50" fill="oklch(0.65 0.22 27)" opacity="0.22" />
        <circle cx="480" cy="355" r="60" fill="oklch(0.78 0.16 78)" opacity="0.15" />
        <circle cx="320" cy="345" r="55" fill="oklch(0.78 0.16 78)" opacity="0.10" />
        <circle cx="200" cy="360" r="45" fill="oklch(0.62 0.16 148)" opacity="0.10" />

        {/* Cyclone glow + eye */}
        <circle cx="700" cy="240" r="140" fill="url(#glow)" />
        <g transform="translate(700,240)">
          <circle r="26" fill="none" stroke="oklch(0.65 0.22 27)" strokeWidth="2" opacity="0.9" />
          <circle r="14" fill="none" stroke="oklch(0.85 0.15 30)" strokeWidth="1.6" opacity="0.9" />
          <circle r="4"  fill="oklch(0.85 0.15 30)" />
          {/* Spiral arms */}
          <path d="M 0,-24 A 24,24 0 0 1 24,0"  fill="none" stroke="oklch(0.75 0.18 30)" strokeWidth="2" opacity="0.7" />
          <path d="M 0,24  A 24,24 0 0 1 -24,0" fill="none" stroke="oklch(0.75 0.18 30)" strokeWidth="2" opacity="0.7" />
        </g>

        {/* Forecast track */}
        <path d="M 780,120 Q 740,180 700,240 T 630,340 T 560,400" fill="none" stroke="oklch(0.85 0.15 30)" strokeWidth="2" strokeDasharray="6 6" opacity="0.85" />
        {[{x:780,y:120,t:"T+0"},{x:700,y:240,t:"T-6h"},{x:630,y:340,t:"T-14h"},{x:560,y:400,t:"T-20h"}].map((p) => (
          <g key={p.t}>
            <circle cx={p.x} cy={p.y} r="4" fill="oklch(0.85 0.15 30)" />
            <text x={p.x + 8} y={p.y - 6} fontSize="10" fill="oklch(0.9 0.02 240)" fontWeight="600">{p.t}</text>
          </g>
        ))}

        {/* Shelter pins */}
        {[
          { x: 605, y: 372, s: "S-01" },
          { x: 555, y: 388, s: "S-03" },
          { x: 490, y: 358, s: "S-02" },
          { x: 445, y: 372, s: "S-04" },
          { x: 320, y: 340, s: "S-05" },
          { x: 265, y: 356, s: "S-06" },
          { x: 175, y: 355, s: "S-07" },
          { x: 110, y: 348, s: "S-08" },
        ].map((p) => (
          <g key={p.s}>
            <circle cx={p.x} cy={p.y} r="6" fill="oklch(0.62 0.17 260)" stroke="white" strokeWidth="1.5" />
            {!minimal && <text x={p.x + 8} y={p.y + 3} fontSize="9" fill="oklch(0.92 0.01 240)" fontWeight="600">{p.s}</text>}
          </g>
        ))}

        {/* Team markers */}
        {[
          { x: 610, y: 380, color: "oklch(0.62 0.16 148)" },
          { x: 570, y: 385, color: "oklch(0.78 0.16 78)" },
          { x: 470, y: 360, color: "oklch(0.62 0.16 148)" },
        ].map((t, i) => (
          <g key={i}>
            <circle cx={t.x} cy={t.y} r="10" fill={t.color} opacity="0.25" />
            <circle cx={t.x} cy={t.y} r="4"  fill={t.color} />
          </g>
        ))}

        {/* Compass */}
        <g transform="translate(40,40)">
          <circle r="18" fill="oklch(0.14 0.02 260 / 0.7)" stroke="oklch(1 0 0 / 0.15)" />
          <text x="0" y="-6" textAnchor="middle" fontSize="9" fill="oklch(0.9 0.02 240)" fontWeight="700">N</text>
          <path d="M 0,-12 L 3,0 L 0,4 L -3,0 Z" fill="oklch(0.65 0.22 27)" />
        </g>

        {!minimal && (
          <g transform="translate(20,470)">
            <rect width="200" height="20" rx="4" fill="oklch(0.14 0.02 260 / 0.75)" />
            <text x="10" y="14" fontSize="10" fill="oklch(0.85 0.02 240)" fontWeight="600">Bay of Bengal · Odisha coast · Live</text>
          </g>
        )}
      </svg>

      {/* Legend chip */}
      {!minimal && (
        <div className="absolute right-3 top-3 flex flex-col gap-1 rounded-md border border-white/10 bg-[oklch(0.14_0.02_260/0.8)] px-2.5 py-2 text-[10px] font-medium text-white/90 backdrop-blur-sm">
          <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-critical" />Critical zone</div>
          <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-warning" />Warning zone</div>
          <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-secondary" />Shelter</div>
          <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success" />Rescue team</div>
        </div>
      )}
    </div>
  );
}
