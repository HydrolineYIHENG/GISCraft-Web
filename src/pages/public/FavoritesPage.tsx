import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Heart, Trash2, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { fetchFavorites, removeFavorite } from '@/api'

export default function FavoritesPage() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ['favorites'],
    queryFn: fetchFavorites,
  })

  const removeMutation = useMutation({
    mutationFn: removeFavorite,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['favorites'] }),
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex items-center gap-2 mb-6">
          <Heart className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-bold">{t('nav.favorites')}</h1>
          <Link
            to="/"
            className="ml-auto text-sm text-muted-foreground hover:text-foreground"
          >
            ← {t('nav.home')}
          </Link>
        </div>

        {isLoading && (
          <p className="text-sm text-muted-foreground">{t('app.loading')}</p>
        )}

        {!isLoading && favorites.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-12">
            No favorites yet.
          </p>
        )}

        <div className="space-y-2">
          {favorites.map((fav) => (
            <div
              key={fav.id}
              className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors"
            >
              <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm truncate">{fav.targetName}</p>
                <p className="text-xs text-muted-foreground capitalize">{fav.targetType}</p>
              </div>
              <button
                onClick={() => removeMutation.mutate(fav.id)}
                className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
