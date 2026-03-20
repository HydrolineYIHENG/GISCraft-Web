import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Trash2, Plus } from 'lucide-react'
import { fetchPOIs, deletePOI } from '@/api'
import { formatMcCoord } from '@/utils/coordinates'

export default function AdminPOIs() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const { data: pois = [], isLoading } = useQuery({
    queryKey: ['admin-pois'],
    queryFn: () => fetchPOIs(),
  })

  const deleteMutation = useMutation({
    mutationFn: deletePOI,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-pois'] }),
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{t('admin.pois')}</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90">
          <Plus className="h-4 w-4" />
          {t('common.create')}
        </button>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">{t('app.loading')}</p>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left px-4 py-3 font-medium">{t('poi.name')}</th>
                <th className="text-left px-4 py-3 font-medium">{t('poi.category')}</th>
                <th className="text-left px-4 py-3 font-medium">{t('poi.coordinates')}</th>
                <th className="text-right px-4 py-3 font-medium">{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {pois.map((poi) => (
                <tr key={poi.id} className="hover:bg-accent/50">
                  <td className="px-4 py-3 font-medium">{poi.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{poi.category}</td>
                  <td className="px-4 py-3 text-muted-foreground font-mono text-xs">
                    {formatMcCoord(poi.x, poi.y, poi.z)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => deleteMutation.mutate(poi.id)}
                      className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
