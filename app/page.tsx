"use client"

import { HeroSection } from "@/components/home/hero-section"
import { FeaturedCategories } from "@/components/home/featured-categories"
import { TrendingBooks } from "@/components/home/trending-books"
import { NewsletterSection } from "@/components/home/newsletter-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedCategories />
      <TrendingBooks />
      <NewsletterSection />
    </div>
  )
}
