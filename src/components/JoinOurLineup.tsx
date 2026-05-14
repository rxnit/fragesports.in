import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Shield, Send } from 'lucide-react';

export const JoinOurLineup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    game: '',
    experience: '',
    achievements: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', game: '', experience: '', achievements: '' });
      setSubmitted(false);
    }, 3000);
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-red-950/10 to-black z-20 overflow-hidden">
      {/* Background effects */}
      <motion.div
        className="absolute top-1/2 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          y: [0, 50, 0],
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          y: [0, -50, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl sm:text-6xl font-black mb-4 tracking-tight">
            JOIN OUR
            <motion.span
              className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500"
              animate={{
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            >
              LINEUP
            </motion.span>
          </h2>
          <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
            Think you have what it takes? Show us your skills and join FRAG eSports. We're looking for dedicated players who can compete at the highest level.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Left side - Requirements */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-3xl font-black text-white mb-8">What We Look For</h3>

            {[
              {
                icon: <Zap className="w-6 h-6" />,
                title: 'Skill & Consistency',
                desc: 'Proven track record in competitive play',
              },
              {
                icon: <Target className="w-6 h-6" />,
                title: 'Team Mentality',
                desc: 'Ability to work well with team members',
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: 'Dedication',
                desc: 'Commitment to improve and compete',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="p-6 bg-gradient-to-r from-red-600/20 to-red-400/10 rounded-xl border border-red-500/30 hover:border-red-500/60 transition-all"
                whileHover={{ scale: 1.02, x: 10 }}
              >
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-red-600/30 rounded-lg text-red-400 mt-1">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right side - Form */}
          <motion.div variants={itemVariants}>
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-4 p-8 bg-gradient-to-br from-black via-red-950/20 to-black rounded-2xl border border-red-500/30 backdrop-blur"
              animate={{
                boxShadow: ['0 0 20px rgba(239, 68, 68, 0.1)', '0 0 40px rgba(239, 68, 68, 0.2)', '0 0 20px rgba(239, 68, 68, 0.1)'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {submitted ? (
                <motion.div
                  className="py-12 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center"
                    animate={{ scale: [0, 1, 0.95] }}
                    transition={{ duration: 0.6 }}
                  >
                    <Zap className="w-8 h-8 text-white" />
                  </motion.div>
                  <h4 className="text-2xl font-bold text-white mb-2">Application Received!</h4>
                  <p className="text-gray-400">Thanks for your interest. We'll review your application and get back to you soon.</p>
                </motion.div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-bold text-red-400 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-red-400 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-red-400 mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors"
                        placeholder="+1 (555) 000-0000"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-red-400 mb-2">Which Game?</label>
                    <select
                      name="game"
                      value={formData.game}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors"
                      required
                    >
                      <option value="">Select a game</option>
                      <option value="valorant">Valorant</option>
                      <option value="bgmi">BGMI</option>
                      <option value="freefire">Free Fire</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-red-400 mb-2">Experience Level</label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors"
                      required
                    >
                      <option value="">Select level</option>
                      <option value="amateur">Amateur</option>
                      <option value="semi-pro">Semi-Pro</option>
                      <option value="professional">Professional</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-red-400 mb-2">Your Achievements</label>
                    <textarea
                      name="achievements"
                      value={formData.achievements}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors resize-none"
                      placeholder="Tell us about your achievements, tournament wins, ranks, etc."
                      rows={4}
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 hover:from-red-700 hover:to-red-600 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send className="w-4 h-4" />
                    SUBMIT APPLICATION
                  </motion.button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    We'll review your application and contact you within 48 hours
                  </p>
                </>
              )}
            </motion.form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
