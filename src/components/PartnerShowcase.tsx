import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  logo_url?: string;
  category: string;
}

interface PartnerShowcaseProps {
  partners: Partner[];
}

export const PartnerShowcase: React.FC<PartnerShowcaseProps> = ({ partners }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const partnerVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-red-950/5 to-black z-20 overflow-hidden">
      {/* Background effects */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 6, repeat: Infinity }}
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
            OUR
            <motion.span
              className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500"
              animate={{
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            >
              PARTNERS
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

        {/* Partners Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {partners.length > 0 ? (
            partners.map((partner) => (
              <motion.div
                key={partner.id}
                variants={partnerVariants}
                whileHover={{ y: -10 }}
                onMouseEnter={() => setHoveredId(partner.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative"
              >
                <motion.div
                  className="relative p-6 bg-gradient-to-br from-gray-900/50 to-red-950/20 border border-red-900/30 rounded-xl min-h-40 flex items-center justify-center overflow-hidden cursor-pointer"
                  animate={{
                    borderColor: hoveredId === partner.id ? 'rgba(239, 68, 68, 0.8)' : 'rgba(239, 68, 68, 0.3)',
                    boxShadow:
                      hoveredId === partner.id
                        ? '0 0 30px rgba(239, 68, 68, 0.3), inset 0 0 20px rgba(239, 68, 68, 0.1)'
                        : '0 0 10px rgba(239, 68, 68, 0.1)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-red-600/0 via-red-600/0 to-red-600/0 pointer-events-none"
                    animate={{
                      backgroundImage: hoveredId === partner.id
                        ? 'linear-gradient(to right, rgba(239, 68, 68, 0.1), rgba(249, 115, 22, 0.05), rgba(239, 68, 68, 0.1))'
                        : 'linear-gradient(to right, transparent, transparent)',
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    {partner.logo_url ? (
                      <motion.img
                        src={partner.logo_url}
                        alt={partner.name}
                        className="max-w-full max-h-20 object-contain mx-auto mb-3"
                        animate={{
                          scale: hoveredId === partner.id ? 1.15 : 1,
                          filter: hoveredId === partner.id ? 'brightness(1.2)' : 'brightness(1)',
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    ) : (
                      <motion.div
                        className="mb-3 flex justify-center"
                        animate={{
                          scale: hoveredId === partner.id ? 1.2 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <Trophy className="w-10 h-10 text-red-600" />
                      </motion.div>
                    )}
                    <motion.h3
                      className="text-lg font-bold text-gray-200"
                      animate={{
                        color: hoveredId === partner.id ? '#fbbf24' : '#e5e7eb',
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {partner.name}
                    </motion.h3>
                    <motion.p
                      className="text-xs uppercase tracking-wider mt-2"
                      animate={{
                        color: hoveredId === partner.id ? '#f87171' : '#9ca3af',
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {partner.category}
                    </motion.p>
                  </div>

                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 pointer-events-none"
                    animate={{
                      opacity: hoveredId === partner.id ? [0, 0.3, 0] : 0,
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 0.6,
                      ease: 'easeInOut',
                    }}
                  />

                  {/* Corner glow */}
                  <motion.div
                    className="absolute top-0 right-0 w-20 h-20 bg-red-600/20 rounded-full blur-2xl pointer-events-none"
                    animate={{
                      scale: hoveredId === partner.id ? 1 : 0,
                      opacity: hoveredId === partner.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            ))
          ) : (
            <motion.div
              className="col-span-full text-center py-16 text-gray-500"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-lg">Partners coming soon...</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
