import { X } from 'lucide-react'
import { formatMcCoord } from '@/utils/coordinates'
import type { POI, Route, Area } from '@/types'

type DetailTarget =
  | { type: 'poi'; data: POI }
  | { type: 'route'; data: Route }
  | { type: 'area'; data: Area }

interface DetailPanelProps {
  target: DetailTarget | null
  onClose: () => void
}

export default function DetailPanel({ target, onClose }: DetailPanelProps) {
  if (!target) return null

  return (
    <div className="absolute top-0 left-0 z-[1000] h-full w-80 bg-background border-r shadow-xl overflow-y-auto animate-in slide-in-from-left">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-semibold text-lg truncate">
          {target.data.name}
        </h2>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-accent"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {target.type === 'poi' && <POIDetail poi={target.data} />}
        {target.type === 'route' && <RouteDetail route={target.data} />}
        {target.type === 'area' && <AreaDetail area={target.data} />}
      </div>
    </div>
  )
}

function POIDetail({ poi }: { poi: POI }) {
  return (
    <>
      <Section label="Category">{poi.category}</Section>
      <Section label="Description">{poi.description}</Section>
      <Section label="Coordinates">
        {formatMcCoord(poi.x, poi.y, poi.z)}
      </Section>
      {poi.tags.length > 0 && (
        <Section label="Tags">
          <div className="flex flex-wrap gap-1">
            {poi.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </Section>
      )}
      {poi.images.length > 0 && (
        <Section label="Images">
          <div className="grid grid-cols-2 gap-2">
            {poi.images.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`${poi.name} ${i + 1}`}
                className="rounded border object-cover aspect-video w-full"
              />
            ))}
          </div>
        </Section>
      )}
    </>
  )
}

function RouteDetail({ route }: { route: Route }) {
  return (
    <>
      <Section label="Type">
        <span className="capitalize">{route.type}</span>
      </Section>
      <Section label="Description">{route.description}</Section>
      <Section label="Style">
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-8 h-1 rounded"
            style={{ backgroundColor: route.color }}
          />
          <span className="text-xs text-muted-foreground">
            Width: {route.width}
          </span>
        </div>
      </Section>
      <Section label="Points">{route.points.length} waypoints</Section>
    </>
  )
}

function AreaDetail({ area }: { area: Area }) {
  return (
    <>
      <Section label="Category">{area.category}</Section>
      <Section label="Description">{area.description}</Section>
      <Section label="Style">
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-6 h-6 rounded border"
            style={{
              backgroundColor: area.fillColor,
              borderColor: area.borderColor,
              opacity: area.fillOpacity,
            }}
          />
          <span className="text-xs text-muted-foreground">
            Weight: {area.weight}
          </span>
        </div>
      </Section>
      <Section label="Vertices">{area.points.length} points</Section>
    </>
  )
}

function Section({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <p className="text-xs font-medium text-muted-foreground mb-1">{label}</p>
      <div className="text-sm">{children}</div>
    </div>
  )
}
