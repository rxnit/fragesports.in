import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0">
      {/* Main background */}
      <div className="absolute inset-0 bg-black" />

      {/* Animated gradient spheres */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-red-600/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(255, 0, 0, 0.05) 25%, rgba(255, 0, 0, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 0, 0, 0.05) 75%, rgba(255, 0, 0, 0.05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(0, 255, 255, 0.05) 25%, rgba(0, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, 0.05) 75%, rgba(0, 255, 255, 0.05) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
};
