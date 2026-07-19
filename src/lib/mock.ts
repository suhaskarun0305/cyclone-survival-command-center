// Mock data for the Cyclone Command Center demo.

export const cyclone = {
  name: "MAHAVEG",
  category: 4,
  windSpeed: 195, // km/h
  pressure: 942, // mb
  landfallHours: 14.5,
  bearing: "WNW",
  speed: 22,
};

export const zones = [
  { id: "A", name: "Puri Coast",    population: 184000, evacuated: 88, risk: "critical" as const, flood: 68 },
  { id: "B", name: "Konark Belt",   population: 96000,  evacuated: 74, risk: "critical" as const, flood: 55 },
  { id: "C", name: "Bhubaneswar S", population: 240000, evacuated: 61, risk: "warning"  as const, flood: 22 },
  { id: "D", name: "Cuttack North", population: 132000, evacuated: 43, risk: "warning"  as const, flood: 14 },
  { id: "E", name: "Jajpur Inland", population: 78000,  evacuated: 21, risk: "success"  as const, flood: 4 },
];

export const shelters = [
  { id: "S-01", name: "Puri Govt HS",     capacity: 1200, occupancy: 1140, zone: "A", water: 82, medical: true, status: "operational" as const },
  { id: "S-02", name: "Konark Cyclone Ctr", capacity: 800,  occupancy: 780,  zone: "B", water: 58, medical: true, status: "operational" as const },
  { id: "S-03", name: "Nimapara School",  capacity: 600,  occupancy: 620,  zone: "A", water: 34, medical: false, status: "over-capacity" as const },
  { id: "S-04", name: "Sakhigopal Hall",  capacity: 450,  occupancy: 210,  zone: "B", water: 91, medical: true, status: "operational" as const },
  { id: "S-05", name: "Chandaka Center",  capacity: 900,  occupancy: 405,  zone: "C", water: 74, medical: true, status: "operational" as const },
  { id: "S-06", name: "Jatani Community", capacity: 500,  occupancy: 118,  zone: "C", water: 88, medical: false, status: "operational" as const },
  { id: "S-07", name: "Cuttack Sec HS",   capacity: 1500, occupancy: 645,  zone: "D", water: 66, medical: true, status: "operational" as const },
  { id: "S-08", name: "Jajpur Panchayat", capacity: 350,  occupancy: 74,   zone: "E", water: 95, medical: false, status: "standby" as const },
];

export const sosCases = [
  { id: "SOS-4821", name: "Ravi Behera", age: 62, phone: "+91 98••••2314", zone: "A", priority: "CRITICAL" as const, score: 94, ts: "12s ago",  status: "auto-dispatched" as const, reason: "Trapped on rooftop, water rising", team: "RESCUE-07" },
  { id: "SOS-4820", name: "Sunita Das",  age: 34, phone: "+91 76••••1108", zone: "A", priority: "CRITICAL" as const, score: 91, ts: "48s ago",  status: "auto-dispatched" as const, reason: "In labor, road flooded",         team: "MED-03" },
  { id: "SOS-4819", name: "P. Nayak",    age: 71, phone: "+91 90••••4402", zone: "B", priority: "HIGH"     as const, score: 82, ts: "2m ago",   status: "verifying" as const,       reason: "Diabetic, needs insulin",       team: "—" },
  { id: "SOS-4818", name: "Anil Sahoo",  age: 45, phone: "+91 88••••9917", zone: "B", priority: "HIGH"     as const, score: 78, ts: "3m ago",   status: "pending" as const,         reason: "Wall collapse — 4 people inside", team: "—" },
  { id: "SOS-4817", name: "M. Behera",   age: 28, phone: "+91 70••••3311", zone: "C", priority: "MEDIUM"   as const, score: 54, ts: "6m ago",   status: "pending" as const,         reason: "Vehicle stuck in surge water",   team: "—" },
  { id: "SOS-4816", name: "K. Panda",    age: 58, phone: "+91 91••••7720", zone: "D", priority: "LOW"      as const, score: 22, ts: "12m ago",  status: "verifying" as const,       reason: "Power lines down near home",    team: "—" },
];

export const incidents = [
  { id: "INC-9012", type: "SOS",              priority: 96, level: "CRITICAL" as const, title: "Rooftop rescue — Puri sector 4",       zone: "A", ts: "12s",   action: "Auto-dispatched RESCUE-07" },
  { id: "INC-9011", type: "Medical",          priority: 89, level: "CRITICAL" as const, title: "Cardiac arrest at Puri Govt HS",       zone: "A", ts: "40s",   action: "MED-03 en route" },
  { id: "INC-9010", type: "Resource",         priority: 74, level: "HIGH"     as const, title: "Drinking water < 20% at S-03",         zone: "A", ts: "2m",    action: "Auto-preposition 4kL from WH-01" },
  { id: "INC-9009", type: "Road",             priority: 68, level: "HIGH"     as const, title: "NH-316 blocked at KM 42 — fallen tree", zone: "B", ts: "4m",    action: "Alt route pushed to Rescue teams" },
  { id: "INC-9008", type: "Public Report",    priority: 52, level: "MEDIUM"   as const, title: "Flooding waist-deep near Nimapara bus stand", zone: "A", ts: "6m", action: "Acknowledged" },
  { id: "INC-9007", type: "Weather",          priority: 47, level: "MEDIUM"   as const, title: "Wind gusts 210 km/h expected in 6h",   zone: "A", ts: "8m",    action: "6-hour warning issued" },
  { id: "INC-9006", type: "Shelter",          priority: 41, level: "MEDIUM"   as const, title: "S-03 at 103% capacity — redirect flow", zone: "A", ts: "12m",   action: "Redirect to S-04 (47% free)" },
  { id: "INC-9005", type: "System",           priority: 22, level: "LOW"      as const, title: "Cell Broadcast throughput 98.2%",     zone: "—", ts: "15m",   action: "Nominal" },
];

