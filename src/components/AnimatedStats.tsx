import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

interface StatItem {
  number: number;
  suffix: string;
  label: string;
  color: string;
}

const stats: StatItem[] = [
  { number: 50, suffix: '+', label: 'Tournament Wins', color: 'from-red-500 to-orange-500' },
  { number: 15, suffix: '+', label: 'Pro Players', color: 'from-orange-500 to-red-500' },
  { number: 100, suffix: '%', label: 'Dedication', color: 'from-red-600 to-orange-600' },
  { number: 10, suffix: 'k+', label: 'Community', color: 'from-orange-600 to-red-600' },
];

export const AnimatedStats: React.FC = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const statElements = statsRef.current?.querySelectorAll('[data-stat-number]');
          statElements?.forEach((el) => {
            const target = parseInt((el as HTMLElement).dataset.statNumber || '0');
            gsap.from(el, {
              textContent: 0,
              duration: 2,
              ease: 'power2.out',
              snap: { textContent: 1 },
              onUpdate: function () {
                (el as HTMLElement).textContent = Math.ceil((this.targets()[0]._gsap.vars.textContent) as any).toString();
              },
            });
          });
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-red-950/10 to-black z-20 overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute top-1/2 -left-40 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto relative" ref={statsRef}>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <motion.div
                className={`relative p-8 bg-gradient-to-br from-gray-900/50 to-red-950/20 border border-red-900/30 rounded-2xl overflow-hidden cursor-pointer hover:border-red-600/60 transition-all`}
                whileHover={{
                  boxShadow: '0 0 30px rgba(239, 68, 68, 0.3)',
                }}
              >
                {/* Animated background gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}
                />

                {/* Content */}
                <div className="relative z-10">
                  <motion.div
                    className={`text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.color} mb-3 font-mono`}
                    whileInView={{ scale: [0.8, 1.1, 1] }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <span data-stat-number={stat.number}>0</span>
                    {stat.suffix}
                  </motion.div>

                  <p className="text-gray-400 font-semibold uppercase tracking-wider text-sm">{stat.label}</p>
                </div>

                {/* Shine effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 pointer-events-none"
                  initial={{ x: '-100%' }}
                  whileHover={{
                    opacity: [0, 0.3, 0],
                    x: ['100%', '-100%'],
                  }}
                  transition={{
                    duration: 0.6,
                    ease: 'easeInOut',
                  }}
                />

                {/* Border animation */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-transparent pointer-events-none"
                  animate={{
                    borderColor: ['rgba(239, 68, 68, 0)', 'rgba(239, 68, 68, 0.5)', 'rgba(239, 68, 68, 0)'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
