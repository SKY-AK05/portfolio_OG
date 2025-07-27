import type React from "react"
import type { Metadata } from "next"
import { Caveat, Inter } from 'next/font/google'
import "./globals.css"
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider"


const caveat = Caveat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-caveat',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});


export const metadata: Metadata = {
  title: "SNiFF's Digital Mind Garden",
  description: "Developer. Educator. Builder of calm tools for chaotic minds.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
       <body className={cn(caveat.variable, inter.variable, "min-h-screen bg-background text-foreground antialiased font-inter")}>
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
