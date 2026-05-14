import React from 'react';
import { motion } from 'framer-motion';

interface ValorantAbilitiesProps {
  isActive: boolean;
}

export const ValorantAbilities: React.FC<ValorantAbilitiesProps> = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {/* Jett Dash particles */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-cyan-400"
          initial={{
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            opacity: 1,
          }}
          animate={{
            x: window.innerWidth / 2 + Math.cos((i / 10) * Math.PI * 2) * 200,
            y: window.innerHeight / 2 + Math.sin((i / 10) * Math.PI * 2) * 200,
            opacity: 0,
          }}
          transition={{
            duration: 1.5,
            ease: 'easeOut',
            delay: i * 0.05,
          }}
        />
      ))}
    </div>
  );
};
