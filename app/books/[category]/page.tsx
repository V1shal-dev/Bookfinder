"use client"

import { useState, useEffect, useMemo } from "react"
import { useParams } from "next/navigation"
import { BookOpen, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/search-bar"
import { FilterPanel } from "@/components/filter-panel"
import { BookGrid } from "@/components/book-grid"
import { BookDetailsModal } from "@/components/book-details-modal"
import mockData from "@/lib/mock-data.json"
import Link from "next/link"

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

export default function CategoryPage() {
  const params = useParams()
  const category = params.category as string
  const [books, setBooks] = useState<Book[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState<string>("all")
  const [selectedAvailability, setSelectedAvailability] = useState<string>("all")
  const [selectedYearRange, setSelectedYearRange] = useState<[number, number]>([1800, 2024])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const categoryName = category?.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase()) || "All Books"

  useEffect(() => {
    const loadBooks = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 500))
      const loadedBooks = mockData.books as Book[]

      // Filter by category if specified
      const filteredByCategory =
        category && category !== "all"
          ? loadedBooks.filter((book) => book.genre.toLowerCase().replace(" ", "-") === category)
          : loadedBooks

      setBooks(filteredByCategory)
      setIsLoading(false)
    }
    loadBooks()
  }, [category])

  const { genres, minYear, maxYear } = useMemo(() => {
    const uniqueGenres = Array.from(new Set(books.map((book) => book.genre))).sort()
    const years = books.map((book) => book.publicationYear)
    return {
      genres: uniqueGenres,
      minYear: Math.min(...years, 1800),
      maxYear: Math.max(...years, 2024),
    }
  }, [books])

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

  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (selectedGenre !== "all") count++
    if (selectedAvailability !== "all") count++
    if (selectedYearRange[0] !== minYear || selectedYearRange[1] !== maxYear) count++
    return count
  }, [selectedGenre, selectedAvailability, selectedYearRange, minYear, maxYear])

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
        <div className="mb-8 animate-fade-in">
          <Link
            href="/books"
            className="inline-flex items-center text-primary hover:text-primary/80 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Books
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">{categoryName}</h1>
          <p className="text-muted-foreground">
            {books.length} {books.length === 1 ? "book" : "books"} in this category
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 space-y-6">
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

          <main className="flex-1">
            <div className="mb-8">
              <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} books={books} />
            </div>

            <BookGrid books={filteredBooks} onBookClick={handleBookClick} isLoading={isLoading} />

            {!isLoading && filteredBooks.length === 0 && (searchTerm || activeFiltersCount > 0) && (
              <div className="text-center py-12 animate-fade-in">
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4 animate-bounce-in" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No books found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search terms or filters</p>
                <Button onClick={clearAllFilters} variant="outline" className="hover-lift bg-transparent">
                  Clear all filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>

      <BookDetailsModal book={selectedBook} isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  )
}
