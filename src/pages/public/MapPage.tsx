import { useState, useCallback, useEffect } from 'react'
import { MapContainer, useMap } from 'react-leaflet'
import { useQuery } from '@tanstack/react-query'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {
  DynmapTileLayer,
  POILayer,
  RouteLayer,
  AreaLayer,
  LayerControl,
  DetailPanel,
} from '@/components/map'
import { SearchBox } from '@/components/search'
import { fetchPOIs, fetchRoutes, fetchAreas } from '@/api'
import { useMapStore } from '@/stores'
import { mcToLatLng } from '@/utils/coordinates'
import type { POI, Route, Area, SearchResult } from '@/types'

type DetailTarget =
  | { type: 'poi'; data: POI }
  | { type: 'route'; data: Route }
  | { type: 'area'; data: Area }

/** Helper component to fly to a location */
function FlyToHandler({ target }: { target: { x: number; z: number } | null }) {
  const map = useMap()

  useEffect(() => {
    if (target) {
      map.flyTo(mcToLatLng(target.x, target.z), map.getZoom() < 4 ? 4 : map.getZoom())
    }
  }, [map, target])

  return null
}

export default function MapPage() {
  const config = useMapStore((s) => s.config)
  const [detail, setDetail] = useState<DetailTarget | null>(null)
  const [flyTarget, setFlyTarget] = useState<{ x: number; z: number } | null>(null)

  const defaultCenter = config?.defaultCenter ?? { x: 0, z: 0 }
  const tileUrl = config?.tileUrlTemplate ?? ''
  const defaultZoom = config?.defaultZoom ?? 0
  const minZoom = config?.minZoom ?? -3
  const maxZoom = config?.maxZoom ?? 5

  const { data: pois = [] } = useQuery({
    queryKey: ['pois'],
    queryFn: () => fetchPOIs(),
  })

  const { data: routes = [] } = useQuery({
    queryKey: ['routes'],
    queryFn: () => fetchRoutes(),
  })

  const { data: areas = [] } = useQuery({
    queryKey: ['areas'],
    queryFn: () => fetchAreas(),
  })

  const handlePOIClick = useCallback((poi: POI) => {
    setDetail({ type: 'poi', data: poi })
  }, [])

  const handleRouteClick = useCallback((route: Route) => {
    setDetail({ type: 'route', data: route })
  }, [])

  const handleAreaClick = useCallback((area: Area) => {
    setDetail({ type: 'area', data: area })
  }, [])

  const handleSearchSelect = useCallback(
    (result: SearchResult) => {
      setFlyTarget({ x: result.x, z: result.z })
      // Try to find and select matching POI/route/area
      if (result.type === 'poi') {
        const poi = pois.find((p) => p.id === result.id)
        if (poi) setDetail({ type: 'poi', data: poi })
      } else if (result.type === 'route') {
        const route = routes.find((r) => r.id === result.id)
        if (route) setDetail({ type: 'route', data: route })
      } else if (result.type === 'area') {
        const area = areas.find((a) => a.id === result.id)
        if (area) setDetail({ type: 'area', data: area })
      }
    },
    [pois, routes, areas],
  )

  return (
    <div className="relative w-screen h-screen">
      <MapContainer
        center={mcToLatLng(defaultCenter.x, defaultCenter.z)}
        zoom={defaultZoom}
        minZoom={minZoom}
        maxZoom={maxZoom}
        className="w-full h-full"
        crs={L.CRS.Simple}
      >
        {tileUrl && <DynmapTileLayer urlTemplate={tileUrl} />}

        <POILayer pois={pois} onPOIClick={handlePOIClick} />
        <RouteLayer routes={routes} onRouteClick={handleRouteClick} />
        <AreaLayer areas={areas} onAreaClick={handleAreaClick} />
        <FlyToHandler target={flyTarget} />
      </MapContainer>

      <SearchBox onSelect={handleSearchSelect} />
      <LayerControl />
      <DetailPanel target={detail} onClose={() => setDetail(null)} />
    </div>
  )
}
