"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { ArgoQueryParams, ArgoProfile, ArgoFloat } from "@/lib/argo-api"

interface ArgoContextType {
  // Filter state
  dataset: string
  region: string
  startDate: string
  endDate: string
  parameters: string[]

  // Data state
  floats: ArgoFloat[]
  profiles: ArgoProfile[]
  isLoading: boolean

  // Actions
  setDataset: (dataset: string) => void
  setRegion: (region: string) => void
  setStartDate: (date: string) => void
  setEndDate: (date: string) => void
  setParameters: (parameters: string[]) => void
  fetchData: () => Promise<void>

  // UI state
  showMap: boolean
  setShowMap: (show: boolean) => void
}

const ArgoContext = createContext<ArgoContextType | undefined>(undefined)

export function ArgoProvider({ children }: { children: ReactNode }) {
  // Filter state
  const [dataset, setDataset] = useState<string>("")
  const [region, setRegion] = useState<string>("")
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")
  const [parameters, setParameters] = useState<string[]>([])

  // Data state
  const [floats, setFloats] = useState<ArgoFloat[]>([])
  const [profiles, setProfiles] = useState<ArgoProfile[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // UI state
  const [showMap, setShowMap] = useState(false)

  const fetchData = async () => {
    if (!dataset || !region || parameters.length === 0) {
      console.log("[v0] Missing required parameters for data fetch")
      return
    }

    setIsLoading(true)
    console.log("[v0] Fetching ARGO data with params:", { dataset, region, startDate, endDate, parameters })

    try {
      // Import the API functions dynamically to avoid issues
      const { fetchArgoData } = await import("@/lib/argo-api")

      const queryParams: ArgoQueryParams = {
        region: region as any,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        parameter: parameters,
        dataset: dataset as any,
      }

      const result = await fetchArgoData(queryParams)
      setFloats(result.floats)
      setProfiles(result.profiles)

      console.log("[v0] Data fetched successfully:", result)
    } catch (error) {
      console.error("[v0] Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ArgoContext.Provider
      value={{
        dataset,
        region,
        startDate,
        endDate,
        parameters,
        floats,
        profiles,
        isLoading,
        setDataset,
        setRegion,
        setStartDate,
        setEndDate,
        setParameters,
        fetchData,
        showMap,
        setShowMap,
      }}
    >
      {children}
    </ArgoContext.Provider>
  )
}

export function useArgo() {
  const context = useContext(ArgoContext)
  if (context === undefined) {
    throw new Error("useArgo must be used within an ArgoProvider")
  }
  return context
}
