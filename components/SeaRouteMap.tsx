import type { CSSProperties } from "react";
import { Anchor, Compass, MapPin, Navigation } from "lucide-react";
import { LocalizedText } from "@/components/LocalizedText";
import type { Destination } from "@/data/content";

type GeoPoint = {
  id: string;
  label: string;
  labelKey: string;
  lat: number;
  lng: number;
  tone?: "start" | "stop" | "end";
  badgeDx?: number;
  badgeDy?: number;
};

type RouteMap = {
  area: string;
  areaKey: string;
  distance: string;
  distanceKey: string;
  note: string;
  noteKey: string;
  points: GeoPoint[];
  highlights: Array<{ label: string; labelKey: string }>;
};

type MapTile = {
  key: string;
  src: string;
  style: CSSProperties;
};

const mapWidth = 640;
const mapHeight = 460;
const tileSize = 256;
const mapPadding = 54;

const dhermiBeach: GeoPoint = {
  id: "dhermi",
  label: "Dhërmi beach area",
  labelKey: "map.point.dhermiBeach",
  lat: 40.1442,
  lng: 19.63409,
  tone: "start"
};

const piratesCave: GeoPoint = {
  id: "pirates",
  label: "Pirates Cave",
  labelKey: "tour.gjipe.included.0",
  lat: 40.129179,
  lng: 19.6514375,
  tone: "stop"
};

const gjipeBeach: GeoPoint = {
  id: "gjipe",
  label: "Gjipe",
  labelKey: "destination.gjipe.title",
  lat: 40.1418,
  lng: 19.6792,
  tone: "end"
};

const pigeonCave: GeoPoint = {
  id: "pigeon-cave",
  label: "Pigeon Cave",
  labelKey: "tour.gjipe.included.2",
  lat: 40.1245561,
  lng: 19.6773936,
  tone: "stop"
};

const blueCave: GeoPoint = {
  id: "blue-cave",
  label: "Blue Cave",
  labelKey: "destination.blue-cave.title",
  lat: 40.214205,
  lng: 19.479016,
  tone: "end"
};

const gramaBay: GeoPoint = {
  id: "grama",
  label: "Grama Bay",
  labelKey: "destination.grama.title",
  lat: 40.2153227,
  lng: 19.473504,
  tone: "end"
};

const blueCaveNearGrama: GeoPoint = {
  ...blueCave,
  badgeDx: 78,
  badgeDy: 18,
  tone: "stop"
};

const routeMaps: Record<string, RouteMap> = {
  gjipe: {
    area: "Dhërmi coast",
    areaKey: "map.area.dhermiCoast",
    distance: "Short coastal route",
    distanceKey: "map.route.short",
    note: "OpenStreetMap with public GPS points. The skipper may adjust the exact sea path.",
    noteKey: "map.note.gjipe",
    points: [dhermiBeach, piratesCave, gjipeBeach, pigeonCave],
    highlights: [
      { label: "Pirates Cave", labelKey: "tour.gjipe.included.0" },
      { label: "Gjipe Beach", labelKey: "tour.gjipe.included.1" },
      { label: "Pigeon Cave", labelKey: "tour.gjipe.included.2" }
    ]
  },
  grama: {
    area: "Karaburun coast",
    areaKey: "map.area.karaburunCoast",
    distance: "Long coastal route",
    distanceKey: "map.route.long",
    note: "OpenStreetMap with public GPS points. The skipper may adjust the exact sea path.",
    noteKey: "map.note.grama",
    points: [dhermiBeach, blueCaveNearGrama, gramaBay],
    highlights: [
      { label: "Karaburun coast", labelKey: "map.area.karaburunCoast" },
      { label: "Blue Cave", labelKey: "destination.blue-cave.title" },
      { label: "Grama Beach", labelKey: "tour.grama.included.3" }
    ]
  },
  "blue-cave": {
    area: "Karaburun caves",
    areaKey: "map.area.karaburunCaves",
    distance: "Cave route",
    distanceKey: "map.route.cave",
    note: "OpenStreetMap with public GPS points. Cave entry depends on sea conditions.",
    noteKey: "map.note.blueCave",
    points: [dhermiBeach, blueCave],
    highlights: [
      { label: "Karaburun coast", labelKey: "map.area.karaburunCoast" },
      { label: "Blue Cave", labelKey: "destination.blue-cave.title" },
      { label: "Clear water stop", labelKey: "map.stop.clearWater" }
    ]
  }
};

