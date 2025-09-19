"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header() {
  const toggleTheme = () => {
    // Theme toggle functionality removed temporarily
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">FC</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">FloatChat</h1>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
            Home
          </a>
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
            Dashboard
          </a>
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
            About
          </a>
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
            Data Sources
          </a>
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
            Docs
          </a>
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
            Contact
          </a>
        </nav>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-3">
          {/* Search Bar */}
          <div className="relative hidden sm:block">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <Input placeholder="Search ARGO data..." className="pl-10 w-64" />
          </div>

          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            <span className="text-lg">☀️</span>
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* User Profile */}
          <Button variant="ghost" size="icon">
            <span className="text-lg">👤</span>
            <span className="sr-only">User profile</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
