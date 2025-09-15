"use client"

import { useState, useEffect } from "react"

export interface ContractClause {
  title: string
  summary: string
  confidence: number
}

export interface ContractInsight {
  risk: "Low" | "Medium" | "High"
  message: string
}

export interface ContractEvidence {
  source: string
  snippet: string
  relevance: number
}

export interface ContractDetail {
  id: string
  name: string
  parties: string
  start: string
  expiry: string
  status: "Active" | "Expired" | "Renewal Due"
  risk: "Low" | "Medium" | "High"
  clauses: ContractClause[]
  insights: ContractInsight[]
  evidence: ContractEvidence[]
}

export function useContractDetail(contractId: string) {
  const [contract, setContract] = useState<ContractDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchContractDetail = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/contracts/${contractId}`)
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Contract not found")
          }
          throw new Error("Failed to fetch contract details")
        }
        const data = await response.json()
        setContract(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    if (contractId) {
      fetchContractDetail()
    }
  }, [contractId])

  return { contract, isLoading, error }
}
