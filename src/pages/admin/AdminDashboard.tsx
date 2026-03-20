import { useTranslation } from 'react-i18next'
import { MapPin, Route, Pentagon, MessageSquare, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

const stats = [
  { to: '/admin/pois', icon: MapPin, labelKey: 'admin.pois', color: 'text-blue-500' },
  { to: '/admin/routes', icon: Route, labelKey: 'admin.routes', color: 'text-indigo-500' },
  { to: '/admin/areas', icon: Pentagon, labelKey: 'admin.areas', color: 'text-emerald-500' },
  { to: '/admin/comments', icon: MessageSquare, labelKey: 'admin.comments', color: 'text-amber-500' },
  { to: '/admin/users', icon: Users, labelKey: 'admin.users', color: 'text-violet-500' },
]

export default function AdminDashboard() {
  const { t } = useTranslation()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{t('admin.dashboard')}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map(({ to, icon: Icon, labelKey, color }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-4 p-5 border rounded-xl hover:shadow-md transition-shadow bg-background"
          >
            <div className={`p-3 rounded-lg bg-accent ${color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold">{t(labelKey)}</p>
              <p className="text-sm text-muted-foreground">Manage {t(labelKey).toLowerCase()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
