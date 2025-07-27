"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Draggable } from "gsap/Draggable"
import { Flip } from "gsap/Flip"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shuffle } from "lucide-react"

const HowIThink = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const boardRef = useRef<HTMLDivElement>(null)
  const [selectedCard, setSelectedCard] = useState<string | null>(null)

  const thoughtCards = [
    {
      id: "first-principles",
      title: "First Principles > Opinions",
      sketch: "🔍",
      insight:
        "I break things down to their root causes.",
      details:
        "Instead of accepting assumptions, I challenge them. If I’m wrong, I learn. If I’m right, I sharpen. It's about building on a foundation of truth.",
    },
    {
      id: "truth-agreement",
      title: "Truth > Agreement",
      sketch: "🗣️",
      insight:
        "I’d rather be corrected than comforted.",
      details:
        "My goal is to find the best solution, not to win an argument. I actively seek out opposing viewpoints to test my own understanding and avoid echo chambers.",
    },
    {
      id: "systems-tools",
      title: "Systems > Tools",
      sketch: "⚙️",
      insight:
        "Tools change. Systems last.",
      details:
        "While I'm proficient with many technologies, I focus on the underlying systems. A well-designed system can adapt to new tools, but no tool can fix a broken system.",
    },
    {
      id: "learning-labels",
      title: "Learning > Labels",
      sketch: "🧑‍🎓",
      insight:
        "I don’t care what someone’s title is. I care what they know and how they think.",
      details:
        "Everyone has something to teach. I focus on the quality of ideas and the clarity of thought, regardless of where they come from. It's about continuous growth.",
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

      // Animate thought cards
      const cards = boardRef.current?.querySelectorAll(".thought-card")
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

        // Make cards draggable
        cards.forEach((card) => {
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

  const shuffleCards = () => {
    const cards = boardRef.current?.querySelectorAll(".thought-card")
    if (cards) {
      const state = Flip.getState(cards as NodeListOf<Element>)

      // Randomly reposition cards
      cards.forEach((card) => {
        const rect = boardRef.current!.getBoundingClientRect()
        const maxX = rect.width - (card as HTMLElement).offsetWidth
        const maxY = rect.height - (card as HTMLElement).offsetHeight

        gsap.set(card, {
          x: Math.random() * maxX,
          y: Math.random() * maxY,
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
    <div ref={sectionRef} className="container mx-auto px-6 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-6xl font-bold text-foreground mb-6">How I Think</h2>
          <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            My mind works like a sketchpad—nonlinear, interconnected, always looking for patterns. Drag the cards around
            to explore my mental framework.
          </p>
          <Button
            onClick={shuffleCards}
            className="bg-primary hover:bg-primary/80 text-primary-foreground border-2 border-foreground font-body"
          >
            <Shuffle className="w-4 h-4 mr-2" />
            Shuffle Thoughts
          </Button>
          <div className="w-32 h-1 bg-primary mx-auto rounded-full mt-6" />
        </div>

        {/* Draggable Thought Board */}
        <div
          ref={boardRef}
          className="relative h-96 bg-background border-2 border-foreground/20 rounded-3xl p-8 mb-16 overflow-hidden"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fillOpacity='0.02'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "20px 20px",
          }}
        >
          {thoughtCards.map((card, index) => (
            <div
              key={card.id}
              className="thought-card absolute bg-secondary border-2 border-foreground rounded-2xl p-6 w-64 cursor-move hover:shadow-lg transition-shadow duration-300 group"
              style={{
                left: `${20 + (index % 2) * 300}px`,
                top: `${20 + Math.floor(index / 2) * 180}px`,
                transform: `rotate(${(index % 2 === 0 ? 1 : -1) * (Math.random() * 1.5 + 0.5)}deg)`,
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              }}
              onClick={() => setSelectedCard(selectedCard === card.id ? null : card.id)}
            >
              <div className="text-center mb-4">
                <div className="text-4xl mb-2 group-hover:animate-bounce">{card.sketch}</div>
                <h3 className="font-heading text-xl font-bold text-foreground">{card.title}</h3>
              </div>
              <p className="font-body text-sm text-foreground leading-relaxed">{card.insight}</p>
              <div className="mt-4 text-center">
                <span className="font-body text-xs text-muted-foreground">Click to expand</span>
              </div>
            </div>
          ))}
        </div>

        {/* Expanded Card Details */}
        {selectedCard && (
          <Card className="border-2 border-foreground bg-background shadow-lg">
            <CardHeader>
              <CardTitle className="font-heading text-3xl text-foreground flex items-center gap-4">
                <span className="text-4xl">{thoughtCards.find((c) => c.id === selectedCard)?.sketch}</span>
                {thoughtCards.find((c) => c.id === selectedCard)?.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-body text-lg text-foreground leading-relaxed mb-4">
                {thoughtCards.find((c) => c.id === selectedCard)?.insight}
              </p>
              <div className="border-t-2 border-primary pt-4">
                <p className="font-body text-base text-muted-foreground leading-relaxed">
                  {thoughtCards.find((c) => c.id === selectedCard)?.details}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Philosophy Summary */}
        <div className="mt-16 text-center">
          <div className="bg-muted border-2 border-foreground rounded-3xl p-8 max-w-3xl mx-auto">
            <h3 className="font-heading text-3xl font-bold text-foreground mb-4">The Core Philosophy</h3>
            <p className="font-body text-lg text-foreground leading-relaxed">
             You’ll often find me asking questions like: “What’s the hidden assumption here?”, “What would someone who disagrees say?”, “Can this be made clearer or simpler?”, or “Does this scale across other situations?”
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowIThink
