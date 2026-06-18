import React from "react";

interface HeyvinLogoProps {
  size?: number | string;
  className?: string;
  opacity?: number;
  glowOpacity?: number;
  showText?: boolean;
}

export const HeyvinLogo: React.FC<HeyvinLogoProps> = ({
  size = 120,
  className = "",
  opacity = 1,
  glowOpacity = 0.5,
  showText = false,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${className}`}
      style={{ opacity }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-300 hover:scale-105"
      >
        <defs>
          {/* Warm brand glow */}
          <radialGradient id="warmGlow" cx="50%" cy="50%" r="50%">
            <stop
              offset="0%"
              stopColor="#7C2D3E"
              stopOpacity={glowOpacity * 0.8}
            />
            <stop
              offset="40%"
              stopColor="#A63D2F"
              stopOpacity={glowOpacity * 0.4}
            />
            <stop offset="100%" stopColor="#C9983A" stopOpacity="0" />
          </radialGradient>

          {/* Petal gradient - wine to gold */}
          <linearGradient
            id="petalGradient"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#4A1622" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#7C2D3E" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#C9983A" stopOpacity="0.95" />
          </linearGradient>

          {/* Petal gradient 2 - terracotta warmth */}
          <linearGradient
            id="petalGradient2"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#A63D2F" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#C9684D" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#D4893B" stopOpacity="0.9" />
          </linearGradient>

          {/* Stroke gradient */}
          <linearGradient id="strokeGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#7C2D3E" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#C9983A" stopOpacity="0.9" />
          </linearGradient>

          {/* Gold accent */}
          <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9983A" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#D4893B" stopOpacity="0.9" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="warmBloom" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Soft glow */}
          <filter id="softBloom" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient background glow */}
        <circle
          cx="250"
          cy="250"
          r="220"
          fill="url(#warmGlow)"
          filter="blur(20px)"
          opacity={0.6}
        />

        {/* Lotus Shape Structure */}
        <g transform="translate(0, 15)">
          {/* Back Outermost Left Petal */}
          <path
            d="M250 350 C140 330, 40 250, 70 170 C90 125, 160 170, 250 260 Z"
            fill="url(#petalGradient)"
            stroke="url(#strokeGradient)"
            strokeWidth="1.5"
            opacity="0.80"
          />

          {/* Back Outermost Right Petal */}
          <path
            d="M250 350 C360 330, 460 250, 430 170 C410 125, 340 170, 250 260 Z"
            fill="url(#petalGradient)"
            stroke="url(#strokeGradient)"
            strokeWidth="1.5"
            opacity="0.80"
          />

          {/* Mid Layer Left Petal */}
          <path
            d="M250 350 C160 300, 80 190, 120 110 C150 80, 200 160, 250 250 Z"
            fill="url(#petalGradient2)"
            stroke="url(#strokeGradient)"
            strokeWidth="2"
            opacity="0.90"
          />

          {/* Mid Layer Right Petal */}
          <path
            d="M250 350 C340 300, 420 190, 380 110 C350 80, 300 160, 250 250 Z"
            fill="url(#petalGradient2)"
            stroke="url(#strokeGradient)"
            strokeWidth="2"
            opacity="0.90"
          />

          {/* Center Vertical Core Petal */}
          <path
            d="M250 350 C190 250, 190 110, 250 30 C310 110, 310 250, 250 350 Z"
            fill="url(#petalGradient)"
            stroke="url(#strokeGradient)"
            strokeWidth="2.5"
            filter="url(#warmBloom)"
          />

          {/* Front Layer Left Petal */}
          <path
            d="M250 350 C190 310, 130 250, 150 180 C170 140, 210 210, 250 270 Z"
            fill="url(#petalGradient2)"
            stroke="url(#strokeGradient)"
            strokeWidth="1.5"
            opacity="0.95"
          />

          {/* Front Layer Right Petal */}
          <path
            d="M250 350 C310 310, 370 250, 350 180 C330 140, 290 210, 250 270 Z"
            fill="url(#petalGradient2)"
            stroke="url(#strokeGradient)"
            strokeWidth="1.5"
            opacity="0.95"
          />
        </g>

        {/* Center Dial Overlay */}
        <g transform="translate(250, 255)">
          {/* Outer Ring */}
          <circle
            cx="0"
            cy="0"
            r="55"
            fill="none"
            stroke="url(#goldAccent)"
            strokeWidth="1.75"
            filter="url(#warmBloom)"
            opacity="0.95"
          />
          <circle cx="0" cy="0" r="55" fill="#4A1622" fillOpacity="0.15" />

          {/* Hours Ticks */}
          {/* 12 o'clock */}
          <line
            x1="0"
            y1="-55"
            x2="0"
            y2="-47"
            stroke="#F2EDE8"
            strokeWidth="2"
            filter="url(#warmBloom)"
          />
          {/* 6 o'clock */}
          <line
            x1="0"
            y1="55"
            x2="0"
            y2="47"
            stroke="#F2EDE8"
            strokeWidth="2"
            filter="url(#warmBloom)"
          />
          {/* 3 o'clock */}
          <line
            x1="55"
            y1="0"
            x2="47"
            y2="0"
            stroke="#F2EDE8"
            strokeWidth="2"
            filter="url(#warmBloom)"
          />
          {/* 9 o'clock */}
          <line
            x1="-55"
            y1="0"
            x2="-47"
            y2="0"
            stroke="#F2EDE8"
            strokeWidth="2"
            filter="url(#warmBloom)"
          />

          {/* Extra smaller minute markers */}
          {[30, 60, 120, 150, 210, 240, 300, 330].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = Math.sin(rad) * 55;
            const y1 = -Math.cos(rad) * 55;
            const x2 = Math.sin(rad) * 50;
            const y2 = -Math.cos(rad) * 50;
            return (
              <line
                key={angle}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#C9983A"
                strokeWidth="1"
                opacity="0.65"
              />
            );
          })}

          {/* Centered Node */}
          <circle
            cx="0"
            cy="0"
            r="4.5"
            fill="#C9983A"
            filter="url(#warmBloom)"
          />

          {/* Elegant clock hands */}
          {/* Hour Hand */}
          <line
            x1="0"
            y1="0"
            x2="-22"
            y2="-18"
            stroke="#F2EDE8"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#warmBloom)"
          />
          {/* Minute Hand */}
          <line
            x1="0"
            y1="0"
            x2="32"
            y2="-16"
            stroke="#C9983A"
            strokeWidth="2"
            strokeLinecap="round"
            filter="url(#warmBloom)"
          />
        </g>

        {/* Decorative floating particles */}
        <circle
          cx="80"
          cy="80"
          r="3"
          fill="#C9983A"
          opacity="0.3"
          filter="url(#softBloom)"
        >
          <animate
            attributeName="opacity"
            values="0.3;0.6;0.3"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          cx="420"
          cy="90"
          r="2"
          fill="#D4893B"
          opacity="0.25"
          filter="url(#softBloom)"
        >
          <animate
            attributeName="opacity"
            values="0.25;0.5;0.25"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          cx="70"
          cy="400"
          r="2.5"
          fill="#7C2D3E"
          opacity="0.2"
          filter="url(#softBloom)"
        >
          <animate
            attributeName="opacity"
            values="0.2;0.45;0.2"
            dur="3.5s"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          cx="430"
          cy="410"
          r="2"
          fill="#C9684D"
          opacity="0.25"
          filter="url(#softBloom)"
        >
          <animate
            attributeName="opacity"
            values="0.25;0.5;0.25"
            dur="4.5s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      {showText && (
        <div className="mt-4 space-y-1">
          <h1 className="text-2xl font-serif font-bold tracking-[0.15em] text-[#1A1414] uppercase">
            <span className="bg-gradient-to-r from-[#7C2D3E] via-[#C9983A] to-[#7C2D3E] bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer-text">
              Heyvin AI
            </span>
          </h1>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#6B5C54] font-sans leading-none opacity-80">
            ...your private focus companion
          </p>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-[#C9983A]" />
            <span className="text-[8px] tracking-[0.3em] text-[#9D8C82] font-mono uppercase">
              Sovereignty
            </span>
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-[#C9983A]" />
          </div>
        </div>
      )}
    </div>
  );
};
