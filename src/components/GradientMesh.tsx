import React, { useEffect, useRef } from "react";

interface GradientMeshProps {
  className?: string;
}

export const GradientMesh: React.FC<GradientMeshProps> = ({
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isMountedRef = useRef<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Set canvas size with device pixel ratio for sharpness
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Pre-compute colors for better performance
    const colors = [
      [124, 45, 62], // Wine
      [201, 152, 58], // Gold
      [166, 61, 47], // Terracotta
      [139, 168, 142], // Sage
      [201, 152, 58], // Gold
      [124, 45, 62], // Wine
    ];

    let time = 0;
    let frameCount = 0;

    const draw = () => {
      if (!isMountedRef.current || !ctx || !canvas) return;

      // Clear with transparency
      ctx.clearRect(0, 0, width, height);

      // Use fewer points for better performance
      const gridSize = 4;
      const points: [number, number, number][] = [];

      // Generate grid points
      for (let i = 0; i <= gridSize; i++) {
        for (let j = 0; j <= gridSize; j++) {
          const x = (i / gridSize) * width;
          const y = (j / gridSize) * height;
          const colorIdx = Math.floor(Math.random() * colors.length);
          points.push([x, y, colorIdx]);
        }
      }

      // Draw gradient mesh
      for (let i = 0; i < points.length - 1; i++) {
        for (let j = 0; j < points.length - 1; j++) {
          const p1 = points[i];
          const p2 = points[i + 1];
          const p3 = points[j];
          const p4 = points[j + 1];

          if (p1 && p2 && p3 && p4) {
            const x1 = p1[0] + Math.sin(time + i * 0.5) * 15;
            const y1 = p1[1] + Math.cos(time + j * 0.5) * 15;

            const gradient = ctx.createRadialGradient(x1, y1, 0, x1, y1, 150);

            const colorIdx1 = Math.floor((i + j + time * 1.2) % colors.length);
            const colorIdx2 = Math.floor(
              (i + j + time * 1.2 + 1) % colors.length,
            );
            const color = colors[colorIdx1];
            const color2 = colors[colorIdx2];

            gradient.addColorStop(
              0,
              `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.05)`,
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

      // Slow down animation speed
      time += 0.0015;
      frameCount++;

      // Only request next frame if still mounted
      if (isMountedRef.current) {
        animationFrameRef.current = requestAnimationFrame(draw);
      }
    };

    // Start the animation loop
    draw();

    // Cleanup function
    return () => {
      isMountedRef.current = false;
      window.removeEventListener("resize", resize);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100vw",
          height: "100vh",
          opacity: 0.5,
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      />
    </div>
  );
};
