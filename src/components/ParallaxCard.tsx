import React, { useRef } from "react";
import { motion } from "motion/react";

interface ParallaxCardProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
}

export const ParallaxCard: React.FC<ParallaxCardProps> = ({
  children,
  className = "",
  depth = 0.03,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10 * depth * 100;
    const rotateY = ((x - centerX) / centerX) * 10 * depth * 100;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <motion.div
      ref={cardRef}
      className={`${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: "transform 0.1s ease-out",
      }}
    >
      {children}
    </motion.div>
  );
};
