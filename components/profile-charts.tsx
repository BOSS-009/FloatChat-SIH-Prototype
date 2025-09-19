"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock profile data
const mockProfileData = {
  temperature: [
    { depth: 0, value: 28.5, float: "IN123" },
    { depth: 50, value: 26.2, float: "IN123" },
    { depth: 100, value: 22.8, float: "IN123" },
    { depth: 200, value: 18.5, float: "IN123" },
    { depth: 500, value: 12.3, float: "IN123" },
    { depth: 1000, value: 8.7, float: "IN123" },
    { depth: 1500, value: 5.2, float: "IN123" },
    { depth: 2000, value: 3.1, float: "IN123" },
  ],
  salinity: [
    { depth: 0, value: 35.1, float: "IN123" },
    { depth: 50, value: 34.9, float: "IN123" },
    { depth: 100, value: 34.8, float: "IN123" },
    { depth: 200, value: 34.6, float: "IN123" },
    { depth: 500, value: 34.5, float: "IN123" },
    { depth: 1000, value: 34.7, float: "IN123" },
    { depth: 1500, value: 34.8, float: "IN123" },
    { depth: 2000, value: 34.9, float: "IN123" },
  ],
  oxygen: [
    { depth: 0, value: 6.5, float: "IN123" },
    { depth: 50, value: 6.2, float: "IN123" },
    { depth: 100, value: 5.9, float: "IN123" },
    { depth: 200, value: 5.5, float: "IN123" },
    { depth: 500, value: 5.0, float: "IN123" },
    { depth: 1000, value: 4.2, float: "IN123" },
    { depth: 1500, value: 3.8, float: "IN123" },
    { depth: 2000, value: 3.5, float: "IN123" },
  ],
  chlorophyll: [
    { depth: 0, value: 0.8, float: "IN123" },
    { depth: 50, value: 1.2, float: "IN123" },
    { depth: 100, value: 0.9, float: "IN123" },
    { depth: 200, value: 0.3, float: "IN123" },
    { depth: 500, value: 0.1, float: "IN123" },
    { depth: 1000, value: 0.05, float: "IN123" },
    { depth: 1500, value: 0.02, float: "IN123" },
    { depth: 2000, value: 0.01, float: "IN123" },
  ],
}

const parameterConfig = {
  temperature: {
    label: "Temperature",
    unit: "°C",
    color: "#ef4444",
    range: [0, 30],
  },
  salinity: {
    label: "Salinity",
    unit: "PSU",
    color: "#3b82f6",
    range: [34, 36],
  },
  oxygen: {
    label: "Oxygen",
    unit: "ml/L",
    color: "#10b981",
    range: [0, 7],
  },
  chlorophyll: {
    label: "Chlorophyll",
    unit: "mg/m³",
    color: "#8b5cf6",
    range: [0, 1.5],
  },
}

function SimpleLineChart({ data, config }: { data: any[]; config: any }) {
  const maxDepth = Math.max(...data.map((d) => d.depth))
  const minValue = Math.min(...data.map((d) => d.value))
  const maxValue = Math.max(...data.map((d) => d.value))

  const width = 400
  const height = 300
  const padding = 40

  const points = data
    .map((d, i) => {
      const x = padding + ((d.value - minValue) / (maxValue - minValue)) * (width - 2 * padding)
      const y = padding + (d.depth / maxDepth) * (height - 2 * padding)
      return `${x},${y}`
    })
    .join(" ")

  return (
    <div className="w-full h-80 flex items-center justify-center">
      <svg width={width} height={height} className="border rounded">
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#e5e7eb" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Axes */}
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#374151" strokeWidth="2" />
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke="#374151"
          strokeWidth="2"
        />

        {/* Data line */}
        <polyline fill="none" stroke={config.color} strokeWidth="2" points={points} />

        {/* Data points */}
        {data.map((d, i) => {
          const x = padding + ((d.value - minValue) / (maxValue - minValue)) * (width - 2 * padding)
          const y = padding + (d.depth / maxDepth) * (height - 2 * padding)
          return <circle key={i} cx={x} cy={y} r="4" fill={config.color} stroke="white" strokeWidth="2" />
        })}

        {/* Labels */}
        <text x={width / 2} y={height - 10} textAnchor="middle" className="text-xs fill-gray-600">
          {config.label} ({config.unit})
        </text>
        <text
          x={15}
          y={height / 2}
          textAnchor="middle"
          transform={`rotate(-90 15 ${height / 2})`}
          className="text-xs fill-gray-600"
        >
          Depth (m)
        </text>
      </svg>
    </div>
  )
}

export function ProfileCharts() {
  const [selectedParameter, setSelectedParameter] = useState<keyof typeof mockProfileData>("temperature")

  const currentData = mockProfileData[selectedParameter]
  const config = parameterConfig[selectedParameter]

  return (
    <div className="space-y-4">
      {/* Parameter Selector */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Ocean Profiles</h3>
        <Select
          value={selectedParameter}
          onValueChange={(value) => setSelectedParameter(value as keyof typeof mockProfileData)}
        >
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(parameterConfig).map(([key, config]) => (
              <SelectItem key={key} value={key}>
                {config.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{config.label} vs Depth Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <SimpleLineChart data={currentData} config={config} />
        </CardContent>
      </Card>

      {/* Profile Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Profile Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Math.max(...currentData.map((d) => d.value)).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Surface Max</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Math.min(...currentData.map((d) => d.value)).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Deep Min</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{currentData.length}</div>
              <div className="text-sm text-gray-600">Data Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{Math.max(...currentData.map((d) => d.depth))}m</div>
              <div className="text-sm text-gray-600">Max Depth</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
