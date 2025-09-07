"use client"

import type React from "react"

import { useState } from "react"
import { Star, Calendar, BookOpen, User, ShoppingCart, Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCart } from "@/contexts/cart-context"
import { WishlistButton } from "@/components/wishlist-button"
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

interface BookCardProps {
  book: Book
  onClick: (book: Book) => void
  viewMode?: "grid" | "list"
  index?: number
}

export function BookCard({ book, onClick, viewMode = "grid", index = 0 }: BookCardProps) {
  const [imageError, setImageError] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const { addToCart, setIsOpen } = useCart()

  const handleImageError = () => {
    setImageError(true)
  }

  const handleImageLoad = () => {
    setIsImageLoaded(true)
  }

  const bookFormats = [
    { format: "ebook" as const, price: 9.99, label: "E-book" },
    { format: "paperback" as const, price: 14.99, label: "Paperback" },
    { format: "hardcover" as const, price: 24.99, label: "Hardcover" },
    { format: "audiobook" as const, price: 19.99, label: "Audiobook" },
  ]

  const handleAddToCart = (
    e: React.MouseEvent,
    format: "ebook" | "paperback" | "hardcover" | "audiobook",
    price: number,
  ) => {
    e.stopPropagation()
    addToCart({
      id: book.id,
      title: book.title,
      author: book.author,
      price,
      coverUrl: book.coverUrl,
      format,
    })
    setIsOpen(true)
  }

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="h-3 w-3 fill-accent text-accent transition-colors duration-200" />
        ))}
        {hasHalfStar && <Star className="h-3 w-3 fill-accent/50 text-accent transition-colors duration-200" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={i} className="h-3 w-3 text-muted-foreground/30 transition-colors duration-200" />
        ))}
      </div>
    )
  }

  const authorSlug = book.author.toLowerCase().replace(/\s+/g, "-")

  if (viewMode === "list") {
    return (
      <Card
        className="group hover-lift cursor-pointer animate-slide-up animate-stagger overflow-hidden"
        onClick={() => onClick(book)}
        style={{ "--stagger": index } as React.CSSProperties}
      >
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="w-16 h-20 flex-shrink-0 relative overflow-hidden rounded-md">
              <WishlistButton
                bookId={book.id}
                size="sm"
                className="absolute -top-2 -left-2 z-10 bg-background/80 backdrop-blur-sm"
              />
              {imageError ? (
                <div className="w-full h-full bg-muted flex items-center justify-center animate-scale-in">
                  <BookOpen className="h-6 w-6 text-muted-foreground" />
                </div>
              ) : (
                <div className="relative w-full h-full">
                  {!isImageLoaded && <div className="absolute inset-0 bg-muted animate-pulse rounded-md" />}
                  <img
                    src={book.coverUrl || "/placeholder.svg?height=80&width=64"}
                    alt={`Cover of ${book.title}`}
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      isImageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                  />
                </div>
              )}
              <Badge
                variant={book.availability === "available" ? "default" : "secondary"}
                className="absolute -top-1 -right-1 text-xs px-1 py-0 animate-bounce-in"
              >
                {book.availability === "available" ? "✓" : "✗"}
              </Badge>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground mb-1 line-clamp-1 text-balance group-hover:text-primary transition-colors duration-200">
                {book.title}
              </h3>
              <Link
                href={`/author/${authorSlug}`}
                onClick={(e) => e.stopPropagation()}
                className="text-sm text-muted-foreground hover:text-primary mb-2 flex items-center gap-1 transition-colors duration-200 w-fit"
              >
                <User className="h-3 w-3" />
                {book.author}
              </Link>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2 transition-colors duration-200">
                {book.description}
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1 transition-colors duration-200">
                  <Calendar className="h-3 w-3" />
                  {book.publicationYear}
                </span>
                <span className="transition-colors duration-200">{book.genre}</span>
                <span className="transition-colors duration-200">{book.pages} pages</span>
              </div>
            </div>

            <div className="flex flex-col items-end justify-between">
              <div className="flex items-center space-x-2">
                {renderStars(book.rating)}
                <span className="text-xs text-muted-foreground transition-colors duration-200">{book.rating}</span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" className="hover-lift animate-pulse-glow mt-2" onClick={(e) => e.stopPropagation()}>
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add to Cart
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {bookFormats.map((format) => (
                    <DropdownMenuItem
                      key={format.format}
                      onClick={(e) => handleAddToCart(e, format.format, format.price)}
                      className="flex justify-between cursor-pointer"
                    >
                      <span>{format.label}</span>
                      <span className="font-medium">${format.price}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className="group hover-lift cursor-pointer overflow-hidden animate-slide-up animate-stagger"
      onClick={() => onClick(book)}
      style={{ "--stagger": index } as React.CSSProperties}
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        <WishlistButton bookId={book.id} className="absolute top-2 left-2 z-10 bg-background/80 backdrop-blur-sm" />
        {imageError ? (
          <div className="w-full h-full bg-muted flex items-center justify-center animate-scale-in">
            <BookOpen className="h-12 w-12 text-muted-foreground" />
          </div>
        ) : (
          <div className="relative w-full h-full">
            {!isImageLoaded && <div className="absolute inset-0 bg-muted animate-pulse" />}
            <img
              src={book.coverUrl || "/placeholder.svg?height=300&width=200"}
              alt={`Cover of ${book.title}`}
              className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-500 ${
                isImageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
          </div>
        )}
        <Badge
          variant={book.availability === "available" ? "default" : "secondary"}
          className="absolute top-2 right-2 animate-bounce-in backdrop-blur-sm"
        >
          {book.availability === "available" ? "Available" : "Checked Out"}
        </Badge>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4 space-x-2">
          <Button
            variant="secondary"
            size="sm"
            className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 backdrop-blur-sm"
          >
            View Details
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100 backdrop-blur-sm hover-glow"
                onClick={(e) => e.stopPropagation()}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add to Cart
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {bookFormats.map((format) => (
                <DropdownMenuItem
                  key={format.format}
                  onClick={(e) => handleAddToCart(e, format.format, format.price)}
                  className="flex justify-between cursor-pointer"
                >
                  <span>{format.label}</span>
                  <span className="font-medium">${format.price}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground mb-1 line-clamp-2 text-balance group-hover:text-primary transition-colors duration-200">
          {book.title}
        </h3>
        <Link
          href={`/author/${authorSlug}`}
          onClick={(e) => e.stopPropagation()}
          className="text-sm text-muted-foreground hover:text-primary mb-2 flex items-center gap-1 transition-colors duration-200 w-fit"
        >
          <User className="h-3 w-3" />
          {book.author}
        </Link>

        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span className="flex items-center gap-1 transition-colors duration-200">
            <Calendar className="h-3 w-3" />
            {book.publicationYear}
          </span>
          <span className="transition-colors duration-200">{book.genre}</span>
        </div>

        <div className="flex items-center justify-between mb-2">
          {renderStars(book.rating)}
          <span className="text-xs text-muted-foreground transition-colors duration-200">{book.rating}</span>
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2 transition-colors duration-200 mb-3">
          {book.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="text-muted-foreground">From </span>
            <span className="font-bold text-primary">${bookFormats[0].price}</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="hover-lift bg-transparent"
                onClick={(e) => e.stopPropagation()}
              >
                <ShoppingCart className="h-3 w-3 mr-1" />
                Buy
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {bookFormats.map((format) => (
                <DropdownMenuItem
                  key={format.format}
                  onClick={(e) => handleAddToCart(e, format.format, format.price)}
                  className="flex justify-between cursor-pointer"
                >
                  <span>{format.label}</span>
                  <span className="font-medium">${format.price}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}
