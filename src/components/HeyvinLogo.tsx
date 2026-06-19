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
    <div className={`flex flex-col items-center justify-center text-center ${className}`} style={{ opacity }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-300"
      >
        <defs>
          {/* Soft pulsing cyber glow */}
          <radialGradient id="lotusGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ea580c" stopOpacity={glowOpacity * 0.95} />
            <stop offset="50%" stopColor="#7c2d12" stopOpacity={glowOpacity * 0.45} />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Deep gradient for the petals matching the logo image */}
          <linearGradient id="petalGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#4c0519" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#9f1239" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#ea580c" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.95" />
          </linearGradient>

          {/* Golden/Amber glowing stroke outlines */}
          <linearGradient id="strokeGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ea580c" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#fef08a" stopOpacity="1" />
          </linearGradient>

          {/* Bloom component for the glowing path */}
          <filter id="neonBloom" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient background glow */}
        <circle cx="250" cy="250" r="220" fill="url(#lotusGlow)" filter="blur(16px)" />

        {/* Lotus Shape Structure - Shifted translation to 60 for perfect vertical centering */}
        <g transform="translate(0, 60)">
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
            fill="url(#petalGradient)"
            stroke="url(#strokeGradient)"
            strokeWidth="2"
            opacity="0.90"
          />

          {/* Mid Layer Right Petal */}
          <path
            d="M250 350 C340 300, 420 190, 380 110 C350 80, 300 160, 250 250 Z"
            fill="url(#petalGradient)"
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
            filter="url(#neonBloom)"
          />

          {/* Front Layer Left Petal */}
          <path
            d="M250 350 C190 310, 130 250, 150 180 C170 140, 210 210, 250 270 Z"
            fill="url(#petalGradient)"
            stroke="url(#strokeGradient)"
            strokeWidth="1.5"
            opacity="0.95"
          />

          {/* Front Layer Right Petal */}
          <path
            d="M250 350 C310 310, 370 250, 350 180 C330 140, 290 210, 250 270 Z"
            fill="url(#petalGradient)"
            stroke="url(#strokeGradient)"
            strokeWidth="1.5"
            opacity="0.95"
          />
        </g>

        {/* Center Clock Dial Overlay - Shifted to 300 to perfectly match the nested alignment on the centered leaf */}
        <g transform="translate(250, 300)">
          {/* Outer Ring of clock */}
          <circle cx="0" cy="0" r="55" fill="none" stroke="#fbbf24" strokeWidth="1.75" filter="url(#neonBloom)" opacity="0.95" />
          <circle cx="0" cy="0" r="55" fill="#000" fillOpacity="0.15" />

          {/* Hours Ticks */}
          {/* 12 o'clock */}
          <line x1="0" y1="-55" x2="0" y2="-47" stroke="#fff9e6" strokeWidth="2" filter="url(#neonBloom)" />
          {/* 6 o'clock */}
          <line x1="0" y1="55" x2="0" y2="47" stroke="#fff9e6" strokeWidth="2" filter="url(#neonBloom)" />
          {/* 3 o'clock */}
          <line x1="55" y1="0" x2="47" y2="0" stroke="#fff9e6" strokeWidth="2" filter="url(#neonBloom)" />
          {/* 9 o'clock */}
          <line x1="-55" y1="0" x2="-47" y2="0" stroke="#fff9e6" strokeWidth="2" filter="url(#neonBloom)" />

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
                stroke="#fbbf24"
                strokeWidth="1"
                opacity="0.65"
              />
            );
          })}

          {/* Centered Node */}
          <circle cx="0" cy="0" r="4.5" fill="#ffffff" filter="url(#neonBloom)" />

          {/* Elegant clock hands */}
          {/* Hour Hand is elegant white and points to about 10 */}
          <line
            x1="0"
            y1="0"
            x2="-22"
            y2="-18"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#neonBloom)"
          />
          {/* Minute Hand is elegant gold/yellow and points to about 2 */}
          <line
            x1="0"
            y1="0"
            x2="32"
            y2="-16"
            stroke="#fbbf24"
            strokeWidth="2"
            strokeLinecap="round"
            filter="url(#neonBloom)"
          />
        </g>
      </svg>

      {showText && (
        <div className="mt-4 space-y-1">
          <h1 className="text-2xl font-semibold tracking-[0.2em] text-amber-500 font-serif uppercase drop-shadow-[0_2px_10px_rgba(245,158,11,0.25)]">
            Heyvin AI
          </h1>
          <p className="text-[10px] uppercase tracking-[0.35em] text-amber-300/80 font-sans leading-none pl-[0.35em]">
            ...breathe easy
          </p>
        </div>
      )}
    </div>
  );
};
