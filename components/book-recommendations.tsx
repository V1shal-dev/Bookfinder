"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, TrendingUp, Star, Sparkles } from "lucide-react"
import { BookCard } from "@/components/book-card"
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

interface BookRecommendationsProps {
  onBookClick: (book: Book) => void
  currentBook?: Book
  userPreferences?: string[]
}

export function BookRecommendations({ onBookClick, currentBook, userPreferences = [] }: BookRecommendationsProps) {
  const [books] = useState<Book[]>(mockData.books as Book[])

  const recommendations = useMemo(() => {
    const allBooks = [...books]

    // Filter out current book if provided
    const availableBooks = currentBook ? allBooks.filter((book) => book.id !== currentBook.id) : allBooks

    // Get recommendations based on different criteria
    const byGenre = currentBook ? availableBooks.filter((book) => book.genre === currentBook.genre).slice(0, 3) : []

    const byRating = availableBooks
      .filter((book) => book.rating >= 4.0)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4)

    const trending = availableBooks
      .filter((book) => book.publicationYear >= 2020)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4)

    const byPreferences =
      userPreferences.length > 0
        ? availableBooks
            .filter((book) =>
              userPreferences.some(
                (pref) =>
                  book.genre.toLowerCase().includes(pref.toLowerCase()) ||
                  book.title.toLowerCase().includes(pref.toLowerCase()) ||
                  book.author.toLowerCase().includes(pref.toLowerCase()),
              ),
            )
            .slice(0, 4)
        : []

    return {
      byGenre,
      byRating,
      trending,
      byPreferences,
    }
  }, [books, currentBook, userPreferences])

  const recommendationSections = [
    {
      title: "Trending Now",
      description: "Popular books everyone's talking about",
      icon: TrendingUp,
      books: recommendations.trending,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Highly Rated",
      description: "Books with exceptional ratings",
      icon: Star,
      books: recommendations.byRating,
      color: "from-yellow-500 to-orange-500",
    },
    ...(recommendations.byGenre.length > 0
      ? [
          {
            title: `More ${currentBook?.genre}`,
            description: `Similar to "${currentBook?.title}"`,
            icon: BookOpen,
            books: recommendations.byGenre,
            color: "from-blue-500 to-purple-500",
          },
        ]
      : []),
    ...(recommendations.byPreferences.length > 0
      ? [
          {
            title: "For You",
            description: "Based on your interests",
            icon: Sparkles,
            books: recommendations.byPreferences,
            color: "from-purple-500 to-pink-500",
          },
        ]
      : []),
  ]

  return (
    <div className="space-y-12">
      {recommendationSections.map((section, sectionIndex) => (
        <section key={section.title} className="animate-fade-in" style={{ animationDelay: `${sectionIndex * 0.2}s` }}>
          <Card className="overflow-hidden">
            <CardHeader className={`bg-gradient-to-r ${section.color} text-white`}>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <section.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{section.title}</h3>
                  <p className="text-white/80 text-sm">{section.description}</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {section.books.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {section.books.map((book, index) => (
                    <BookCard key={book.id} book={book} onClick={onBookClick} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No recommendations available for this category</p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      ))}
    </div>
  )
}
