import { useMapStore } from '@/stores'
import type { POI } from '@/types'
import POIMarker from './POIMarker'

interface POILayerProps {
  pois: POI[]
  onPOIClick?: (poi: POI) => void
}

export default function POILayer({ pois, onPOIClick }: POILayerProps) {
  const visible = useMapStore((s) => s.visibleLayers.pois)

  if (!visible) return null

  return (
    <>
      {pois.map((poi) => (
        <POIMarker key={poi.id} poi={poi} onClick={onPOIClick} />
      ))}
    </>
  )
}
