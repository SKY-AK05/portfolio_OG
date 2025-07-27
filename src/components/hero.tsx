"use client"

import Image from 'next/image'

const Hero = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Left Column */}
        <div className="md:col-span-4 space-y-8">
          <h1 className="font-heading text-6xl md:text-7xl font-bold leading-tight">
            Hey There, <br /> I'm Aakash
          </h1>
          <a href="mailto:aakash@example.com" className="text-primary font-body font-semibold hover:underline">
            aakash@example.com
          </a>
          <div>
            <p className="text-4xl font-heading font-bold">10</p>
            <p className="font-body text-sm text-muted-foreground">YEARS EXPERIENCE</p>
          </div>
        </div>

        {/* Center Column (Image) */}
        <div className="md:col-span-4 relative flex justify-center items-center h-[600px]">
          <div className="absolute inset-0 flex justify-center items-center">
            <svg
              className="w-full h-full text-teal-500"
              viewBox="0 0 500 500"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: 'rotate(-15deg) scale(1.2)'}}
            >
              <path
                d="M100,250 C125,150 200,100 250,150 S375,250 400,250 C375,350 300,400 250,350 S125,350 100,250 Z"
                fill="currentColor"
                opacity="0.2"
              />
              <path
                d="M120,250 C145,160 210,120 260,160 S365,260 390,260 C365,360 310,410 260,360 S145,360 120,250 Z"
                fill="hsl(var(--primary))"
                opacity="0.3"
              />
            </svg>
          </div>
          <img
            src="/svgs/me.svg"
            alt="Aakash - a placeholder image"
            className="relative z-10 w-[400px] h-[600px] object-contain"
          />
        </div>

        {/* Right Column */}
        <div className="md:col-span-4 space-y-8 text-right self-start">
           <p className="font-body text-lg">
            I build beautifully simple things, <br/>
            And I love what I do.
          </p>
          <div className="flex justify-end">
            <div className="text-center">
               <div className="w-24 h-24 border-2 border-dashed border-foreground/50 rounded-full flex items-center justify-center mx-auto mb-2">
                 <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
               </div>
              <p className="font-body text-xs font-semibold">CERTIFIED</p>
              <p className="font-body text-xs text-muted-foreground">PROFESSIONAL DEVELOPER</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Hero
