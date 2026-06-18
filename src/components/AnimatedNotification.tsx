import React from "react";
import { motion, AnimatePresence } from "motion/react";

interface AnimatedNotificationProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  onClose: () => void;
  duration?: number;
}

export const AnimatedNotification: React.FC<AnimatedNotificationProps> = ({
  message,
  type = "info",
  onClose,
  duration = 4000,
}) => {
  const colors = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
  };

  const icons = {
    success: "✓",
    error: "✗",
    info: "🛈",
    warning: "⚠",
  };

  React.useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.9 }}
        className={`fixed top-4 right-4 z-50 p-4 rounded-xl border-2 shadow-lg max-w-md ${colors[type]}`}
      >
        <div className="flex items-start gap-3">
          <span className="text-xl">{icons[type]}</span>
          <div className="flex-1">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-current opacity-30 rounded-b-xl"
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: duration / 1000, ease: "linear" }}
        />
      </motion.div>
    </AnimatePresence>
  );
};
