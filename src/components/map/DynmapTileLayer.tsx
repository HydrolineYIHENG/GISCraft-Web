import { TileLayer } from 'react-leaflet'

interface DynmapTileLayerProps {
  urlTemplate: string
}

/**
 * Renders the Dynmap HTTP tile layer as the base map.
 * The URL template should follow Dynmap's tile URL format.
 */
export default function DynmapTileLayer({ urlTemplate }: DynmapTileLayerProps) {
  return (
    <TileLayer
      url={urlTemplate}
      attribution="Dynmap"
      noWrap
    />
  )
}
