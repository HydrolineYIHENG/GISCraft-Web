import apiClient from './client'
import type {
  POI,
  Route,
  Area,
  Comment,
  Favorite,
  Feedback,
  MapConfig,
  SearchResult,
  LoginRequest,
  LoginResponse,
  User,
  ApiResponse,
  PaginatedResponse,
} from '@/types'

// ─── Map Config ────────────────────────────────────────
export const fetchMapConfig = () =>
  apiClient.get<ApiResponse<MapConfig>>('/config/map').then((r) => r.data.data)

// ─── Auth ──────────────────────────────────────────────
export const login = (data: LoginRequest) =>
  apiClient.post<ApiResponse<LoginResponse>>('/auth/login', data).then((r) => r.data.data)

export const fetchCurrentUser = () =>
  apiClient.get<ApiResponse<User>>('/auth/me').then((r) => r.data.data)

// ─── POI ───────────────────────────────────────────────
export const fetchPOIs = (params?: Record<string, unknown>) =>
  apiClient.get<ApiResponse<POI[]>>('/pois', { params }).then((r) => r.data.data)

export const fetchPOI = (id: string) =>
  apiClient.get<ApiResponse<POI>>(`/pois/${id}`).then((r) => r.data.data)

export const createPOI = (data: Partial<POI>) =>
  apiClient.post<ApiResponse<POI>>('/pois', data).then((r) => r.data.data)

export const updatePOI = (id: string, data: Partial<POI>) =>
  apiClient.put<ApiResponse<POI>>(`/pois/${id}`, data).then((r) => r.data.data)

export const deletePOI = (id: string) =>
  apiClient.delete(`/pois/${id}`)

// ─── Routes ────────────────────────────────────────────
export const fetchRoutes = (params?: Record<string, unknown>) =>
  apiClient.get<ApiResponse<Route[]>>('/routes', { params }).then((r) => r.data.data)

export const fetchRoute = (id: string) =>
  apiClient.get<ApiResponse<Route>>(`/routes/${id}`).then((r) => r.data.data)

export const createRoute = (data: Partial<Route>) =>
  apiClient.post<ApiResponse<Route>>('/routes', data).then((r) => r.data.data)

export const updateRoute = (id: string, data: Partial<Route>) =>
  apiClient.put<ApiResponse<Route>>(`/routes/${id}`, data).then((r) => r.data.data)

export const deleteRoute = (id: string) =>
  apiClient.delete(`/routes/${id}`)

// ─── Areas ─────────────────────────────────────────────
export const fetchAreas = (params?: Record<string, unknown>) =>
  apiClient.get<ApiResponse<Area[]>>('/areas', { params }).then((r) => r.data.data)

export const fetchArea = (id: string) =>
  apiClient.get<ApiResponse<Area>>(`/areas/${id}`).then((r) => r.data.data)

export const createArea = (data: Partial<Area>) =>
  apiClient.post<ApiResponse<Area>>('/areas', data).then((r) => r.data.data)

export const updateArea = (id: string, data: Partial<Area>) =>
  apiClient.put<ApiResponse<Area>>(`/areas/${id}`, data).then((r) => r.data.data)

export const deleteArea = (id: string) =>
  apiClient.delete(`/areas/${id}`)

// ─── Comments ──────────────────────────────────────────
export const fetchComments = (params?: Record<string, unknown>) =>
  apiClient
    .get<PaginatedResponse<Comment>>('/comments', { params })
    .then((r) => r.data)

export const createComment = (data: Partial<Comment>) =>
  apiClient.post<ApiResponse<Comment>>('/comments', data).then((r) => r.data.data)

export const deleteComment = (id: string) =>
  apiClient.delete(`/comments/${id}`)

// ─── Favorites ─────────────────────────────────────────
export const fetchFavorites = () =>
  apiClient.get<ApiResponse<Favorite[]>>('/favorites').then((r) => r.data.data)

export const addFavorite = (data: Omit<Favorite, 'id' | 'createdAt'>) =>
  apiClient.post<ApiResponse<Favorite>>('/favorites', data).then((r) => r.data.data)

export const removeFavorite = (id: string) =>
  apiClient.delete(`/favorites/${id}`)

// ─── Feedback ──────────────────────────────────────────
export const fetchFeedbackList = (params?: Record<string, unknown>) =>
  apiClient
    .get<PaginatedResponse<Feedback>>('/feedback', { params })
    .then((r) => r.data)

export const submitFeedback = (data: Partial<Feedback>) =>
  apiClient.post<ApiResponse<Feedback>>('/feedback', data).then((r) => r.data.data)

export const updateFeedback = (id: string, data: Partial<Feedback>) =>
  apiClient.put<ApiResponse<Feedback>>(`/feedback/${id}`, data).then((r) => r.data.data)

// ─── Search ────────────────────────────────────────────
export const searchSuggestions = (q: string) =>
  apiClient
    .get<ApiResponse<SearchResult[]>>('/search', { params: { q } })
    .then((r) => r.data.data)

// ─── Users (Admin) ─────────────────────────────────────
export const fetchUsers = (params?: Record<string, unknown>) =>
  apiClient
    .get<PaginatedResponse<User>>('/users', { params })
    .then((r) => r.data)

export const updateUser = (id: string, data: Partial<User>) =>
  apiClient.put<ApiResponse<User>>(`/users/${id}`, data).then((r) => r.data.data)

export const deleteUser = (id: string) =>
  apiClient.delete(`/users/${id}`)
