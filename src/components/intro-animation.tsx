"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const introRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  const calculateHeroPosition = () => {
    // Find the target "Hey" span in the Hero component
    const heroHey = document.querySelector('[data-hey-target]') as HTMLElement
    if (heroHey && textRef.current) {
      const rect = heroHey.getBoundingClientRect()
      // Calculate the scale factor based on width difference
      const scale = rect.width / textRef.current.offsetWidth
      return {
        left: rect.left,
        top: rect.top,
        scale: scale
      }
    }
    // Fallback position if the target element isn't found yet
    return { left: '50%', top: '50%', scale: 1 }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(introRef.current, { opacity: 1 });

      const text = "Hey"
      let currentIndex = 0
      
      const typeInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(prev => text.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(typeInterval)
          setIsTyping(false)
          
          // Pause for a moment after typing
          setTimeout(() => {
            const finalPos = calculateHeroPosition()
            
            // Animate the intro "Hey" to its final position and scale
            gsap.to(textRef.current, {
              position: 'fixed',
              left: finalPos.left,
              top: finalPos.top,
              scale: finalPos.scale,
              xPercent: 0,
              yPercent: 0,
              duration: 1.5,
              ease: "power2.inOut",
              onComplete: () => {
                // Signal to the Hero component that the intro has landed
                document.dispatchEvent(new Event('introLanded'))
                
                // Fade out the intro container, leaving the hero visible
                gsap.to(introRef.current, {
                  opacity: 0,
                  duration: 0.5,
                  onComplete: () => {
                    onComplete()
                  }
                })
              }
            })
          }, 1000) // 1-second pause
        }
      }, 150) // Typing speed

      return () => clearInterval(typeInterval)
    }, introRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div 
      ref={introRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
    >
      <div ref={textRef} className="text-center" style={{ transform: 'translate(-50%, -50%)', position: 'absolute', top: '50%', left: '50%' }}>
        <h1 className="font-heading text-8xl md:text-9xl font-bold text-primary whitespace-nowrap">
          {displayText}
          {isTyping && (
            <span className="inline-block w-1.5 h-16 md:h-20 bg-foreground ml-2 animate-pulse"></span>
          )}
        </h1>
      </div>
    </div>
  )
}

export default IntroAnimation
