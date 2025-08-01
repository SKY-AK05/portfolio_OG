"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Draggable } from "gsap/Draggable"
import { Flip } from "gsap/Flip"
import Hero from "@/components/hero"
import Footer from "@/components/footer"
import Header from "@/components/header"
import WhoIAm from "@/components/who-i-am"
import Projects from "@/components/projects"
import Mission from "@/components/mission"
import WhoIHelp from "@/components/who-i-help"
import HowIThink from "@/components/how-i-think"
import ChatWidget from "@/components/chat-widget"
import IntroAnimation from "@/components/intro-animation"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Draggable, Flip)
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <div 
      ref={containerRef} 
      className="min-h-screen bg-background flex flex-col"
    >
      {!introComplete && <IntroAnimation onComplete={() => setIntroComplete(true)} />}
      
      <div className={introComplete ? 'block' : 'hidden'}>
        <Header />

        <main className="flex-grow">
          {/* Hero Section */}
          <section id="hero" className="flex items-center justify-center relative pb-20 -mt-8">
            <Hero animate={introComplete} />
          </section>

          {/* Who I Am Section */}
          <section id="who-i-am" className="py-20">
            <WhoIAm />
          </section>

          {/* Projects Section */}
          <section id="projects" className="py-20">
            <Projects />
          </section>

          {/* Mission Section */}
          <section id="mission" className="py-20">
            <Mission />
          </section>

          {/* Who I Help Section */}
          <section id="who-i-help" className="py-20">
            <WhoIHelp />
          </section>

          {/* How I Think Section */}
          <section id="how-i-think" className="py-20">
            <HowIThink />
          </section>
        </main>
        <ChatWidget />
        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}
