"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import TypingEffect from './typing-effect'

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const heyRef = useRef<HTMLSpanElement>(null)
  const restContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Start with "Hey" visible but the rest of the content hidden
      gsap.set(restContentRef.current, { opacity: 0 })

      // This function will be triggered when the intro completes
      const animateRestOfContent = () => {
        gsap.set(restContentRef.current, { opacity: 1 })
        
        // Animate " There, I'm Aakash" with typing effect
        const titleElements = heroRef.current?.querySelectorAll('[data-type-animation]')
        titleElements?.forEach((el, index) => {
          gsap.fromTo(el, 
            { opacity: 0, x: -20 },
            { 
              opacity: 1, 
              x: 0, 
              duration: 0.5, 
              delay: 0.2 + index * 0.3, // Small delay after "Hey" lands
              ease: "power2.out"
            }
          )
        })

        // Animate email and experience with a fade-in-up effect
        const otherElements = restContentRef.current?.querySelectorAll('[data-fade-in]')
        otherElements?.forEach((el, index) => {
          gsap.fromTo(el,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: 1.5 + index * 0.2, // Staggered delay
              ease: "power2.out"
            }
          )
        })
      }

      // Listen for the custom event dispatched by the intro animation
      document.addEventListener('introComplete', animateRestOfContent)

      return () => {
        document.removeEventListener('introComplete', animateRestOfContent)
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
            <span ref={heyRef} data-hey-target className="text-primary inline-block">Hey</span>
            <span ref={restContentRef} className="inline-block">
              <span data-type-animation className="inline-block"> There,</span>
              <br />
              <span data-type-animation className="inline-block">I'm Aakash</span>
            </span>
          </h1>
          <div className="opacity-0" ref={restContentRef}>
            <a href="mailto:aakash@example.com" className="text-primary font-body font-semibold hover:underline" data-fade-in>
              aakash@example.com
            </a>
            <div data-fade-in>
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
