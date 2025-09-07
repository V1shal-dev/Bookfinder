"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, Eye, ArrowRight } from "lucide-react"

export function TrendingBooks() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const trendingBooks = [
    {
      id: "14",
      title: "The Midnight Library",
      author: "Matt Haig",
      cover: "/midnight-library-cover.png",
      rating: 4.2,
      reviews: 2847,
      genre: "Contemporary Fiction",
      trending: "+15%",
      description:
        "A thought-provoking novel about life's infinite possibilities, following Nora Seed as she explores alternate versions of her life.",
    },
    {
      id: "13",
      title: "Atomic Habits",
      author: "James Clear",
      cover: "/atomic-habits-inspired-cover.png",
      rating: 4.8,
      reviews: 5234,
      genre: "Self-Help",
      trending: "+23%",
      description:
        "A comprehensive guide to building good habits and breaking bad ones through small, incremental changes.",
    },
    {
      id: "9",
      title: "Dune",
      author: "Frank Herbert",
      cover: "/dune-book-cover-sci-fi.jpg",
      rating: 4.3,
      reviews: 8921,
      genre: "Science Fiction",
      trending: "+8%",
      description:
        "A science fiction epic set on the desert planet Arrakis, exploring politics, religion, and ecology in a distant future.",
    },
    {
      id: "16",
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop&crop=center",
      rating: 4.5,
      reviews: 4156,
      genre: "Historical Fiction",
      trending: "+12%",
      description:
        "A captivating novel about a reclusive Hollywood icon who finally decides to tell her story to an unknown journalist.",
    },
    {
      id: "19",
      title: "Becoming",
      author: "Michelle Obama",
      cover: "https://images.unsplash.com/photo-1518373714866-3f1478910cc0?w=200&h=300&fit=crop&crop=center",
      rating: 4.7,
      reviews: 6789,
      genre: "Biography",
      trending: "+18%",
      description: "An intimate and inspiring memoir by the former First Lady of the United States.",
    },
  ]

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(trendingBooks.length / 3))
    }, 5000)
    return () => clearInterval(interval)
  }, [trendingBooks.length])

  const visibleBooks = trendingBooks.slice(currentSlide * 3, (currentSlide + 1) * 3)

  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="flex items-center justify-between mb-16 animate-fade-in">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-6 w-6 text-primary animate-bounce" />
              <Badge variant="secondary" className="animate-pulse-glow">
                Hot Right Now
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trending{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Books</span>
            </h2>
            <p className="text-xl text-muted-foreground">Discover what everyone's reading this week</p>
          </div>
          <Link href="/books">
            <Button variant="outline" className="hover-lift bg-transparent">
              View All Books
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Books Carousel */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {Array.from({ length: Math.ceil(trendingBooks.length / 3) }).map((_, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {trendingBooks.slice(slideIndex * 3, (slideIndex + 1) * 3).map((book, index) => (
                    <Card
                      key={book.id}
                      className="group hover-lift cursor-pointer border-2 hover:border-primary/50 transition-all duration-300 animate-scale-in"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <CardContent className="p-0">
                        <div className="relative">
                          <img
                            src={book.cover || "/placeholder.svg"}
                            alt={book.title}
                            className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-green-500 text-white animate-bounce-in">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              {book.trending}
                            </Badge>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg" />
                        </div>

                        <div className="p-6 space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className="text-xs">
                                {book.genre}
                              </Badge>
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium">{book.rating}</span>
                                <span className="text-xs text-muted-foreground">({book.reviews})</span>
                              </div>
                            </div>

                            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-200 line-clamp-1">
                              {book.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">by {book.author}</p>
                            <p className="text-sm text-muted-foreground line-clamp-2">{book.description}</p>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                              <Eye className="h-3 w-3" />
                              <span>{book.reviews} readers</span>
                            </div>
                            <Button size="sm" className="hover-glow">
                              Read More
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {Array.from({ length: Math.ceil(trendingBooks.length / 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-primary scale-125" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
