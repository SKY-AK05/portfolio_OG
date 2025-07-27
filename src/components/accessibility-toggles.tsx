"use client"

import { Accessibility, Contrast, CaseSensitive } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Card, CardContent } from "./ui/card"

export function AccessibilityToggles() {
  return (
    <TooltipProvider>
      <Card className="bg-card/80 backdrop-blur-sm p-0 border-border/50">
        <CardContent className="p-1">
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Accessibility className="h-4 w-4" />
                  <span className="sr-only">Toggle Motion</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle Motion</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Contrast className="h-4 w-4" />
                  <span className="sr-only">High Contrast Mode</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>High Contrast Mode</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <CaseSensitive className="h-4 w-4" />
                  <span className="sr-only">Dyslexia-friendly Font</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Dyslexia-friendly Font</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}
