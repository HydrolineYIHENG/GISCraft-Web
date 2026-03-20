import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  MapPin,
  Route,
  Pentagon,
  MessageSquare,
  Image,
  MessageCircle,
  Users,
  Settings,
  ChevronLeft,
  LayoutDashboard,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/admin', icon: LayoutDashboard, labelKey: 'admin.dashboard', exact: true },
  { to: '/admin/pois', icon: MapPin, labelKey: 'admin.pois' },
  { to: '/admin/routes', icon: Route, labelKey: 'admin.routes' },
  { to: '/admin/areas', icon: Pentagon, labelKey: 'admin.areas' },
  { to: '/admin/comments', icon: MessageSquare, labelKey: 'admin.comments' },
  { to: '/admin/media', icon: Image, labelKey: 'admin.media' },
  { to: '/admin/feedback', icon: MessageCircle, labelKey: 'admin.feedback' },
  { to: '/admin/users', icon: Users, labelKey: 'admin.users' },
  { to: '/admin/settings', icon: Settings, labelKey: 'admin.settings' },
]

export default function AdminSidebar() {
  const { t } = useTranslation()
  const location = useLocation()

  const isActive = (path: string, exact?: boolean) =>
    exact ? location.pathname === path : location.pathname.startsWith(path)

  return (
    <aside className="w-60 bg-sidebar-background border-r h-screen flex flex-col">
      <div className="p-4 border-b flex items-center gap-2">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
          <ChevronLeft className="h-4 w-4" />
          {t('nav.home')}
        </Link>
        <span className="text-sm font-semibold ml-auto">{t('nav.admin')}</span>
      </div>

      <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, labelKey, exact }) => (
          <Link
            key={to}
            to={to}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
              isActive(to, exact)
                ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                : 'text-sidebar-foreground hover:bg-sidebar-accent/50',
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {t(labelKey)}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
