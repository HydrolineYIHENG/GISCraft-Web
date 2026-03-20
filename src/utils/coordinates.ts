import type { LatLngExpression } from 'leaflet'

/**
 * Minecraft coordinate utilities.
 *
 * Conventions:
 *   - Minecraft X → Leaflet lng
 *   - Minecraft Z → Leaflet lat
 *   - Y is only used for display, not for map positioning
 *   - 1 block = 1 meter
 */

/** Convert Minecraft X/Z to Leaflet LatLng */
export function mcToLatLng(x: number, z: number): LatLngExpression {
  return [z, x]
}

/** Convert Leaflet LatLng back to Minecraft X/Z */
export function latLngToMc(lat: number, lng: number): { x: number; z: number } {
  return { x: lng, z: lat }
}

/** Format Minecraft coordinates for display */
export function formatMcCoord(x: number, y: number | null | undefined, z: number): string {
  if (y != null) {
    return `X: ${Math.round(x)}, Y: ${Math.round(y)}, Z: ${Math.round(z)}`
  }
  return `X: ${Math.round(x)}, Z: ${Math.round(z)}`
}

/** Convert an array of MC coordinate pairs to Leaflet LatLng array */
export function mcPathToLatLngs(
  coords: Array<{ x: number; z: number }>
): LatLngExpression[] {
  return coords.map((c) => mcToLatLng(c.x, c.z))
}
