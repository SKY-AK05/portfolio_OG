"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"
import { Card, CardContent } from "@/components/ui/card"

const WhoIHelp = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const webRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  const helpCategories = [
    {
      id: "neurodivergent-learners",
      title: "Neurodivergent Learners",
      description: "Training students and providing both technical and emotional feedback.",
      icon: "🧠",
      color: "bg-primary/20",
      position: { x: -200, y: -100 },
    },
    {
      id: "teammates-and-clients",
      title: "Teammates & Clients",
      description: "Using psychology to understand not just users, but teammates and clients.",
      icon: "🌊",
      color: "bg-secondary",
      position: { x: 200, y: -80 },
    },
    {
      id: "fellow-developers",
      title: "Fellow Developers",
      description: "Guiding conversations to unlock truth and opportunity within teams.",
      icon: "🧑‍💻",
      color: "bg-background",
      position: { x: -150, y: 120 },
    },
    {
      id: "myself",
      title: "Myself",
      description: "Improving not just skills, but thinking patterns for life-long learning.",
      icon: "🌱",
      color: "bg-primary/20",
      position: { x: 180, y: 140 },
    },
  ]

  const testimonials = [
    {
      quote:
        "What makes Aakash effective isn’t just that he knows what to say — it’s that he knows when to listen, and how to reflect back what others need to hear.",
      author: "A Colleague",
      role: "Orchvate",
    },
    {
      quote:
        "He doesn’t sugarcoat. He doesn’t flatter. He clarifies and guides. He helps improve not just skills, but thinking patterns.",
      author: "A Mentee",
      role: "Trainee",
    },
    {
      quote: "If someone learns how to debug their logic — in code and in life — Aakash considers his job done. That's his impact.",
      author: "A Collaborator",
      role: "Project Partner",
    },
  ]

  useEffect(() => {
    if (!isClient) return;
    gsap.registerPlugin(DrawSVGPlugin);

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

      // Animate empathy web
      const webItems = webRef.current?.querySelectorAll(".web-item")
      if (webItems) {
        gsap.fromTo(
          webItems,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: 0.2,
            scrollTrigger: {
              trigger: webRef.current,
              start: "top 70%",
              end: "bottom 30%",
              toggleActions: "play none none reverse",
            },
          },
        )

        // Add floating animation
        webItems.forEach((item, index) => {
          gsap.to(item, {
            y: "+=15",
            duration: 2 + index * 0.3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          })
        })
      }

      // Animate testimonials
      const testimonialCards = testimonialsRef.current?.querySelectorAll(".testimonial-card")
      if (testimonialCards) {
        gsap.fromTo(
          testimonialCards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: testimonialsRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }

      // Draw connection lines
      const lines = webRef.current?.querySelectorAll(".connection-line")
      if (lines) {
        gsap.fromTo(
          lines,
          { drawSVG: "0%" },
          {
            drawSVG: "100%",
            duration: 2,
            ease: "power2.out",
            stagger: 0.3,
            scrollTrigger: {
              trigger: webRef.current,
              start: "top 60%",
              end: "bottom 40%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [isClient])

  return (
    <div ref={sectionRef} className="container mx-auto px-6 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-6xl font-bold text-foreground mb-6">Who I Help</h2>
          <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto">
            My work centers around people who think differently, feel deeply, and need technology that actually
            understands them.
          </p>
          <div className="w-32 h-1 bg-primary mx-auto rounded-full mt-6" />
        </div>

        {/* Empathy Web */}
        <div ref={webRef} className="relative h-96 mb-20">
          {/* Central hub */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="bg-foreground text-background rounded-full w-32 h-32 flex items-center justify-center border-4 border-foreground shadow-lg">
              <div className="text-center">
                <div className="text-2xl mb-1">🤝</div>
                <div className="font-body text-sm font-semibold">
                  Empathy
                  <br />
                  First
                </div>
              </div>
            </div>
          </div>

          {/* Connection lines SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {isClient && helpCategories.map((category, index) => (
              <path
                key={`line-${index}`}
                className="connection-line"
                d={`M ${window.innerWidth / 2} ${192} Q ${
                  window.innerWidth / 2 + category.position.x / 2
                } ${192 + category.position.y / 2} ${
                  window.innerWidth / 2 + category.position.x
                } ${192 + category.position.y}`}
                fill="none"
                stroke="hsl(var(--foreground))"
                strokeWidth="1.5"
                strokeDasharray="3,3"
                opacity="0.2"
              />
            ))}
          </svg>

          {/* Help category bubbles */}
          {helpCategories.map((category) => (
            <div
              key={category.id}
              className={`web-item absolute ${category.color} border-2 border-foreground rounded-2xl p-6 max-w-xs cursor-pointer hover:scale-105 transition-transform duration-300 group shadow-md`}
              style={{
                left: `calc(50% + ${category.position.x}px)`,
                top: `calc(50% + ${category.position.y}px)`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="text-3xl mb-3 group-hover:animate-bounce">{category.icon}</div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">{category.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{category.description}</p>
            </div>
          ))}
        </div>

        {/* Keywords */}
        <div className="text-center mb-16">
          <div className="flex flex-wrap justify-center gap-4">
            {["silent struggles", "non-performative help", "emotional clarity", "sustainable growth"].map((keyword) => (
              <span
                key={keyword}
                className="bg-muted text-foreground px-4 py-2 rounded-full border border-foreground/20 font-body text-sm italic"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div ref={testimonialsRef} className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="testimonial-card border-2 border-foreground/20 bg-background hover:bg-secondary transition-colors duration-300"
            >
              <CardContent className="p-6">
                <div className="text-4xl mb-4 opacity-30">"</div>
                <p className="font-body text-base text-foreground leading-relaxed mb-4 italic">
                  {testimonial.quote}
                </p>
                <div className="border-t-2 border-primary/50 pt-4">
                  <p className="font-heading text-lg font-bold text-foreground">{testimonial.author}</p>
                  <p className="font-body text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WhoIHelp
