import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image_url?: string;
  bio?: string;
}

interface Team3DProps {
  teamMembers: TeamMember[];
}

export const Team3D: React.FC<Team3DProps> = ({ teamMembers }) => {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent, cardId: string) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setMousePosition({ x: x * 0.1, y: y * 0.1 });
  };

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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
    hover: {
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-black z-20 overflow-hidden">
      {/* Background elements */}
      <motion.div
        className="absolute top-20 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
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
            MEET THE
            <motion.span
              className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500"
              animate={{
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            >
              PLAYERS
            </motion.span>
          </h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-red-600 to-orange-500 mx-auto mt-4 rounded"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Team grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {teamMembers.length > 0 ? (
            teamMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={cardVariants}
                whileHover="hover"
                onMouseMove={(e) => handleMouseMove(e, member.id)}
                onMouseEnter={() => setActiveCard(member.id)}
                onMouseLeave={() => setActiveCard(null)}
                className="group relative"
              >
                <motion.div
                  className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-black border border-red-900/30 h-96 cursor-pointer"
                  animate={{
                    rotateX: activeCard === member.id ? mousePosition.y : 0,
                    rotateY: activeCard === member.id ? -mousePosition.x : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 100, damping: 10 }}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Image container */}
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-red-900/20 to-red-950/20">
                    {member.image_url ? (
                      <motion.img
                        src={member.image_url}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        animate={{
                          scale: activeCard === member.id ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Users className="w-20 h-20 text-red-600/30" />
                      </div>
                    )}

                    {/* Overlay gradient */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
                      animate={{
                        opacity: activeCard === member.id ? 1 : 0.5,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  {/* Info */}
                  <div className="p-5 relative">
                    <h3 className="text-2xl font-black mb-1 group-hover:text-red-400 transition-colors">{member.name}</h3>
                    <p className="text-red-500 text-sm font-bold mb-3 uppercase tracking-wider">{member.role}</p>

                    {/* Expandable bio */}
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: activeCard === member.id ? 1 : 0,
                        height: activeCard === member.id ? 'auto' : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      {member.bio && <p className="text-gray-400 text-sm leading-relaxed mt-2">{member.bio}</p>}
                    </motion.div>

                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 rounded-xl"
                      animate={{
                        opacity: activeCard === member.id ? [0, 0.2, 0] : 0,
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: activeCard === member.id ? Infinity : 0,
                        repeatDelay: 2,
                      }}
                    />
                  </div>

                  {/* Glow border */}
                  <motion.div
                    className="absolute inset-0 rounded-xl border border-red-600/0 pointer-events-none"
                    animate={{
                      borderColor: activeCard === member.id ? 'rgba(239, 68, 68, 0.6)' : 'rgba(239, 68, 68, 0)',
                      boxShadow: activeCard === member.id ? '0 0 30px rgba(239, 68, 68, 0.4), inset 0 0 30px rgba(239, 68, 68, 0.1)' : 'none',
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-16 text-gray-500">
              <p className="text-lg">Loading champions...</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
