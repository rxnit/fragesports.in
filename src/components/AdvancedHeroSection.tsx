import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Zap, Crosshair } from 'lucide-react';
import gsap from 'gsap';
import { CyberpunkText } from './CyberpunkText';

interface AdvancedHeroSectionProps {
  onExplore: () => void;
}

export const AdvancedHeroSection: React.FC<AdvancedHeroSectionProps> = ({ onExplore }) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.05;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.05;

        gsap.to(titleRef.current, {
          x,
          y,
          duration: 0.3,
          overwrite: 'auto',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

      {/* Animated gradient overlays */}
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-500/20 rounded-full blur-3xl pointer-events-none"
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Animated grid */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(0, 255, 0, 0.05) 25%, rgba(0, 255, 0, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 0, 0.05) 75%, rgba(0, 255, 0, 0.05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(0, 255, 0, 0.05) 25%, rgba(0, 255, 0, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 0, 0.05) 75%, rgba(0, 255, 0, 0.05) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '50px 50px'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Crosshair Badge */}
        <motion.div variants={itemVariants} className="mb-8 inline-block">
          <motion.div
            className="px-6 py-3 bg-gradient-to-r from-cyan-600/30 to-red-600/30 border-2 border-cyan-500 rounded-lg backdrop-blur-md relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-red-500/0"
              animate={{
                backgroundImage: [
                  'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.2), transparent)',
                  'linear-gradient(90deg, transparent, rgba(255, 0, 0, 0.2), transparent)',
                  'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.2), transparent)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="relative flex items-center justify-center gap-2">
              <Crosshair className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-300 text-sm font-bold uppercase tracking-widest">Locked & Loaded</span>
              <Zap className="w-4 h-4 text-red-400" />
            </div>
          </motion.div>
        </motion.div>

        {/* Main Title with Glitch Effect */}
        <motion.div ref={titleRef} variants={itemVariants} className="mb-6">
          <CyberpunkText text="FRAG" variant="title" />
          <motion.div className="h-2" />
          <CyberpunkText text="SUPREMACY" variant="title" />
        </motion.div>

        {/* Subtitle with animations */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl lg:text-2xl text-cyan-300 mb-8 max-w-3xl mx-auto leading-relaxed font-light tracking-wider"
        >
          Command the field. Dominate the competition. Level up your game with{' '}
          <motion.span
            className="text-red-400 font-bold"
            animate={{
              textShadow: [
                '0 0 10px rgba(255, 0, 0, 0.5)',
                '0 0 20px rgba(255, 0, 0, 0.8)',
                '0 0 10px rgba(255, 0, 0, 0.5)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            FRAG ESPORTS
          </motion.span>
        </motion.p>

        {/* CTA Buttons with advanced effects */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center">
          <motion.button
            onClick={onExplore}
            className="group relative px-10 py-4 overflow-hidden rounded-lg font-bold uppercase tracking-wider text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-cyan-500"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4 }}
            />

            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
              animate={isHovered ? { x: ['-100%', '100%'] } : {}}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />

            <span className="relative text-white flex items-center justify-center gap-2">
              <Flame className="w-5 h-5" />
              ENTER THE ARENA
              <motion.span
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                →
              </motion.span>
            </span>
          </motion.button>

          <motion.button
            className="group relative px-10 py-4 overflow-hidden rounded-lg font-bold uppercase tracking-wider text-lg border-2 border-red-500 text-red-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-red-600/20"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4 }}
            />
            <span className="relative flex items-center justify-center gap-2">
              WATCH BATTLES
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ◉
              </motion.span>
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};
