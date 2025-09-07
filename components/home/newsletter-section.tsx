"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, BookOpen, Star, Users, CheckCircle } from "lucide-react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const benefits = [
    { icon: BookOpen, text: "Weekly book recommendations" },
    { icon: Star, text: "Exclusive author interviews" },
    { icon: Users, text: "Join 50K+ book lovers" },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover-lift">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left Content */}
                <div className="space-y-6 animate-slide-in-left">
                  <div className="space-y-4">
                    <Badge className="animate-bounce-in">
                      <Mail className="h-3 w-3 mr-1" />
                      Newsletter
                    </Badge>

                    <h2 className="text-3xl md:text-4xl font-bold">
                      Never Miss a
                      <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {" "}
                        Great Read
                      </span>
                    </h2>

                    <p className="text-lg text-muted-foreground">
                      Get personalized book recommendations, author spotlights, and exclusive content delivered to your
                      inbox every week.
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-3">
                    {benefits.map((benefit, index) => {
                      const Icon = benefit.icon
                      return (
                        <div
                          key={benefit.text}
                          className="flex items-center space-x-3 animate-slide-in-left"
                          style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                        >
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-sm text-muted-foreground">{benefit.text}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Right Content - Form */}
                <div className="space-y-6 animate-slide-in-right">
                  {!isSubscribed ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-12 text-base focus:ring-2 focus:ring-primary/20 border-2 hover:border-primary/30 transition-all duration-300"
                          required
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full h-12 hover-lift animate-pulse-glow">
                        <Mail className="h-5 w-5 mr-2" />
                        Subscribe to Newsletter
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        No spam, unsubscribe at any time. We respect your privacy.
                      </p>
                    </form>
                  ) : (
                    <div className="text-center space-y-4 animate-bounce-in">
                      <div className="p-4 bg-green-500/10 rounded-lg">
                        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                        <h3 className="text-lg font-semibold text-green-700 dark:text-green-400">
                          Welcome to BookFinder!
                        </h3>
                        <p className="text-sm text-green-600 dark:text-green-300">
                          Check your email for a confirmation link.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Social Proof */}
                  <div className="flex items-center justify-center space-x-4 pt-4 border-t border-border">
                    <div className="flex -space-x-2">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full border-2 border-background animate-float"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">50,000+</span> readers already subscribed
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
