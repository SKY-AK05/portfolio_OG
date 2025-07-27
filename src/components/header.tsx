"use client"

import { Phone } from "lucide-react"

const Header = () => {
  const navLinks = [
    { name: "Who I Am", href: "#who-i-am" },
    { name: "Projects", href: "#projects" },
    { name: "Mission", href: "#mission" },
    { name: "Experience", href: "#who-i-am" },
  ]

  return (
    <header className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold font-heading">
            Aakash
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className={`font-body text-sm font-medium text-foreground/80 hover:text-foreground transition-colors ${index === 0 ? 'ring-1 ring-border rounded-full px-3 py-1' : ''}`}
              >
                {link.name.toUpperCase()}
              </a>
            ))}
          </nav>
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
