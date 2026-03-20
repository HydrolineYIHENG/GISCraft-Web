import { Polygon, Popup } from 'react-leaflet'
import { mcPathToLatLngs } from '@/utils/coordinates'
import { useMapStore } from '@/stores'
import type { Area } from '@/types'

interface AreaLayerProps {
  areas: Area[]
  onAreaClick?: (area: Area) => void
}

export default function AreaLayer({ areas, onAreaClick }: AreaLayerProps) {
  const visible = useMapStore((s) => s.visibleLayers.areas)

  if (!visible) return null

  const sorted = [...areas].sort((a, b) => a.priority - b.priority)

  return (
    <>
      {sorted.map((area) => {
        const positions = mcPathToLatLngs(area.points)

        return (
          <Polygon
            key={area.id}
            positions={positions}
            pathOptions={{
              fillColor: area.fillColor,
              color: area.borderColor,
              fillOpacity: area.fillOpacity,
              weight: area.weight,
            }}
            eventHandlers={{
              click: () => onAreaClick?.(area),
            }}
          >
            <Popup>
              <div className="min-w-[140px]">
                <h3 className="font-semibold text-sm">{area.name}</h3>
                <p className="text-xs text-muted-foreground">{area.category}</p>
              </div>
            </Popup>
          </Polygon>
        )
      })}
    </>
  )
}
