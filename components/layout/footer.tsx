import Link from "next/link"
import { BookOpen, Github, Twitter, Mail, Heart, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">BookFinder</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Discover your next favorite book with our modern library search interface. Explore thousands of books with
              advanced filtering and personalized recommendations.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" className="hover-lift" asChild>
                <Link href="https://github.com/V1shal-dev" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="hover-lift" asChild>
                <Link href="/">
                  <Twitter className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="hover-lift" asChild>
                <Link
                  href="https://www.linkedin.com/in/vishal-patil-871744318/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="hover-lift" asChild>
                <Link href="mailto:Vishalpatil9446.2@gmail.com">
                  <Mail className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/books" className="text-muted-foreground hover:text-foreground transition-colors">
                  Browse Books
                </Link>
              </li>
              <li>
                <Link href="/books/fiction" className="text-muted-foreground hover:text-foreground transition-colors">
                  Fiction
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-muted-foreground hover:text-foreground transition-colors">
                  My Wishlist
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-muted-foreground hover:text-foreground transition-colors">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Popular Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/books/fiction" className="text-muted-foreground hover:text-foreground transition-colors">
                  Fiction
                </Link>
              </li>
              <li>
                <Link href="/books/science" className="text-muted-foreground hover:text-foreground transition-colors">
                  Science
                </Link>
              </li>
              <li>
                <Link
                  href="/books/technology"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/books/history" className="text-muted-foreground hover:text-foreground transition-colors">
                  History
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">Get notified about new books and features.</p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Enter your email" className="flex-1" />
              <Button size="sm" className="hover-lift">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">© 2025 BookFinder. All rights reserved.</p>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
            <span>by Vishal Patil</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
