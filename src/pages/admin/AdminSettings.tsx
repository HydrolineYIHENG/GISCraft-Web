import { useTranslation } from 'react-i18next'
import { Settings } from 'lucide-react'

export default function AdminSettings() {
  const { t } = useTranslation()

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Settings className="h-5 w-5" />
        <h1 className="text-2xl font-bold">{t('admin.settings')}</h1>
      </div>

      <div className="max-w-lg space-y-6">
        <fieldset className="space-y-3 border rounded-lg p-4">
          <legend className="text-sm font-medium px-2">Map Configuration</legend>
          <div>
            <label className="text-sm">Tile URL Template</label>
            <input
              className="mt-1 w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="https://dynmap.example.com/tiles/{z}/{x}/{y}.png"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm">Default X</label>
              <input
                type="number"
                className="mt-1 w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                defaultValue={0}
              />
            </div>
            <div>
              <label className="text-sm">Default Z</label>
              <input
                type="number"
                className="mt-1 w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                defaultValue={0}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-sm">Min Zoom</label>
              <input
                type="number"
                className="mt-1 w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                defaultValue={-3}
              />
            </div>
            <div>
              <label className="text-sm">Max Zoom</label>
              <input
                type="number"
                className="mt-1 w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                defaultValue={5}
              />
            </div>
            <div>
              <label className="text-sm">Default Zoom</label>
              <input
                type="number"
                className="mt-1 w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                defaultValue={0}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-3 border rounded-lg p-4">
          <legend className="text-sm font-medium px-2">General</legend>
          <div>
            <label className="text-sm">Site Title</label>
            <input
              className="mt-1 w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              defaultValue="GISCraft"
            />
          </div>
          <div>
            <label className="text-sm">Language</label>
            <select className="mt-1 w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background">
              <option value="en">English</option>
              <option value="zh">中文</option>
            </select>
          </div>
        </fieldset>

        <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90">
          {t('common.save')}
        </button>
      </div>
    </div>
  )
}
