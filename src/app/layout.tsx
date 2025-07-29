import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins, Patrick_Hand } from 'next/font/google'
import "./globals.css"
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

const patrickHand = Patrick_Hand({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-patrick-hand',
  weight: ['400']
});

export const metadata: Metadata = {
  title: "Aakash's Portfolio",
  description: "Developer. Educator. Builder of calm tools for chaotic minds.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
       <body className={cn(inter.variable, poppins.variable, patrickHand.variable, "min-h-screen bg-background text-foreground antialiased font-body overflow-x-hidden")}>
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
