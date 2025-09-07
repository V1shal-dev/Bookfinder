"use client"

import { useState, useEffect, useMemo } from "react"
import { BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/search-bar"
import { FilterPanel } from "@/components/filter-panel"
import { BookGrid } from "@/components/book-grid"
import { BookDetailsModal } from "@/components/book-details-modal"
import mockData from "@/lib/mock-data.json"

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

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState<string>("all")
  const [selectedAvailability, setSelectedAvailability] = useState<string>("all")
  const [selectedYearRange, setSelectedYearRange] = useState<[number, number]>([1800, 2024])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Load mock data
  useEffect(() => {
    const loadBooks = async () => {
      setIsLoading(true)
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      const loadedBooks = mockData.books as Book[]
      setBooks(loadedBooks)

      // Set initial year range based on data
      const years = loadedBooks.map((book) => book.publicationYear)
      const minYear = Math.min(...years)
      const maxYear = Math.max(...years)
      setSelectedYearRange([minYear, maxYear])

      setIsLoading(false)
    }
    loadBooks()
  }, [])

  // Memoized calculations for performance
  const { genres, minYear, maxYear } = useMemo(() => {
    const uniqueGenres = Array.from(new Set(books.map((book) => book.genre))).sort()
    const years = books.map((book) => book.publicationYear)
    return {
      genres: uniqueGenres,
      minYear: Math.min(...years, 1800),
      maxYear: Math.max(...years, 2024),
    }
  }, [books])

  // Enhanced filtering with debounced search
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn.includes(searchTerm) ||
        book.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesGenre = selectedGenre === "all" || book.genre === selectedGenre
      const matchesAvailability = selectedAvailability === "all" || book.availability === selectedAvailability
      const matchesYear = book.publicationYear >= selectedYearRange[0] && book.publicationYear <= selectedYearRange[1]

      return matchesSearch && matchesGenre && matchesAvailability && matchesYear
    })
  }, [books, searchTerm, selectedGenre, selectedAvailability, selectedYearRange])

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (selectedGenre !== "all") count++
    if (selectedAvailability !== "all") count++
    if (selectedYearRange[0] !== minYear || selectedYearRange[1] !== maxYear) count++
    return count
  }, [selectedGenre, selectedAvailability, selectedYearRange, minYear, maxYear])

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedGenre("all")
    setSelectedAvailability("all")
    setSelectedYearRange([minYear, maxYear])
    setSearchTerm("")
  }

  const handleBookClick = (book: Book) => {
    setSelectedBook(book)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedBook(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in-up">
          <div className="animate-slide-in-left">
            <h1 className="text-4xl font-bold text-foreground mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-shimmer">
              Browse Books
            </h1>
          </div>
          <div className="animate-slide-in-right animation-delay-200">
            <p className="text-lg text-muted-foreground">
              Discover your next favorite book from our extensive collection
            </p>
          </div>
          <div className="mt-4 animate-fade-in animation-delay-400">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>{books.length} books available</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 space-y-6 animate-slide-in-left animation-delay-300">
            <FilterPanel
              genres={genres}
              selectedGenre={selectedGenre}
              onGenreChange={setSelectedGenre}
              selectedAvailability={selectedAvailability}
              onAvailabilityChange={setSelectedAvailability}
              selectedYearRange={selectedYearRange}
              onYearRangeChange={setSelectedYearRange}
              minYear={minYear}
              maxYear={maxYear}
              activeFiltersCount={activeFiltersCount}
              onClearFilters={clearAllFilters}
            />
          </aside>

          <main className="flex-1 animate-slide-in-right animation-delay-500">
            {/* Enhanced Search Bar */}
            <div className="mb-8 animate-fade-in-up animation-delay-600">
              <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} books={books} />
            </div>

            {!isLoading && (
              <div className="mb-6 animate-fade-in animation-delay-700">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {filteredBooks.length} {filteredBooks.length === 1 ? "book" : "books"} found
                    {(searchTerm || activeFiltersCount > 0) && (
                      <span className="ml-2 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">Filtered</span>
                    )}
                  </p>
                  {activeFiltersCount > 0 && (
                    <Button onClick={clearAllFilters} variant="ghost" size="sm" className="text-xs hover-lift">
                      Clear filters ({activeFiltersCount})
                    </Button>
                  )}
                </div>
              </div>
            )}

            <BookGrid books={filteredBooks} onBookClick={handleBookClick} isLoading={isLoading} />

            {/* Enhanced no results state */}
            {!isLoading && filteredBooks.length === 0 && (searchTerm || activeFiltersCount > 0) && (
              <div className="text-center py-16 animate-fade-in-up">
                <div className="animate-bounce-in">
                  <BookOpen className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
                </div>
                <div className="animate-slide-in-up animation-delay-200">
                  <h3 className="text-xl font-semibold text-foreground mb-3">No books found</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    We couldn't find any books matching your search criteria. Try adjusting your filters or search
                    terms.
                  </p>
                </div>
                <div className="animate-fade-in animation-delay-400">
                  <Button onClick={clearAllFilters} variant="outline" className="hover-lift bg-transparent">
                    Clear all filters
                  </Button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <BookDetailsModal book={selectedBook} isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  )
}
