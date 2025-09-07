"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Zap, Heart, Brain, Globe, Rocket, Palette, Clock } from "lucide-react"

export function FeaturedCategories() {
  const categories = [
    {
      name: "Fiction",
      description: "Immerse yourself in captivating stories",
      icon: BookOpen,
      color: "from-blue-500 to-purple-600",
      count: "12.5K",
      books: ["The Midnight Library", "Where the Crawdads Sing", "The Seven Husbands"],
      slug: "fiction",
    },
    {
      name: "Science",
      description: "Explore the wonders of scientific discovery",
      icon: Zap,
      color: "from-green-500 to-teal-600",
      count: "8.2K",
      books: ["Sapiens", "The Gene", "Cosmos"],
      slug: "science",
    },
    {
      name: "Romance",
      description: "Fall in love with heartwarming tales",
      icon: Heart,
      color: "from-pink-500 to-rose-600",
      count: "6.8K",
      books: ["Beach Read", "The Hating Game", "Red, White & Royal Blue"],
      slug: "romance",
    },
    {
      name: "Psychology",
      description: "Understand the human mind and behavior",
      icon: Brain,
      color: "from-indigo-500 to-blue-600",
      count: "4.3K",
      books: ["Thinking, Fast and Slow", "The Power of Now", "Mindset"],
      slug: "psychology",
    },
    {
      name: "History",
      description: "Journey through time and civilizations",
      icon: Globe,
      color: "from-amber-500 to-orange-600",
      count: "9.1K",
      books: ["Sapiens", "The Guns of August", "A People's History"],
      slug: "history",
    },
    {
      name: "Technology",
      description: "Stay ahead with cutting-edge innovations",
      icon: Rocket,
      color: "from-cyan-500 to-blue-600",
      count: "5.7K",
      books: ["The Innovators", "Steve Jobs", "The Everything Store"],
      slug: "technology",
    },
    {
      name: "Art & Design",
      description: "Discover creativity and visual inspiration",
      icon: Palette,
      color: "from-purple-500 to-pink-600",
      count: "3.4K",
      books: ["Ways of Seeing", "The Design of Everyday Things", "Steal Like an Artist"],
      slug: "art-design",
    },
    {
      name: "Biography",
      description: "Learn from extraordinary lives and journeys",
      icon: Clock,
      color: "from-slate-500 to-gray-600",
      count: "7.9K",
      books: ["Becoming", "Steve Jobs", "Long Walk to Freedom"],
      slug: "biography",
    },
  ]

  return (
    <section className="py-20 bg-muted/20">
      <div className="container px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore by{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Category</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Dive into our carefully curated categories and discover books that match your interests
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <Link key={category.name} href={`/books/${category.slug}`}>
                <Card
                  className="group hover-lift cursor-pointer border-2 hover:border-primary/50 transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div
                        className={`p-3 rounded-lg bg-gradient-to-r ${category.color} text-white group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <Badge variant="secondary" className="animate-bounce-in">
                        {category.count}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-200">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">Popular books:</p>
                      <div className="flex flex-wrap gap-1">
                        {category.books.slice(0, 2).map((book) => (
                          <Badge key={book} variant="outline" className="text-xs">
                            {book}
                          </Badge>
                        ))}
                        {category.books.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{category.books.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
