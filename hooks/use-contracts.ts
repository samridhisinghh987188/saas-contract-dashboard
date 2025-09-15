"use client"

import { useState, useEffect } from "react"

export interface Contract {
  id: string
  name: string
  parties: string
  expiry: string
  status: "Active" | "Expired" | "Renewal Due"
  risk: "Low" | "Medium" | "High"
}

export function useContracts() {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/contracts")
        if (!response.ok) {
          throw new Error("Failed to fetch contracts")
        }
        const data = await response.json()
        setContracts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchContracts()
  }, [])

  return { contracts, isLoading, error }
}
