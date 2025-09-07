"use client"

import { useState, useEffect } from "react"
import { X, Star, Calendar, BookOpen, User, Building, Hash, Clock, Heart, Share2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

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

interface BookDetailsModalProps {
  book: Book | null
  isOpen: boolean
  onClose: () => void
}

export function BookDetailsModal({ book, isOpen, onClose }: BookDetailsModalProps) {
  const [imageError, setImageError] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  // Reset image error when book changes
  useEffect(() => {
    setImageError(false)
  }, [book])

  if (!book) return null

  const handleImageError = () => {
    setImageError(true)
  }

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-accent text-accent" />
        ))}
        {hasHalfStar && <Star className="h-4 w-4 fill-accent/50 text-accent" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={i} className="h-4 w-4 text-muted-foreground/30" />
        ))}
        <span className="ml-2 text-sm font-medium">{rating}</span>
      </div>
    )
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: `Check out "${book.title}" by ${book.author}`,
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${book.title} by ${book.author} - ${window.location.href}`)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        <div className="flex flex-col md:flex-row h-full">
          {/* Book Cover Section */}
          <div className="md:w-1/3 bg-muted/30 p-6 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-64 aspect-[3/4] mb-4">
              {imageError ? (
                <div className="w-full h-full bg-muted flex items-center justify-center rounded-lg">
                  <BookOpen className="h-16 w-16 text-muted-foreground" />
                </div>
              ) : (
                <img
                  src={book.coverUrl || "/placeholder.svg?height=400&width=300"}
                  alt={`Cover of ${book.title}`}
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                  onError={handleImageError}
                />
              )}
              <Badge
                variant={book.availability === "available" ? "default" : "secondary"}
                className="absolute top-2 right-2"
              >
                {book.availability === "available" ? "Available" : "Checked Out"}
              </Badge>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 w-full max-w-64">
              <Button
                variant={book.availability === "available" ? "default" : "secondary"}
                className="flex-1"
                disabled={book.availability !== "available"}
              >
                {book.availability === "available" ? "Borrow Book" : "Unavailable"}
              </Button>
              <Button variant="outline" size="icon" onClick={toggleFavorite}>
                <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Book Details Section */}
          <div className="md:w-2/3 flex flex-col">
            <DialogHeader className="p-6 pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-4">
                  <DialogTitle className="text-2xl font-bold text-balance leading-tight mb-2">{book.title}</DialogTitle>
                  <p className="text-lg text-muted-foreground flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {book.author}
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose} className="flex-shrink-0">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Rating */}
              <div className="mt-4">{renderStars(book.rating)}</div>
            </DialogHeader>

            <ScrollArea className="flex-1 px-6">
              <div className="space-y-6 pb-6">
                {/* Description */}
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Description</h3>
                  <p className="text-muted-foreground leading-relaxed text-pretty">{book.description}</p>
                </div>

                <Separator />

                {/* Book Details Grid */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Book Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Hash className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">ISBN</p>
                        <p className="text-sm text-muted-foreground">{book.isbn}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Publication Year</p>
                        <p className="text-sm text-muted-foreground">{book.publicationYear}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Publisher</p>
                        <p className="text-sm text-muted-foreground">{book.publisher}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Pages</p>
                        <p className="text-sm text-muted-foreground">{book.pages}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Genre</p>
                        <Badge variant="secondary" className="mt-1">
                          {book.genre}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Star className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Rating</p>
                        <p className="text-sm text-muted-foreground">{book.rating} out of 5</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Additional Information */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Additional Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Availability Status</span>
                      <Badge variant={book.availability === "available" ? "default" : "secondary"}>
                        {book.availability === "available" ? "Available for borrowing" : "Currently checked out"}
                      </Badge>
                    </div>

                    {book.availability === "available" && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Estimated Reading Time</span>
                        <span className="text-sm text-muted-foreground">{Math.ceil(book.pages / 250)} hours</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