function project(lat: number, lng: number, zoom: number) {
  const sinLat = Math.sin((lat * Math.PI) / 180);
  const scale = tileSize * 2 ** zoom;

  return {
    x: ((lng + 180) / 360) * scale,
    y: (0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) * scale
  };
}

function chooseZoom(points: GeoPoint[]) {
  for (let zoom = 15; zoom >= 10; zoom -= 1) {
    const projected = points.map((point) => project(point.lat, point.lng, zoom));
    const xs = projected.map((point) => point.x);
    const ys = projected.map((point) => point.y);
    const width = Math.max(...xs) - Math.min(...xs);
    const height = Math.max(...ys) - Math.min(...ys);

    if (width <= mapWidth - mapPadding * 2 && height <= mapHeight - mapPadding * 2) {
      return zoom;
    }
  }

  return 10;
}

function buildMap(points: GeoPoint[]) {
  const zoom = chooseZoom(points);
  const projected = points.map((point) => ({ point, pixel: project(point.lat, point.lng, zoom) }));
  const xs = projected.map(({ pixel }) => pixel.x);
  const ys = projected.map(({ pixel }) => pixel.y);
  const centerX = (Math.min(...xs) + Math.max(...xs)) / 2;
  const centerY = (Math.min(...ys) + Math.max(...ys)) / 2;
  const left = centerX - mapWidth / 2;
  const top = centerY - mapHeight / 2;
  const minTileX = Math.floor(left / tileSize);
  const maxTileX = Math.floor((left + mapWidth) / tileSize);
  const minTileY = Math.floor(top / tileSize);
  const maxTileY = Math.floor((top + mapHeight) / tileSize);
  const tiles: MapTile[] = [];

  for (let x = minTileX; x <= maxTileX; x += 1) {
    for (let y = minTileY; y <= maxTileY; y += 1) {
      tiles.push({
        key: `${zoom}-${x}-${y}`,
        src: `https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`,
        style: {
          height: `${(tileSize / mapHeight) * 100}%`,
          left: `${((x * tileSize - left) / mapWidth) * 100}%`,
          top: `${((y * tileSize - top) / mapHeight) * 100}%`,
          width: `${(tileSize / mapWidth) * 100}%`
        }
      });
    }
  }

  return {
    points: projected.map(({ point, pixel }) => ({
      ...point,
      x: pixel.x - left,
      y: pixel.y - top
    })),
    tiles,
    zoom
  };
}

function markerPaint(tone: GeoPoint["tone"]) {
  if (tone === "start") return { fill: "#fffaf0", stroke: "#071b26", text: "#071b26" };
  if (tone === "end") return { fill: "#3aa8a0", stroke: "#fffaf0", text: "#071b26" };
  return { fill: "#f4d39a", stroke: "#071b26", text: "#071b26" };
}

function formatCoordinates(point: GeoPoint) {
  return `${point.lat.toFixed(5)}, ${point.lng.toFixed(5)}`;
}

function PointList({ points, compact = false }: { points: GeoPoint[]; compact?: boolean }) {
  return (
    <ol className={compact ? "mt-3 grid gap-2 text-xs text-ink-soft" : "mt-6 grid gap-3 text-sm text-ink-soft"}>
      {points.map((point, index) => (
        <li key={point.id} className="flex items-start gap-3">
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink text-[11px] font-bold text-pearl">
            {index + 1}
          </span>
          <span className="min-w-0">
            <span className="block font-semibold text-ink">
              <LocalizedText id={point.labelKey}>{point.label}</LocalizedText>
            </span>
            <span className="mt-0.5 block font-mono text-[11px] tabular-nums text-ink-soft/80">
              {formatCoordinates(point)}
            </span>
          </span>
        </li>
      ))}
    </ol>
  );
}

