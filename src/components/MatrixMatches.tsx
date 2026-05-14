import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock } from 'lucide-react';

interface Match {
  id: string;
  title: string;
  opponent: string;
  game: string;
  scheduled_at: string;
  status: string;
}

interface MatrixMatchesProps {
  matches: Match[];
}

export const MatrixMatches: React.FC<MatrixMatchesProps> = ({ matches }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('all');

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

  const matchVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    hover: {
      x: 10,
      transition: { duration: 0.2 },
    },
  };

  const games = [...new Set(matches.map((m) => m.game))];

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-black z-20 overflow-hidden">
      {/* Background effects */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none"
        animate={{
          y: [0, 100, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl sm:text-6xl font-black mb-4 tracking-tight">
            UPCOMING
            <motion.span
              className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500"
              animate={{
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            >
              BATTLES
            </motion.span>
          </h2>

          {/* Filters */}
          <motion.div className="flex flex-wrap gap-3 mt-6">
            {['all', ...games].map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-6 py-2 rounded-full font-bold uppercase text-sm tracking-wider transition-all ${
                  selectedFilter === filter
                    ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white'
                    : 'bg-gray-900/50 text-gray-400 hover:text-white border border-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter === 'all' ? 'All Games' : filter}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Matches Grid */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {matches
            .filter((match) => selectedFilter === 'all' || match.game === selectedFilter)
            .map((match) => {
              const matchDate = new Date(match.scheduled_at);
              const isHovered = hoveredId === match.id;

              return (
                <motion.div
                  key={match.id}
                  variants={matchVariants}
                  whileHover="hover"
                  onMouseEnter={() => setHoveredId(match.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="relative group"
                >
                  {/* Background gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-transparent rounded-lg opacity-0"
                    animate={{
                      opacity: isHovered ? 0.5 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="relative p-6 bg-gradient-to-r from-gray-900/40 to-red-950/20 border-l-4 border-red-600 rounded-lg backdrop-blur hover:border-orange-500 transition-all overflow-hidden">
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-red-600/0 to-orange-600/0"
                      animate={{
                        backgroundImage: isHovered
                          ? 'linear-gradient(to right, rgba(239, 68, 68, 0.1), rgba(249, 115, 22, 0.05))'
                          : 'linear-gradient(to right, rgba(239, 68, 68, 0), rgba(249, 115, 22, 0))',
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <motion.p
                          className="text-red-500 text-sm font-bold uppercase tracking-wider mb-2"
                          animate={{
                            color: isHovered ? '#fbbf24' : '#ef4444',
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {match.game}
                        </motion.p>

                        <motion.h3
                          className="text-xl sm:text-2xl font-black tracking-tight text-white mb-2"
                          animate={{
                            x: isHovered ? 5 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {match.title}
                        </motion.h3>

                        <p className="text-gray-400">
                          vs{' '}
                          <motion.span
                            className="text-white font-bold"
                            animate={{
                              color: isHovered ? '#fbbf24' : '#ffffff',
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            {match.opponent}
                          </motion.span>
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 items-start md:items-center">
                        <motion.div
                          className="text-right"
                          animate={{
                            x: isHovered ? -10 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <p className="text-red-500 font-bold flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {matchDate.toLocaleDateString()}
                          </p>
                          <p className="text-gray-400 text-sm">{matchDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </motion.div>

                        <motion.button
                          className="px-6 py-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold uppercase text-sm tracking-wide rounded transition-all flex items-center gap-2"
                          animate={{
                            scale: isHovered ? 1.1 : 1,
                          }}
                          transition={{ duration: 0.2 }}
                          whileHover={{
                            boxShadow: '0 0 20px rgba(239, 68, 68, 0.5)',
                          }}
                        >
                          <Play className="w-4 h-4" />
                          Watch
                        </motion.button>
                      </div>
                    </div>

                    {/* Glow line animation */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-600 to-orange-500 rounded"
                      initial={{ width: 0 }}
                      animate={{
                        width: isHovered ? '100%' : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              );
            })}

          {matches.length === 0 && (
            <motion.div
              className="text-center py-16 text-gray-500"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-lg">No matches scheduled yet. Check back soon!</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
