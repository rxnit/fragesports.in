import React from 'react';
import { motion } from 'framer-motion';

interface DataStreamProps {
  delay?: number;
}

export const DataStream: React.FC<DataStreamProps> = ({ delay = 0 }) => {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-5 font-mono text-green-500/30 text-xs overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      transition={{ delay, duration: 1 }}
    >
      {/* Animated code lines */}
      <motion.div
        className="absolute top-0 left-0"
        animate={{ y: [0, window.innerHeight] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {'01101001001 \n FRAG_SYSTEM_INIT \n01101001001 \n > CONNECTING \n DATA_STREAM_ACTIVE'.split('\n').map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </motion.div>
    </motion.div>
  );
};