function RealMapCanvas({ map, titleId, descId }: { map: RouteMap; titleId: string; descId: string }) {
  const view = buildMap(map.points);
  const routePoints = view.points.map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ");

  return (
    <div
      aria-describedby={descId}
      aria-labelledby={titleId}
      className="relative isolate aspect-[1.391/1] overflow-hidden rounded-md border border-ink/10 bg-[#cfe0d8] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]"
      role="img"
    >
      <div aria-hidden className="absolute inset-0">
        {view.tiles.map((tile) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={tile.key}
            alt=""
            className="absolute max-w-none"
            decoding="async"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={tile.src}
            style={tile.style}
          />
        ))}
      </div>
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,252,246,0.08),rgba(255,252,246,0)),radial-gradient(circle_at_18%_20%,rgba(255,252,246,0.18),transparent_28%)]" />
      <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox={`0 0 ${mapWidth} ${mapHeight}`}>
        <polyline fill="none" points={routePoints} stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="18" opacity="0.88" />
        <polyline fill="none" points={routePoints} stroke="#071b26" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7" />
        <polyline fill="none" points={routePoints} stroke="#f4d39a" strokeDasharray="2 17" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
        {view.points.map((point, index) => {
          const badgeX = point.x + (point.badgeDx ?? 0);
          const badgeY = point.y + (point.badgeDy ?? 0);
          const paint = markerPaint(point.tone);

          return (
            <g key={point.id}>
              {point.badgeDx || point.badgeDy ? (
                <>
                  <line stroke="#fffaf0" strokeLinecap="round" strokeWidth="8" x1={point.x} x2={badgeX} y1={point.y} y2={badgeY} />
                  <line stroke="#071b26" strokeLinecap="round" strokeWidth="3" x1={point.x} x2={badgeX} y1={point.y} y2={badgeY} />
                  <circle cx={point.x} cy={point.y} fill="#fffaf0" r="8" />
                  <circle cx={point.x} cy={point.y} fill="#071b26" r="4.5" />
                </>
              ) : null}
              <circle cx={badgeX} cy={badgeY} fill="#fffaf0" opacity="0.92" r={point.tone === "end" ? 22 : 20} />
              <circle cx={badgeX} cy={badgeY} fill={paint.fill} r={point.tone === "end" ? 17 : 15} stroke={paint.stroke} strokeWidth="4" />
              <text className="text-[17px] font-bold" dominantBaseline="middle" fill={paint.text} textAnchor="middle" x={badgeX} y={badgeY + 1}>
                {index + 1}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-pearl/92 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-ink shadow-sm backdrop-blur">
        <MapPin className="h-3.5 w-3.5 text-turquoise" aria-hidden strokeWidth={1.75} />
        <LocalizedText id="map.real">GPS map</LocalizedText>
      </div>
      <a
        className="absolute bottom-2 right-2 inline-flex min-h-8 items-center rounded bg-pearl/92 px-2 text-[10px] font-semibold text-ink-soft underline-offset-2 hover:text-ink hover:underline"
        href="https://www.openstreetmap.org/copyright"
        rel="noreferrer"
        target="_blank"
      >
        © OpenStreetMap
      </a>
    </div>
  );
}

export function SeaRouteMap({ destination, compact = false }: { destination: Destination; compact?: boolean }) {
  const map = routeMaps[destination.id];
  if (!map) return null;

  const titleId = `sea-route-title-${destination.id}`;
  const descId = `sea-route-desc-${destination.id}`;

  return (
    <article className={compact ? "overflow-hidden rounded-lg border border-white/12 bg-pearl text-ink shadow-image" : "overflow-hidden rounded-lg border border-ink/10 bg-pearl shadow-image"}>
      <div className={compact ? "p-4 md:p-5" : "grid gap-0 lg:grid-cols-[0.46fr_0.54fr]"}>
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
              <div className="mt-6 border-t border-ink/10 pt-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-bronze">
                  <LocalizedText id="map.points">GPS points</LocalizedText>
                </p>
                <PointList points={map.points} />
              </div>
            </>
          ) : null}
        </div>

        <div className={compact ? "mt-4" : "bg-[#e6f3f0] p-3 md:p-5"}>
          {compact ? (
            <p id={descId} className="sr-only">
              <LocalizedText id={map.noteKey}>{map.note}</LocalizedText>
            </p>
          ) : null}
          <RealMapCanvas descId={descId} map={map} titleId={titleId} />
          {compact ? (
            <PointList compact points={map.points} />
          ) : (
            <div className="mt-4 flex flex-wrap gap-2 text-sm text-ink-soft">
              {map.highlights.map((item) => (
                <span key={item.labelKey} className="rounded-full border border-ink/10 bg-white px-3 py-1 font-semibold">
                  <LocalizedText id={item.labelKey}>{item.label}</LocalizedText>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
