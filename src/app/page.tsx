"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Draggable } from "gsap/Draggable"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"
import { Flip } from "gsap/Flip"
import ThoughtMap from "@/components/thought-map"
import WhoIAm from "@/components/who-i-am"
import Projects from "@/components/projects"
import Mission from "@/components/mission"
import WhoIHelp from "@/components/who-i-help"
import HowIThink from "@/components/how-i-think"
import Footer from "@/components/footer"
import AccessibilityControls from "@/components/accessibility-controls"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Draggable, DrawSVGPlugin, Flip)
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize smooth scrolling and page entrance
    gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5, ease: "power2.out" })
  }, [])

  return (
      <div ref={containerRef} className="min-h-screen bg-background overflow-x-hidden">
        <AccessibilityControls />

        {/* Central Thought Map Hub */}
        <section className="min-h-screen flex items-center justify-center relative">
          <ThoughtMap />
        </section>

        {/* Who I Am Section */}
        <section id="who-i-am" className="min-h-screen py-20">
          <WhoIAm />
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen py-20">
          <Projects />
        </section>

        {/* Mission Section */}
        <section id="mission" className="min-h-screen py-20">
          <Mission />
        </section>

        {/* Who I Help Section */}
        <section id="who-i-help" className="min-h-screen py-20">
          <WhoIHelp />
        </section>

        {/* How I Think Section */}
        <section id="how-i-think" className="min-h-screen py-20">
          <HowIThink />
        </section>

        {/* Footer */}
        <Footer />
      </div>
  )
}
