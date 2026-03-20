import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Trash2, Plus } from 'lucide-react'
import { fetchAreas, deleteArea } from '@/api'

export default function AdminAreas() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const { data: areas = [], isLoading } = useQuery({
    queryKey: ['admin-areas'],
    queryFn: () => fetchAreas(),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteArea,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-areas'] }),
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{t('admin.areas')}</h1>
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
                <th className="text-left px-4 py-3 font-medium">{t('area.name')}</th>
                <th className="text-left px-4 py-3 font-medium">{t('area.category')}</th>
                <th className="text-left px-4 py-3 font-medium">Vertices</th>
                <th className="text-right px-4 py-3 font-medium">{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {areas.map((area) => (
                <tr key={area.id} className="hover:bg-accent/50">
                  <td className="px-4 py-3 font-medium">{area.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{area.category}</td>
                  <td className="px-4 py-3 text-muted-foreground">{area.points.length}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => deleteMutation.mutate(area.id)}
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
