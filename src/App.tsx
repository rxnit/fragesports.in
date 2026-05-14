import React, { useState, useEffect } from 'react';
import { Flame, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { AnimatedBackground } from './components/AnimatedBackground';
import { ParticleEffect } from './components/ParticleEffect';
import { AdvancedHeroSection } from './components/AdvancedHeroSection';
import { Team3D } from './components/Team3D';
import { PartnerShowcase } from './components/PartnerShowcase';
import { Footer } from './components/Footer';
import { HolographicUI } from './components/HolographicUI';
import { ScanlineEffect } from './components/ScanlineEffect';
import { GamingEffects } from './components/GamingEffects';
import { CinematicScene } from './components/CinematicScene';
import { DataStream } from './components/DataStream';
import { ValorantAbilities } from './components/ValorantAbilities';
import { GamingSection } from './components/GamingSection';
import { AchievementBadges } from './components/AchievementBadges';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    fetchData();

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchData = async () => {
    try {
      const [membersRes, partnersRes] = await Promise.all([
        supabase.from('team_members').select('*').order('created_at'),
        supabase.from('partners').select('*').order('created_at'),
      ]);

      if (membersRes.data) setTeamMembers(membersRes.data);
      if (partnersRes.data) setPartners(partnersRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* 3D Background */}
      <AnimatedBackground />

      {/* Cinematic 3D Scene */}
      <CinematicScene isActive={true} />

      {/* Data Stream Effect */}
      <DataStream delay={0.5} />

      {/* Particle Effects */}
      <ParticleEffect />

      {/* Holographic UI */}
      <HolographicUI />

      {/* Scanline Effect */}
      <ScanlineEffect intensity={0.15} />

      {/* Gaming Effects */}
      <GamingEffects triggerGlitch={scrollY > 500} />

      {/* Valorant Abilities */}
      <ValorantAbilities isActive={scrollY > 1000} />

      {/* Navigation */}
      <motion.nav
        className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-red-900/30"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              className="flex-shrink-0 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded flex items-center justify-center"
                animate={{
                  boxShadow: ['0 0 10px rgba(239, 68, 68, 0.5)', '0 0 30px rgba(239, 68, 68, 0.8)', '0 0 10px rgba(239, 68, 68, 0.5)'],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Flame className="w-6 h-6" />
              </motion.div>
              <span className="text-2xl font-black tracking-wider">FRAG</span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8">
              {['roster', 'games', 'partners'].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-sm font-semibold uppercase tracking-wide relative group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-600 to-orange-500"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <motion.div
            className="md:hidden py-4 border-t border-red-900/30"
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: mobileMenuOpen ? 1 : 0,
              height: mobileMenuOpen ? 'auto' : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {mobileMenuOpen && (
              <div className="space-y-2">
                {['roster', 'games', 'partners'].map((item) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left px-4 py-2 text-sm font-semibold uppercase hover:text-red-500 transition-colors"
                    whileHover={{ x: 10 }}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Section - Advanced Gaming Style */}
      <AdvancedHeroSection onExplore={() => scrollToSection('roster')} />

      {/* Team Roster */}
      <section id="roster">
        <Team3D teamMembers={teamMembers} />
      </section>

      {/* Games We Dominate */}
      <section id="games">
        <GamingSection />
      </section>

      {/* Achievements */}
      <AchievementBadges />

      {/* Partners */}
      <section id="partners">
        <PartnerShowcase partners={partners} />
      </section>

      {/* Footer */}
      <Footer />

      {/* Scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-red-600 to-orange-500 z-50"
        style={{
          width: `${Math.min((scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%`,
        }}
      />
    </div>
  );
}

export default App;
