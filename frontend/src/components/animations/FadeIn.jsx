'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const FadeIn = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.5, 
  threshold = 0.1,
  className = '',
  once = true 
}) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: once
  });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
      x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn; 