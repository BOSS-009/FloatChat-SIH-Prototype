"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useArgo } from "@/contexts/argo-context"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  actions?: Array<{
    label: string
    icon: React.ReactNode
    onClick: () => void
  }>
}

export function ChatInterface() {
  const { fetchData, setShowMap, profiles, isLoading: argoLoading } = useArgo()

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello! I'm your ARGO data assistant. Ask me anything about ocean floats, temperature profiles, salinity data, or any other oceanographic parameters.",
      timestamp: new Date(),
      actions: [
        {
          label: "View on Map",
          icon: <span className="text-sm">🗺️</span>,
          onClick: async () => {
            console.log("[v0] View on map clicked from chat")
            await fetchData()
            setShowMap(true)
          },
        },
        {
          label: "Download Data",
          icon: <span className="text-sm">⬇️</span>,
          onClick: async () => {
            console.log("[v0] Download data clicked from chat")
            await fetchData()
            const { downloadData } = await import("@/lib/argo-api")
            downloadData(profiles, "json")
          },
        },
      ],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: `I found relevant ARGO data for your query: "${inputValue}". Here are the results from our ocean database.`,
        timestamp: new Date(),
        actions: [
          {
            label: "View on Map",
            icon: <span className="text-sm">🗺️</span>,
            onClick: async () => {
              console.log("[v0] View on map clicked from AI response")
              await fetchData()
              setShowMap(true)
            },
          },
          {
            label: "Download Data",
            icon: <span className="text-sm">⬇️</span>,
            onClick: async () => {
              console.log("[v0] Download data clicked from AI response")
              await fetchData()
              const { downloadData } = await import("@/lib/argo-api")
              downloadData(profiles, "json")
            },
          },
          {
            label: "Compare",
            icon: <span className="text-sm">🔄</span>,
            onClick: () => console.log("Compare data"),
          },
        ],
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Chat Interface</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Chat Messages */}
        <ScrollArea ref={scrollAreaRef} className="flex-1 px-6">
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <div key={message.id} className={cn("flex", message.type === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-4 py-2",
                    message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800",
                  )}
                >
                  <p className="text-sm">{message.content}</p>

                  {/* Action Buttons for AI messages */}
                  {message.type === "ai" && message.actions && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {message.actions.map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs bg-transparent"
                          onClick={action.onClick}
                          disabled={argoLoading}
                        >
                          {action.icon}
                          <span className="ml-1">{action.label}</span>
                        </Button>
                      ))}
                    </div>
                  )}

                  <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-lg px-4 py-2 max-w-[80%]">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-current rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-current rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-sm">Analyzing ARGO data...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Chat Input */}
        <div className="border-t p-4">
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about ARGO floats..."
                className="pr-12"
                disabled={isLoading}
              />
            </div>
            <Button size="icon" variant="outline" disabled={isLoading}>
              <span className="text-lg">🎤</span>
              <span className="sr-only">Voice input</span>
            </Button>
            <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isLoading}>
              <span className="text-lg">📤</span>
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
