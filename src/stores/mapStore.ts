import { create } from 'zustand'
import type { MapConfig } from '@/types'

interface MapState {
  config: MapConfig | null
  visibleLayers: Record<string, boolean>
  setConfig: (config: MapConfig) => void
  toggleLayer: (layerId: string) => void
  setLayerVisibility: (layerId: string, visible: boolean) => void
}

const defaultLayers: Record<string, boolean> = {
  pois: true,
  routes: true,
  areas: true,
}

export const useMapStore = create<MapState>((set) => ({
  config: null,
  visibleLayers: defaultLayers,
  setConfig: (config) => set({ config }),
  toggleLayer: (layerId) =>
    set((state) => ({
      visibleLayers: {
        ...state.visibleLayers,
        [layerId]: !state.visibleLayers[layerId],
      },
    })),
  setLayerVisibility: (layerId, visible) =>
    set((state) => ({
      visibleLayers: { ...state.visibleLayers, [layerId]: visible },
    })),
}))
