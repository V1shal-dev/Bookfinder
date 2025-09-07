"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Calendar, BookOpen, Heart, Star, Settings, LogOut, Edit, Save, X } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(user?.name || "")

  // Redirect if not authenticated
  if (!user) {
    router.push("/login")
    return null
  }

  const handleSave = () => {
    // In a real app, this would update the user profile via API
    setIsEditing(false)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const readingStats = {
    booksRead: 47,
    currentlyReading: 3,
    favorites: 12,
    averageRating: 4.2,
    readingStreak: 15,
    joinDate: "March 2024",
  }

  const recentBooks = [
    {
      id: "1",
      title: "The Midnight Library",
      author: "Matt Haig",
      cover: "/midnight-library-cover.png",
      rating: 5,
      status: "completed",
    },
    {
      id: "2",
      title: "Atomic Habits",
      author: "James Clear",
      cover: "/atomic-habits-inspired-cover.png",
      rating: 4,
      status: "reading",
    },
    {
      id: "3",
      title: "Dune",
      author: "Frank Herbert",
      cover: "/dune-book-cover-sci-fi.jpg",
      rating: 5,
      status: "completed",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8 animate-fade-in">
          <Card className="border-2 hover:border-primary/50 transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <Avatar className="w-24 h-24 hover-lift">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="text-2xl bg-gradient-to-r from-primary to-accent text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 text-center md:text-left space-y-2">
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    {isEditing ? (
                      <div className="flex items-center space-x-2">
                        <Input
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                          className="text-2xl font-bold h-auto p-1 border-primary"
                        />
                        <Button size="sm" onClick={handleSave} className="hover-lift">
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <h1 className="text-3xl font-bold">{user.name}</h1>
                        <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)} className="hover-lift">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>

                  <div className="flex items-center justify-center md:justify-start space-x-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{user.email}</span>
                  </div>

                  <div className="flex items-center justify-center md:justify-start space-x-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Member since {readingStats.joinDate}</span>
                  </div>

                  <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                    <Badge className="animate-bounce-in">
                      <BookOpen className="h-3 w-3 mr-1" />
                      {readingStats.booksRead} Books Read
                    </Badge>
                    <Badge variant="secondary" className="animate-bounce-in" style={{ animationDelay: "0.1s" }}>
                      <Star className="h-3 w-3 mr-1" />
                      {readingStats.averageRating} Avg Rating
                    </Badge>
                    <Badge variant="outline" className="animate-bounce-in" style={{ animationDelay: "0.2s" }}>
                      🔥 {readingStats.readingStreak} Day Streak
                    </Badge>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" className="hover-lift bg-transparent">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                  <Button variant="destructive" onClick={handleLogout} className="hover-lift">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Tabs */}
        <Tabs defaultValue="overview" className="animate-slide-up">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reading">Reading</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Reading Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Books Read", value: readingStats.booksRead, icon: BookOpen, color: "text-blue-500" },
                {
                  label: "Currently Reading",
                  value: readingStats.currentlyReading,
                  icon: BookOpen,
                  color: "text-green-500",
                },
                { label: "Favorites", value: readingStats.favorites, icon: Heart, color: "text-red-500" },
                { label: "Average Rating", value: readingStats.averageRating, icon: Star, color: "text-yellow-500" },
              ].map((stat, index) => {
                const Icon = stat.icon
                return (
                  <Card
                    key={stat.label}
                    className="hover-lift animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6 text-center">
                      <Icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Recent Activity */}
            <Card className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest reading activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBooks.map((book, index) => (
                    <div
                      key={book.id}
                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors animate-slide-in-left"
                      style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                    >
                      <img
                        src={book.cover || "/placeholder.svg"}
                        alt={book.title}
                        className="w-12 h-16 object-cover rounded shadow-sm"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{book.title}</h4>
                        <p className="text-sm text-muted-foreground">by {book.author}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant={book.status === "reading" ? "default" : "secondary"} className="text-xs">
                            {book.status === "reading" ? "Currently Reading" : "Completed"}
                          </Badge>
                          {book.status === "completed" && (
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < book.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reading">
            <Card>
              <CardHeader>
                <CardTitle>Currently Reading</CardTitle>
                <CardDescription>Books you're currently enjoying</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Your reading list will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites">
            <Card>
              <CardHeader>
                <CardTitle>Favorite Books</CardTitle>
                <CardDescription>Your all-time favorite reads</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Your favorite books will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Display Name</Label>
                  <Input id="name" value={user.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={user.email} />
                </div>
                <Button className="hover-lift">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
