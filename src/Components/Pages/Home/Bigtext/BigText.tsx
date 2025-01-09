"use client";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const BigText = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const element = textRef.current;
    const container = containerRef.current;

    if (!element || !container) return;

    gsap.to(element, {
      xPercent: -100,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=100%", // Adjusted to ensure enough scrolling space
        scrub: 1,
        pin: true,
        markers: true, // Remove in production
        invalidateOnRefresh: true,
      },
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div>
      <section ref={containerRef} className="relative h-screen overflow-hidden">
        <div className="absolute top-1/2 left-0 min-w-[150vw] -translate-y-1/2">
          <h1
            ref={textRef}
            className="text-[15vw] font-bold text-gray-900 whitespace-nowrap"
          >
            Elevate your digital skills presence
          </h1>
        </div>
      </section>
    </div>
  );
};

export default BigText;
