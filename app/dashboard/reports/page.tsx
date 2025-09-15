"use client"

import { DashboardLayout } from "@/components/dashboard-layout"

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground">Generate and view contract reports</p>
        </div>
        <div className="bg-card p-8 rounded-lg border text-center">
          <h3 className="text-lg font-semibold mb-2">Report Generation</h3>
          <p className="text-muted-foreground">Feature coming soon...</p>
        </div>
      </div>
    </DashboardLayout>
  )
}
