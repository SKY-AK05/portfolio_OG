import Link from "next/link"
import { AccessibilityToggles } from "./accessibility-toggles"
import { SketchyEmailIcon } from "./icons/sketchy-email-icon"
import { SketchyGitHubIcon } from "./icons/sketchy-github-icon"

export function Footer() {
  return (
    <footer className="bg-background/80 backdrop-blur-sm w-full">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h3 className="font-headline text-2xl text-primary">Building something human-first?</h3>
            <p className="text-foreground/80">Let’s talk.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="mailto:hello@example.com" aria-label="Email" className="text-foreground hover:text-accent transition-colors">
              <SketchyEmailIcon className="w-8 h-8" />
            </Link>
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-foreground hover:text-accent transition-colors">
              <SketchyGitHubIcon className="w-8 h-8" />
            </Link>
          </div>
        </div>
        <div className="mt-8 flex justify-center sm:justify-end">
            <AccessibilityToggles />
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SNiFF. Built with calm intentions.</p>
        </div>
      </div>
    </footer>
  )
}
