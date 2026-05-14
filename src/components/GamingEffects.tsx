import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface GamingEffectsProps {
  triggerExplosion?: boolean;
  triggerRecoil?: boolean;
  triggerGlitch?: boolean;
}

export const GamingEffects: React.FC<GamingEffectsProps> = ({ triggerGlitch }) => {
  const [glitchActive, setGlitchActive] = useState(triggerGlitch);

  React.useEffect(() => {
    if (triggerGlitch) {
      setGlitchActive(true);
      const timer = setTimeout(() => setGlitchActive(false), 300);
      return () => clearTimeout(timer);
    }
  }, [triggerGlitch]);

  return (
    <>
      {glitchActive && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-30"
          style={{
            backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(255, 0, 0, 0.05) 25%, rgba(255, 0, 0, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 0, 0, 0.05) 75%, rgba(255, 0, 0, 0.05) 76%, transparent 77%, transparent)`,
            backgroundSize: '100% 4px',
          }}
          animate={{ backgroundPosition: ['0px 0px', '0px 10px'] }}
          transition={{ duration: 0.1, repeat: 2 }}
        />
      )}
    </>
  );
};
