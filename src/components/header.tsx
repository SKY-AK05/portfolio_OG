"use client"

import { Phone } from "lucide-react"
import ThemeSwitcher from "./theme-switcher"

const Header = () => {
  return (
    <header className="relative">
      <div className="flex justify-between items-center px-4 py-4">
        <div className="text-2xl font-bold font-heading">
          Aakash
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#who-i-am" className="font-body text-sm text-foreground/80 hover:text-foreground transition-colors">Who I Am</a>
          <a href="#projects" className="font-body text-sm text-foreground/80 hover:text-foreground transition-colors">Projects</a>
          <a href="#mission" className="font-body text-sm text-foreground/80 hover:text-foreground transition-colors">Mission</a>
          <a href="#contact" className="font-body text-sm text-foreground/80 hover:text-foreground transition-colors">Contact</a>
        </nav>
        <div className="hidden md:flex items-center space-x-2">
          <a href="tel:+001313345678" className="font-body text-sm flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors">
              <span>+001 (313) 345 678</span>
              <Phone className="w-4 h-4" />
          </a>
        </div>
      </div>
      <ThemeSwitcher />
    </header>
  )
}

export default Header
