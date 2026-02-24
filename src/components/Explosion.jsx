import { useState, useEffect, useCallback } from "react";

const COLORS = [
  "#3b82f6", // blue-500
  "#60a5fa", // blue-400
  "#93c5fd", // blue-300
  "#a855f7", // purple-500
  "#c084fc", // purple-400
  "#d8b4fe", // purple-300
  "#06b6d4", // cyan-500
  "#22d3ee", // cyan-400
  "#818cf8", // indigo-400
  "#e879f9", // fuchsia-400
];

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function useExplosion() {
  const [circles, setCircles] = useState([]);
  const [lines, setLines] = useState([]);
  const [key, setKey] = useState(0);

  const trigger = useCallback(() => {
    const numCircles = 16;
    const numLines = 32;

    setCircles(
      Array.from({ length: numCircles }, (_, i) => ({
        id: i,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        // stagger spawn: each circle starts ~100ms after the last + small jitter
        delay: i * 100 + randomBetween(0, 60),
        duration: randomBetween(2200, 2800),
      }))
    );

    setLines(
      Array.from({ length: numLines }, (_, i) => ({
        id: i,
        angle: (360 / numLines) * i + randomBetween(-3, 3),
        // length in SVG % space — 70-90 easily reaches beyond screen edges
        length: randomBetween(70, 90),
        width: randomBetween(1.5, 4),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: randomBetween(0, 150),
        duration: randomBetween(600, 1200),
      }))
    );

    setKey((k) => k + 1);
  }, []);

  return { circles, lines, key, trigger };
}

// Centered, starts 20px, scales up to cover full screen
function Circle({ color, delay, duration }) {
  return (
    <div
      className="absolute rounded-full"
      style={{
        width: 20,
        height: 20,
        backgroundColor: color,
        left: "calc(50% - 10px)",
        top: "calc(50% - 10px)",
        opacity: 0,
        animation: `aibCircleExplode ${duration}ms ${delay}ms cubic-bezier(0.1, 0.4, 0.2, 1) forwards`,
        mixBlendMode: "screen",
      }}
    />
  );
}

// Lines radiate from center (50%, 50%)
function SpeedLine({ angle, length, width, color, delay, duration }) {
  const rad = (angle * Math.PI) / 180;
  const x2 = 50 + length * Math.cos(rad);
  const y2 = 50 + length * Math.sin(rad);

  return (
    <line
      x1="50%"
      y1="50%"
      x2={`${x2}%`}
      y2={`${y2}%`}
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      style={{
        opacity: 0,
        animation: `aibLineExplode ${duration}ms ${delay}ms ease-out forwards`,
      }}
    />
  );
}

export default function Explosion() {
  const { circles, lines, key, trigger } = useExplosion();

  useEffect(() => {
    trigger();
  }, [trigger]);

  return (
    <div
      className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 z-[60] overflow-hidden"
      style={{ animation: "aibFadeOut 400ms 2100ms ease-out forwards" }}
    >
      <style>{`
        /* Each circle starts tiny at center, expands outward to fill screen */
        @keyframes aibCircleExplode {
          0%   { transform: scale(0);   opacity: 1;    }
          15%  { transform: scale(8);   opacity: 0.9;  }
          40%  { transform: scale(40);  opacity: 0.75; }
          65%  { transform: scale(100); opacity: 0.45; }
          85%  { transform: scale(145); opacity: 0.15; }
          100% { transform: scale(160); opacity: 0;    }
        }
        /* Lines draw out from center then fade */
        @keyframes aibLineExplode {
          0%   { opacity: 0.9; stroke-dasharray: 0 2000;    stroke-dashoffset: 0;    }
          40%  { opacity: 1;   stroke-dasharray: 2000 0;                             }
          100% { opacity: 0;   stroke-dasharray: 2000 0;    stroke-dashoffset: -600; }
        }
        /* Central burst flash */
        @keyframes aibFlash {
          0%   { transform: scale(0);  opacity: 1;   }
          25%  { transform: scale(6);  opacity: 0.9; }
          100% { transform: scale(35); opacity: 0;   }
        }
        /* Whole overlay fades out before unmounting */
        @keyframes aibFadeOut {
          0%   { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>

      {/* Speed lines — from center outward */}
      <svg
        key={`lines-${key}`}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        {lines.map((l) => (
          <SpeedLine key={l.id} {...l} />
        ))}
      </svg>

      {/* Expanding circles — all centered, grow to fill screen */}
      <div key={`circles-${key}`} className="absolute inset-0 pointer-events-none">
        {circles.map((c) => (
          <Circle key={c.id} {...c} />
        ))}
      </div>

      {/* Central flash burst */}
      <div
        key={`flash-${key}`}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 40,
          height: 40,
          left: "calc(50% - 20px)",
          top: "calc(50% - 20px)",
          background: "radial-gradient(circle, #ffffff, #93c5fd, #a855f7)",
          animation: "aibFlash 500ms ease-out forwards",
        }}
      />
    </div>
  );
}
