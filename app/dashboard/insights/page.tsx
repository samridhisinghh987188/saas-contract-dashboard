"use client"

import { DashboardLayout } from "@/components/dashboard-layout"

export default function InsightsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Contract Insights</h1>
          <p className="text-muted-foreground">AI-powered analysis and recommendations</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2">Risk Analysis</h3>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2">Compliance Tracking</h3>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2">Performance Metrics</h3>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
