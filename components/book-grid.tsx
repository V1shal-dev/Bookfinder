"use client"

import type React from "react"

import { useState } from "react"
import { Grid, List, SortAsc, SortDesc } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookCard } from "./book-card"

interface Book {
  id: string
  title: string
  author: string
  isbn: string
  genre: string
  publicationYear: number
  description: string
  availability: "available" | "checked-out"
  coverUrl: string
  pages: number
  publisher: string
  rating: number
}

interface BookGridProps {
  books: Book[]
  onBookClick: (book: Book) => void
  isLoading?: boolean
}

type SortOption = "title" | "author" | "year" | "rating" | "pages"
type SortOrder = "asc" | "desc"
type ViewMode = "grid" | "list"

export function BookGrid({ books, onBookClick, isLoading = false }: BookGridProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [sortBy, setSortBy] = useState<SortOption>("title")
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const booksPerPage = 12

  // Sort books
  const sortedBooks = [...books].sort((a, b) => {
    let aValue: string | number
    let bValue: string | number

    switch (sortBy) {
      case "title":
        aValue = a.title.toLowerCase()
        bValue = b.title.toLowerCase()
        break
      case "author":
        aValue = a.author.toLowerCase()
        bValue = b.author.toLowerCase()
        break
      case "year":
        aValue = a.publicationYear
        bValue = b.publicationYear
        break
      case "rating":
        aValue = a.rating
        bValue = b.rating
        break
      case "pages":
        aValue = a.pages
        bValue = b.pages
        break
      default:
        aValue = a.title.toLowerCase()
        bValue = b.title.toLowerCase()
    }

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1
    return 0
  })

  // Paginate books
  const totalPages = Math.ceil(sortedBooks.length / booksPerPage)
  const startIndex = (currentPage - 1) * booksPerPage
  const paginatedBooks = sortedBooks.slice(startIndex, startIndex + booksPerPage)

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="h-8 w-32 bg-muted rounded animate-pulse"></div>
          <div className="flex gap-2">
            <div className="h-8 w-24 bg-muted rounded animate-pulse"></div>
            <div className="h-8 w-16 bg-muted rounded animate-pulse"></div>
          </div>
        </div>
        <div
          className={
            viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
          }
        >
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse animate-stagger" style={{ "--stagger": i } as React.CSSProperties}>
              {viewMode === "grid" ? (
                <div className="bg-muted rounded-lg h-80"></div>
              ) : (
                <div className="bg-muted rounded-lg h-24"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-slide-in-left">
        <div className="flex items-center gap-4">
          <p className="text-muted-foreground transition-colors duration-200">
            Showing {startIndex + 1}-{Math.min(startIndex + booksPerPage, books.length)} of {books.length} books
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Sort Controls */}
          <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
            <SelectTrigger className="w-32 transition-all duration-200 hover:border-primary/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="author">Author</SelectItem>
              <SelectItem value="year">Year</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="pages">Pages</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            onClick={toggleSortOrder}
            className="h-9 w-9 bg-transparent transition-all duration-200 hover:scale-105 hover:bg-primary/10"
          >
            {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
          </Button>

          {/* View Mode Toggle */}
          <div className="flex border rounded-md overflow-hidden">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none transition-all duration-200"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none transition-all duration-200"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Book Grid/List */}
      {paginatedBooks.length === 0 ? (
        <div className="text-center py-12 animate-fade-in">
          <p className="text-muted-foreground transition-colors duration-200">No books to display</p>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
          }
        >
          {paginatedBooks.map((book, index) => (
            <BookCard key={book.id} book={book} onClick={onBookClick} viewMode={viewMode} index={index} />
          ))}
        </div>
      )}

      {/* Enhanced Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8 animate-slide-up">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
          >
            Previous
          </Button>

          <div className="flex items-center gap-1">
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1
              const isCurrentPage = page === currentPage
              const showPage = page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)

              if (!showPage) {
                if (page === currentPage - 2 || page === currentPage + 2) {
                  return (
                    <span key={page} className="px-2 text-muted-foreground transition-colors duration-200">
                      ...
                    </span>
                  )
                }
                return null
              }

              return (
                <Button
                  key={page}
                  variant={isCurrentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-8 h-8 p-0 transition-all duration-200 hover:scale-110"
                >
                  {page}
                </Button>
              )
            })}
          </div>

          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
