import React from 'react';
import { motion } from 'framer-motion';

interface CyberpunkTextProps {
  text: string;
  className?: string;
  variant?: 'title' | 'subtitle' | 'body';
}

export const CyberpunkText: React.FC<CyberpunkTextProps> = ({ text, className = '', variant = 'body' }) => {
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  };

  const glitchVariants = {
    animate: {
      x: [0, -2, 2, -2, 0],
      y: [0, 2, -2, 2, 0],
      color: ['#ffffff', '#00ff00', '#ff0000', '#00ffff', '#ffffff'],
    },
  };

  const shadowVariants = {
    animate: {
      x: [0, 3, -3, 3, 0],
      y: [0, 3, -3, 3, 0],
      opacity: [0, 0.5, 0.3, 0.5, 0],
    },
  };

  const sizeClasses = {
    title: 'text-4xl sm:text-6xl font-black tracking-tighter',
    subtitle: 'text-xl sm:text-2xl font-bold tracking-wide',
    body: 'text-base font-medium',
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Glitch shadow layer */}
      <motion.div
        className="absolute inset-0 text-transparent"
        variants={shadowVariants}
        animate="animate"
        transition={{ duration: 4, repeat: Infinity }}
      >
        <span className={`${sizeClasses[variant]} text-red-600 blur-sm`}>{text}</span>
      </motion.div>

      {/* Glitch secondary layer */}
      <motion.div
        className="absolute inset-0 text-transparent"
        variants={glitchVariants}
        animate="animate"
        transition={{ duration: 4, repeat: Infinity }}
      >
        <span className={`${sizeClasses[variant]} text-cyan-400`}>{text}</span>
      </motion.div>

      {/* Main text with letter animation */}
      <div className={`${sizeClasses[variant]} relative`}>
        {text.split('').map((letter, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            className="inline-block"
            style={{
              textShadow: `
                0 0 10px rgba(0, 255, 0, 0.8),
                0 0 20px rgba(0, 255, 0, 0.5),
                -2px 0 4px rgba(255, 0, 0, 0.5),
                2px 0 4px rgba(0, 255, 255, 0.5)
              `,
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </div>
    </div>
  );
};
