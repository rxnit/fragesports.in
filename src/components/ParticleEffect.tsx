import React from 'react';
import { motion } from 'framer-motion';

export const ParticleEffect: React.FC = () => {
  // Simple motion-based particles instead of canvas for better performance
  const particles = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    delay: i * 0.2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-2 h-2 rounded-full bg-red-500"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0.6,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          transition={{
            duration: 4,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};
