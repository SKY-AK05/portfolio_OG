"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import TypingEffect from './typing-effect'

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const heyRef = useRef<HTMLSpanElement>(null)
  const restOfTitleRef = useRef<HTMLSpanElement>(null)
  const fadeInsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const animateRestOfContent = () => {
        // Ensure the "Hey" is visible and in place
        gsap.set(heyRef.current, { opacity: 1 })
        
        // Animate the rest of the title and the fade-in elements
        gsap.fromTo(restOfTitleRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5, delay: 0.2, ease: "power2.out" }
        )

        const fadeElements = fadeInsRef.current?.querySelectorAll('[data-fade-in]')
        fadeElements?.forEach((el, index) => {
          gsap.fromTo(el,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: 0.8 + index * 0.2, // Staggered delay
              ease: "power2.out"
            }
          )
        })
      }

      // Listen for the custom event dispatched by the intro animation
      document.addEventListener('introLanded', animateRestOfContent)

      return () => {
        document.removeEventListener('introLanded', animateRestOfContent)
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={heroRef} className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Left Column */}
        <div className="md:col-span-4 space-y-8">
          <h1 className="font-heading text-6xl md:text-7xl font-bold leading-tight">
            <span ref={heyRef} data-hey-target className="text-primary inline-block opacity-0">Hey</span>
            <span ref={restOfTitleRef} className="inline-block opacity-0">
              <span> There,</span>
              <br />
              <span>I'm Aakash</span>
            </span>
          </h1>
          <div ref={fadeInsRef}>
            <a href="mailto:aakash@example.com" className="text-primary font-body font-semibold hover:underline opacity-0" data-fade-in>
              aakash@example.com
            </a>
            <div className="opacity-0" data-fade-in>
              <p className="text-4xl font-heading font-bold">10</p>
              <p className="font-body text-sm text-muted-foreground">YEARS EXPERIENCE</p>
            </div>
          </div>
        </div>

        {/* Center Column (Image) */}
        <div className="md:col-span-4 relative flex justify-center items-center h-[600px]">
          <div className="absolute inset-0 flex justify-center items-center">
            <svg
              className="w-full h-full text-teal-500"
              viewBox="0 0 500 500"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: 'rotate(-15deg) scale(1.2)'}}
            >
              <path
                d="M100,250 C125,150 200,100 250,150 S375,250 400,250 C375,350 300,400 250,350 S125,350 100,250 Z"
                fill="currentColor"
                opacity="0.2"
              />
              <path
                d="M120,250 C145,160 210,120 260,160 S365,260 390,260 C365,360 310,410 260,360 S145,360 120,250 Z"
                fill="hsl(var(--primary))"
                opacity="0.3"
              />
            </svg>
          </div>
          <img
            src="/svgs/me.svg"
            alt="Aakash - a placeholder image"
            className="relative z-10 w-[400px] h-[600px] object-contain"
          />
        </div>

        {/* Right Column */}
        <div className="md:col-span-4">
          <div className="bg-secondary p-6 rounded-lg shadow-lg">
            <p className="font-body text-lg">
              <TypingEffect text="Developer and systems thinker building AI tools, simplifying workflows, mentoring minds, and solving real-world problems with clarity, logic, and purpose." />
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Hero
