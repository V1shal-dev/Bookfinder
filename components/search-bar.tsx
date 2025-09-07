"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Book {
  id: string
  title: string
  author: string
  isbn: string
  genre: string
}

interface SearchBarProps {
  searchTerm: string
  onSearchChange: (term: string) => void
  books: Book[]
  onBookSelect?: (book: Book) => void
}

export function SearchBar({ searchTerm, onSearchChange, books, onBookSelect }: SearchBarProps) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<Book[]>([])
  const searchRef = useRef<HTMLDivElement>(null)

  // Generate search suggestions
  useEffect(() => {
    if (searchTerm.length >= 2) {
      const filtered = books
        .filter(
          (book) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .slice(0, 5)
      setSuggestions(filtered)
      setShowSuggestions(filtered.length > 0)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [searchTerm, books])

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSuggestionClick = (book: Book) => {
    onSearchChange(book.title)
    setShowSuggestions(false)
    onBookSelect?.(book)
  }

  const clearSearch = () => {
    onSearchChange("")
    setShowSuggestions(false)
  }

  return (
    <div ref={searchRef} className="relative animate-slide-up">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 transition-colors duration-200" />
        <Input
          type="text"
          placeholder="Search by title, author, or ISBN..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => searchTerm.length >= 2 && suggestions.length > 0 && setShowSuggestions(true)}
          className="pl-10 pr-10 h-12 text-base transition-all duration-200 focus:ring-2 focus:ring-primary/20 hover:border-primary/50"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 transition-all duration-200 hover:scale-110 hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Enhanced Search Suggestions */}
      {showSuggestions && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-64 overflow-y-auto animate-scale-in shadow-lg border-primary/20">
          <div className="p-2">
            {suggestions.map((book, index) => (
              <button
                key={book.id}
                onClick={() => handleSuggestionClick(book)}
                className="w-full text-left p-3 hover:bg-accent hover:text-accent-foreground rounded-md transition-all duration-200 animate-slide-up animate-stagger"
                style={{ "--stagger": index } as React.CSSProperties}
              >
                <div className="font-medium text-sm transition-colors duration-200">{book.title}</div>
                <div className="text-xs text-muted-foreground transition-colors duration-200">by {book.author}</div>
              </button>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
