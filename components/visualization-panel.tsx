"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapView } from "@/components/map-view"
import { ProfileCharts } from "@/components/profile-charts"
import { ArgoDataset } from "@/components/argo-dataset"

export function VisualizationPanel() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Visualization</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="map" className="h-full">
          <div className="px-6 pb-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="map">Map View</TabsTrigger>
              <TabsTrigger value="profiles">Profiles</TabsTrigger>
              <TabsTrigger value="dataset">Argo Dataset</TabsTrigger>
            </TabsList>
          </div>

          <div className="px-6 pb-6">
            <TabsContent value="map" className="mt-0">
              <MapView />
            </TabsContent>

            <TabsContent value="profiles" className="mt-0">
              <ProfileCharts />
            </TabsContent>

            <TabsContent value="dataset" className="mt-0">
              <ArgoDataset />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
