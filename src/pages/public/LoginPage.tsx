import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { login as loginApi } from '@/api'
import { useAuthStore } from '@/stores'

const schema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
})

type LoginForm = z.infer<typeof schema>

export default function LoginPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const setAuth = useAuthStore((s) => s.setAuth)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: LoginForm) => {
    setError('')
    try {
      const res = await loginApi(data)
      setAuth(res.token, res.user)
      navigate('/admin')
    } catch {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-sm space-y-6 p-8 border rounded-xl shadow-lg bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold">{t('app.title')}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t('auth.login')}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium">{t('auth.username')}</label>
            <input
              {...register('username')}
              className="mt-1 w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              autoComplete="username"
            />
          </div>
          <div>
            <label className="text-sm font-medium">{t('auth.password')}</label>
            <input
              {...register('password')}
              type="password"
              className="mt-1 w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50"
          >
            {isSubmitting ? t('app.loading') : t('auth.login')}
          </button>
        </form>
      </div>
    </div>
  )
}
