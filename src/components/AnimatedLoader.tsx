import React from "react";
import { motion } from "motion/react";

interface AnimatedLoaderProps {
  size?: number;
  color?: string;
}

export const AnimatedLoader: React.FC<AnimatedLoaderProps> = ({
  size = 40,
  color = "#7C2D3E",
}) => {
  const dotCount = 8;

  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: dotCount }).map((_, i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{
            width: size / 4,
            height: size / 4,
            background: color,
          }}
          animate={{
            y: [-size / 4, 0, -size / 4],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 0.8,
            delay: (i / dotCount) * 0.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
