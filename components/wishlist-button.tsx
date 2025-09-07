"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface WishlistButtonProps {
  bookId: string
  className?: string
  size?: "sm" | "md" | "lg"
}

export function WishlistButton({ bookId, className, size = "md" }: WishlistButtonProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Load wishlist status from localStorage
    const wishlist = JSON.parse(localStorage.getItem("bookfinder-wishlist") || "[]")
    setIsWishlisted(wishlist.includes(bookId))
  }, [bookId])

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLoading(true)

    try {
      const wishlist = JSON.parse(localStorage.getItem("bookfinder-wishlist") || "[]")
      let newWishlist

      if (isWishlisted) {
        newWishlist = wishlist.filter((id: string) => id !== bookId)
      } else {
        newWishlist = [...wishlist, bookId]
      }

      localStorage.setItem("bookfinder-wishlist", JSON.stringify(newWishlist))
      setIsWishlisted(!isWishlisted)
    } catch (error) {
      console.error("Failed to update wishlist:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  }

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleWishlist}
      disabled={isLoading}
      className={cn(
        sizeClasses[size],
        "rounded-full transition-all duration-200 hover:scale-110",
        isWishlisted
          ? "text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-950 dark:hover:bg-red-900"
          : "text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950",
        className,
      )}
    >
      <Heart className={cn(iconSizes[size], "transition-all duration-200", isWishlisted ? "fill-current" : "")} />
    </Button>
  )
}
