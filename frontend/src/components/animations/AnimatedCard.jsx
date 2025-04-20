'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedCard = ({
  children,
  className = '',
  onClick,
  hoverable = true,
  hoverScale = 1.02,
  withShadow = true
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`bg-white rounded-xl overflow-hidden relative ${withShadow ? 'shadow-md' : ''} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      onHoverStart={() => hoverable && setIsHovered(true)}
      onHoverEnd={() => hoverable && setIsHovered(false)}
      whileHover={
        hoverable
          ? {
              y: -8,
              scale: hoverScale,
              boxShadow: withShadow 
                ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                : '',
            }
          : {}
      }
    >
      {/* Gradient overlay that appears on hover */}
      {hoverable && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 pointer-events-none z-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default AnimatedCard; 