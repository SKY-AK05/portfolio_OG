"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const Mission = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const keywordsRef = useRef<HTMLDivElement>(null)

  const keywords = ["autonomy", "inclusion", "clarity", "flow", "emotion-safe", "sustainable", "human-first", "gentle"]

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      const keywordElements = keywordsRef.current?.querySelectorAll(".keyword")
      if (keywordElements) {
        keywordElements.forEach((keyword, index) => {
          gsap.fromTo(
            keyword,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
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

      const texture = sectionRef.current?.querySelector(".texture-bg")
      if (texture) {
        gsap.to(texture, {
          backgroundPosition: "100% 100%",
          duration: 20,
          ease: "none",
          repeat: -1,
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
      <div
        className="texture-bg absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23C5B4E3' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-background border-4 border-foreground rounded-3xl p-12 shadow-2xl relative">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary border-2 border-foreground rounded-full" />
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-card border-2 border-foreground rounded-full" />
            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-card border-2 border-foreground rounded-full" />
            <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-primary border-2 border-foreground rounded-full" />

            <h2 className="text-6xl font-bold text-foreground mb-8">My Mission</h2>

            <blockquote className="font-body text-3xl text-foreground leading-relaxed mb-8 italic">
              "To build tech that creates space — especially for those navigating invisible struggles."
            </blockquote>

            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-8" />

            <p className="font-body text-xl text-foreground/80 leading-relaxed max-w-2xl mx-auto">
              Every line of code I write is an act of empathy. I believe technology should reduce cognitive load, not
              add to it. It should understand that some days are harder than others, and that's perfectly human.
            </p>
          </div>

          <div ref={keywordsRef} className="relative mt-16 h-64">
            {keywords.map((keyword, index) => (
              <div
                key={keyword}
                className="keyword absolute bg-primary text-primary-foreground px-4 py-2 rounded-full border-2 border-foreground font-body text-lg font-semibold cursor-default hover:bg-card transition-colors duration-300"
                style={{
                  left: `${15 + (index % 4) * 20}%`,
                  top: `${20 + Math.floor(index / 4) * 30}%`,
                  transform: `rotate(${(index % 2 === 0 ? 1 : -1) * (Math.random() * 5 + 2)}deg)`,
                }}
              >
                {keyword}
              </div>
            ))}
          </div>

          <div className="mt-16">
            <p className="font-body text-lg text-foreground/70 mb-6">
              Building something that needs this kind of thoughtfulness?
            </p>
            <div className="inline-block bg-foreground text-background px-8 py-4 rounded-full border-2 border-foreground hover:bg-foreground/80 transition-colors duration-300 cursor-pointer">
              <span className="font-body text-lg font-semibold">Let's create space together →</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mission
