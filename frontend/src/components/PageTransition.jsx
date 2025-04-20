'use client';
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition; 