"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useArgo } from "@/contexts/argo-context"

export function FilterPanel() {
  const {
    dataset,
    setDataset,
    region,
    setRegion,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    parameters,
    setParameters,
    fetchData,
    isLoading,
    showMap,
    setShowMap,
    profiles,
  } = useArgo()

  const handleParameterChange = (parameter: string, checked: boolean) => {
    if (checked) {
      setParameters([...parameters, parameter])
    } else {
      setParameters(parameters.filter((p) => p !== parameter))
    }
  }

  const canFetchData = dataset && region && parameters.length > 0
  const canViewMap = canFetchData && startDate && endDate
  const canDownloadData = canFetchData

  const handleDownloadData = async () => {
    console.log("[v0] Download data clicked")
    await fetchData()

    // Import download function and use current profiles
    const { downloadData } = await import("@/lib/argo-api")
    downloadData(profiles, "json")
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Filters & Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Dataset Selector */}
        <div className="space-y-2">
          <Label htmlFor="dataset">Dataset</Label>
          <Select value={dataset} onValueChange={setDataset}>
            <SelectTrigger>
              <SelectValue placeholder="Select dataset" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="argo-core">ARGO Core</SelectItem>
              <SelectItem value="bgc-floats">BGC Floats</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Region Selector */}
        <div className="space-y-2">
          <Label htmlFor="region">Region</Label>
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger>
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="global">Global</SelectItem>
              <SelectItem value="indian-ocean">Indian Ocean</SelectItem>
              <SelectItem value="arabian-sea">Arabian Sea</SelectItem>
              <SelectItem value="bay-of-bengal">Bay of Bengal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date Pickers */}
        <div className="space-y-4">
          <Label>Date Range</Label>

          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Start Date</Label>
            <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full" />
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-gray-600">End Date</Label>
            <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full" />
          </div>
        </div>

        {/* Parameter Selector */}
        <div className="space-y-3">
          <Label>Parameters</Label>
          <div className="space-y-3">
            {[
              { id: "temperature", label: "Temperature" },
              { id: "salinity", label: "Salinity" },
              { id: "oxygen", label: "Oxygen" },
              { id: "chlorophyll", label: "Chlorophyll" },
            ].map((param) => (
              <div key={param.id} className="flex items-center space-x-2">
                <Checkbox
                  id={param.id}
                  checked={parameters.includes(param.id)}
                  onCheckedChange={(checked) => handleParameterChange(param.id, checked as boolean)}
                />
                <Label htmlFor={param.id} className="text-sm font-normal cursor-pointer">
                  {param.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Main Action Buttons */}
        <div className="space-y-3">
          <Label>Main Actions</Label>
          <div className="space-y-2">
            <Button
              className="w-full justify-start"
              size="sm"
              disabled={!canViewMap || isLoading}
              onClick={() => {
                fetchData().then(() => setShowMap(true))
              }}
            >
              <span className="mr-2">🗺️</span>
              View Map
              {!canViewMap && <span className="ml-2 text-xs opacity-70">(Need all params + dates)</span>}
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent"
              size="sm"
              disabled={!canDownloadData || isLoading}
              onClick={handleDownloadData}
            >
              <span className="mr-2">⬇️</span>
              Download Data
              {!canDownloadData && <span className="ml-2 text-xs opacity-70">(Need dataset + region + params)</span>}
            </Button>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="space-y-3">
          <Label>Quick Actions</Label>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
              <span className="mr-2">📊</span>
              Latest Profiles
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
              <span className="mr-2">🔄</span>
              Compare Regions
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
              <span className="mr-2">📍</span>
              Nearest Float
            </Button>
          </div>
        </div>

        {/* Status indicator */}
        {isLoading && (
          <div className="text-center text-sm text-muted-foreground">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span>Loading ARGO data...</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
