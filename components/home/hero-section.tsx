"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, Star, TrendingUp, Users, ArrowRight, Sparkles } from "lucide-react"

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentBookIndex, setCurrentBookIndex] = useState(0)

  const featuredBooks = [
    {
      title: "The Midnight Library",
      author: "Matt Haig",
      cover: "/midnight-library-cover.png",
      rating: 4.8,
      genre: "Fiction",
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      cover: "/atomic-habits-inspired-cover.png",
      rating: 4.9,
      genre: "Self-Help",
    },
    {
      title: "Dune",
      author: "Frank Herbert",
      cover: "/dune-book-cover-sci-fi.jpg",
      rating: 4.7,
      genre: "Sci-Fi",
    },
  ]

  const stats = [
    { label: "Books Available", value: "50K+", icon: BookOpen },
    { label: "Happy Readers", value: "10K+", icon: Users },
    { label: "Average Rating", value: "4.8", icon: Star },
    { label: "New Arrivals", value: "500+", icon: TrendingUp },
  ]

  // Auto-rotate featured books
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBookIndex((prev) => (prev + 1) % featuredBooks.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [featuredBooks.length])

  useEffect(() => {
    // Simplified particle system - removed the problematic floating elements
    const createParticle = () => {
      const particle = document.createElement("div")
      particle.className = "animate-pulse opacity-20"
      particle.style.position = "absolute"
      particle.style.width = "2px"
      particle.style.height = "2px"
      particle.style.backgroundColor = "hsl(var(--primary))"
      particle.style.borderRadius = "50%"
      particle.style.left = Math.random() * 100 + "%"
      particle.style.top = Math.random() * 100 + "%"
      particle.style.pointerEvents = "none"

      const container = document.querySelector(".particle-container")
      if (container) {
        container.appendChild(particle)
        setTimeout(() => particle.remove(), 3000)
      }
    }

    const interval = setInterval(createParticle, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      <div className="particle-container absolute inset-0 pointer-events-none" />

      <div className="container relative z-10 px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-slide-in-left">
            <div className="space-y-4">
              <Badge variant="secondary" className="animate-bounce-in hover-glow">
                <Sparkles className="h-3 w-3 mr-1" />
                Discover Your Next Adventure
              </Badge>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-shimmer animate-fade-in">Find Your</span>
                <br />
                <span className="text-foreground animate-slide-up" style={{ animationDelay: "0.2s" }}>
                  Perfect Book
                </span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-lg animate-fade-in" style={{ animationDelay: "0.4s" }}>
                Explore our vast collection of books with intelligent search, personalized recommendations, and
                immersive reading experiences.
              </p>
            </div>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.6s" }}>
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by title, author, or ISBN..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 h-14 text-lg focus:ring-2 focus:ring-primary/20 border-2 hover:border-primary/30 transition-all duration-300 hover-ripple"
                />
              </div>
              <Button size="lg" className="h-14 px-8 hover-lift animate-pulse-glow">
                <Search className="h-5 w-5 mr-2" />
                Search Books
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.8s" }}>
              <Link href="/books">
                <Button variant="outline" className="hover-magnetic bg-transparent">
                  Browse All Books
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Link href="/categories">
                <Button variant="ghost" className="hover-lift">
                  Explore Categories
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 animate-slide-up"
              style={{ animationDelay: "1s" }}
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div
                    key={stat.label}
                    className="text-center space-y-2 hover-book-3d"
                    style={{ animationDelay: `${1 + index * 0.1}s` }}
                  >
                    <div className="flex justify-center">
                      <Icon className="h-8 w-8 text-primary animate-float" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Content - Enhanced Featured Books Carousel */}
          <div className="relative animate-slide-in-right">
            <div className="relative h-96 w-full flex items-center justify-center">
              {featuredBooks.map((book, index) => (
                <div
                  key={book.title}
                  className={`absolute transition-all duration-700 ease-in-out ${
                    index === currentBookIndex
                      ? "opacity-100 scale-100 z-10 animate-book-cascade"
                      : index === (currentBookIndex + 1) % featuredBooks.length
                        ? "opacity-60 scale-90 translate-x-20 z-5"
                        : index === (currentBookIndex - 1 + featuredBooks.length) % featuredBooks.length
                          ? "opacity-60 scale-90 -translate-x-20 z-5"
                          : "opacity-0 scale-75"
                  }`}
                >
                  <div className="relative group hover-book-3d">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300 animate-morphing-shape" />
                    <div className="relative bg-card border-2 border-border rounded-lg p-6 space-y-4 hover:border-primary/50 transition-all duration-300">
                      <div className="flex items-start space-x-4">
                        <img
                          src={book.cover || "/placeholder.svg"}
                          alt={book.title}
                          className="w-20 h-28 object-cover rounded shadow-lg animate-float hover-magnetic"
                        />
                        <div className="flex-1 space-y-2">
                          <h3 className="font-semibold text-lg">{book.title}</h3>
                          <p className="text-muted-foreground">{book.author}</p>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="ml-1 text-sm font-medium">{book.rating}</span>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {book.genre}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full hover-glow animate-page-turn">View Details</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Carousel Indicators */}
            <div className="flex justify-center space-x-2 mt-8">
              {featuredBooks.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBookIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 hover-magnetic ${
                    index === currentBookIndex
                      ? "bg-primary scale-125 animate-pulse-glow"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
