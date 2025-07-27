"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const WhoIAm = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const tagsRef = useRef<HTMLDivElement>(null)

  const traits = [
    "Systems Thinker",
    "Psychology",
    "Influence & Communication",
    "Emotional Intelligence",
    "Builder",
    "Mentor",
    "Developer",
    "Resourceful",
  ]

  const timelineEvents = [
    {
      title: "Student Life",
      icon: "🎓",
      description: "Started my journey in Computer Science. Learned basics of logic, programming, and problem-solving.",
    },
    {
      title: "Degree Completed",
      icon: "📜",
      description: "Graduated with B.Sc in Computer Science.",
    },
    {
      title: "Internship – Data Annotation",
      icon: "🏷️",
      description: "Worked at Orchavte learning image and text labeling. Built strong foundations in annotation tools and workflows.",
    },
    {
      title: "Supervisor – Orchavte",
      icon: "🧑‍🏫",
      description: "Guided neurodivergent students, created accessible learning experiences, led reviews and standups.",
    },
    {
      title: "Mentor – Inclusive Tech",
      icon: "🌈",
      description: "Mentored new learners, helped build skill confidence, and built training systems.",
    },
    {
      title: "Product Builder – PromptWeaver & Beyond",
      icon: "⚒️",
      description: "Launched PromptWeaver, started building AI-first tools. Now exploring productivity, healthcare, and automation projects.",
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section entrance
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

      // Animate timeline items
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
            stagger: 0.3,
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 70%",
              end: "bottom 30%",
              toggleActions: "play none none reverse",
              scrub: 1,
            },
          },
        )
      }

      // Animate trait tags
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
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-6xl font-bold text-foreground mb-6">Who I Am</h2>
          <div className="w-32 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Avatar and Description */}
          <div className="space-y-8">
            <div className="relative">
              <div className="w-64 h-64 mx-auto bg-secondary border-2 border-foreground rounded-full flex items-center justify-center shadow-lg">
                <span className="text-8xl">👨‍💻</span>
              </div>
            </div>

            <div className="text-center space-y-4">
              <p className="font-body text-xl text-foreground leading-relaxed">
                I am Aakash — a curious, driven individual who believes in building, thinking, and helping others level up alongside me. My story is rooted in consistency, reflection, and resourcefulness.
              </p>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                As a developer, I soon realized code is just a language. What really matters is thought. Whether I’m working with React, Tailwind, Supabase, or Python, the core idea remains: can I solve a problem with clarity?
              </p>
            </div>

            {/* Trait Tags */}
            <div ref={tagsRef} className="flex flex-wrap gap-3 justify-center">
              {traits.map((trait) => (
                <span
                  key={trait}
                  className="trait-tag bg-muted text-foreground px-4 py-2 rounded-full border border-foreground/20 font-body text-sm hover:bg-primary/20 transition-colors duration-300 cursor-default"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div ref={timelineRef} className="space-y-8">
            <h3 className="font-heading text-3xl font-bold text-foreground text-center mb-8">My Journey</h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30" />

              {timelineEvents.map((event, index) => (
                <div key={index} className="timeline-item relative flex items-start space-x-6 pb-8">
                  {/* Timeline dot */}
                  <div className="w-16 h-16 bg-secondary border-2 border-foreground rounded-full flex items-center justify-center z-10 flex-shrink-0">
                    <span className="text-2xl">{event.icon}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-background border-2 border-foreground/20 rounded-lg p-6 shadow-md">
                    <div className="font-heading text-2xl font-bold text-primary mb-2">{event.title}</div>
                    <p className="font-body text-lg text-foreground leading-relaxed">{event.description}</p>
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
