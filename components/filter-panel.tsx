"use client"

import type React from "react"

import { Filter, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface FilterPanelProps {
  genres: string[]
  selectedGenre: string
  onGenreChange: (genre: string) => void
  selectedAvailability: string
  onAvailabilityChange: (availability: string) => void
  selectedYearRange: [number, number]
  onYearRangeChange: (range: [number, number]) => void
  minYear: number
  maxYear: number
  activeFiltersCount: number
  onClearFilters: () => void
}

export function FilterPanel({
  genres,
  selectedGenre,
  onGenreChange,
  selectedAvailability,
  onAvailabilityChange,
  selectedYearRange,
  onYearRangeChange,
  minYear,
  maxYear,
  activeFiltersCount,
  onClearFilters,
}: FilterPanelProps) {
  return (
    <Card className="animate-slide-in-left hover-lift">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 transition-colors duration-200" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2 animate-bounce-in">
                {activeFiltersCount}
              </Badge>
            )}
          </CardTitle>
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="h-8 px-2 transition-all duration-200 hover:scale-105 hover:bg-destructive/10 hover:text-destructive"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Genre Filter */}
        <div className="animate-slide-up">
          <label className="text-sm font-medium text-foreground mb-3 block transition-colors duration-200">Genre</label>
          <div className="space-y-2">
            <Button
              variant={selectedGenre === "all" ? "default" : "ghost"}
              size="sm"
              onClick={() => onGenreChange("all")}
              className="w-full justify-start transition-all duration-200 hover:scale-[1.02]"
            >
              All Genres
            </Button>
            {genres.map((genre, index) => (
              <Button
                key={genre}
                variant={selectedGenre === genre ? "default" : "ghost"}
                size="sm"
                onClick={() => onGenreChange(genre)}
                className="w-full justify-start transition-all duration-200 hover:scale-[1.02] animate-slide-up animate-stagger"
                style={{ "--stagger": index + 1 } as React.CSSProperties}
              >
                {genre}
              </Button>
            ))}
          </div>
        </div>

        <Separator className="transition-colors duration-200" />

        {/* Availability Filter */}
        <div className="animate-slide-up" style={{ "--stagger": genres.length + 2 } as React.CSSProperties}>
          <label className="text-sm font-medium text-foreground mb-3 block transition-colors duration-200">
            Availability
          </label>
          <div className="space-y-2">
            <Button
              variant={selectedAvailability === "all" ? "default" : "ghost"}
              size="sm"
              onClick={() => onAvailabilityChange("all")}
              className="w-full justify-start transition-all duration-200 hover:scale-[1.02]"
            >
              All Books
            </Button>
            <Button
              variant={selectedAvailability === "available" ? "default" : "ghost"}
              size="sm"
              onClick={() => onAvailabilityChange("available")}
              className="w-full justify-start transition-all duration-200 hover:scale-[1.02]"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Available
            </Button>
            <Button
              variant={selectedAvailability === "checked-out" ? "default" : "ghost"}
              size="sm"
              onClick={() => onAvailabilityChange("checked-out")}
              className="w-full justify-start transition-all duration-200 hover:scale-[1.02]"
            >
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              Checked Out
            </Button>
          </div>
        </div>

        <Separator className="transition-colors duration-200" />

        {/* Publication Year Filter */}
        <div className="animate-slide-up" style={{ "--stagger": genres.length + 3 } as React.CSSProperties}>
          <label className="text-sm font-medium text-foreground mb-3 block transition-colors duration-200">
            Publication Year
          </label>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={minYear}
                max={maxYear}
                value={selectedYearRange[0]}
                onChange={(e) => onYearRangeChange([Number.parseInt(e.target.value), selectedYearRange[1]])}
                className="flex-1 transition-all duration-200 hover:scale-105"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={minYear}
                max={maxYear}
                value={selectedYearRange[1]}
                onChange={(e) => onYearRangeChange([selectedYearRange[0], Number.parseInt(e.target.value)])}
                className="flex-1 transition-all duration-200 hover:scale-105"
              />
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span className="transition-colors duration-200">{selectedYearRange[0]}</span>
              <span className="transition-colors duration-200">to</span>
              <span className="transition-colors duration-200">{selectedYearRange[1]}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
