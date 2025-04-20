'use client';
import { motion } from 'framer-motion';

const AnimatedIcon = ({
  icon,
  size = 'md',
  color = 'orange',
  className = '',
  animate = true
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
    '2xl': 'h-16 w-16'
  };

  const colorClasses = {
    orange: 'text-orange-500',
    amber: 'text-amber-500',
    gray: 'text-gray-500',
    white: 'text-white'
  };

  const iconClass = `${sizeClasses[size]} ${colorClasses[color]} ${className}`;

  // Different animation variants based on type
  const animations = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: { 
        repeat: Infinity, 
        repeatType: 'mirror', 
        duration: 2
      }
    },
    bounce: {
      y: [0, -5, 0],
      transition: { 
        repeat: Infinity, 
        repeatType: 'mirror', 
        duration: 1.5
      }
    },
    spin: {
      rotate: 360,
      transition: {
        repeat: Infinity,
        ease: 'linear',
        duration: 3
      }
    },
    wiggle: {
      rotate: [-3, 3, -3],
      transition: {
        repeat: Infinity,
        repeatType: 'mirror',
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      className={iconClass}
      whileHover={animate ? { scale: 1.1 } : {}}
      whileTap={animate ? { scale: 0.9 } : {}}
      animate={animate ? animations.pulse : {}}
    >
      {icon}
    </motion.div>
  );
};

export default AnimatedIcon; 