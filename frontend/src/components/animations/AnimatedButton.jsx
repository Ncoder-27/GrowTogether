'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

const AnimatedButton = ({ 
  href, 
  onClick, 
  children, 
  className = '', 
  variant = 'primary',
  disabled = false,
  type = 'button'
}) => {
  const baseClass = 'font-semibold rounded-lg transition-all duration-300 flex items-center justify-center';
  
  // Different variants
  const variantClasses = {
    primary: 'bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-3 sm:py-4',
    secondary: 'bg-white text-orange-600 border-2 border-orange-200 px-6 py-3 sm:py-4',
    outline: 'border-2 border-orange-500 text-orange-600 hover:bg-orange-50 px-4 py-2'
  };
  
  const buttonClass = `${baseClass} ${variantClasses[variant]} ${className} ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`;
  
  // Animation variants for button
  const buttonVariants = {
    hover: {
      scale: disabled ? 1 : 1.02,
      y: disabled ? 0 : -2,
      boxShadow: disabled ? 'none' : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    },
    tap: {
      scale: disabled ? 1 : 0.98,
      y: disabled ? 0 : 0,
      boxShadow: 'none',
    }
  };

  // If the button is a link
  if (href) {
    return (
      <Link href={href} passHref>
        <motion.span
          className={buttonClass}
          whileHover={disabled ? {} : "hover"}
          whileTap={disabled ? {} : "tap"}
          variants={buttonVariants}
        >
          {children}
        </motion.span>
      </Link>
    );
  }

  // If it's a regular button
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClass}
      whileHover={disabled ? {} : "hover"}
      whileTap={disabled ? {} : "tap"}
      variants={buttonVariants}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton; 