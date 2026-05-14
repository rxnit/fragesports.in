import React from 'react';
import { motion } from 'framer-motion';

export const HolographicUI: React.FC = () => {
  const radarPoints = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    angle: (i * 360) / 8,
    distance: 20 + Math.random() * 30,
  }));

  return (
    <motion.div
      className="fixed top-8 right-8 z-40 w-40 h-40"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Radar Background */}
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient id="radarGradient">
            <stop offset="0%" stopColor="#00ff00" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#00ff00" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background circles */}
        <circle cx="50" cy="50" r="45" fill="url(#radarGradient)" stroke="#00ff00" strokeWidth="0.5" opacity="0.3" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="#00ff00" strokeWidth="0.5" opacity="0.2" />
        <circle cx="50" cy="50" r="15" fill="none" stroke="#00ff00" strokeWidth="0.5" opacity="0.2" />

        {/* Radar lines */}
        {[0, 90, 180, 270].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x2 = 50 + 45 * Math.cos(rad);
          const y2 = 50 + 45 * Math.sin(rad);
          return (
            <line
              key={`line-${angle}`}
              x1="50"
              y1="50"
              x2={x2}
              y2={y2}
              stroke="#00ff00"
              strokeWidth="0.3"
              opacity="0.2"
            />
          );
        })}

        {/* Enemy points */}
        {radarPoints.map((point) => {
          const rad = (point.angle * Math.PI) / 180;
          const x = 50 + (point.distance / 50) * 40 * Math.cos(rad);
          const y = 50 + (point.distance / 50) * 40 * Math.sin(rad);

          return (
            <motion.g key={point.id}>
              <motion.circle
                cx={x}
                cy={y}
                r="2"
                fill="#ff0000"
                opacity="0.8"
                filter="url(#glow)"
                animate={{
                  r: [1.5, 3, 1.5],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: point.id * 0.1,
                }}
              />
            </motion.g>
          );
        })}

        {/* Center point */}
        <motion.circle
          cx="50"
          cy="50"
          r="1.5"
          fill="#00ff00"
          animate={{
            r: [1, 2, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* Scanning line */}
        <motion.line
          x1="50"
          y1="50"
          x2="50"
          y2="5"
          stroke="#00ff00"
          strokeWidth="0.5"
          opacity="0.6"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, linear: true }}
          style={{ transformOrigin: '50px 50px' }}
        />
      </svg>

      {/* Hologram glitch effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(0, 255, 0, 0.05) 25%, rgba(0, 255, 0, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 0, 0.05) 75%, rgba(0, 255, 0, 0.05) 76%, transparent 77%, transparent)`,
          backgroundSize: '100% 3px',
        }}
        animate={{
          opacity: [0.1, 0.5, 0.1],
          backgroundPosition: ['0px 0px', '0px 6px'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
    </motion.div>
  );
};
