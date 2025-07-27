"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const WhoIAm = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const tagsRef = useRef<HTMLDivElement>(null)

  const traits = [
    "neurodivergent",
    "systems thinker",
    "ADHD-friendly",
    "builder of calm",
    "digital empathy",
    "pattern seeker",
    "quiet revolutionary",
    "accessibility advocate",
  ]

  const timelineEvents = [
    { year: "2018", event: "Started coding to solve my own chaos", icon: "💡" },
    { year: "2020", event: "Discovered the power of inclusive design", icon: "🌈" },
    { year: "2022", event: "Built first neurodivergent-friendly tool", icon: "🧠" },
    { year: "2024", event: "Mentoring others who think differently", icon: "🤝" },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      const timelineItems = timelineRef.current?.querySelectorAll(".timeline-item")
      if (timelineItems) {
        gsap.fromTo(
          timelineItems,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 70%",
              end: "bottom 30%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }

      const tags = tagsRef.current?.querySelectorAll(".trait-tag")
      if (tags) {
        gsap.fromTo(
          tags,
          { scale: 0, rotation: -10 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
            stagger: 0.1,
            scrollTrigger: {
              trigger: tagsRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="container mx-auto px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold text-foreground mb-6">Who I Am</h2>
          <div className="w-32 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="relative">
              <div className="w-64 h-64 mx-auto bg-card border-4 border-foreground rounded-full relative overflow-hidden">
                <div className="absolute inset-4 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-6xl">👨‍💻</span>
                </div>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-background border-2 border-foreground rounded-full flex items-center justify-center">
                  <span className="text-xl">☕</span>
                </div>
                <div className="absolute -bottom-2 -left-6 w-10 h-10 bg-background border-2 border-foreground rounded-full flex items-center justify-center">
                  <span className="text-lg">🎧</span>
                </div>
                <div className="absolute top-1/2 -right-8 w-8 h-8 bg-background border-2 border-foreground rounded-full flex items-center justify-center">
                  <span className="text-sm">{"</>"}</span>
                </div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <p className="font-body text-xl text-foreground leading-relaxed">
                I'm a developer who thinks in systems and feels in code. My brain works differently, and I've learned
                that's not a bug—it's a feature that helps me build tools that actually make sense for people like me.
              </p>
              <p className="font-body text-lg text-foreground/80 leading-relaxed">
                When I'm not coding, I'm probably reorganizing my task management system for the hundredth time or
                helping someone else navigate the beautiful chaos of neurodivergent productivity.
              </p>
            </div>

            <div ref={tagsRef} className="flex flex-wrap gap-3 justify-center">
              {traits.map((trait, index) => (
                <span
                  key={trait}
                  className="trait-tag bg-primary text-primary-foreground px-4 py-2 rounded-full border-2 border-foreground font-body text-sm hover:bg-card transition-colors duration-300 cursor-default"
                  style={{
                    transform: `rotate(${(index % 2 === 0 ? 1 : -1) * (Math.random() * 3 + 1)}deg)`,
                  }}
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>

          <div ref={timelineRef} className="space-y-8">
            <h3 className="text-3xl font-bold text-foreground text-center mb-8">My Journey</h3>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary" />

              {timelineEvents.map((event) => (
                <div key={event.year} className="timeline-item relative flex items-start space-x-6 pb-8">
                  <div className="w-16 h-16 bg-card border-4 border-foreground rounded-full flex items-center justify-center z-10 shrink-0">
                    <span className="text-2xl">{event.icon}</span>
                  </div>

                  <div className="flex-1 bg-background border-2 border-foreground rounded-lg p-6 shadow-lg">
                    <div className="text-2xl font-bold text-primary mb-2">{event.year}</div>
                    <p className="font-body text-lg text-foreground leading-relaxed">{event.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhoIAm
