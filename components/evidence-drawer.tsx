"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Star } from "lucide-react"
import type { ContractEvidence } from "@/hooks/use-contract-detail"

interface EvidenceDrawerProps {
  evidence: ContractEvidence[]
}

export function EvidenceDrawer({ evidence }: EvidenceDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getRelevanceColor = (relevance: number) => {
    if (relevance >= 0.9) return "text-green-600"
    if (relevance >= 0.8) return "text-yellow-600"
    return "text-gray-600"
  }

  const getRelevanceStars = (relevance: number) => {
    const stars = Math.round(relevance * 5)
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-3 w-3 ${i < stars ? "fill-current text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          View Evidence ({evidence.length})
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Contract Evidence</SheetTitle>
          <SheetDescription>Retrieved snippets and their relevance scores from the contract document.</SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {evidence.map((item, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {item.source}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    {getRelevanceStars(item.relevance)}
                    <span className={`text-xs font-medium ml-1 ${getRelevanceColor(item.relevance)}`}>
                      {Math.round(item.relevance * 100)}%
                    </span>
                  </div>
                </div>
                <blockquote className="text-sm text-muted-foreground italic border-l-2 border-muted pl-3">
                  "{item.snippet}"
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
