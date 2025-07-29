"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import TypingEffect from './typing-effect'

const Hero = ({ animate }: { animate: boolean }) => {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const fadeInsRef = useRef<HTMLDivElement>(null)
  const handRef = useRef<SVGSVGElement>(null)
  const colorCircleRef = useRef<HTMLDivElement>(null)
  const [colorAnimationComplete, setColorAnimationComplete] = useState(false)

  useEffect(() => {
    // For testing, let's run the animation regardless of animate prop
    // if (!animate) return;
    
    console.log("Hero animation starting, animate prop:", animate);

    const ctx = gsap.context(() => {
        
      // Use a timeline for better sequencing
      const tl = gsap.timeline({delay: 0.5});

      // Set initial state for hand and color circle
      gsap.set(handRef.current, {
        opacity: 0,
        x: -150,
        y: 0,
        rotation: 0
      });
      
      gsap.set(colorCircleRef.current, {
        opacity: 0,
        scale: 0
      });

      console.log("Initial states set");

      // Animate the title
      tl.fromTo(titleRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      );

      console.log("Title animation added");

      // Hand animation sequence
      tl.to(handRef.current, {
        opacity: 1,
        x: 50, // Move to "Hey" position
        duration: 0.8,
        ease: "power2.out"
      }, "+=0.5")
      
      // Grab motion - fingers close
      .to(handRef.current, {
        rotation: 15, // Slight rotation for grabbing motion
        duration: 0.3,
        ease: "power2.inOut"
      }, "+=0.2")
      
      // "Hey" loses color and color circle appears in hand
      .to(".hey-text", {
        color: "hsl(var(--foreground))",
        duration: 0.3,
        ease: "power2.inOut"
      }, "+=0.1")
      .to(colorCircleRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.7)"
      }, "-=0.2")
      
      // Hand moves down and to "Aakash" position
      .to(handRef.current, {
        x: 250,
        y: 30, // Move down slightly
        duration: 0.8,
        ease: "power2.inOut"
      }, "+=0.2")
      
      // Hand touches "Aakash" - slight bounce motion
      .to(handRef.current, {
        y: 35,
        duration: 0.1,
        ease: "power2.out"
      }, "+=0.1")
      .to(handRef.current, {
        y: 30,
        duration: 0.1,
        ease: "power2.in"
      })
      
      // "Aakash" gets color and color circle disappears
      .to(".aakash-text", {
        color: "hsl(var(--primary))",
        duration: 0.3,
        ease: "power2.inOut"
      }, "+=0.1")
      .to(colorCircleRef.current, {
        opacity: 0,
        scale: 0,
        duration: 0.3,
        ease: "power2.in"
      }, "-=0.2")
      
      // Hand exits
      .to(handRef.current, {
        x: 450,
        y: 0,
        opacity: 0,
        rotation: 0,
        duration: 0.6,
        ease: "power2.in"
      }, "+=0.3")
      .call(() => {
        setColorAnimationComplete(true);
        console.log("Hand animation complete!");
      }, [], "+=0.2");

      console.log("Timeline created, starting animation...");

      // Animate the fade-in elements
      const fadeElements = fadeInsRef.current?.querySelectorAll('[data-fade-in]');
      if (fadeElements) {
        tl.fromTo(fadeElements,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.2, // Stagger fade-ins
            ease: "power2.out"
          },
          "-=0.2" // Start this animation slightly before the previous one ends
        );
      }
      
      console.log("Timeline created, starting animation...");
    }, heroRef);

    return () => ctx.revert();
  }, [animate]);

  return (
    <div ref={heroRef} className="px-4 py-8 relative">
      {/* Hand SVG - positioned absolutely */}
      <svg 
        ref={handRef}
        className="absolute z-50"
        style={{ 
          top: '15%', 
          left: '0px',
          width: '80px',
          height: '100px',
          pointerEvents: 'none'
        }}
        viewBox="0 0 350 450"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill="#3A5E77" d="M40.6 523C12.5 475.6-1 425.4.5 373.7c1.2-40.7 11.7-81.6 31.2-121.6 31.4-64.4 75.5-104.7 80.4-109.1l79.9 89.5.2-.2c-.3.3-32.9 30.3-54.1 75.4-25.5 54.2-23.6 104.6 5.7 154.1L40.6 523z"/>
        <g id="fingers">
          <path fill="#DDF1FA" d="M188.4 54c-6 9.8-8.1 21.5-6.6 32.7 1.4 11.2 6.4 21.8 13.5 29.7 6.7 7.4 6.2 18.8-1.2 25.6-7.4 6.7-18.8 6.2-25.6-1.2-.6-.7-1.2-1.4-1.7-2.2l-.5-.7c-9.9-15.1-14.8-32.7-14.4-50.1.2-8.7 1.7-17.3 4.7-25.5 2.9-8.2 7.3-15.8 12.8-22.4 4.2-5 11.7-5.6 16.6-1.4 4.5 3.8 5.5 10.3 2.4 15.2v.3z"/>
          <path fill="#A9DDF3" d="M180.3 39.6l-6.4 9c-.7.9-2 1.1-2.9.5l-2.5-1.8c-.9-.7-1.1-2-.5-2.9l2.7-3.8c2.1-3 6.3-3.7 9.2-1.5l.3.2c.2 0 .2.2.1.3z"/>
          <path fill="none" stroke="#3A5E77" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="5" d="M166.5 137.9c-9.9-15.1-14.8-32.7-14.4-50.1.2-8.7 1.7-17.3 4.7-25.5 2.9-8.2 7.3-15.8 12.8-22.4 4.2-5 11.7-5.6 16.6-1.4 4.5 3.8 5.5 10.3 2.4 15.2l-.2.3c-6 9.8-8.1 21.5-6.6 32.7 1.4 11.2 6.4 21.8 13.5 29.7"/>
          <path fill="#DDF1FA" d="M203.6 47.5c-6 9.8-8.1 21.5-6.6 32.7 1.4 11.2 6.4 21.8 13.5 29.7 6.7 7.4 6.2 18.8-1.2 25.6-7.4 6.7-18.8 6.2-25.6-1.2-.6-.7-1.2-1.4-1.7-2.2l-.5-.7c-9.9-15.1-14.8-32.7-14.4-50.1.2-8.7 1.7-17.3 4.7-25.5 2.9-8.2 7.3-15.8 12.8-22.4 4.2-5 11.7-5.6 16.6-1.4 4.5 3.8 5.5 10.3 2.4 15.2v.3z"/>
          <path fill="#A9DDF3" d="M196.5 32.5l-6.4 9c-.7.9-2 1.1-2.9.5l-2.5-1.8c-.9-.7-1.1-2-.5-2.9l2.7-3.8c2.1-3 6.3-3.7 9.2-1.5l.3.2c.2 0 .2.1.1.3z"/>
          <path fill="none" stroke="#3A5E77" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="5" d="M168.9 100.6c-1.3-6.4-1.9-12.9-1.7-19.3.2-8.7 1.7-17.3 4.7-25.5 2.9-8.2 7.3-15.8 12.8-22.4 4.2-5 11.7-5.6 16.6-1.4 4.5 3.8 5.5 10.3 2.4 15.2l-.2.3c-6 9.8-8.1 21.5-6.6 32.7 1.4 11.2 6.4 21.8 13.5 29.7"/>
          <path fill="#DDF1FA" d="M221.5 41.5c-6 9.8-8.1 21.5-6.6 32.7 1.4 11.2 6.4 21.8 13.5 29.7 6.7 7.4 6.2 18.8-1.2 25.6-7.4 6.7-18.8 6.2-25.6-1.2-.6-.7-1.2-1.4-1.7-2.2l-.5-.7c-9.9-15.1-14.8-32.7-14.4-50.1.2-8.7 1.7-17.3 4.7-25.5 2.9-8.2 7.3-15.8 12.8-22.4 4.2-5 11.7-5.6 16.6-1.4 4.5 3.8 5.5 10.3 2.4 15.2v.3z"/>
          <path fill="#A9DDF3" d="M214.5 26.5l-6.4 9c-.7.9-2 1.1-2.9.5l-2.5-1.8c-.9-.7-1.1-2-.5-2.9l2.7-3.8c2.1-3 6.3-3.7 9.2-1.5l.3.2c.2.1.2.2.1.3z"/>
          <path fill="none" stroke="#3A5E77" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="5" d="M186.9 95c-1.4-6.5-2-13.1-1.8-19.7.2-8.7 1.7-17.3 4.7-25.5 2.9-8.2 7.3-15.8 12.8-22.4 4.2-5 11.7-5.6 16.6-1.4 4.5 3.8 5.5 10.3 2.4 15.2l-.2.3c-6 9.8-8.1 21.5-6.6 32.7 1.4 11.2 6.4 21.8 13.5 29.7"/>
        </g>
        <path fill="#DDF1FA" d="M174.5 229.1l-64.4-64.6 41.4-41.4c26.6-26.6 68.8-27.6 94.1-2.2l18.5 18.6-89.6 89.6z"/>
        <path fill="none" stroke="#3A5E77" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="5" d="M256.9 146.8l-82.4 82.4-64.4-64.6 41.4-41.4c1.7-1.7 3.4-3.2 5.2-4.7"/>
        <path fill="#FFF" d="M44.6 520.1C17.4 473.1 4.3 423.6 5.8 373c1.2-40 11.5-80.2 30.7-119.4 31-63.4 74.3-102.7 79.2-107l72.8 82.4.2-.2c-.3.3-33.2 30.2-54.7 75.8-11.6 24.7-17.8 49.4-18.2 73.3-.6 29.6 7.3 58 24.1 86.9l-95.3 55.3z"/>
        <path fill="#FFF" d="M173.8 239.4c17.2-10.1 35.3-19.4 54.4-28-11.2-4.4-22.7-9.1-34.6-14.2.6-9.8 1.1-19.5 1.7-29.3-11.7 2.7-23.3 5.5-34.6 8.5-.9-12.6-1.9-25.2-3-37.9-8.3 2.2-16.5 4.5-24.6 6.9-2.8-9.5-5.6-19.2-8.6-28.9-8.4 15.2-16.1 31-23.1 47.5"/>
        <path fill="none" stroke="#3A5E77" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" d="M173.8 239.4c17.2-10.1 35.3-19.4 54.4-28-11.2-4.4-22.7-9.1-34.6-14.2.6-9.8 1.1-19.5 1.7-29.3-11.7 2.7-23.3 5.5-34.6 8.5-.9-12.6-1.9-25.2-3-37.9-8.3 2.2-16.5 4.5-24.6 6.9-2.8-9.5-5.6-19.2-8.6-28.9-8.4 15.2-16.1 31-23.1 47.5"/>
        <path fill="#FFF" d="M24.5 286c0-14.3.3-28.5.8-42.5 4.4 2 8.7 3.8 13.1 5.4-1.8-12.2-3.4-24.8-4.8-37.9 5.5 3.6 10.9 6.9 16.4 9.8-.2-9.3-.3-18.8-.3-28.3 6 4.2 12 8 18 11.6"/>
        <path fill="none" stroke="#3A5E77" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" d="M24.5 286c0-14.3.3-28.5.8-42.5 4.4 2 8.7 3.8 13.1 5.4-1.8-12.2-3.4-24.8-4.8-37.9 5.5 3.6 10.9 6.9 16.4 9.8-.2-9.3-.3-18.8-.3-28.3 6 4.2 12 8 18 11.6"/>
        <path fill="#FFF" d="M108.6 388.7c6.9-13.4 14.2-25.1 21.7-35.2-4.4-1.1-8.9-2.4-13.3-3.8 9-8.7 18.2-15.9 27.5-21.5-5.6-2.3-11.2-4.9-16.8-7.7 7-5.7 14.2-10.4 21.4-13.9-5.8-3.9-11.6-8.2-17.4-12.9"/>
        <path fill="none" stroke="#3A5E77" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" d="M108.6 388.7c6.9-13.4 14.2-25.1 21.7-35.2-4.4-1.1-8.9-2.4-13.3-3.8 9-8.7 18.2-15.9 27.5-21.5-5.6-2.3-11.2-4.9-16.8-7.7 7-5.7 14.2-10.4 21.4-13.9-5.8-3.9-11.6-8.2-17.4-12.9"/>
        <g>
          <path id="finger-bg" fill="#DDF1FA" d="M307 80.5c-6.4-1.5-12.8 2.4-14.3 8.8l-.2.7c-1.3 5.6-4.3 11-8.3 15.2-4 4.2-8.9 7.3-14 8.8-5.1 1.5-10.5 1.5-15.8.2-5.3-1.3-15-7.2-19-11.6-3.8-4.3-6.7-9.2-8-14.6-1.4-5.4-1.3-11.4.3-17.1 1.6-5.7 4.7-11.1 8.8-14.9 4.1-3.8 8.8-5.8 13.8-5.6h.8c5.7.2 10.9-3.7 12-9.5 1.2-6.4-2.9-12.6-9.3-13.8-5.8-1.1-12-.9-17.8.5-5.8 1.4-11.1 4-15.8 7.2-9.3 6.5-16.1 15.6-20.4 25.6-4.3 10.1-6.1 21.4-4.9 32.6 1.2 11.3 5.6 22.2 11.8 31.3l.3.4c.4.6.9 1.2 1.3 1.7 1.2 1.4 2.6 2.5 4.1 3.5 1.7 3.4 4.4 6.2 8.1 8 8.9 4.4 18.7 7.9 29.3 8.9 10.5 1.1 21.8-.6 31.5-5.1 9.8-4.5 18-11.6 24-20 5.9-8.4 9.8-18.2 10.7-28.6.7-5.8-3.1-11.2-9-12.6z"/>
          <path id="fingernail-1" fill="#A9DDF3" d="M309.4 100.4l-1.7-.4c-2.3-.5-3.7-2.7-3.2-5l2.6-12.4c5.2 1.1 8.5 6.2 7.4 11.3l-.7 3.5c-.5 2.1-2.4 3.4-4.4 3z"/>
          <path id="fingernail-2" fill="#A9DDF3" d="M260.4 35.5h-12.6c-1.2 0-2.2-1-2.2-2.2v-2.8c0-1.2 1-2.2 2.2-2.2h5.9c3.8 0 6.9 3.1 6.9 6.9.1.2-.1.3-.2.3z"/>
          <path id="finger-border" fill="none" stroke="#3A5E77" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="5" d="M195 93c-1.2-11.3.6-22.6 4.9-32.6 4.3-10 11.1-19.1 20.4-25.6 4.6-3.2 10-5.8 15.8-7.2 5.8-1.4 12-1.6 17.8-.5 6.4 1.2 10.6 7.4 9.3 13.8-1.1 5.8-6.3 9.7-12 9.5h-.8c-5-.2-9.7 1.8-13.8 5.6-4.1 3.8-7.2 9.2-8.8 14.9-1.6 5.7-1.6 11.7-.3 17.1 1.3 5.4 4.2 10.3 8 14.6 4.5 5 13.7 10.3 19 11.6 5.3 1.3 10.6 1.3 15.8-.2 5.1-1.5 10-4.6 14-8.8 4-4.2 6.9-9.6 8.3-15.2l.2-.7c1.5-6.4 7.9-10.3 14.3-8.8 5.8 1.4 9.6 6.9 9.1 12.7-1 10.4-4.8 20.2-10.7 28.6-5.9 8.4-14.2 15.5-24 20-7.5 3.5-15.9 5.3-24.2 5.4"/>
        </g>
      </svg>

      {/* Color circle that appears in hand */}
      <div 
        ref={colorCircleRef}
        className="absolute z-40 w-6 h-6 rounded-full bg-primary shadow-lg"
        style={{
          top: '25%',
          left: '80px',
          pointerEvents: 'none'
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Left Column */}
        <div className="md:col-span-4 space-y-8 ml-8">
          <h1 ref={titleRef} className="font-heading text-6xl md:text-7xl font-bold leading-tight">
            <span className="block hey-text text-primary">Hey</span>
            <span className="block">There,</span>
            <span className="block">I'm</span>
            <span className="block aakash-text">Aakash</span>
          </h1>
          <div ref={fadeInsRef}>
            <a href="mailto:aakash@example.com" className="text-primary font-body font-semibold hover:underline" data-fade-in>
              aakash@example.com
            </a>
            <div data-fade-in>
              <p className="text-4xl font-heading font-bold">10</p>
              <p className="font-body text-sm text-muted-foreground">YEARS EXPERIENCE</p>
            </div>
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
        <div className="md:col-span-4">
          <div className="bg-secondary p-6 rounded-lg shadow-lg">
            <p className="font-body text-lg">
              <TypingEffect text="Developer and systems thinker building AI tools, simplifying workflows, mentoring minds, and solving real-world problems with clarity, logic, and purpose." />
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Hero
