// ─── POI ───────────────────────────────────────────────
export interface POI {
  id: string
  name: string
  category: string
  description: string
  x: number
  y: number | null
  z: number
  tags: string[]
  images: string[]
  icon?: string
  visible: boolean
  createdAt: string
  updatedAt: string
}

// ─── Route ─────────────────────────────────────────────
export type RouteType = 'road' | 'railway' | 'airway' | 'metro'

export interface RoutePoint {
  x: number
  z: number
}

export interface Route {
  id: string
  name: string
  type: RouteType
  description: string
  color: string
  width: number
  dashArray?: string
  points: RoutePoint[]
  visible: boolean
  createdAt: string
  updatedAt: string
}

// ─── Area ──────────────────────────────────────────────
export interface AreaPoint {
  x: number
  z: number
}

export interface Area {
  id: string
  name: string
  category: string
  description: string
  fillColor: string
  borderColor: string
  fillOpacity: number
  weight: number
  priority: number
  points: AreaPoint[]
  visible: boolean
  createdAt: string
  updatedAt: string
}

// ─── Comment ───────────────────────────────────────────
export interface Comment {
  id: string
  targetType: 'poi' | 'route' | 'area'
  targetId: string
  author: string
  content: string
  createdAt: string
}

// ─── Favorite ──────────────────────────────────────────
export interface Favorite {
  id: string
  targetType: 'poi' | 'route' | 'area'
  targetId: string
  targetName: string
  createdAt: string
}

// ─── Feedback ──────────────────────────────────────────
export interface Feedback {
  id: string
  type: 'bug' | 'suggestion' | 'other'
  content: string
  contact?: string
  status: 'open' | 'resolved' | 'dismissed'
  createdAt: string
}

// ─── User ──────────────────────────────────────────────
export type UserRole = 'admin' | 'editor' | 'viewer'

export interface User {
  id: string
  username: string
  email: string
  role: UserRole
  avatar?: string
  createdAt: string
}

// ─── Auth ──────────────────────────────────────────────
export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}

// ─── Map Config ────────────────────────────────────────
export interface MapConfig {
  tileUrlTemplate: string
  defaultCenter: { x: number; z: number }
  defaultZoom: number
  minZoom: number
  maxZoom: number
}

// ─── Search ────────────────────────────────────────────
export interface SearchResult {
  id: string
  type: 'poi' | 'route' | 'area'
  name: string
  category: string
  x: number
  z: number
}

// ─── API Responses ─────────────────────────────────────
export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
}
