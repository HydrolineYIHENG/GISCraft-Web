import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Trash2 } from 'lucide-react'
import { fetchComments, deleteComment } from '@/api'
import dayjs from 'dayjs'

export default function AdminComments() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['admin-comments'],
    queryFn: () => fetchComments(),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-comments'] }),
  })

  const comments = data?.data ?? []

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{t('admin.comments')}</h1>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">{t('app.loading')}</p>
      ) : (
        <div className="space-y-3">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 p-4 border rounded-lg">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{comment.author}</span>
                  <span className="text-xs text-muted-foreground">
                    {dayjs(comment.createdAt).format('YYYY-MM-DD HH:mm')}
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-secondary rounded-full capitalize">
                    {comment.targetType}
                  </span>
                </div>
                <p className="text-sm">{comment.content}</p>
              </div>
              <button
                onClick={() => deleteMutation.mutate(comment.id)}
                className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive shrink-0"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
