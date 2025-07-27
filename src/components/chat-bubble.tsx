"use client"

import { useState, useEffect } from "react"
import { MessageSquare } from "lucide-react"

const ChatBubble = () => {
  const [message, setMessage] = useState("")
  const [showBubble, setShowBubble] = useState(false)
  const fullMessage = "Developer and systems thinker building AI tools, simplifying workflows, mentoring minds, and solving real-world problems with clarity, logic, and purpose."

  useEffect(() => {
    const showTimeout = setTimeout(() => {
      setShowBubble(true)
    }, 2000) // Show bubble after 2 seconds

    return () => clearTimeout(showTimeout)
  }, [])

  useEffect(() => {
    if (showBubble) {
      setMessage("") // Reset message when bubble appears
      let index = 0
      const interval = setInterval(() => {
        if (index < fullMessage.length) {
          setMessage((prev) => prev + fullMessage[index])
          index++
        } else {
          clearInterval(interval)
        }
      }, 30) // Adjust typing speed here

      return () => clearInterval(interval)
    }
  }, [showBubble])

  if (!showBubble) {
    return null
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-fade-in-up">
      <div className="relative">
        <div className="bg-background border-2 border-foreground rounded-lg p-4 max-w-xs shadow-lg">
          <p className="font-body text-foreground">
            {message}
            {message.length === fullMessage.length ? "" : <span className="animate-blink">|</span>}
          </p>
        </div>
        <div className="absolute -bottom-3 -right-3 bg-primary rounded-full p-2 border-2 border-foreground animate-float">
          <MessageSquare className="w-6 h-6 text-primary-foreground" />
        </div>
      </div>
    </div>
  )
}

export default ChatBubble
