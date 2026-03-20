import { createBrowserRouter } from 'react-router-dom'
import { AdminLayout } from '@/components/layout'
import MapPage from '@/pages/public/MapPage'
import LoginPage from '@/pages/public/LoginPage'
import FavoritesPage from '@/pages/public/FavoritesPage'
import FeedbackPage from '@/pages/public/FeedbackPage'
import AdminDashboard from '@/pages/admin/AdminDashboard'
import AdminPOIs from '@/pages/admin/AdminPOIs'
import AdminRoutes from '@/pages/admin/AdminRoutes'
import AdminAreas from '@/pages/admin/AdminAreas'
import AdminComments from '@/pages/admin/AdminComments'
import AdminMedia from '@/pages/admin/AdminMedia'
import AdminFeedback from '@/pages/admin/AdminFeedback'
import AdminUsers from '@/pages/admin/AdminUsers'
import AdminSettings from '@/pages/admin/AdminSettings'

export const router = createBrowserRouter([
  { path: '/', element: <MapPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/favorites', element: <FavoritesPage /> },
  { path: '/feedback', element: <FeedbackPage /> },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'pois', element: <AdminPOIs /> },
      { path: 'routes', element: <AdminRoutes /> },
      { path: 'areas', element: <AdminAreas /> },
      { path: 'comments', element: <AdminComments /> },
      { path: 'media', element: <AdminMedia /> },
      { path: 'feedback', element: <AdminFeedback /> },
      { path: 'users', element: <AdminUsers /> },
      { path: 'settings', element: <AdminSettings /> },
    ],
  },
])
