import { Marker, Popup } from 'react-leaflet'
import { mcToLatLng, formatMcCoord } from '@/utils/coordinates'
import type { POI } from '@/types'

interface POIMarkerProps {
  poi: POI
  onClick?: (poi: POI) => void
}

export default function POIMarker({ poi, onClick }: POIMarkerProps) {
  const position = mcToLatLng(poi.x, poi.z)

  return (
    <Marker
      position={position}
      eventHandlers={{
        click: () => onClick?.(poi),
      }}
    >
      <Popup>
        <div className="min-w-[160px]">
          <h3 className="font-semibold text-sm">{poi.name}</h3>
          <p className="text-xs text-muted-foreground">{poi.category}</p>
          <p className="text-xs mt-1">{formatMcCoord(poi.x, poi.y, poi.z)}</p>
        </div>
      </Popup>
    </Marker>
  )
}
