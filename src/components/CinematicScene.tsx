import React from 'react';
import { motion } from 'framer-motion';

interface CinematicSceneProps {
  isActive: boolean;
}

export const CinematicScene: React.FC<CinematicSceneProps> = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {/* Animated shapes */}
      <motion.div
        className="absolute left-1/4 top-1/3 w-32 h-32 border-2 border-cyan-500/30 rounded-full"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        className="absolute right-1/4 bottom-1/3 w-40 h-40 border-2 border-red-500/30"
        style={{ clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }}
        animate={{
          rotate: [360, 0],
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <motion.div
        className="absolute top-1/2 right-1/3 w-24 h-24 border-2 border-purple-500/30"
        animate={{
          rotate: [0, -360],
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
    </div>
  );
};
