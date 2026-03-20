import { useTranslation } from 'react-i18next'
import { Layers, MapPin, Route as RouteIcon, Pentagon } from 'lucide-react'
import { useMapStore } from '@/stores'
import { cn } from '@/lib/utils'

const layerItems = [
  { id: 'pois', icon: MapPin, labelKey: 'map.pois' },
  { id: 'routes', icon: RouteIcon, labelKey: 'map.routes' },
  { id: 'areas', icon: Pentagon, labelKey: 'map.areas' },
] as const

export default function LayerControl() {
  const { t } = useTranslation()
  const { visibleLayers, toggleLayer } = useMapStore()

  return (
    <div className="absolute top-4 right-4 z-[1000] bg-background/90 backdrop-blur border rounded-lg shadow-lg p-3 min-w-[160px]">
      <div className="flex items-center gap-2 mb-2 text-sm font-semibold">
        <Layers className="h-4 w-4" />
        {t('map.layers')}
      </div>
      <div className="space-y-1">
        {layerItems.map(({ id, icon: Icon, labelKey }) => {
          const active = visibleLayers[id] ?? true
          return (
            <button
              key={id}
              onClick={() => toggleLayer(id)}
              className={cn(
                'flex items-center gap-2 w-full px-2 py-1.5 rounded text-sm transition-colors',
                active
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent',
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {t(labelKey)}
            </button>
          )
        })}
      </div>
    </div>
  )
}
