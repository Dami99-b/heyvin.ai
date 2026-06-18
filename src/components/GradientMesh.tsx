import React, { useState, useEffect, useRef } from "react";

interface GradientMeshProps {
  className?: string;
}

export const GradientMesh: React.FC<GradientMeshProps> = ({
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size - FIXED to prevent overflow
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = w;
      canvas.height = h;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.style.maxWidth = "100vw";
      canvas.style.maxHeight = "100vh";
    };

    resize();
    window.addEventListener("resize", resize);

    const colors = [
      [124, 45, 62],
      [201, 152, 58],
      [166, 61, 47],
      [139, 168, 142],
    ];

    let time = 0;

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      const gridSize = 4;
      const points: [number, number, number][] = [];

      for (let i = 0; i <= gridSize; i++) {
        for (let j = 0; j <= gridSize; j++) {
          const x = (i / gridSize) * w;
          const y = (j / gridSize) * h;
          const colorIdx = Math.floor(Math.random() * colors.length);
          points.push([x, y, colorIdx]);
        }
      }

      for (let i = 0; i < points.length - 1; i++) {
        for (let j = 0; j < points.length - 1; j++) {
          const p1 = points[i];
          const p2 = points[i + 1];
          const p3 = points[j];
          const p4 = points[j + 1];

          if (p1 && p2 && p3 && p4) {
            const x1 = p1[0] + Math.sin(time + i) * 15;
            const y1 = p1[1] + Math.cos(time + j) * 15;

            const gradient = ctx.createRadialGradient(x1, y1, 0, x1, y1, 150);

            const colorIdx1 = Math.floor((i + j + time * 1.5) % colors.length);
            const colorIdx2 = Math.floor(
              (i + j + time * 1.5 + 1) % colors.length,
            );
            const color = colors[colorIdx1];
            const color2 = colors[colorIdx2];

            gradient.addColorStop(
              0,
              `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.06)`,
            );
            gradient.addColorStop(
              1,
              `rgba(${color2[0]}, ${color2[1]}, ${color2[2]}, 0.015)`,
            );

            ctx.fillStyle = gradient;
            ctx.fillRect(x1 - 80, y1 - 80, 160, 160);
          }
        }
      }

      time += 0.002;
      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isVisible]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{
        width: "100vw",
        height: "100vh",
        maxWidth: "100vw",
        maxHeight: "100vh",
        opacity: 0.6,
        overflow: "hidden",
      }}
    />
  );
};
