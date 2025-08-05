'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'

interface SearchSuggestion {
  type: 'product' | 'category'
  text: string
  category: string | null
}

interface SearchInputProps {
  placeholder?: string
  className?: string
  onSearch?: (query: string) => void
  showSuggestions?: boolean
}

export default function SearchInput({ 
  placeholder = "상품을 검색하세요...", 
  className = "",
  onSearch,
  showSuggestions = true
}: SearchInputProps) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [showSuggestionsPanel, setShowSuggestionsPanel] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // 검색어 변경 시 자동완성 요청
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim() || !showSuggestions) {
        setSuggestions([])
        setShowSuggestionsPanel(false)
        return
      }

      setLoading(true)
      try {
        const response = await fetch(`/api/search/suggestions?q=${encodeURIComponent(query)}&limit=5`)
        if (response.ok) {
          const data = await response.json()
          setSuggestions(data.suggestions)
          setShowSuggestionsPanel(data.suggestions.length > 0)
        }
      } catch (error) {
        console.error('자동완성 오류:', error)
      } finally {
        setLoading(false)
      }
    }

    const timeoutId = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(timeoutId)
  }, [query, showSuggestions])

  // 외부 클릭 시 자동완성 패널 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current && 
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestionsPanel(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      if (onSearch) {
        onSearch(query.trim())
      } else {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      }
      setShowSuggestionsPanel(false)
    }
  }

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    if (onSearch) {
      onSearch(suggestion.text)
    } else {
      if (suggestion.type === 'category') {
        router.push(`/category/${suggestion.text.toLowerCase()}`)
      } else {
        router.push(`/search?q=${encodeURIComponent(suggestion.text)}`)
      }
    }
    setQuery(suggestion.text)
    setShowSuggestionsPanel(false)
  }

  const clearQuery = () => {
    setQuery('')
    setSuggestions([])
    setShowSuggestionsPanel(false)
    inputRef.current?.focus()
  }

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          autoComplete="off"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        
        {query && (
          <button
            type="button"
            onClick={clearQuery}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-muted rounded cursor-pointer"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </form>

      {/* 자동완성 패널 */}
      {showSuggestionsPanel && showSuggestions && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto"
        >
          {loading ? (
            <div className="p-4 text-center text-muted-foreground">
              검색 중...
            </div>
          ) : suggestions.length > 0 ? (
            <div className="py-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-4 py-2 text-left hover:bg-muted cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{suggestion.text}</span>
                  </div>
                  {suggestion.category && (
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      {suggestion.category}
                    </span>
                  )}
                </button>
              ))}
            </div>
          ) : query.trim() && (
            <div className="p-4 text-center text-muted-foreground">
              검색 결과가 없습니다
            </div>
          )}
        </div>
      )}
    </div>
  )
} 