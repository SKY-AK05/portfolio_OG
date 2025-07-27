"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Settings, Eye, Palette, Type, Zap } from "lucide-react"

const AccessibilityControls = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState({
    reducedMotion: false,
    highContrast: false,
    dyslexiaFont: false,
    focusMode: false,
  })

  useEffect(() => {
    // Load saved settings
    if (typeof window !== 'undefined') {
        const savedSettings = localStorage.getItem("accessibility-settings")
        if (savedSettings) {
          setSettings(JSON.parse(savedSettings))
        }
    }
  }, [])

  useEffect(() => {
    // Save settings and apply them
    if (typeof window !== 'undefined') {
        localStorage.setItem("accessibility-settings", JSON.stringify(settings))

        // Apply reduced motion
        if (settings.reducedMotion) {
          document.documentElement.style.setProperty("--animation-duration", "0s")
          document.body.classList.add("reduce-motion")
        } else {
          document.documentElement.style.removeProperty("--animation-duration")
          document.body.classList.remove("reduce-motion")
        }

        // Apply high contrast
        if (settings.highContrast) {
          document.body.classList.add("high-contrast")
        } else {
          document.body.classList.remove("high-contrast")
        }

        // Apply dyslexia font
        if (settings.dyslexiaFont) {
          document.body.classList.add("dyslexia-font")
        } else {
          document.body.classList.remove("dyslexia-font")
        }

        // Apply focus mode
        if (settings.focusMode) {
          document.body.classList.add("focus-mode")
        } else {
          document.body.classList.remove("focus-mode")
        }
    }
  }, [settings])

  const toggleSetting = (setting: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-foreground hover:bg-foreground/80 text-background rounded-full w-12 h-12 p-0 shadow-lg"
        aria-label="Accessibility Controls"
      >
        <Settings className="w-5 h-5" />
      </Button>

      {isOpen && (
        <Card className="absolute top-14 right-0 w-80 border-2 border-foreground bg-background shadow-xl">
          <CardContent className="p-6">
            <h3 className="font-caveat text-xl font-bold text-foreground mb-4">Accessibility Options</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-foreground" />
                  <span className="font-inter text-foreground">Reduce Motion</span>
                </div>
                <Button
                  variant={settings.reducedMotion ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleSetting("reducedMotion")}
                  className="font-inter"
                >
                  {settings.reducedMotion ? "On" : "Off"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-foreground" />
                  <span className="font-inter text-foreground">High Contrast</span>
                </div>
                <Button
                  variant={settings.highContrast ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleSetting("highContrast")}
                  className="font-inter"
                >
                  {settings.highContrast ? "On" : "Off"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Type className="w-4 h-4 text-foreground" />
                  <span className="font-inter text-foreground">Dyslexia Font</span>
                </div>
                <Button
                  variant={settings.dyslexiaFont ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleSetting("dyslexiaFont")}
                  className="font-inter"
                >
                  {settings.dyslexiaFont ? "On" : "Off"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Palette className="w-4 h-4 text-foreground" />
                  <span className="font-inter text-foreground">Focus Mode</span>
                </div>
                <Button
                  variant={settings.focusMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleSetting("focusMode")}
                  className="font-inter"
                >
                  {settings.focusMode ? "On" : "Off"}
                </Button>
              </div>
            </div>

            <p className="font-inter text-xs text-muted-foreground mt-4">
              These settings are saved locally and will persist across visits.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default AccessibilityControls
