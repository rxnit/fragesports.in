import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Zap, Shield, Flame, Skull, Star } from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const badges: Badge[] = [
  {
    id: '1',
    name: 'Ace Performer',
    icon: <Skull className="w-6 h-6" />,
    description: '5 kills in a single round',
    rarity: 'legendary',
  },
  {
    id: '2',
    name: 'Clutch Master',
    icon: <Zap className="w-6 h-6" />,
    description: '1v5 win streak',
    rarity: 'epic',
  },
  {
    id: '3',
    name: 'Unbreakable',
    icon: <Shield className="w-6 h-6" />,
    description: '5 flawless rounds',
    rarity: 'epic',
  },
  {
    id: '4',
    name: 'Inferno',
    icon: <Flame className="w-6 h-6" />,
    description: 'Double kill streak',
    rarity: 'rare',
  },
  {
    id: '5',
    name: 'Champion',
    icon: <Trophy className="w-6 h-6" />,
    description: 'Win 10 tournaments',
    rarity: 'legendary',
  },
  {
    id: '6',
    name: 'Star Player',
    icon: <Star className="w-6 h-6" />,
    description: 'MVP 5 times',
    rarity: 'epic',
  },
];

const rarityColors = {
  common: 'from-gray-600 to-gray-500',
  rare: 'from-blue-600 to-blue-500',
  epic: 'from-purple-600 to-purple-500',
  legendary: 'from-orange-600 to-red-500',
};

export const AchievementBadges: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-red-950/10 to-black z-20 overflow-hidden">
      {/* Background effects */}
      <motion.div
        className="absolute top-1/2 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          y: [0, 100, 0],
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl sm:text-6xl font-black mb-4 tracking-tight">
            ACHIEVEMENTS &
            <motion.span
              className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500"
              animate={{
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            >
              BADGES
            </motion.span>
          </h2>
          <p className="text-gray-400 mt-4 text-lg">Unlock legendary achievements and prove your worth</p>
        </motion.div>

        {/* Badges grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {badges.map((badge) => (
            <motion.div
              key={badge.id}
              variants={badgeVariants}
              whileHover={{ y: -10 }}
              onMouseEnter={() => setHoveredId(badge.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative"
            >
              <motion.div
                className={`relative p-8 bg-gradient-to-br ${rarityColors[badge.rarity]} rounded-2xl border-2 border-white/20 overflow-hidden cursor-pointer`}
                animate={{
                  boxShadow:
                    hoveredId === badge.id
                      ? ['0 0 20px rgba(0, 0, 0, 0.5)', '0 0 40px rgba(0, 0, 0, 0.8)', '0 0 20px rgba(0, 0, 0, 0.5)']
                      : '0 0 10px rgba(0, 0, 0, 0.3)',
                }}
                transition={{
                  duration: 2,
                  repeat: hoveredId === badge.id ? Infinity : 0,
                }}
              >
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0"
                  animate={
                    hoveredId === badge.id
                      ? {
                          opacity: [0, 1, 0],
                          x: ['-100%', '100%'],
                        }
                      : {}
                  }
                  transition={{ duration: 0.6 }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <motion.div
                    className="mb-4 p-4 bg-white/10 rounded-full backdrop-blur"
                    animate={{
                      scale: hoveredId === badge.id ? [1, 1.3, 1] : 1,
                      rotate: hoveredId === badge.id ? [0, 360] : 0,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="text-white">{badge.icon}</div>
                  </motion.div>

                  <h3 className="text-xl font-black text-white mb-2">{badge.name}</h3>

                  <motion.p
                    className="text-sm text-white/80"
                    animate={{
                      opacity: hoveredId === badge.id ? 1 : 0.6,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {badge.description}
                  </motion.p>

                  <motion.div
                    className="mt-4 px-4 py-1 bg-white/20 rounded-full text-xs font-bold text-white uppercase tracking-wider"
                    animate={{
                      scale: hoveredId === badge.id ? 1.1 : 1,
                    }}
                  >
                    {badge.rarity}
                  </motion.div>
                </div>

                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  animate={{
                    boxShadow: hoveredId === badge.id ? 'inset 0 0 30px rgba(255, 255, 255, 0.2)' : 'inset 0 0 0px rgba(255, 255, 255, 0)',
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
