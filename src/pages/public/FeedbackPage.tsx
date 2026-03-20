import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { submitFeedback } from '@/api'
import { toast } from 'sonner'

const schema = z.object({
  type: z.enum(['bug', 'suggestion', 'other']),
  content: z.string().min(5),
  contact: z.string().optional(),
})

type FeedbackForm = z.infer<typeof schema>

export default function FeedbackPage() {
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FeedbackForm>({
    resolver: zodResolver(schema),
    defaultValues: { type: 'suggestion' },
  })

  const mutation = useMutation({
    mutationFn: submitFeedback,
    onSuccess: () => {
      toast.success('Feedback submitted!')
      reset()
    },
    onError: () => toast.error('Failed to submit feedback'),
  })

  const onSubmit = (data: FeedbackForm) => mutation.mutate(data)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto p-6">
        <div className="flex items-center gap-2 mb-6">
          <MessageCircle className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-bold">{t('nav.feedback')}</h1>
          <Link
            to="/"
            className="ml-auto text-sm text-muted-foreground hover:text-foreground"
          >
            ← {t('nav.home')}
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Type</label>
            <select
              {...register('type')}
              className="mt-1 w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background"
            >
              <option value="bug">Bug Report</option>
              <option value="suggestion">Suggestion</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Content</label>
            <textarea
              {...register('content')}
              rows={5}
              className="mt-1 w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              placeholder="Describe your feedback..."
            />
            {errors.content && (
              <p className="text-xs text-destructive mt-1">Min 5 characters required</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Contact (optional)</label>
            <input
              {...register('contact')}
              className="mt-1 w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Email or Discord"
            />
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50"
          >
            {mutation.isPending ? t('app.loading') : t('common.submit')}
          </button>
        </form>
      </div>
    </div>
  )
}
