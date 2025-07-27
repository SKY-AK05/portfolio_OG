"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const Mission = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const keywordsRef = useRef<HTMLDivElement>(null)

  const keywords = ["Clarity", "Skill", "Impact", "Growth", "Contribution", "Honesty", "Mentorship", "Thinking Patterns"]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section entrance
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Animate floating keywords
      const keywordElements = keywordsRef.current?.querySelectorAll(".keyword")
      if (keywordElements) {
        keywordElements.forEach((keyword, index) => {
          // Initial entrance
          gsap.fromTo(
            keyword,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 0.8,
              duration: 0.8,
              ease: "back.out(1.7)",
              delay: index * 0.1,
              scrollTrigger: {
                trigger: keywordsRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              },
            },
          )

          // Floating animation
          gsap.to(keyword, {
            x: `+=${Math.random() * 40 - 20}`,
            y: `+=${Math.random() * 40 - 20}`,
            rotation: `+=${Math.random() * 10 - 5}`,
            duration: 3 + Math.random() * 2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: Math.random() * 2,
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden bg-muted/50">
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Mission Statement */}
          <div className="bg-background border-2 border-foreground rounded-3xl p-12 shadow-2xl relative">
            <h2 className="font-heading text-6xl font-bold text-foreground mb-8">My Mission</h2>

            <blockquote className="font-body text-3xl text-foreground leading-relaxed mb-8 italic">
              "I don’t just want to build apps. I want to build understanding."
            </blockquote>

            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-8" />

            <p className="font-body text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              I’m not chasing a job or a title. I’m chasing clarity, skill, and impact. I want to leave behind tools that help people think better and systems that make life feel a little less chaotic.
            </p>
          </div>

          {/* Floating Keywords */}
          <div ref={keywordsRef} className="relative mt-16 h-64">
            {keywords.map((keyword, index) => (
              <div
                key={keyword}
                className="keyword absolute bg-primary text-primary-foreground px-4 py-2 rounded-full border-2 border-foreground font-body text-lg font-semibold cursor-default hover:bg-secondary transition-colors duration-300"
                style={{
                  left: `${15 + (index % 4) * 20}%`,
                  top: `${20 + Math.floor(index / 4) * 30}%`,
                }}
              >
                {keyword}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mission