export const teams = [
  { id: "RESCUE-01", name: "NDRF Alpha",   status: "on-scene"  as const, zone: "A", eta: "—",     capacity: "12 personnel · 2 boats" },
  { id: "RESCUE-07", name: "NDRF Charlie", status: "en-route"  as const, zone: "A", eta: "4 min", capacity: "10 personnel · 1 boat" },
  { id: "RESCUE-11", name: "ODRAF Delta",  status: "available" as const, zone: "B", eta: "—",     capacity: "8 personnel · 1 boat" },
  { id: "MED-03",    name: "Medical MRT",  status: "en-route"  as const, zone: "A", eta: "6 min", capacity: "4 medics · ambulance" },
  { id: "FIRE-05",   name: "Fire & Rescue",status: "available" as const, zone: "C", eta: "—",     capacity: "6 personnel · tender" },
  { id: "RESCUE-15", name: "Coast Guard",  status: "on-scene"  as const, zone: "B", eta: "—",     capacity: "helo + crew" },
];

export const resourceInventory = [
  { name: "Drinking Water (kL)",  onHand: 184,  needed: 240, unit: "kL",   intent: "critical" as const },
  { name: "Ready-to-eat meals",   onHand: 42000, needed: 38000, unit: "packs", intent: "success" as const },
  { name: "Medicine kits",        onHand: 620,  needed: 900, unit: "kits", intent: "warning" as const },
  { name: "Blankets & tarps",     onHand: 8400, needed: 9200, unit: "units", intent: "warning" as const },
  { name: "Insulin (cold-chain)", onHand: 145,  needed: 220, unit: "vials", intent: "critical" as const },
  { name: "Generators (portable)",onHand: 38,   needed: 44,  unit: "units", intent: "warning" as const },
];

// 6-hour evacuation trajectory
export const evacuationTrend = [
  { t: "T-24h", pct: 8 },
  { t: "T-20h", pct: 16 },
  { t: "T-16h", pct: 27 },
  { t: "T-12h", pct: 41 },
  { t: "T-8h",  pct: 55 },
  { t: "T-6h",  pct: 62 },
  { t: "T-4h",  pct: 71 },
  { t: "T-2h",  pct: 78 },
  { t: "Now",   pct: 82 },
];

export const coaOptions = [
  {
    id: "coa-1",
    name: "COA 1 · Balanced",
    tag: "Recommended baseline",
    livesSaved: 12480,
    evacuationRate: 84,
    resourceWaste: 12,
    vulnerableReach: 76,
    confidence: 82,
    tone: "info" as const,
    summary: "Proportional resource distribution across all 5 zones; balances speed with fairness.",
    tradeoffs: ["Slower response in Zone A", "Lowest waste of the three", "Even political optics"],
  },
  {
    id: "coa-2",
    name: "COA 2 · Aggressive",
    tag: "Highest lives saved",
    livesSaved: 14210,
    evacuationRate: 91,
    resourceWaste: 24,
    vulnerableReach: 71,
    confidence: 88,
    tone: "critical" as const,
    summary: "75% of resources pre-positioned in Zone A + B (direct landfall). Maximum surge coverage.",
    tradeoffs: ["Zone D & E left thin", "Higher waste if track shifts", "Requires overnight logistics push"],
  },
  {
    id: "coa-3",
    name: "COA 3 · Vulnerable-First",
    tag: "Equity-optimized",
    livesSaved: 13120,
    evacuationRate: 79,
    resourceWaste: 15,
    vulnerableReach: 96,
    confidence: 85,
    tone: "success" as const,
    summary: "Prioritize elderly, disabled, children, and diabetics for early evacuation and insulin drops.",
    tradeoffs: ["Lower total evac rate", "Best outcome for registered vulnerable", "Reduces post-event mortality"],
  },
];

export const predictiveAlerts = [
  { window: "24 hr", status: "issued" as const,     issuedAt: "09:12 IST", channels: ["Cell Broadcast", "SMS", "Radio"], reach: "3.4M devices", severity: "Advisory" },
  { window: "12 hr", status: "issued" as const,     issuedAt: "21:04 IST", channels: ["Cell Broadcast", "SMS"],          reach: "3.6M devices", severity: "Warning" },
  { window: "6 hr",  status: "scheduled" as const,  issuedAt: "03:00 IST", channels: ["Cell Broadcast", "Radio", "Siren"], reach: "≈ 3.7M devices", severity: "Evacuation Order" },
];
