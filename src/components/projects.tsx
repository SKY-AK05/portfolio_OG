"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Draggable } from "gsap/Draggable"
import { Flip } from "gsap/Flip"

// Register GSAP plugins
gsap.registerPlugin(Draggable, Flip)
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Github, Shuffle } from "lucide-react"

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const boardRef = useRef<HTMLDivElement>(null)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  const projects = [
    {
      id: "promptweaver",
      title: "PromptWeaver",
      subtitle: "AI Prompt Structuring",
      description: "A platform to refine and structure prompts, reflecting my obsession with clarity of language and thinking.",
      fullDescription:
        "A structured approach to AI prompting that breaks down complex requests into manageable, reusable components. A testbed for my obsession with clarity of language and thinking.",
      tech: ["React", "TypeScript", "AI SDK"],
      color: "bg-muted",
      icon: "🧵",
      github: "#",
      demo: "#",
    },
    {
      id: "reva",
      title: "Reva",
      subtitle: "Personalized Assistant App",
      description: "More than a project — it was a testbed for building thoughtful AI interfaces.",
      fullDescription:
        "A native app that acts as a personalized assistant. I treated it as more than a project — it was a testbed for building thoughtful AI interfaces.",
      tech: ["React Native", "Supabase", "GSAP"],
      color: "bg-secondary",
      icon: "🌱",
      github: "#",
      demo: "#",
    },
    {
      id: "smart-life",
      title: "Smart Life Manager",
      subtitle: "Conversational Life Management",
      description: "An AI agent that lets users manage their life (tasks, goals, expenses) just by chatting.",
      fullDescription:
        "A goal I'm pursuing — an AI agent that lets users manage their life (tasks, goals, expenses) just by chatting. Simple on the outside, powerful under the hood.",
      tech: ["AI Agents", "Node.js", "System Design"],
      color: "bg-background",
      icon: "🧠",
      github: "#",
      demo: "#",
    },
     {
      id: "auto-attendance",
      title: "Auto Attendance Bot",
      subtitle: "Workflow Automation",
      description: "Not just a tech solution — it was workflow design.",
      fullDescription:
        "This was not just a tech solution — it was workflow design. From reading Teams messages to Excel macros to fuzzy name matching — it was system-level thinking applied practically.",
      tech: ["Python", "Excel Macros", "Automation"],
      color: "bg-muted",
      icon: "🤖",
      github: "#",
      demo: "#",
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

      // Animate project cards
      const cards = boardRef.current?.querySelectorAll(".project-card")
      if (cards) {
        gsap.fromTo(
          cards,
          { scale: 0, rotation: -10 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: 0.2,
            scrollTrigger: {
              trigger: boardRef.current,
              start: "top 70%",
              end: "bottom 30%",
              toggleActions: "play none none reverse",
            },
          },
        )

        // Make cards draggable immediately
        cards.forEach((card, index) => {
          // Set initial position using GSAP
          const initialX = 20 + (index % 2) * 300
          const initialY = 20 + Math.floor(index / 2) * 180
          gsap.set(card, { x: initialX, y: initialY })

          Draggable.create(card as gsap.DOMTarget, {
            type: "x,y",
            bounds: boardRef.current!,
            inertia: true,
            onDrag: function () {
              gsap.set(this.target, { zIndex: 1000 })
            },
            onDragEnd: function () {
              gsap.set(this.target, { zIndex: 1 })
            },
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const shuffleProjects = () => {
    const cards = boardRef.current?.querySelectorAll(".project-card")
    if (cards) {
      const state = Flip.getState(cards as NodeListOf<Element>)

      // Randomly reposition cards within board bounds
      cards.forEach((card) => {
        const boardRect = boardRef.current!.getBoundingClientRect()
        const cardWidth = (card as HTMLElement).offsetWidth
        const cardHeight = (card as HTMLElement).offsetHeight
        
        // Account for board padding (p-8 = 32px on each side)
        const padding = 32
        const maxX = boardRect.width - cardWidth - (padding * 2)
        const maxY = boardRect.height - cardHeight - (padding * 2)

        gsap.set(card, {
          x: padding + Math.random() * maxX,
          y: padding + Math.random() * maxY,
        })
      })

      Flip.from(state, {
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.1,
      })
    }
  }



  return (
    <div ref={sectionRef} className="px-6 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-6xl font-bold text-foreground mb-6">Projects</h2>
          <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Each project is a thought bubble that grew into something real. Drag the cards around to explore the stories behind the code.
          </p>
          <Button
            onClick={shuffleProjects}
            className="bg-primary hover:bg-primary/80 text-primary-foreground border-2 border-foreground font-body"
          >
            <Shuffle className="w-4 h-4 mr-2" />
            Shuffle Projects
          </Button>
          <div className="w-32 h-1 bg-primary mx-auto rounded-full mt-6" />
        </div>

        {/* Draggable Project Board */}
        <div
          ref={boardRef}
          className="relative h-96 bg-background border-2 border-foreground/20 rounded-3xl p-8 mb-16 overflow-hidden"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fillOpacity='0.02'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "20px 20px",
          }}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card absolute ${project.color} border-2 border-foreground rounded-2xl p-6 w-64 cursor-grab active:cursor-grabbing hover:shadow-lg transition-shadow duration-300 group`}
              style={{
                transform: `rotate(${(index % 2 === 0 ? 1 : -1) * (Math.random() * 1.5 + 0.5)}deg)`,
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              }}
              onClick={(e) => {
                e.stopPropagation()
                // Bring clicked card to front
                gsap.set(e.currentTarget, { zIndex: 1000 })
                setSelectedProject(selectedProject === project.id ? null : project.id)
              }}
            >
              <div className="text-center mb-4">
                <div className="text-4xl mb-2 group-hover:animate-bounce">{project.icon}</div>
                <h3 className="font-heading text-xl font-bold text-foreground">{project.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{project.subtitle}</p>
              </div>
              <p className="font-body text-sm text-foreground leading-relaxed italic">
                "{project.description}"
              </p>
              <div className="mt-4 text-center">
                <span className="font-body text-xs text-muted-foreground">Click to expand</span>
              </div>
            </div>
          ))}
        </div>

        {/* Expanded Project Details */}
        {selectedProject && (
          <Card className="border-2 border-foreground bg-background shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-heading text-3xl text-foreground">
                    {projects.find((p) => p.id === selectedProject)?.title}
                  </CardTitle>
                  <CardDescription className="font-body text-lg text-muted-foreground">
                    {projects.find((p) => p.id === selectedProject)?.subtitle}
                  </CardDescription>
                </div>
                <div className="text-4xl">{projects.find((p) => p.id === selectedProject)?.icon}</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="font-body text-lg text-foreground leading-relaxed">
                {projects.find((p) => p.id === selectedProject)?.fullDescription}
              </p>

              <div className="flex flex-wrap gap-2">
                {projects
                  .find((p) => p.id === selectedProject)
                  ?.tech.map((tech) => (
                    <span
                      key={tech}
                      className="bg-primary/80 text-primary-foreground px-3 py-1 rounded-full border-2 border-foreground font-body text-sm"
                    >
                      {tech}
                    </span>
                  ))}
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="border-2 border-foreground hover:bg-primary font-body bg-transparent"
                  asChild
                >
                  <a
                    href={projects.find((p) => p.id === selectedProject)?.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </a>
                </Button>
                <Button className="bg-foreground hover:bg-foreground/80 text-background font-body" asChild>
                  <a
                    href={projects.find((p) => p.id === selectedProject)?.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Project Philosophy Summary */}
        <div className="mt-16 text-center">
          <div className="bg-muted border-2 border-foreground rounded-3xl p-8 max-w-3xl mx-auto">
            <h3 className="font-heading text-3xl font-bold text-foreground mb-4">The Project Philosophy</h3>
            <p className="font-body text-lg text-foreground leading-relaxed">
              Every project starts as a question: "What if we could...?", "How might we...?", or "Why does this have to be so complicated?". 
              The best projects aren't just about the code—they're about solving real problems with thoughtful design and clear thinking.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects
