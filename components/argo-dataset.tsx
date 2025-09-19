"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function ArgoDataset() {
  const handleOpenIndianArgo = () => {
    window.open("https://incois.gov.in/OON/index.jsp", "_blank", "noopener,noreferrer")
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="text-lg">🗄️</span>
            <span>Argo Dataset</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Preview Image Placeholder */}
          <div className="relative">
            <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center space-y-2">
                <span className="text-4xl">🌍</span>
                <p className="text-sm text-gray-600">Preview not available. Click below to open the official site.</p>
              </div>
            </div>
          </div>

          {/* Main Action Button */}
          <Button onClick={handleOpenIndianArgo} className="w-full" size="lg">
            <span className="mr-2 text-lg">🔗</span>
            Open Indian Argo Dataset Website
          </Button>

          {/* Fallback Text Link */}
          <div className="text-center">
            <a
              href="https://incois.gov.in/OON/index.jsp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              Visit site (text link)
            </a>
          </div>

          {/* Dataset Information */}
          <div className="space-y-3 pt-4 border-t">
            <h4 className="font-semibold text-sm">About ARGO Dataset</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                The Argo Program is a global array of temperature/salinity profiling floats that provides real-time data
                for climate and oceanographic research.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <span className="font-medium text-gray-900">Global Coverage:</span>
                  <br />
                  3,000+ active floats
                </div>
                <div>
                  <span className="font-medium text-gray-900">Data Frequency:</span>
                  <br />
                  Every 10 days
                </div>
                <div>
                  <span className="font-medium text-gray-900">Depth Range:</span>
                  <br />
                  0-2000m
                </div>
                <div>
                  <span className="font-medium text-gray-900">Parameters:</span>
                  <br />
                  T, S, P, O₂, pH
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Sources Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Data Sources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Global Argo Repository</span>
              <Button variant="outline" size="sm" asChild>
                <a href="https://data-argo.ifremer.fr" target="_blank" rel="noopener noreferrer">
                  <span className="text-sm mr-1">🔗</span>
                  Visit
                </a>
              </Button>
            </div>
            <p className="text-xs text-gray-600">ftp.ifremer.fr/ifremer/argo - Global ocean data repository</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Indian Argo Project</span>
              <Button variant="outline" size="sm" onClick={handleOpenIndianArgo}>
                <span className="text-sm mr-1">🔗</span>
                Visit
              </Button>
            </div>
            <p className="text-xs text-gray-600">incois.gov.in/OON/index.jsp - Indian Ocean observations</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
