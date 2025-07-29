"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import TypingEffect from './typing-effect'

const Hero = ({ animate }: { animate: boolean }) => {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const fadeInsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!animate) return;

    const ctx = gsap.context(() => {
        
      // Use a timeline for better sequencing
      const tl = gsap.timeline({delay: 0.5});

      // Animate the title
      tl.fromTo(titleRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      );

      // Animate the fade-in elements
      const fadeElements = fadeInsRef.current?.querySelectorAll('[data-fade-in]');
      if (fadeElements) {
        tl.fromTo(fadeElements,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.2, // Stagger fade-ins
            ease: "power2.out"
          },
          "-=0.2" // Start this animation slightly before the previous one ends
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, [animate]);

  return (
    <div ref={heroRef} className="px-4 py-8 relative">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Left Column */}
        <div className="md:col-span-4 space-y-8 ml-8">
          <h1 ref={titleRef} className="font-heading text-6xl md:text-7xl font-bold leading-tight">
            <span className="block text-primary">Hey</span>
            <span className="block">There,</span>
            <span className="block">I'm</span>
            <span className="block">Aakash</span>
          </h1>
          <div ref={fadeInsRef}>
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
