import { useTranslation } from 'react-i18next'
import { Image, Upload } from 'lucide-react'

export default function AdminMedia() {
  const { t } = useTranslation()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{t('admin.media')}</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90">
          <Upload className="h-4 w-4" />
          Upload
        </button>
      </div>

      <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-xl text-muted-foreground">
        <Image className="h-12 w-12 mb-3 opacity-40" />
        <p className="text-sm">Drop images here or click Upload</p>
        <p className="text-xs mt-1">PNG, JPG, WEBP up to 10MB</p>
      </div>
    </div>
  )
}
