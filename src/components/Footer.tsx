import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Mail, MapPin, Send } from 'lucide-react';

export const Footer: React.FC = () => {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const socialLinks = [
    { name: 'Discord', icon: 'D', color: 'from-blue-500 to-blue-600' },
    { name: 'Twitter', icon: 'X', color: 'from-gray-400 to-gray-500' },
    { name: 'YouTube', icon: 'Y', color: 'from-red-600 to-red-700' },
    { name: 'Instagram', icon: 'I', color: 'from-pink-500 to-orange-500' },
  ];

  return (
    <footer className="relative bg-black border-t border-red-900/30 z-20 overflow-hidden">
      {/* Background effects */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none"
        animate={{
          y: [-50, 50, -50],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand section */}
          <motion.div variants={itemVariants}>
            <motion.div
              className="flex items-center gap-3 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center"
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, linear: true },
                  scale: { duration: 3, repeat: Infinity },
                }}
              >
                <Flame className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-2xl font-black tracking-wider">FRAG</span>
            </motion.div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Rising to the top of competitive gaming. Building champions one match at a time.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-red-500 mb-4 uppercase text-sm tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {['Roster', 'Games', 'Partners'].map((link) => (
                <li key={link}>
                  <motion.a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-red-400 transition-colors text-sm"
                    whileHover={{ x: 5 }}
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-red-500 mb-4 uppercase text-sm tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-red-500" />
                <a href="mailto:info@frag.esports" className="hover:text-red-400 transition-colors">
                  info@frag.esports
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>Gaming Arena, Online</span>
              </li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-red-500 mb-4 uppercase text-sm tracking-wider">Follow Us</h4>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((social) => (
                <motion.button
                  key={social.name}
                  className={`w-full py-3 rounded-lg bg-gradient-to-br ${social.color} text-white font-bold uppercase text-xs tracking-wider hover:shadow-lg hover:shadow-red-600/30 transition-all relative overflow-hidden`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  title={social.name}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"
                    animate={{
                      opacity: [0.3, 0.1, 0.3],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <span className="relative">{social.icon}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          className="mb-12 p-8 bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-900/30 rounded-xl"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
          <p className="text-gray-400 mb-4 text-sm">Get the latest news from FRAG eSports directly to your inbox.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors"
            />
            <motion.button
              className="px-6 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-lg flex items-center gap-2 hover:shadow-lg hover:shadow-red-600/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send className="w-4 h-4" />
              Subscribe
            </motion.button>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="border-t border-red-900/20 pt-8 text-center"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-gray-500 text-sm">
            Copyright © 2026 FRAG eSports. All rights reserved.
            <span className="mx-2">•</span>
            <motion.a href="#" className="text-red-400 hover:text-red-300 transition-colors">
              Privacy Policy
            </motion.a>
            <span className="mx-2">•</span>
            <motion.a href="#" className="text-red-400 hover:text-red-300 transition-colors">
              Terms of Service
            </motion.a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
