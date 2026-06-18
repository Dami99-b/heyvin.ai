import React, { useEffect, useRef } from "react";

interface ConfettiImprovedProps {
  onClose: () => void;
  count?: number;
}

export const ConfettiImproved: React.FC<ConfettiImprovedProps> = ({
  onClose,
  count = 200,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      rotation: number;
      rotationSpeed: number;
      shape: "circle" | "square" | "triangle";
    }[] = [];

    const colors = [
      "#7C2D3E",
      "#C9983A",
      "#A63D2F",
      "#D4893B",
      "#1E6645",
      "#8BA88E",
    ];

    for (let i = 0; i < count; i++) {
      const shapes: ("circle" | "square" | "triangle")[] = [
        "circle",
        "square",
        "triangle",
      ];
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        vx: (Math.random() - 0.5) * 8,
        vy: Math.random() * 6 + 4,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      });
    }

    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08;
        p.vx *= 0.99;
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height + 50) {
          particles[index] = {
            ...p,
            x: Math.random() * canvas.width,
            y: -50,
            vy: Math.random() * 6 + 4,
          };
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = 0.8;

        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        } else if (p.shape === "square") {
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        } else {
          ctx.beginPath();
          ctx.moveTo(0, -p.size / 2);
          ctx.lineTo(-p.size / 2, p.size / 2);
          ctx.lineTo(p.size / 2, p.size / 2);
          ctx.closePath();
          ctx.fillStyle = p.color;
          ctx.fill();
        }

        ctx.restore();
      });

      frame++;

      if (frame < 400) {
        requestAnimationFrame(draw);
      } else {
        onClose();
      }
    };

    draw();

    return () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [count, onClose]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none"
    />
  );
};
