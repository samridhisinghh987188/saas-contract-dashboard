"use client"

import { useParams, useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useContractDetail } from "@/hooks/use-contract-detail"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { EvidenceDrawer } from "@/components/evidence-drawer"
import { ArrowLeft, Calendar, Users, AlertTriangle, CheckCircle, XCircle, Loader2 } from "lucide-react"

export default function ContractDetailPage() {
  const params = useParams()
  const router = useRouter()
  const contractId = params.id as string
  const { contract, isLoading, error } = useContractDetail(contractId)

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case "High":
        return "destructive"
      case "Medium":
        return "secondary"
      case "Low":
        return "default"
      default:
        return "default"
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "default"
      case "Expired":
        return "destructive"
      case "Renewal Due":
        return "secondary"
      default:
        return "default"
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "High":
        return <XCircle className="h-4 w-4 text-destructive" />
      case "Medium":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "Low":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    )
  }

  if (error || !contract) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-destructive mb-2">Error loading contract</p>
          <p className="text-sm text-muted-foreground mb-4">{error || "Contract not found"}</p>
          <Button onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{contract.name}</h1>
              <p className="text-muted-foreground">{contract.parties}</p>
            </div>
          </div>
          <EvidenceDrawer evidence={contract.evidence} />
        </div>

        {/* Contract Metadata */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Start Date</p>
                  <p className="text-2xl font-bold">{new Date(contract.start).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Expiry Date</p>
                  <p className="text-2xl font-bold">{new Date(contract.expiry).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <Badge variant={getStatusBadgeVariant(contract.status)} className="mt-1">
                    {contract.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                {getRiskIcon(contract.risk)}
                <div>
                  <p className="text-sm font-medium">Risk Score</p>
                  <Badge variant={getRiskBadgeVariant(contract.risk)} className="mt-1">
                    {contract.risk}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Clauses Section */}
          <Card>
            <CardHeader>
              <CardTitle>Contract Clauses</CardTitle>
              <CardDescription>Key clauses identified in the contract with confidence scores</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {contract.clauses.map((clause, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{clause.title}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">Confidence</span>
                      <Progress value={clause.confidence * 100} className="w-16 h-2" />
                      <span className="text-xs font-medium">{Math.round(clause.confidence * 100)}%</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{clause.summary}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Insights Section */}
          <Card>
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
              <CardDescription>Risk analysis and recommendations based on contract content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {contract.insights.map((insight, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start space-x-3">
                    {getRiskIcon(insight.risk)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant={getRiskBadgeVariant(insight.risk)} className="text-xs">
                          {insight.risk} Risk
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{insight.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
