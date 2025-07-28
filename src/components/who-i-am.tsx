"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Heart, Code, Target, Sparkles, Eye, Zap } from "lucide-react"

const WhoIAm = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const timelineEvents = [
    {
      date: "📍2019",
      title: "Entered BCA",
      description: "Took my first step into the world of tech. Didn't know what I was doing — just knew I wanted to understand how things work.",
    },
    {
      date: "📍2021",
      title: "First Real Project",
      description: "Built a small tool that solved a real problem. It wasn't perfect, but it gave me a glimpse into what it meant to build something end-to-end.",
    },
    {
      date: "📍2023",
      title: "Teaching Neurodivergent Students",
      description: "Realized that understanding tech is one thing, but making it accessible is another. Created inclusive, flexible learning environments that worked for people often left behind.",
    },
    {
      date: "📍2025",
      title: "Completed Bachelor's Degree (BCA)",
      description: "Formal learning ends. Real work begins. Started saying yes to real-world problems and building things with impact.",
    },
    {
      date: "📍2025",
      title: "Working at Orchavte",
      description: "Teaching neurodivergent students how to work in data annotation. Designing systems that are simple, inclusive, and remote-friendly. Helping others grow became part of how I grow.",
    },
    {
      date: "📍2025",
      title: "Building Real-World Apps",
      description: "Started building tools that blend AI, automation, and design. From PromptWeaver to Reva, I'm building apps that make thinking, working, and living better. Every project is a step toward freedom — for myself and the people I build for.",
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Auto-advance timeline
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % timelineEvents.length)
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval)
  }, [timelineEvents.length])

  return (
    <div ref={sectionRef} className="container mx-auto px-6 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Main Content - Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-10 mb-16">
          {/* Left Side - Timeline */}
          <div className="lg:w-1/2 relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-foreground/30"></div>
            
            <div className="relative h-80 overflow-hidden">
              {timelineEvents.map((event, index) => {
                const isCurrent = index === currentIndex
                const isNext = index === currentIndex + 1
                const isPrev = index === currentIndex - 1
                
                return (
                  <div 
                    key={index} 
                    className={`timeline-item absolute w-full transition-all duration-700 ease-in-out ${
                      isCurrent 
                        ? 'opacity-100 scale-100 z-20' 
                        : isNext 
                        ? 'opacity-70 scale-95 z-10 blur-[1px]' 
                        : isPrev 
                        ? 'opacity-50 scale-90 z-10 blur-[1px]' 
                        : 'opacity-0 scale-85 z-0'
                    }`}
                    style={{
                      top: isCurrent ? '50%' : isNext ? '75%' : isPrev ? '25%' : '100%',
                      transform: 'translateY(-50%)',
                    }}
                  >
                    {/* Timeline Dot */}
                    <div className={`absolute left-6 w-4 h-4 rounded-full border-2 border-foreground transform -translate-x-1/2 -translate-y-1/2 z-30 ${
                      isCurrent ? 'bg-primary scale-110' : 'bg-primary/50 scale-100'
                    }`}></div>
                    
                    {/* Content */}
                    <div className="ml-16 bg-background border border-foreground/20 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-body text-sm text-primary font-bold">
                          {event.date}
                        </span>
                        <h4 className="font-heading text-lg font-bold text-foreground">
                          {event.title}
                        </h4>
                      </div>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
            
            {/* Timeline Navigation Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {timelineEvents.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-primary scale-125' : 'bg-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Introduction */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <div className="text-center lg:text-left">
              <div className="w-32 h-32 rounded-full bg-secondary flex items-center justify-center text-5xl border-2 border-foreground shadow-lg mx-auto lg:mx-0 mb-6">
                👨‍💻
              </div>
              <h3 className="font-heading text-3xl font-bold text-foreground mb-4">I'm Aakash</h3>
              <p className="font-body text-lg text-foreground leading-relaxed">
                I am a developer, educator, and builder who believes in creating tools that actually help people. 
                My journey started with questions and broken code, and evolved into a passion for building 
                thoughtful, simple solutions that make a difference.
              </p>
            </div>
          </div>
        </div>

        {/* Philosophy */}
        <div className="text-center">
          <div className="bg-muted border-2 border-foreground rounded-3xl p-8 max-w-3xl mx-auto">
            <h3 className="font-heading text-3xl font-bold text-foreground mb-4">My Philosophy</h3>
            <p className="font-body text-lg text-foreground leading-relaxed mb-6">
              "I believe in building tools that bring calm to chaotic minds. Not flashy features — just clear focus. 
              Every project is an opportunity to learn, grow, and help others do the same."
            </p>
                         <div className="flex flex-wrap justify-center gap-4">
               <span className="font-body text-sm bg-primary/20 px-3 py-1 rounded-full border border-foreground">
                 Simplicity &gt; Complexity
               </span>
               <span className="font-body text-sm bg-primary/20 px-3 py-1 rounded-full border border-foreground">
                 Build &gt; Talk
               </span>
               <span className="font-body text-sm bg-primary/20 px-3 py-1 rounded-full border border-foreground">
                 Learn &gt; Perfect
               </span>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhoIAm
