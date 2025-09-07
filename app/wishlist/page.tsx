"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
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

export default function WishlistPage() {
  const [wishlistBooks, setWishlistBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const loadWishlist = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 300))

      const wishlistIds = JSON.parse(localStorage.getItem("bookfinder-wishlist") || "[]")
      const allBooks = mockData.books as Book[]
      const wishlistedBooks = allBooks.filter((book) => wishlistIds.includes(book.id))

      setWishlistBooks(wishlistedBooks)
      setIsLoading(false)
    }

    loadWishlist()

    // Listen for wishlist changes
    const handleStorageChange = () => {
      loadWishlist()
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const handleBookClick = (book: Book) => {
    setSelectedBook(book)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedBook(null)
  }

  const clearWishlist = () => {
    localStorage.setItem("bookfinder-wishlist", "[]")
    setWishlistBooks([])
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                <Heart className="h-8 w-8 text-red-500 fill-current" />
                My Wishlist
              </h1>
              <p className="text-muted-foreground">
                {wishlistBooks.length} {wishlistBooks.length === 1 ? "book" : "books"} saved for later
              </p>
            </div>

            {wishlistBooks.length > 0 && (
              <Button variant="outline" onClick={clearWishlist} className="hover-lift bg-transparent">
                Clear Wishlist
              </Button>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        ) : wishlistBooks.length === 0 ? (
          <div className="text-center py-12 animate-fade-in">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Your wishlist is empty</h3>
            <p className="text-muted-foreground mb-6">Start adding books you'd like to read later!</p>
            <Button asChild className="hover-lift">
              <a href="/books">Browse Books</a>
            </Button>
          </div>
        ) : (
          <BookGrid books={wishlistBooks} onBookClick={handleBookClick} isLoading={false} />
        )}
      </div>

      <BookDetailsModal book={selectedBook} isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  )
}
