"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './intro-animation.css';

const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const introRef = useRef<HTMLDivElement>(null);
  const smileyRef = useRef<SVGSVGElement>(null);
  const smilePathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete });

      // Roll in from left
      tl.fromTo(
        smileyRef.current,
        { x: '-100vw', rotation: -360 },
        { x: '0vw', rotation: 0, duration: 1.5, ease: 'bounce.out' }
      );

      // Smile animation
      tl.to(
        smilePathRef.current,
        {
          attr: { d: 'M 40 60 Q 50 80 60 60' }, // Curved smile path
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        },
        '-=0.5'
      );

      // Hold smile
      tl.to(smileyRef.current, { duration: 0.5 });

      // Fade out
      tl.to(introRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      });
    }, introRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={introRef} className="intro-container">
      <svg ref={smileyRef} className="smiley" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="hsl(var(--primary))" stroke="hsl(var(--foreground))" strokeWidth="4" />
        <circle cx="35" cy="40" r="5" fill="hsl(var(--foreground))" />
        <circle cx="65" cy="40" r="5" fill="hsl(var(--foreground))" />
        <path
          ref={smilePathRef}
          d="M 40 65 Q 50 65 60 65" // Straight line initial path
          stroke="hsl(var(--foreground))"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default IntroAnimation;
