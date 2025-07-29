"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import './intro-animation.css';

if (typeof window !== "undefined") {
  gsap.registerPlugin(MorphSVGPlugin);
}

const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Fade out the container before calling the final onComplete callback
          gsap.to(introRef.current, {
            duration: 0.6,
            opacity: 0,
            onComplete: onComplete
          });
        }
      });

      const mainCtr = introRef.current;
      const eyeLeft = "#eye-left";
      const eyeRight = "#eye-right";
      const eyeToLeft = "#eye-to-left";
      const eyeToRight = "#eye-to-right";
      const smileUp = "#smile-up";
      const smileDown = "#smile-down";
      const smile = "#smile";

      gsap.set(mainCtr, { opacity: 0 });

      tl
        .to(mainCtr, { duration: 0.3, opacity: 1 })
        .to(smileDown, { duration: 0.3, morphSVG: smileUp })
        .to(smile, {
          duration: 0.3,
          rotation: -30,
          transformOrigin: "center center",
          ease: "circ.ease"
        })
        .to(smile, {
          duration: 0.9,
          rotation: 900,
          transformOrigin: "center center",
          ease: "circ.easeInOut"
        })
        .to(eyeLeft, {
          duration: 0.3,
          morphSVG: eyeToLeft,
          ease: "power2.ease"
        }, "-=0.3")
        .to(eyeRight, {
          duration: 0.3,
          morphSVG: eyeToRight,
          ease: "power2.ease"
        }, "-=0.3")
        .to(eyeRight, {
          duration: 0.1,
          scaleY: 0.25,
          scaleX: 1.5,
          transformOrigin: "center center"
        })
        .to(eyeRight, {
          duration: 0.1,
          scale: 1,
          transformOrigin: "center center"
        })
        .addPause(1); // Hold the final state for 1 second before fading out

    }, introRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={introRef} className="intro-container">
      <svg className="intro-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 294 241">
        <g id="group" fill="none" fillRule="evenodd">
          <g id="smile">
            <path id="smile-up" stroke="#FFF" strokeWidth="30" d="M238.797 75.04C222.935 40.772 188.243 17 148 17c-39.62 0-73.857 23.04-90.046 56.453" strokeLinecap="round"/>
            <path id="smile-down" stroke="#FFF" strokeWidth="30" d="M238.843 166c-15.863 34.268-50.554 58.04-90.797 58.04-39.62 0-73.857-23.04-90.046-56.453" strokeLinecap="round"/>
            <path id="bg" fill="#FFF" d="M43 2h211v237H43z" opacity=".1"/>
          </g>
          <path id="eye-left" fill="#FFF" d="M148 173c29.27 0 53-23.73 53-53s-23.73-53-53-53c-4.956 0-9.753.68-14.303 1.952C111.374 75.194 95 95.685 95 120c0 29.27 23.73 53 53 53z"/>
          <path id="eye-right" fill="#FFF" d="M148 173c29.27 0 53-23.73 53-53s-23.73-53-53-53c-4.016 0-7.927.447-11.687 1.293C112.665 73.615 95 94.745 95 120c0 29.27 23.73 53 53 53z"/>
          <path id="eye-to-left" fill="#FFF" d="M106 143c12.15 0 22-9.85 22-22s-9.85-22-22-22c-2.028 0-3.992.274-5.857.788C90.836 102.352 84 110.878 84 121c0 12.15 9.85 22 22 22z"/>
          <path id="eye-to-right" fill="#FFF" d="M187 143c12.15 0 22-9.85 22-22s-9.85-22-22-22c-3.286 0-6.404.72-9.204 2.012C170.242 104.496 165 112.136 165 121c0 12.15 9.85 22 22 22z"/>
        </g>
      </svg>
    </div>
  );
};

export default IntroAnimation;
