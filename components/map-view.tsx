"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

// Mock ARGO float data
const mockFloats = [
  { id: "IN123", lat: 8.5, lon: 73.2, status: "active", lastObservation: "2024-01-15" },
  { id: "IN456", lat: 12.3, lon: 75.1, status: "active", lastObservation: "2024-01-14" },
  { id: "IN789", lat: 15.6, lon: 77.0, status: "inactive", lastObservation: "2024-01-10" },
  { id: "GL001", lat: 20.0, lon: 65.0, status: "active", lastObservation: "2024-01-15" },
  { id: "GL002", lat: 5.0, lon: 80.0, status: "active", lastObservation: "2024-01-15" },
  { id: "GL003", lat: -10.0, lon: 70.0, status: "inactive", lastObservation: "2024-01-12" },
]

export function MapView() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [selectedFloat, setSelectedFloat] = useState<string | null>(null)

  useEffect(() => {
    // Since we can't use actual Leaflet in this environment, we'll create a mock map
    if (mapRef.current) {
      // This would normally initialize Leaflet map
      console.log("Map would be initialized here with Leaflet")
    }
  }, [])

  return (
    <div className="space-y-4">
      {/* Mock Map Container */}
      <Card>
        <CardContent className="p-0">
          <div
            ref={mapRef}
            className="h-64 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 relative rounded-lg overflow-hidden"
          >
            {/* Mock Ocean Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-600/30"></div>

            {/* Mock Float Markers */}
            {mockFloats.map((float) => (
              <div
                key={float.id}
                className={`absolute w-3 h-3 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                  float.status === "active"
                    ? "bg-green-500 shadow-lg shadow-green-500/50"
                    : "bg-gray-400 shadow-lg shadow-gray-400/50"
                }`}
                style={{
                  left: `${((float.lon + 180) / 360) * 100}%`,
                  top: `${((90 - float.lat) / 180) * 100}%`,
                }}
                onClick={() => setSelectedFloat(selectedFloat === float.id ? null : float.id)}
                title={`Float ${float.id} - ${float.status}`}
              >
                {/* Pulse animation for active floats */}
                {float.status === "active" && (
                  <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></div>
                )}
              </div>
            ))}

            {/* Map Labels */}
            <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2 text-sm">
              <div className="font-semibold">ARGO Float Locations</div>
              <div className="text-muted-foreground text-xs">
                {mockFloats.filter((f) => f.status === "active").length} active,{" "}
                {mockFloats.filter((f) => f.status === "inactive").length} inactive
              </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Active Float</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span>Inactive Float</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Float Details */}
      {selectedFloat && (
        <Card>
          <CardContent className="pt-6">
            {(() => {
              const float = mockFloats.find((f) => f.id === selectedFloat)
              if (!float) return null

              return (
                <div className="space-y-2">
                  <h3 className="font-semibold">Float {float.id}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Status:</span>
                      <span
                        className={`ml-2 px-2 py-1 rounded-full text-xs ${
                          float.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                        }`}
                      >
                        {float.status}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last Observation:</span>
                      <span className="ml-2">{float.lastObservation}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Latitude:</span>
                      <span className="ml-2">{float.lat}°</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Longitude:</span>
                      <span className="ml-2">{float.lon}°</span>
                    </div>
                  </div>
                </div>
              )
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
