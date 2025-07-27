"use client"

import { useState, useRef, useEffect } from "react"
import { MessageSquare, X, Send, Bot, User, Loader } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { chat } from "@/ai/flows/chat-flow"

type Message = {
  role: "user" | "model"
  content: string
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showTeaser, setShowTeaser] = useState(false)
  const [teaserText, setTeaserText] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const fullTeaserText = "Developer and systems thinker building AI tools, simplifying workflows, mentoring minds, and solving real-world problems with clarity, logic, and purpose."

  useEffect(() => {
    // Show teaser after a delay
    const timer = setTimeout(() => {
      setShowTeaser(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (showTeaser && !isOpen) {
      let i = 0
      const typingInterval = setInterval(() => {
        setTeaserText(fullTeaserText.slice(0, i + 1))
        i++
        if (i === fullTeaserText.length) {
          clearInterval(typingInterval)
        }
      }, 50)
      return () => clearInterval(typingInterval)
    }
  }, [showTeaser, isOpen])


  const openChat = () => {
    setIsOpen(true)
    if (messages.length === 0) {
      setMessages([
        { role: "model", content: "Hi there! I'm Aakash's AI assistant. Ask me anything about his work or experience." }
      ])
    }
  }

  useEffect(() => {
    // Auto-scroll to bottom
    if (isOpen && scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth"
      })
    }
  }, [messages, isOpen])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const chatHistory = messages.map(msg => ({ role: msg.role, content: msg.content }));
      const response = await chat({ history: chatHistory, message: input })
      
      const modelMessage: Message = { role: "model", content: response }
      setMessages((prev) => [...prev, modelMessage])
    } catch (error) {
      console.error("Error calling chat flow:", error)
      const errorMessage: Message = { role: "model", content: "Sorry, I'm having trouble connecting. Please try again later." }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen ? (
        <Card className="w-80 h-[28rem] flex flex-col shadow-lg border-2 border-foreground animate-fade-in-up">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-heading text-xl">Chat with me</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-grow overflow-hidden p-0">
            <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 ${
                      message.role === "user" ? "justify-end" : ""
                    }`}
                  >
                    {message.role === "model" && (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-primary-foreground" />
                      </div>
                    )}
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                     {message.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-background" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                   <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div className="rounded-lg px-4 py-2 bg-muted">
                        <Loader className="w-5 h-5 animate-spin" />
                      </div>
                    </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <form onSubmit={handleSendMessage} className="flex w-full gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading}>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      ) : (
        <div className="relative">
          {showTeaser && (
            <div 
              className="absolute bottom-20 right-0 w-64 bg-secondary text-secondary-foreground p-4 rounded-lg shadow-lg cursor-pointer animate-fade-in-up"
              onClick={openChat}
            >
              <p className="text-sm font-body">{teaserText}<span className="animate-blink">|</span></p>
            </div>
          )}
          <Button
            onClick={openChat}
            className="rounded-full w-16 h-16 shadow-lg animate-float"
          >
            <MessageSquare className="w-8 h-8" />
          </Button>
        </div>
      )}
    </div>
  )
}

export default ChatWidget
