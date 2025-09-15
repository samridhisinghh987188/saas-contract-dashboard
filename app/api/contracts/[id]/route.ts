import { NextResponse } from "next/server"

// Mock contract details data
const contractDetails: Record<string, any> = {
  c1: {
    id: "c1",
    name: "MSA 2025",
    parties: "Microsoft & ABC Corp",
    start: "2023-01-01",
    expiry: "2025-12-31",
    status: "Active",
    risk: "Medium",
    clauses: [
      { title: "Termination", summary: "90 days notice period.", confidence: 0.82 },
      { title: "Liability Cap", summary: "12 months' fees limit.", confidence: 0.87 },
      { title: "Data Protection", summary: "GDPR compliance required.", confidence: 0.91 },
    ],
    insights: [
      { risk: "High", message: "Liability cap excludes data breach costs." },
      { risk: "Medium", message: "Renewal auto-renews unless cancelled 60 days before expiry." },
    ],
    evidence: [
      { source: "Section 12.2", snippet: "Total liability limited to 12 months' fees.", relevance: 0.91 },
      { source: "Section 8.1", snippet: "Either party may terminate with 90 days written notice.", relevance: 0.85 },
    ],
  },
  c2: {
    id: "c2",
    name: "Network Services Agreement",
    parties: "TelNet & ABC Corp",
    start: "2022-10-10",
    expiry: "2025-10-10",
    status: "Renewal Due",
    risk: "High",
    clauses: [
      { title: "Service Level Agreement", summary: "99.9% uptime guarantee.", confidence: 0.95 },
      { title: "Penalty Clause", summary: "Service credits for downtime.", confidence: 0.88 },
    ],
    insights: [
      { risk: "High", message: "No force majeure clause for network outages." },
      { risk: "High", message: "Automatic renewal without price protection." },
    ],
    evidence: [
      { source: "Section 3.1", snippet: "Provider guarantees 99.9% network availability.", relevance: 0.93 },
      {
        source: "Section 15.0",
        snippet: "Agreement renews automatically for successive 3-year terms.",
        relevance: 0.89,
      },
    ],
  },
  c3: {
    id: "c3",
    name: "Software License Agreement",
    parties: "Adobe & ABC Corp",
    start: "2021-06-15",
    expiry: "2024-06-15",
    status: "Expired",
    risk: "Low",
    clauses: [
      { title: "License Grant", summary: "Non-exclusive software license.", confidence: 0.94 },
      { title: "Usage Restrictions", summary: "Limited to 100 users maximum.", confidence: 0.89 },
    ],
    insights: [
      { risk: "Low", message: "Standard software license terms with minimal risk." },
      { risk: "Medium", message: "Contract has expired and needs renewal." },
    ],
    evidence: [
      { source: "Section 2.1", snippet: "Adobe grants a non-exclusive license to use the software.", relevance: 0.88 },
      { source: "Section 3.2", snippet: "Usage limited to maximum of 100 concurrent users.", relevance: 0.82 },
    ],
  },
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const contractId = params.id

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const contract = contractDetails[contractId]

  if (!contract) {
    return NextResponse.json({ error: "Contract not found" }, { status: 404 })
  }

  return NextResponse.json(contract)
}
