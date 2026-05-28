import type { CSSProperties } from "react";
import { Anchor, Compass, MapPin, Navigation } from "lucide-react";
import { LocalizedText } from "@/components/LocalizedText";
import type { Destination } from "@/data/content";
import { translations } from "@/lib/i18n";

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

type ViewPoint = GeoPoint & {
  x: number;
  y: number;
};

const mapWidth = 640;
const mapHeight = 460;
const tileSize = 256;
const mapPadding = 54;
const satelliteTileUrl = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile";
const seaBendVector = { x: -1, y: 1 };
const outboundColor = "#f4d39a";
const returnColor = "#64d7ce";
const routeLaneGap = 18;
const enText = (key: string) => translations.en[key] ?? "";

const dhermiBeach: GeoPoint = {
  id: "dhermi",
  label: enText("map.point.dhermiBeach"),
  labelKey: "map.point.dhermiBeach",
  lat: 40.14185,
  lng: 19.6276,
  tone: "start"
};

const piratesCave: GeoPoint = {
  id: "pirates",
  label: enText("tour.gjipe.included.0"),
  labelKey: "tour.gjipe.included.0",
  lat: 40.1275,
  lng: 19.64605,
  tone: "stop"
};

const gjipeBeach: GeoPoint = {
  id: "gjipe",
  label: enText("destination.gjipe.title"),
  labelKey: "destination.gjipe.title",
  lat: 40.12495,
  lng: 19.66555,
  tone: "end"
};

const pigeonCave: GeoPoint = {
  id: "pigeon-cave",
  label: enText("tour.gjipe.included.2"),
  labelKey: "tour.gjipe.included.2",
  lat: 40.12262,
  lng: 19.67165,
  tone: "stop"
};

const blueCave: GeoPoint = {
  id: "blue-cave",
  label: enText("destination.blue-cave.title"),
  labelKey: "destination.blue-cave.title",
  lat: 40.21252,
  lng: 19.4738,
  tone: "end"
};

