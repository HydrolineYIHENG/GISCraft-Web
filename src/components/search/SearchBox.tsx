import { useState, useEffect, useCallback } from 'react'
import { Search, X, Clock, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { searchSuggestions } from '@/api'
import type { SearchResult } from '@/types'
import { cn } from '@/lib/utils'

const HISTORY_KEY = 'giscraft-search-history'
const MAX_HISTORY = 10

interface SearchBoxProps {
  onSelect: (result: SearchResult) => void
}

export default function SearchBox({ onSelect }: SearchBoxProps) {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [history, setHistory] = useState<SearchResult[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]')
    } catch {
      return []
    }
  })
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const doSearch = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setResults([])
      return
    }
    setLoading(true)
    try {
      const data = await searchSuggestions(q)
      setResults(data)
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => doSearch(query), 300)
    return () => clearTimeout(timer)
  }, [query, doSearch])

  const handleSelect = (result: SearchResult) => {
    const updated = [result, ...history.filter((h) => h.id !== result.id)].slice(0, MAX_HISTORY)
    setHistory(updated)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
    setQuery(result.name)
    setOpen(false)
    onSelect(result)
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem(HISTORY_KEY)
  }

  const items = query.trim().length >= 2 ? results : history

  return (
    <div className="absolute top-4 left-4 z-[1000] w-72">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          placeholder={t('map.search')}
          className="w-full pl-9 pr-8 py-2 bg-background/90 backdrop-blur border rounded-lg text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('')
              setResults([])
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-accent"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {open && items.length > 0 && (
        <div className="mt-1 bg-background border rounded-lg shadow-lg overflow-hidden max-h-80 overflow-y-auto">
          {query.trim().length < 2 && history.length > 0 && (
            <div className="flex items-center justify-between px-3 py-1.5 border-b">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" /> Recent
              </span>
              <button
                onClick={clearHistory}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            </div>
          )}
          {loading && (
            <div className="px-3 py-2 text-xs text-muted-foreground">
              {t('app.loading')}
            </div>
          )}
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item)}
              className={cn(
                'flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-accent text-left transition-colors',
              )}
            >
              <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <div className="min-w-0">
                <p className="truncate font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {item.category} · {item.type}
                </p>
              </div>
            </button>
          ))}
          {!loading && query.trim().length >= 2 && results.length === 0 && (
            <div className="px-3 py-3 text-xs text-muted-foreground text-center">
              {t('map.noResults')}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
