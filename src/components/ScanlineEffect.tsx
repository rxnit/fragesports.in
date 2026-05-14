import React from 'react';
import { motion } from 'framer-motion';

interface ScanlineEffectProps {
  color?: string;
  intensity?: number;
}

export const ScanlineEffect: React.FC<ScanlineEffectProps> = ({ intensity = 0.15 }) => {
  return (
    <>
      {/* Horizontal scanlines */}
      <div
        className="fixed inset-0 pointer-events-none z-40"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.1),
            rgba(0, 0, 0, 0.1) 1px,
            transparent 1px,
            transparent 2px
          )`,
          backgroundSize: '100% 4px',
        }}
      />

      {/* Vignette effect */}
      <div
        className="fixed inset-0 pointer-events-none z-40"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, ${intensity}) 100%)`,
        }}
      />
    </>
  );
};
