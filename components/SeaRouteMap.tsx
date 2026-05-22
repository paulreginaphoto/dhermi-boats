import { Anchor, Compass, Navigation } from "lucide-react";
import { LocalizedText } from "@/components/LocalizedText";
import type { Destination } from "@/data/content";

type RoutePoint = {
  id: string;
  label: string;
  labelKey: string;
  x: number;
  y: number;
  tone?: "start" | "stop" | "end";
};

type RouteMap = {
  route: string;
  area: string;
  areaKey: string;
  distance: string;
  distanceKey: string;
  note: string;
  noteKey: string;
  points: RoutePoint[];
  highlights: Array<{ label: string; labelKey: string }>;
};

const routeMaps: Record<string, RouteMap> = {
  gjipe: {
    route: "M 520 350 C 490 328 455 302 420 276 C 384 249 354 225 320 210",
    area: "Dhërmi coast",
    areaKey: "map.area.dhermiCoast",
    distance: "Short coastal route",
    distanceKey: "map.route.short",
    note: "Indicative route, adjusted to sea conditions.",
    noteKey: "map.note.gjipe",
    points: [
      { id: "dhermi", label: "Dhërmi", labelKey: "map.point.dhermi", x: 520, y: 350, tone: "start" },
      { id: "pirates", label: "Pirates Cave", labelKey: "tour.gjipe.included.0", x: 420, y: 276, tone: "stop" },
      { id: "gjipe", label: "Gjipe", labelKey: "destination.gjipe.title", x: 320, y: 210, tone: "end" }
    ],
    highlights: [
      { label: "Pirates Cave", labelKey: "tour.gjipe.included.0" },
      { label: "Gjipe Beach", labelKey: "tour.gjipe.included.1" },
      { label: "Pigeon Cave", labelKey: "tour.gjipe.included.2" }
    ]
  },
  grama: {
    route: "M 535 372 C 486 325 444 287 390 255 C 330 219 282 182 232 145 C 190 114 151 91 110 76",
    area: "Karaburun coast",
    areaKey: "map.area.karaburunCoast",
    distance: "Long coastal route",
    distanceKey: "map.route.long",
    note: "Route may change with wind and waves.",
    noteKey: "map.note.grama",
    points: [
      { id: "dhermi", label: "Dhërmi", labelKey: "map.point.dhermi", x: 535, y: 372, tone: "start" },
      { id: "gjipe", label: "Gjipe", labelKey: "destination.gjipe.title", x: 390, y: 255, tone: "stop" },
      { id: "blue-cave", label: "Blue Cave", labelKey: "destination.blue-cave.title", x: 232, y: 145, tone: "stop" },
      { id: "grama", label: "Grama Bay", labelKey: "destination.grama.title", x: 110, y: 76, tone: "end" }
    ],
    highlights: [
      { label: "San Andrea Beach", labelKey: "tour.grama.included.1" },
      { label: "Blue Cave", labelKey: "destination.blue-cave.title" },
      { label: "Grama Beach", labelKey: "tour.grama.included.3" }
    ]
  },
  "blue-cave": {
    route: "M 540 376 C 492 331 445 289 386 250 C 330 213 280 174 224 134",
    area: "Karaburun caves",
    areaKey: "map.area.karaburunCaves",
    distance: "Cave route",
    distanceKey: "map.route.cave",
    note: "Cave entry depends on sea conditions.",
    noteKey: "map.note.blueCave",
    points: [
      { id: "dhermi", label: "Dhërmi", labelKey: "map.point.dhermi", x: 540, y: 376, tone: "start" },
      { id: "gjipe", label: "Gjipe", labelKey: "destination.gjipe.title", x: 386, y: 250, tone: "stop" },
      { id: "blue-cave", label: "Blue Cave", labelKey: "destination.blue-cave.title", x: 224, y: 134, tone: "end" }
    ],
    highlights: [
      { label: "Karaburun coast", labelKey: "map.area.karaburunCoast" },
      { label: "Blue Cave", labelKey: "destination.blue-cave.title" },
      { label: "Clear water stop", labelKey: "map.stop.clearWater" }
    ]
  }
};

function pointClass(tone: RoutePoint["tone"]) {
  if (tone === "start") return "fill-pearl stroke-ink";
  if (tone === "end") return "fill-turquoise stroke-pearl";
  return "fill-sand stroke-ink";
}

