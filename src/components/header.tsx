"use client"

import { Phone } from "lucide-react"

const Header = () => {
  return (
    <header className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold font-heading">
            Aakash
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <a href="tel:+001313345678" className="font-body text-sm flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors">
                <span>+001 (313) 345 678</span>
                <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
