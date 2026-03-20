import { Polyline, Popup } from 'react-leaflet'
import { mcPathToLatLngs } from '@/utils/coordinates'
import { useMapStore } from '@/stores'
import type { Route } from '@/types'

const routeStyleDefaults: Record<string, { color: string; dashArray?: string; weight: number }> = {
  road: { color: '#6366f1', weight: 3 },
  railway: { color: '#374151', dashArray: '8 4', weight: 3 },
  airway: { color: '#06b6d4', dashArray: '4 8', weight: 2 },
  metro: { color: '#ec4899', weight: 4 },
}

interface RouteLayerProps {
  routes: Route[]
  onRouteClick?: (route: Route) => void
}

export default function RouteLayer({ routes, onRouteClick }: RouteLayerProps) {
  const visible = useMapStore((s) => s.visibleLayers.routes)

  if (!visible) return null

  return (
    <>
      {routes.map((route) => {
        const defaults = routeStyleDefaults[route.type] ?? routeStyleDefaults.road
        const positions = mcPathToLatLngs(route.points)

        return (
          <Polyline
            key={route.id}
            positions={positions}
            pathOptions={{
              color: route.color || defaults.color,
              weight: route.width || defaults.weight,
              dashArray: route.dashArray ?? defaults.dashArray,
            }}
            eventHandlers={{
              click: () => onRouteClick?.(route),
            }}
          >
            <Popup>
              <div className="min-w-[140px]">
                <h3 className="font-semibold text-sm">{route.name}</h3>
                <p className="text-xs text-muted-foreground capitalize">{route.type}</p>
              </div>
            </Popup>
          </Polyline>
        )
      })}
    </>
  )
}
