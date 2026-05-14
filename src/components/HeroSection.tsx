import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, ArrowRight } from 'lucide-react';
import gsap from 'gsap';

export const HeroSection: React.FC<{ onExplore: () => void }> = ({ onExplore }) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      setMousePosition({
        x: (clientX / innerWidth - 0.5) * 20,
        y: (clientY / innerHeight - 0.5) * 20,
      });

      if (titleRef.current) {
        gsap.to(titleRef.current, {
          x: (clientX / innerWidth - 0.5) * 30,
          y: (clientY / innerHeight - 0.5) * 30,
          duration: 0.5,
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const glowVariants = {
    animate: {
      boxShadow: [
        '0 0 20px rgba(239, 68, 68, 0.4)',
        '0 0 60px rgba(239, 68, 68, 0.8)',
        '0 0 20px rgba(239, 68, 68, 0.4)',
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 z-10">
      {/* Glow effects */}
      <motion.div
        className="absolute top-40 -left-32 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-40 -right-32 w-96 h-96 bg-red-500/15 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />

      <motion.div
        ref={titleRef}
        className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <motion.div
            className="inline-block mb-8"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="px-6 py-3 bg-gradient-to-r from-red-600/30 to-orange-600/30 border border-red-600/60 rounded-full text-red-300 text-sm font-bold uppercase tracking-widest backdrop-blur-md">
              Next Generation Gaming
            </span>
          </motion.div>
        </motion.div>

        {/* Main Title */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="relative inline-block">
            <motion.div
              className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter mb-3"
              animate={{
                textShadow: [
                  '0 0 20px rgba(239, 68, 68, 0.4)',
                  '0 0 40px rgba(239, 68, 68, 0.8)',
                  '0 0 20px rgba(239, 68, 68, 0.4)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="block text-white">FRAG</span>
              <motion.span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-orange-500"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: '200% 200%' }}
              >
                ESPORTS
              </motion.span>
            </motion.div>
            <motion.div
              className="absolute -inset-10 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-full blur-3xl -z-10"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          ref={subtitleRef}
          variants={itemVariants}
          className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed font-light"
        >
          Where champions are forged. We dominate across multiple esports titles with cutting-edge strategies and exceptional talent.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div ref={buttonsRef} variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center">
          <motion.button
            onClick={onExplore}
            className="group relative px-10 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold uppercase tracking-wider rounded-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-800"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative flex items-center justify-center gap-2">
              Explore Team
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </span>
          </motion.button>

          <motion.button
            className="group px-10 py-4 border-2 border-red-600 text-red-400 font-bold uppercase tracking-wider rounded-lg hover:bg-red-600/10 transition-all relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-red-600/20"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative">Watch Matches</span>
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-gray-500 text-sm uppercase tracking-wider">Scroll to explore</p>
            <motion.div
              className="w-6 h-10 border-2 border-red-600 rounded-full flex justify-center"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div className="w-1 h-2 bg-red-600 rounded-full mt-2" animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }} />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
