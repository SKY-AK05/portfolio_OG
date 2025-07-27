"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"

const ThoughtMap = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const centralNodeRef = useRef<HTMLDivElement>(null)
  const bubblesRef = useRef<(HTMLButtonElement | null)[]>([])

  const thoughtBubbles = [
    { id: "who-i-am", label: "Who I Am", icon: "🧍", position: { x: -300, y: -150 } },
    { id: "projects", label: "Projects", icon: "💡", position: { x: 300, y: -100 } },
    { id: "mission", label: "My Mission", icon: "🎯", position: { x: -250, y: 200 } },
    { id: "who-i-help", label: "Who I Help", icon: "🧑‍🤝‍🧑", position: { x: 350, y: 180 } },
    { id: "how-i-think", label: "How I Think", icon: "🧠", position: { x: 0, y: 300 } },
  ]

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        centralNodeRef.current,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 1.5, ease: "back.out(1.7)", delay: 0.5 },
      )

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

      const lines = mapRef.current?.querySelectorAll(".connection-line")
      if (lines) {
        gsap.fromTo(lines, { drawSVG: "0%" }, { drawSVG: "100%", duration: 2, ease: "power2.out", delay: 1.5 })
      }
    }, mapRef)

    return () => ctx.revert()
  }, [])

  const handleBubbleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const getCenterX = () => typeof window !== "undefined" ? window.innerWidth / 2 : 400;
  const getCenterY = () => typeof window !== "undefined" ? window.innerHeight / 2 : 300;


  return (
    <div ref={mapRef} className="relative w-full h-screen flex items-center justify-center">
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="sketch" patternUnits="userSpaceOnUse" width="100" height="100">
              <path
                d="M10,10 Q50,5 90,10 Q95,50 90,90 Q50,95 10,90 Q5,50 10,10"
                fill="none"
                stroke="hsl(var(--foreground))"
                strokeWidth="0.5"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sketch)" />
        </svg>
      </div>

      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {thoughtBubbles.map((bubble, index) => (
          <path
            key={`line-${index}`}
            className="connection-line"
            d={`M ${getCenterX()} ${getCenterY()} Q ${
              getCenterX() + bubble.position.x / 2
            } ${getCenterY() + bubble.position.y / 2} ${
              getCenterX() + bubble.position.x
            } ${getCenterY() + bubble.position.y}`}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeDasharray="5,5"
            opacity="0.6"
          />
        ))}
      </svg>

      <div
        ref={centralNodeRef}
        className="relative z-10 bg-card border-4 border-foreground rounded-full p-8 max-w-md text-center shadow-lg transform hover:scale-105 transition-transform duration-300"
        style={{
          borderStyle: "dashed",
          filter: "drop-shadow(3px 3px 6px rgba(0,0,0,0.1))",
        }}
      >
        <h1 className="text-4xl font-bold text-foreground mb-4">SNiFF</h1>
        <p className="font-body text-lg text-foreground leading-relaxed">
          Developer. Educator. Builder of calm tools for chaotic minds.
        </p>
        <div className="mt-4 flex justify-center space-x-2">
          <span className="text-2xl">🧠</span>
          <span className="text-2xl">💻</span>
          <span className="text-2xl">🌱</span>
        </div>
      </div>

      {thoughtBubbles.map((bubble, index) => (
        <Button
          key={bubble.id}
          ref={(el) => {
            bubblesRef.current[index] = el
          }}
          onClick={() => handleBubbleClick(bubble.id)}
          className="absolute z-10 bg-primary hover:bg-primary/80 border-2 border-foreground rounded-full p-6 text-center shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer group"
          style={{
            left: `calc(50% + ${bubble.position.x}px)`,
            top: `calc(50% + ${bubble.position.y}px)`,
            transform: "translate(-50%, -50%)",
            filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.1))",
          }}
        >
          <div className="text-3xl mb-2 group-hover:animate-bounce">{bubble.icon}</div>
          <div className="font-body text-sm font-semibold text-primary-foreground whitespace-nowrap">{bubble.label}</div>
        </Button>
      ))}

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default ThoughtMap
