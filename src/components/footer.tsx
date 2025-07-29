"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Mail, Twitter, Send } from "lucide-react"

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate footer entrance
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Animate social icons
      const socialIcons = footerRef.current?.querySelectorAll(".social-icon")
      if (socialIcons) {
        socialIcons.forEach((icon, index) => {
          gsap.to(icon, {
            y: "+=5",
            duration: 1.5 + index * 0.2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          })
        })
      }
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)

    // Animate form submission
    gsap.to(formRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    })
  }

  return (
    <footer ref={footerRef} className="bg-foreground text-background py-20 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="footer-pattern" patternUnits="userSpaceOnUse" width="50" height="50">
              <circle cx="25" cy="25" r="1" fill="currentColor" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-pattern)" />
        </svg>
      </div>

      <div className="px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-heading text-5xl font-bold mb-6">Building something human-first?</h2>
            <p className="font-body text-xl opacity-80 mb-8">Let's talk.</p>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <Card className="border-2 border-background bg-transparent">
              <CardHeader>
                <CardTitle className="font-heading text-2xl text-background">Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-background/10 border-2 border-background/30 text-background placeholder:text-background/60 font-body focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-background/10 border-2 border-background/30 text-background placeholder:text-background/60 font-body focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Tell me about your project, your struggles, or just say hello..."
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="bg-background/10 border-2 border-background/30 text-background placeholder:text-background/60 font-body focus:border-primary resize-none"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/80 text-foreground font-body text-lg py-3"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info & Social */}
            <div className="space-y-8">
              <div>
                <h3 className="font-heading text-2xl font-bold mb-4">Other Ways to Connect</h3>
                <div className="space-y-4">
                  <a
                    href="mailto:hello@sniff.dev"
                    className="flex items-center space-x-3 text-background/80 hover:text-background transition-colors duration-300 font-body text-lg"
                  >
                    <Mail className="w-5 h-5" />
                    <span>hello@sniff.dev</span>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold mb-4">Find Me Online</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/sniff"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon w-12 h-12 bg-background/20 border-2 border-background/30 rounded-full flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 group"
                  >
                    <Github className="w-5 h-5 text-background group-hover:text-foreground" />
                  </a>
                  <a
                    href="https://twitter.com/sniff_dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon w-12 h-12 bg-background/20 border-2 border-background/30 rounded-full flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 group"
                  >
                    <Twitter className="w-5 h-5 text-background group-hover:text-foreground" />
                  </a>
                </div>
              </div>

              <div className="bg-background/10 border-2 border-background/20 rounded-2xl p-6">
                <h4 className="font-heading text-xl font-bold mb-3">Response Time</h4>
                <p className="font-body text-background/80 leading-relaxed">
                  I typically respond within 24-48 hours. If you're reaching out about accessibility or
                  neurodivergent-focused projects, I'll prioritize your message.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-16 pt-8 border-t border-background/20 text-center">
            <p className="font-body text-background/60 mb-4">
              Built with empathy, powered by curiosity, designed for humans.
            </p>
            <p className="font-body text-sm text-background/40">
              © 2024 SNiFF. Made with care for minds that think differently.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
