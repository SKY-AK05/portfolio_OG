"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const introRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [isTyping, setIsTyping] = useState(true)
  const [displayText, setDisplayText] = useState("")
  const [showRestOfContent, setShowRestOfContent] = useState(false)

  const calculateHeroPosition = () => {
    // Calculate the position of the hero "Hey" text
    const heroHey = document.querySelector('[data-hey-target]') as HTMLElement
    if (heroHey) {
      const rect = heroHey.getBoundingClientRect()
      const scale = rect.width / (textRef.current?.offsetWidth || 1)
      return {
        left: rect.left + rect.width / 2,
        top: rect.top + rect.height / 2,
        scale: scale * 0.8 // Slightly smaller for better visual effect
      }
    }
    // Fallback position
    return { left: '12.5%', top: '20%', scale: 0.15 }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial fade in
      gsap.fromTo(
        introRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" }
      )

      // Typing animation - slower and longer
      const text = "Hey"
      let currentIndex = 0
      
      const typeInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(typeInterval)
          setIsTyping(false)
          
          // Wait longer before transition
          setTimeout(() => {
            // Ensure hero is rendered and positioned
            setTimeout(() => {
              // Calculate exact hero position
              const heroPos = calculateHeroPosition()
              
              // Animate to hero position instead of fading out
              gsap.to(introRef.current, {
                position: "absolute",
                top: heroPos.top,
                left: heroPos.left,
                transform: `translate(-50%, -50%) scale(${heroPos.scale})`,
                duration: 1.5,
                ease: "power2.inOut",
                onComplete: () => {
                  // After "Hey" is in position, show rest of content
                  setShowRestOfContent(true)
                  // Signal that intro is complete
                  document.body.setAttribute('data-intro-complete', 'true')
                  // Don't call onComplete immediately - let the rest of content animate first
                  setTimeout(() => {
                    onComplete()
                  }, 5000) // Give more time for all animations to complete
                }
              })
            }, 100) // Small delay to ensure hero is positioned
          }, 2000) // Increased wait time to 2 seconds
        }
      }, 300) // Slower typing speed

      return () => clearInterval(typeInterval)
    }, introRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div 
      ref={introRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div ref={textRef} className="text-center">
        <h1 className="font-heading text-8xl md:text-9xl font-bold text-foreground">
          {displayText}
          {isTyping && (
            <span className="inline-block w-2 h-16 bg-primary ml-2 animate-pulse"></span>
          )}
        </h1>
      </div>
    </div>
  )
}

export default IntroAnimation 