const gramaBay: GeoPoint = {
  id: "grama",
  label: enText("destination.grama.title"),
  labelKey: "destination.grama.title",
  lat: 40.21325,
  lng: 19.46915,
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
    area: enText("map.area.dhermiCoast"),
    areaKey: "map.area.dhermiCoast",
    distance: enText("map.route.short"),
    distanceKey: "map.route.short",
    note: enText("map.note.gjipe"),
    noteKey: "map.note.gjipe",
    points: [dhermiBeach, piratesCave, gjipeBeach, pigeonCave],
    highlights: [
      { label: enText("tour.gjipe.included.0"), labelKey: "tour.gjipe.included.0" },
      { label: enText("tour.gjipe.included.1"), labelKey: "tour.gjipe.included.1" },
      { label: enText("tour.gjipe.included.2"), labelKey: "tour.gjipe.included.2" }
    ]
  },
  grama: {
    area: enText("map.area.karaburunCoast"),
    areaKey: "map.area.karaburunCoast",
    distance: enText("map.route.long"),
    distanceKey: "map.route.long",
    note: enText("map.note.grama"),
    noteKey: "map.note.grama",
    points: [dhermiBeach, blueCaveNearGrama, gramaBay],
    highlights: [
      { label: enText("map.area.karaburunCoast"), labelKey: "map.area.karaburunCoast" },
      { label: enText("destination.blue-cave.title"), labelKey: "destination.blue-cave.title" },
      { label: enText("tour.grama.included.3"), labelKey: "tour.grama.included.3" }
    ]
  },
  "blue-cave": {
    area: enText("map.area.karaburunCaves"),
    areaKey: "map.area.karaburunCaves",
    distance: enText("map.route.cave"),
    distanceKey: "map.route.cave",
    note: enText("map.note.blueCave"),
    noteKey: "map.note.blueCave",
    points: [dhermiBeach, blueCave],
    highlights: [
      { label: enText("map.area.karaburunCoast"), labelKey: "map.area.karaburunCoast" },
      { label: enText("destination.blue-cave.title"), labelKey: "destination.blue-cave.title" },
      { label: enText("map.stop.clearWater"), labelKey: "map.stop.clearWater" }
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
        src: `${satelliteTileUrl}/${zoom}/${y}/${x}`,
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

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function svgPoint(value: number) {
  return value.toFixed(1);
}

function segmentControlPoint(start: ViewPoint, end: ViewPoint, bendRatio: number, maxBend: number) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.hypot(dx, dy);

  if (length === 0) {
    return { x: start.x, y: start.y };
  }

  const normal = { x: -dy / length, y: dx / length };
  const direction = normal.x * seaBendVector.x + normal.y * seaBendVector.y >= 0 ? 1 : -1;
  const bend = clamp(length * bendRatio, 10, maxBend);
  const x = (start.x + end.x) / 2 + normal.x * direction * bend;
  const y = (start.y + end.y) / 2 + normal.y * direction * bend;

  return {
    x: clamp(x, 14, mapWidth - 14),
    y: clamp(y, 14, mapHeight - 14)
  };
}

function smoothRoutePath(points: ViewPoint[], bendRatio: number, maxBend: number) {
  if (points.length < 2) return "";

  const [start, ...stops] = points;
  const commands = [`M ${svgPoint(start.x)} ${svgPoint(start.y)}`];
  let previous = start;

  stops.forEach((point) => {
    const control = segmentControlPoint(previous, point, bendRatio, maxBend);
    commands.push(`Q ${svgPoint(control.x)} ${svgPoint(control.y)} ${svgPoint(point.x)} ${svgPoint(point.y)}`);
    previous = point;
  });

  return commands.join(" ");
}

function offsetRoutePoints(points: ViewPoint[], distance: number) {
  const vectorLength = Math.hypot(seaBendVector.x, seaBendVector.y);
  const offsetX = (seaBendVector.x / vectorLength) * distance;
  const offsetY = (seaBendVector.y / vectorLength) * distance;

  return points.map((point) => ({
    ...point,
    x: clamp(point.x + offsetX, 18, mapWidth - 18),
    y: clamp(point.y + offsetY, 18, mapHeight - 18)
  }));
}

function buildSeparatedRoutePaths(points: ViewPoint[]) {
  const outboundPoints = offsetRoutePoints(points, -routeLaneGap * 0.55);
  const returnPoints = offsetRoutePoints([...points].reverse(), routeLaneGap * 0.85);

  return {
    outbound: smoothRoutePath(outboundPoints, 0.1, 34),
    returnRoute: smoothRoutePath(returnPoints, 0.12, 42)
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
      {points.map((point, index) => {
        const paint = markerPaint(point.tone);

        return (
          <li key={point.id} className="flex items-start gap-3">
            <span
              className="grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 text-[11px] font-bold shadow-sm"
              style={{ backgroundColor: paint.fill, borderColor: paint.stroke, color: paint.text }}
            >
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
        );
      })}
    </ol>
  );
}

function RealMapCanvas({ map, titleId, descId }: { map: RouteMap; titleId: string; descId: string }) {
  const view = buildMap(map.points);
  const routePaths = buildSeparatedRoutePaths(view.points);
  const outboundArrowId = `${titleId}-outbound-arrow`;
  const returnArrowId = `${titleId}-return-arrow`;
  const routeGlowId = `${titleId}-route-glow`;

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
            height={tileSize}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={tile.src}
            style={tile.style}
            width={tileSize}
          />
        ))}
      </div>
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,252,246,0.08),rgba(255,252,246,0)),linear-gradient(90deg,rgba(7,27,38,0.18),rgba(7,27,38,0)_28%,rgba(7,27,38,0)_72%,rgba(7,27,38,0.14)),radial-gradient(circle_at_18%_20%,rgba(255,252,246,0.18),transparent_28%)]" />
      <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox={`0 0 ${mapWidth} ${mapHeight}`}>
        <defs>
          <filter id={routeGlowId} x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" floodColor="#071b26" floodOpacity="0.42" stdDeviation="2.4" />
          </filter>
          <marker id={outboundArrowId} markerHeight="14" markerUnits="userSpaceOnUse" markerWidth="18" orient="auto" refX="16" refY="7">
            <path d="M2 2 16 7 2 12 5.8 7z" fill={outboundColor} stroke="#071b26" strokeWidth="1.35" />
          </marker>
          <marker id={returnArrowId} markerHeight="14" markerUnits="userSpaceOnUse" markerWidth="18" orient="auto" refX="16" refY="7">
            <path d="M2 2 16 7 2 12 5.8 7z" fill={returnColor} stroke="#071b26" strokeWidth="1.35" />
          </marker>
        </defs>
        <path data-route-layer="return-track" d={routePaths.returnRoute} fill="none" filter={`url(#${routeGlowId})`} opacity="0.94" stroke="#071b26" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8.5" />
        <path data-route-layer="return-line" d={routePaths.returnRoute} fill="none" markerEnd={`url(#${returnArrowId})`} stroke={returnColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.2" />
        <path data-route-layer="outbound-track" d={routePaths.outbound} fill="none" filter={`url(#${routeGlowId})`} opacity="0.94" stroke="#071b26" strokeLinecap="round" strokeLinejoin="round" strokeWidth="9.5" />
        <path data-route-layer="outbound-line" d={routePaths.outbound} fill="none" markerEnd={`url(#${outboundArrowId})`} stroke={outboundColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.8" />
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
              <circle cx={badgeX} cy={badgeY} fill="#fffaf0" opacity="0.94" r={point.tone === "end" ? 18 : 17} />
              <circle cx={badgeX} cy={badgeY} fill={paint.fill} r={point.tone === "end" ? 13 : 12} stroke={paint.stroke} strokeWidth="3" />
              <text className="text-[14px] font-bold" dominantBaseline="middle" fill={paint.text} textAnchor="middle" x={badgeX} y={badgeY + 0.5}>
                {index + 1}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="absolute right-2 top-2 inline-flex items-center gap-2 rounded-full bg-pearl px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-ink shadow-sm backdrop-blur">
        <MapPin className="h-3.5 w-3.5 text-turquoise" aria-hidden strokeWidth={1.75} />
        <LocalizedText id="map.real">{enText("map.real")}</LocalizedText>
      </div>
      <div data-route-legend className="absolute bottom-2 left-2 flex items-center gap-2 rounded-full bg-ink/82 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-pearl shadow-sm backdrop-blur">
        <span className="route-label-outbound inline-flex items-center gap-1.5">
          <span className="h-1.5 w-5 rounded-full border border-ink bg-[#f4d39a] shadow-[0_0_0_1px_rgba(255,250,240,0.7)]" />
          <LocalizedText id="map.outbound">{enText("map.outbound")}</LocalizedText>
        </span>
        <span className="h-3 w-px bg-pearl/30" />
        <span className="route-label-return inline-flex items-center gap-1.5">
          <span className="h-1.5 w-5 rounded-full border border-ink bg-[#64d7ce] shadow-[0_0_0_1px_rgba(255,250,240,0.7)]" />
          <LocalizedText id="map.return">{enText("map.return")}</LocalizedText>
        </span>
      </div>
      <a
        className="absolute bottom-2 right-2 inline-flex min-h-8 items-center rounded bg-pearl/88 px-2 text-[10px] font-semibold text-ink-soft underline-offset-2 hover:text-ink hover:underline"
        href="https://www.esri.com/en-us/legal/terms/data-attributions"
        rel="noreferrer"
        target="_blank"
      >
        Imagery © Esri
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
                <LocalizedText id="map.label">{enText("map.label")}</LocalizedText>
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
                      <LocalizedText id="map.area">{enText("map.area")}</LocalizedText>
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
                      <LocalizedText id="map.route">{enText("map.route")}</LocalizedText>
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
                  <LocalizedText id="map.points">{enText("map.points")}</LocalizedText>
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