export function SeaRouteMap({ destination, compact = false }: { destination: Destination; compact?: boolean }) {
  const map = routeMaps[destination.id];
  if (!map) return null;

  const titleId = `sea-route-title-${destination.id}`;
  const descId = `sea-route-desc-${destination.id}`;

  return (
    <article className={compact ? "overflow-hidden rounded-lg border border-white/12 bg-pearl text-ink shadow-image" : "overflow-hidden rounded-lg border border-ink/10 bg-pearl shadow-image"}>
      <div className={compact ? "p-4 md:p-5" : "grid gap-0 lg:grid-cols-[0.62fr_1fr]"}>
        <div className={compact ? "" : "border-b border-ink/8 bg-limestone p-5 md:p-7 lg:border-b-0 lg:border-r"}>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-turquoise-soft text-turquoise">
              <Navigation className="h-5 w-5" aria-hidden strokeWidth={1.75} />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-bronze">
                <LocalizedText id="map.label">Sea route</LocalizedText>
              </p>
              <h2 id={titleId} className="mt-1 font-serif text-2xl font-medium leading-tight text-ink md:text-3xl">
                <LocalizedText id={`destination.${destination.id}.title`}>{destination.title}</LocalizedText>
              </h2>
            </div>
          </div>
          {!compact ? (
            <>
              <dl className="mt-6 grid gap-3 text-sm">
                <div className="flex items-start gap-3">
                  <Compass className="mt-0.5 h-4 w-4 shrink-0 text-turquoise" aria-hidden strokeWidth={1.75} />
                  <div>
                    <dt className="font-bold uppercase tracking-[0.14em] text-bronze">
                      <LocalizedText id="map.area">Area</LocalizedText>
                    </dt>
                    <dd className="mt-1 font-semibold text-ink">
                      <LocalizedText id={map.areaKey}>{map.area}</LocalizedText>
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Anchor className="mt-0.5 h-4 w-4 shrink-0 text-turquoise" aria-hidden strokeWidth={1.75} />
                  <div>
                    <dt className="font-bold uppercase tracking-[0.14em] text-bronze">
                      <LocalizedText id="map.route">Route</LocalizedText>
                    </dt>
                    <dd className="mt-1 font-semibold text-ink">
                      <LocalizedText id={map.distanceKey}>{map.distance}</LocalizedText>
                    </dd>
                  </div>
                </div>
              </dl>
              <p id={descId} className="mt-6 text-sm leading-7 text-ink-soft">
                <LocalizedText id={map.noteKey}>{map.note}</LocalizedText>
              </p>
            </>
          ) : null}
        </div>

        <div className={compact ? "mt-4" : "bg-[#e6f3f0] p-3 md:p-5"}>
          {compact ? (
            <p id={descId} className="sr-only">
              <LocalizedText id={map.noteKey}>{map.note}</LocalizedText>
            </p>
          ) : null}
          <svg
            aria-describedby={descId}
            aria-labelledby={titleId}
            className="block aspect-[1.08/1] w-full rounded-md bg-[#d8efed] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] md:aspect-[1.45/1]"
            role="img"
            viewBox="0 0 640 460"
          >
            <defs>
              <linearGradient id={`sea-${destination.id}`} x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#b9e6e3" />
                <stop offset="54%" stopColor="#72bdc0" />
                <stop offset="100%" stopColor="#1f7c86" />
              </linearGradient>
              <filter id={`soft-shadow-${destination.id}`} colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="10" floodColor="#071B26" floodOpacity="0.16" stdDeviation="10" />
              </filter>
            </defs>

            <rect width="640" height="460" fill={`url(#sea-${destination.id})`} />
            <path d="M 638 0 L 638 460 L 425 460 C 448 409 507 392 545 357 C 580 324 557 290 599 250 C 634 216 608 180 624 136 C 637 101 610 56 638 0 Z" fill="#f6f0e6" opacity="0.98" />
            <path d="M 638 0 C 613 50 637 96 619 135 C 599 178 631 215 594 250 C 554 288 579 323 542 357 C 503 393 447 410 425 460" fill="none" stroke="#7b4d20" strokeLinecap="round" strokeWidth="5" opacity="0.45" />
            <path d="M 0 410 C 90 392 125 420 200 398 C 284 373 347 383 445 349" fill="none" stroke="#fffcf6" strokeDasharray="3 16" strokeLinecap="round" strokeWidth="3" opacity="0.42" />
            <path d="M 70 92 C 154 72 215 92 272 76" fill="none" stroke="#fffcf6" strokeDasharray="2 14" strokeLinecap="round" strokeWidth="3" opacity="0.32" />

            <path d={map.route} fill="none" filter={`url(#soft-shadow-${destination.id})`} stroke="#fffcf6" strokeLinecap="round" strokeWidth="15" opacity="0.78" />
            <path d={map.route} fill="none" stroke="#071b26" strokeLinecap="round" strokeWidth="5" />
            <path d={map.route} fill="none" stroke="#f4d39a" strokeDasharray="2 18" strokeLinecap="round" strokeWidth="4" />

            {map.points.map((point) => (
              <g key={point.id}>
                <circle className={pointClass(point.tone)} cx={point.x} cy={point.y} r={point.tone === "end" ? 13 : 10} strokeWidth="4" />
                <text className="fill-ink text-[22px] font-bold" data-i18n={point.labelKey} x={point.x + 18} y={point.y - 14}>{point.label}</text>
              </g>
            ))}

            <g transform="translate(34 34)">
              <circle cx="0" cy="0" r="20" fill="#fff9ef" opacity="0.9" />
              <path d="M 0 -12 L 6 12 L 0 8 L -6 12 Z" fill="#10222d" />
              <text className="fill-ink text-[16px] font-bold" x="30" y="6">N</text>
            </g>
          </svg>

          <div className={compact ? "mt-3 grid gap-2 text-sm text-ink-soft" : "mt-4 flex flex-wrap gap-2 text-sm text-ink-soft"}>
            {map.highlights.map((item) => (
              <span key={item.labelKey} className="rounded-full border border-ink/10 bg-white px-3 py-1 font-semibold">
                <LocalizedText id={item.labelKey}>{item.label}</LocalizedText>
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
