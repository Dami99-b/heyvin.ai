import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

export const AnimatedCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let rafId: number;

    const updatePosition = (e: MouseEvent) => {
      // Use requestAnimationFrame to prevent layout thrashing
      rafId = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
        setIsVisible(true);

        // Hide cursor after 3 seconds of no movement
        clearTimeout(timeout);
        timeout = setTimeout(() => setIsVisible(false), 3000);
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".card") ||
        target.closest(".nav-item") ||
        target.closest(".task-row") ||
        target.closest(".btn") ||
        target.closest('[role="button"]')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    // Only add listeners if not on mobile
    if (window.innerWidth > 768) {
      document.addEventListener("mousemove", updatePosition);
      document.addEventListener("mouseover", handleMouseOver);
    }

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseover", handleMouseOver);
      clearTimeout(timeout);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Don't render on mobile
  if (window.innerWidth <= 768) return null;
  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed pointer-events-none z-50 w-3 h-3 rounded-full border-2 border-[#7C2D3E] mix-blend-difference"
        style={{
          transform: "translate3d(0, 0, 0)",
          willChange: "transform",
        }}
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: isHovering ? 2 : 1,
        }}
        transition={{
          type: "spring",
          damping: 25,
          mass: 0.3,
          stiffness: 300,
        }}
      />

      {/* Glow trail */}
      <motion.div
        className="fixed pointer-events-none z-40 w-24 h-24 rounded-full bg-[#7C2D3E] opacity-0 blur-2xl"
        style={{
          transform: "translate3d(0, 0, 0)",
          willChange: "transform",
          opacity: isVisible ? 0.08 : 0,
        }}
        animate={{
          x: position.x - 48,
          y: position.y - 48,
          scale: isHovering ? 2 : 1,
        }}
        transition={{
          type: "spring",
          damping: 30,
          mass: 0.5,
          stiffness: 200,
        }}
      />
    </>
  );
};
