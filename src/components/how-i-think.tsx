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
      id: "friction",
      title: "Start with Friction",
      sketch: "🔍",
      insight:
        "I look for the moments where people struggle—not to judge, but to understand. Every friction point is a design opportunity waiting to be discovered.",
      details:
        "Most developers optimize for the happy path. I optimize for the moments when everything goes wrong, when executive function fails, when the user is overwhelmed. That's where real empathy lives.",
    },
    {
      id: "calm",
      title: "Calm by Default",
      sketch: "🌊",
      insight:
        "Technology should lower your heart rate, not raise it. Every interface decision should ask: does this create peace or chaos?",
      details:
        "Calm isn't just about aesthetics—it's about cognitive load, predictable interactions, and giving users a sense of control. When someone opens my apps, I want them to exhale.",
    },
    {
      id: "emotion",
      title: "Emotion-First UI",
      sketch: "💝",
      insight:
        "Before asking 'what does the user need to do?', I ask 'how does the user need to feel?' Functionality follows emotional safety.",
      details:
        "Traditional UX focuses on task completion. I focus on emotional regulation. A user who feels safe and understood will naturally be more productive and engaged.",
    },
    {
      id: "structure",
      title: "Structure as Kindness",
      sketch: "🏗️",
      insight:
        "Clear patterns and consistent systems aren't constraints—they're acts of care for minds that crave predictability.",
      details:
        "Neurodivergent brains often struggle with ambiguity. By creating clear, consistent patterns, I'm not limiting creativity—I'm creating a safe foundation for it to flourish.",
    },
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

        cards.forEach((card) => {
          Draggable.create(card, {
            type: "x,y",
            bounds: boardRef.current,
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
      const state = Flip.getState(cards)

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
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold text-foreground mb-6">How I Think</h2>
          <p className="font-body text-xl text-foreground/80 max-w-2xl mx-auto mb-8">
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

        <div
          ref={boardRef}
          className="relative h-96 bg-card border-4 border-foreground rounded-3xl p-8 mb-16 overflow-hidden"
          style={{
            borderStyle: "dashed",
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C5B4E3' fillOpacity='0.1'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
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
                transform: `rotate(${(index % 2 === 0 ? 1 : -1) * (Math.random() * 3 + 1)}deg)`,
                filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.1))",
              }}
              onClick={() => setSelectedCard(selectedCard === card.id ? null : card.id)}
            >
              <div className="text-center mb-4">
                <div className="text-4xl mb-2 group-hover:animate-bounce">{card.sketch}</div>
                <h3 className="text-xl font-bold text-foreground">{card.title}</h3>
              </div>
              <p className="font-body text-sm text-foreground leading-relaxed">{card.insight}</p>
              <div className="mt-4 text-center">
                <span className="font-body text-xs text-foreground/60">Click to expand</span>
              </div>
            </div>
          ))}
        </div>

        {selectedCard && (
          <Card className="border-2 border-foreground bg-background shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl text-foreground flex items-center gap-4">
                <span className="text-4xl">{thoughtCards.find((c) => c.id === selectedCard)?.sketch}</span>
                {thoughtCards.find((c) => c.id === selectedCard)?.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-body text-lg text-foreground leading-relaxed mb-4">
                {thoughtCards.find((c) => c.id === selectedCard)?.insight}
              </p>
              <div className="border-t-2 border-primary pt-4">
                <p className="font-body text-base text-foreground/80 leading-relaxed">
                  {thoughtCards.find((c) => c.id === selectedCard)?.details}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-16 text-center">
          <div className="bg-primary border-2 border-foreground rounded-3xl p-8 max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-primary-foreground mb-4">The Core Philosophy</h3>
            <p className="font-body text-lg text-primary-foreground leading-relaxed">
              Every decision I make—from code architecture to color choices—stems from a simple belief: technology
              should amplify human potential, not drain it. When we design with neurodivergent minds in mind, we create
              better experiences for everyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowIThink
