import { Header } from "@/components/header"
import { FilterPanel } from "@/components/filter-panel"
import { ChatInterface } from "@/components/chat-interface"
import { VisualizationPanel } from "@/components/visualization-panel"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-12rem)]">
          {/* Left Panel - Filters & Controls */}
          <div className="lg:col-span-3">
            <FilterPanel />
          </div>

          {/* Center Panel - Chat Interface */}
          <div className="lg:col-span-5">
            <ChatInterface />
          </div>

          {/* Right Panel - Visualization */}
          <div className="lg:col-span-4">
            <VisualizationPanel />
          </div>
        </div>
      </main>
    </div>
  )
}
