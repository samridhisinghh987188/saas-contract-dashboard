"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import type { Contract } from "@/hooks/use-contracts"

interface ContractsContextType {
  contracts: Contract[]
  setContracts: (contracts: Contract[]) => void
  refreshContracts: () => Promise<void>
  isRefreshing: boolean
  searchTerm: string
  setSearchTerm: (term: string) => void
  statusFilter: string
  setStatusFilter: (status: string) => void
  riskFilter: string
  setRiskFilter: (risk: string) => void
  clearFilters: () => void
}

const ContractsContext = createContext<ContractsContextType | undefined>(undefined)

export function ContractsProvider({ children }: { children: React.ReactNode }) {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [riskFilter, setRiskFilter] = useState("all")

  const refreshContracts = useCallback(async () => {
    try {
      setIsRefreshing(true)
      const response = await fetch("/api/contracts")
      if (!response.ok) {
        throw new Error("Failed to fetch contracts")
      }
      const data = await response.json()
      setContracts(data)
    } catch (error) {
      console.error("Error refreshing contracts:", error)
    } finally {
      setIsRefreshing(false)
    }
  }, [])

  const clearFilters = useCallback(() => {
    setSearchTerm("")
    setStatusFilter("all")
    setRiskFilter("all")
  }, [])

  return (
    <ContractsContext.Provider
      value={{
        contracts,
        setContracts,
        refreshContracts,
        isRefreshing,
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        riskFilter,
        setRiskFilter,
        clearFilters,
      }}
    >
      {children}
    </ContractsContext.Provider>
  )
}

export function useContractsContext() {
  const context = useContext(ContractsContext)
  if (context === undefined) {
    throw new Error("useContractsContext must be used within a ContractsProvider")
  }
  return context
}
