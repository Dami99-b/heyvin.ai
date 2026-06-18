import React from "react";
import { motion } from "motion/react";

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  speed?: number;
}

export const AnimatedGradientText: React.FC<AnimatedGradientTextProps> = ({
  children,
  className = "",
  gradient = "linear-gradient(135deg, #7C2D3E 0%, #C9983A 50%, #7C2D3E 100%)",
  speed = 4,
}) => {
  return (
    <motion.span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: gradient,
        backgroundSize: "200% 100%",
      }}
      animate={{
        backgroundPosition: ["0% 0%", "200% 0%"],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  );
};
