"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Github } from "lucide-react"

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const projectsGridRef = useRef<HTMLDivElement>(null)
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
        "A goal I’m pursuing — an AI agent that lets users manage their life (tasks, goals, expenses) just by chatting. Simple on the outside, powerful under the hood.",
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

      // Animate project bubbles
      const projectBubbles = projectsGridRef.current?.querySelectorAll(".project-bubble")
      if (projectBubbles) {
        gsap.fromTo(
          projectBubbles,
          { scale: 0, rotation: -3 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: 0.2,
            scrollTrigger: {
              trigger: projectsGridRef.current,
              start: "top 70%",
              end: "bottom 30%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleProjectClick = (projectId: string) => {
    if (selectedProject === projectId) {
      setSelectedProject(null)
    } else {
      setSelectedProject(projectId)
    }
  }

  return (
    <div ref={sectionRef} className="container mx-auto px-6 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-6xl font-bold text-foreground mb-6">Projects</h2>
          <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto">
            Each project is a thought bubble that grew into something real. Click to explore the stories behind the
            code.
          </p>
          <div className="w-32 h-1 bg-primary mx-auto rounded-full mt-6" />
        </div>

        {/* Projects Grid */}
        <div ref={projectsGridRef} className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`project-bubble ${project.color} border-2 border-foreground rounded-3xl p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden`}
              onClick={() => handleProjectClick(project.id)}
            >
              <div className="text-4xl mb-4 animate-bounce">{project.icon}</div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-2">{project.title}</h3>
              <p className="font-body text-sm text-muted-foreground mb-4">{project.subtitle}</p>
              <p className="font-body text-base text-foreground leading-relaxed italic">
                "{project.description}"
              </p>
              <div className="absolute bottom-4 right-4 opacity-50">
                <span className="text-sm font-body">Click to expand</span>
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
      </div>
    </div>
  )
}

export default Projects
