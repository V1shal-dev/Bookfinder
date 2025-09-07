"use client"

import { useState, useEffect, useMemo } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, User, BookOpen, Star, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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

export default function AuthorPage() {
  const params = useParams()
  const authorSlug = params.slug as string
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const authorName = authorSlug?.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) || ""

  useEffect(() => {
    const loadAuthorBooks = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 500))
      const loadedBooks = mockData.books as Book[]

      // Filter books by author
      const authorBooks = loadedBooks.filter((book) => book.author.toLowerCase().replace(/\s+/g, "-") === authorSlug)

      setBooks(authorBooks)
      setIsLoading(false)
    }
    loadAuthorBooks()
  }, [authorSlug])

  const authorStats = useMemo(() => {
    if (books.length === 0) return null

    const totalBooks = books.length
    const genres = Array.from(new Set(books.map((book) => book.genre)))
    const avgRating = books.reduce((sum, book) => sum + book.rating, 0) / books.length
    const latestYear = Math.max(...books.map((book) => book.publicationYear))
    const earliestYear = Math.min(...books.map((book) => book.publicationYear))

    return {
      totalBooks,
      genres,
      avgRating: avgRating.toFixed(1),
      yearRange: earliestYear === latestYear ? latestYear.toString() : `${earliestYear} - ${latestYear}`,
    }
  }, [books])

  const handleBookClick = (book: Book) => {
    setSelectedBook(book)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedBook(null)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (books.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/books"
            className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Books
          </Link>
          <div className="text-center py-12">
            <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Author Not Found</h1>
            <p className="text-muted-foreground">No books found for this author.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/books"
            className="inline-flex items-center text-primary hover:text-primary/80 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Books
          </Link>

          {/* Author Header */}
          <Card className="mb-8 overflow-hidden bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold">
                  {authorName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>

                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-foreground mb-2">{authorName}</h1>
                  <p className="text-muted-foreground mb-4">
                    Author of {authorStats?.totalBooks} {authorStats?.totalBooks === 1 ? "book" : "books"} in our
                    collection
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{authorStats?.avgRating} avg rating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{authorStats?.yearRange}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-secondary" />
                      <span>{authorStats?.totalBooks} books</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {authorStats?.genres.map((genre) => (
                      <Badge key={genre} variant="secondary" className="text-xs">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Books Grid */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Books by {authorName}</h2>
        </div>

        <BookGrid books={books} onBookClick={handleBookClick} isLoading={false} />
      </div>

      <BookDetailsModal book={selectedBook} isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  )
}
