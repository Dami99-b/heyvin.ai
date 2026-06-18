import React from "react";
import { motion } from "motion/react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "scale";
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className = "",
  threshold = 0.1,
  once = true,
}) => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold, once });

  const getVariants = () => {
    const directions = {
      up: { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } },
      down: { hidden: { opacity: 0, y: -50 }, visible: { opacity: 1, y: 0 } },
      left: { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } },
      right: { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } },
      scale: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
      },
    };
    return directions[direction] || directions.up;
  };

  return (
    <motion.div
      ref={elementRef}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={getVariants()}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
