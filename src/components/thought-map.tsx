"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"
import { Button } from "@/components/ui/button"

const ThoughtMap = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const centralNodeRef = useRef<HTMLDivElement>(null)
  const bubblesRef = useRef<(HTMLButtonElement | null)[]>([])
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  const thoughtBubbles = [
    { id: "who-i-am", label: "Who I Am", icon: "🧍", position: { x: -300, y: -150 } },
    { id: "projects", label: "Projects", icon: "💡", position: { x: 300, y: -100 } },
    { id: "mission", label: "My Mission", icon: "🎯", position: { x: -250, y: 200 } },
    { id: "who-i-help", label: "Who I Help", icon: "🧑‍🤝‍🧑", position: { x: 350, y: 180 } },
    { id: "how-i-think", label: "How I Think", icon: "🧠", position: { x: 0, y: 300 } },
  ]

  useEffect(() => {
      if (!isClient) return;

    const ctx = gsap.context(() => {
      // Animate central node entrance
      gsap.fromTo(
        centralNodeRef.current,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 1.5, ease: "back.out(1.7)", delay: 0.5 },
      )

      // Animate thought bubbles with staggered entrance
      gsap.fromTo(
        bubblesRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "back.out(1.7)",
          stagger: 0.2,
          delay: 1,
        },
      )

      // Add floating animation to bubbles
      bubblesRef.current.forEach((bubble, index) => {
        if (bubble) {
          gsap.to(bubble, {
            y: "+=20",
            duration: 2 + index * 0.3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          })
        }
      })

      // Draw connecting lines
      const lines = mapRef.current?.querySelectorAll(".connection-line")
      if (lines) {
        gsap.registerPlugin(DrawSVGPlugin);
        gsap.fromTo(lines, { drawSVG: "0%" }, { drawSVG: "100%", duration: 2, ease: "power2.out", delay: 1.5 })
      }
    }, mapRef)

    return () => ctx.revert()
  }, [isClient])

  const handleBubbleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div ref={mapRef} className="relative w-full h-screen flex items-center justify-center">
      {/* Background sketch texture */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="sketch" patternUnits="userSpaceOnUse" width="100" height="100">
              <path
                d="M-10-10, 110 110 M-10 110, 110 -10"
                fill="none"
                stroke="hsl(var(--foreground))"
                strokeWidth="0.2"
                opacity="0.2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sketch)" />
        </svg>
      </div>

      {/* Connection Lines SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {isClient && thoughtBubbles.map((bubble, index) => (
          <path
            key={`line-${index}`}
            className="connection-line"
            d={`M ${window.innerWidth / 2} ${window.innerHeight / 2} C ${
              window.innerWidth / 2 + bubble.position.x / 2
            } ${window.innerHeight / 2}, ${
              window.innerWidth / 2 + bubble.position.x / 2
            } ${window.innerHeight / 2 + bubble.position.y}, ${
              window.innerWidth / 2 + bubble.position.x
            } ${window.innerHeight / 2 + bubble.position.y}`}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeDasharray="2,4"
            opacity="0.4"
          />
        ))}
      </svg>

      {/* Central Identity Node */}
      <div
        ref={centralNodeRef}
        className="relative z-10 bg-secondary border-2 border-foreground rounded-full p-8 max-w-md text-center shadow-lg transform hover:scale-105 transition-transform duration-300"
      >
        <h1 className="font-heading text-4xl font-bold text-foreground mb-4">SNiFF</h1>
        <p className="font-body text-lg text-foreground leading-relaxed">
          Developer. Educator. Builder of calm tools for chaotic minds.
        </p>
        <div className="mt-4 flex justify-center space-x-2">
          <span className="text-2xl">🧠</span>
          <span className="text-2xl">💻</span>
          <span className="text-2xl">🌱</span>
        </div>
      </div>

      {/* Thought Bubbles */}
      {thoughtBubbles.map((bubble, index) => (
        <Button
          key={bubble.id}
          ref={(el) => {
            bubblesRef.current[index] = el
          }}
          onClick={() => handleBubbleClick(bubble.id)}
          className="absolute z-10 bg-primary hover:bg-primary/80 border-2 border-foreground rounded-full p-6 text-center shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer group h-auto"
          style={{
            left: `calc(50% + ${bubble.position.x}px)`,
            top: `calc(50% + ${bubble.position.y}px)`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="flex flex-col items-center">
            <div className="text-3xl mb-2 group-hover:animate-bounce">{bubble.icon}</div>
            <div className="font-body text-sm font-semibold text-primary-foreground whitespace-nowrap">{bubble.label}</div>
          </div>
        </Button>
      ))}
    </div>
  )
}

export default ThoughtMap
