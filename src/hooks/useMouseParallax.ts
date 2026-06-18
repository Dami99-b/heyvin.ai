import { useState, useEffect, useRef } from 'react';

export const useMouseParallax = (speed: number = 0.05) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) * speed;
      const y = (e.clientY - centerY) * speed;
      setPosition({ x, y });
    };

    element.addEventListener('mousemove', handleMouseMove);
    return () => element.removeEventListener('mousemove', handleMouseMove);
  }, [speed]);

  return { ref, position };
};
