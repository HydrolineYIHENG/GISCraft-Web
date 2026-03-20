import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { fetchFeedbackList, updateFeedback } from '@/api'
import dayjs from 'dayjs'
import { cn } from '@/lib/utils'

const statusColors: Record<string, string> = {
  open: 'bg-amber-100 text-amber-800',
  resolved: 'bg-emerald-100 text-emerald-800',
  dismissed: 'bg-gray-100 text-gray-600',
}

export default function AdminFeedback() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['admin-feedback'],
    queryFn: () => fetchFeedbackList(),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateFeedback(id, { status: status as 'open' | 'resolved' | 'dismissed' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-feedback'] }),
  })

  const feedbackItems = data?.data ?? []

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{t('admin.feedback')}</h1>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">{t('app.loading')}</p>
      ) : (
        <div className="space-y-3">
          {feedbackItems.map((item) => (
            <div key={item.id} className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs capitalize px-2 py-0.5 bg-secondary rounded-full">
                  {item.type}
                </span>
                <span
                  className={cn(
                    'text-xs px-2 py-0.5 rounded-full capitalize',
                    statusColors[item.status] ?? 'bg-gray-100',
                  )}
                >
                  {item.status}
                </span>
                <span className="text-xs text-muted-foreground ml-auto">
                  {dayjs(item.createdAt).format('YYYY-MM-DD HH:mm')}
                </span>
              </div>
              <p className="text-sm mb-3">{item.content}</p>
              {item.status === 'open' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => updateMutation.mutate({ id: item.id, status: 'resolved' })}
                    className="px-3 py-1 text-xs rounded bg-emerald-600 text-white hover:opacity-90"
                  >
                    Resolve
                  </button>
                  <button
                    onClick={() => updateMutation.mutate({ id: item.id, status: 'dismissed' })}
                    className="px-3 py-1 text-xs rounded bg-gray-200 text-gray-700 hover:opacity-90"
                  >
                    Dismiss
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
