import React from "react";
import { motion } from "motion/react";
import { Sun, Moon } from "lucide-react";

interface AnimatedThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
  className?: string;
}

export const AnimatedThemeToggle: React.FC<AnimatedThemeToggleProps> = ({
  isDark,
  onToggle,
  className = "",
}) => {
  return (
    <motion.button
      className={`relative w-16 h-8 rounded-full transition-colors ${className}`}
      style={{
        background: isDark ? "#1A1414" : "#FAF7F2",
        border: "1px solid",
        borderColor: isDark ? "#2D2020" : "#E8E0D5",
      }}
      onClick={onToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute top-1 left-1 w-6 h-6 rounded-full flex items-center justify-center shadow-md"
        style={{
          background: isDark ? "#7C2D3E" : "#C9983A",
        }}
        animate={{
          x: isDark ? 32 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        {isDark ? (
          <Moon size={14} className="text-white" />
        ) : (
          <Sun size={14} className="text-white" />
        )}
      </motion.div>
    </motion.button>
  );
};
