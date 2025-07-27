"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Draggable } from "gsap/Draggable"
import { Flip } from "gsap/Flip"
import Hero from "@/components/hero"
import Footer from "@/components/footer"
import AccessibilityControls from "@/components/accessibility-controls"
import Header from "@/components/header"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Draggable, Flip)
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize smooth scrolling and page entrance
    gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5, ease: "power2.out" })
  }, [])

  return (
      <div ref={containerRef} className="min-h-screen bg-background overflow-hidden flex flex-col">
        <AccessibilityControls />
        <Header />

        {/* Hero Section */}
        <main id="hero" className="flex-grow flex items-center justify-center relative">
          <Hero />
        </main>

        {/* Footer */}
        <Footer />
      </div>
  )
}
