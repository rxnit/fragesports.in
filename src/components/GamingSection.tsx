import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Crosshair } from 'lucide-react';

interface GameCard {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const gameCards: GameCard[] = [
  {
    id: '1',
    title: 'Valorant',
    icon: <Crosshair className="w-8 h-8" />,
    description: 'Master tactical gameplay and ability combos',
    color: 'from-red-600 to-red-400',
  },
  {
    id: '2',
    title: 'BGMI',
    icon: <Zap className="w-8 h-8" />,
    description: 'Dominate the battlegrounds with skills',
    color: 'from-yellow-600 to-yellow-400',
  },
];

export const GamingSection: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: 45 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-black z-20 overflow-hidden">
      {/* Background effects */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl sm:text-6xl font-black mb-4 tracking-tight">
            GAMES WE
            <motion.span
              className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-red-500"
              animate={{
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            >
              DOMINATE
            </motion.span>
          </h2>
        </motion.div>

        {/* Game cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {gameCards.map((card) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              whileHover={{ scale: 1.05, rotateY: 10 }}
              onMouseEnter={() => setHoveredId(card.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative h-64"
              style={{
                perspective: '1200px',
              }}
            >
              <motion.div
                className={`relative h-full p-6 bg-gradient-to-br ${card.color} rounded-2xl overflow-hidden cursor-pointer border-2 border-white/20`}
                animate={{
                  boxShadow:
                    hoveredId === card.id
                      ? [`0 0 30px rgba(0, 255, 255, 0.3)`, `0 0 60px rgba(0, 255, 255, 0.6)`, `0 0 30px rgba(0, 255, 255, 0.3)`]
                      : '0 0 10px rgba(0, 0, 0, 0.3)',
                }}
                transition={{
                  duration: 2,
                  repeat: hoveredId === card.id ? Infinity : 0,
                }}
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  animate={{
                    backgroundImage: hoveredId === card.id ? 'radial-gradient(circle at center, white, transparent)' : 'none',
                    backgroundSize: ['0% 0%', '400% 400%'],
                  }}
                  transition={{ duration: 1 }}
                />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between text-white">
                  <div>
                    <motion.div
                      className="mb-4 inline-block p-3 bg-white/20 rounded-xl backdrop-blur"
                      animate={{
                        scale: hoveredId === card.id ? [1, 1.2, 1] : 1,
                        rotate: hoveredId === card.id ? [0, 5, -5, 0] : 0,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {card.icon}
                    </motion.div>

                    <h3 className="text-2xl font-black mb-2">{card.title}</h3>
                    <p className="text-sm leading-relaxed opacity-90">{card.description}</p>
                  </div>

                  {/* Shine effect */}
                  <motion.div
                    className="h-full absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0"
                    animate={
                      hoveredId === card.id
                        ? {
                            opacity: [0, 1, 0],
                            x: ['-100%', '100%'],
                          }
                        : {}
                    }
                    transition={{ duration: 0.6 }}
                  />
                </div>

                {/* Border animation */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-transparent pointer-events-none"
                  animate={{
                    borderColor: hoveredId === card.id ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.2)',
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
