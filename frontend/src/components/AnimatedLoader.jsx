'use client';
import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';

// These are prebuilt Lottie animations that you can use
const loadingAnimations = {
  default: 'https://assets2.lottiefiles.com/packages/lf20_fiyk4h4y.json', 
  dots: 'https://assets6.lottiefiles.com/packages/lf20_qq4a9exa.json',
  bars: 'https://assets7.lottiefiles.com/packages/lf20_jfswl5rs.json',
  circles: 'https://assets9.lottiefiles.com/packages/lf20_p8bfn5to.json',
  success: 'https://assets1.lottiefiles.com/packages/lf20_atippmse.json',
  error: 'https://assets9.lottiefiles.com/packages/lf20_gki3xkcq.json'
};

const AnimatedLoader = ({
  type = 'default',
  size = 'md',
  text = 'Loading...',
  showText = true,
  loop = true,
  autoplay = true,
  color = 'orange',
  className = '',
  isLoading = true,
  isSuccess = false,
  isError = false
}) => {
  const [animationData, setAnimationData] = useState(null);
  const [animationType, setAnimationType] = useState(type);

  useEffect(() => {
    // Determine which animation to show based on status
    if (isSuccess) {
      setAnimationType('success');
    } else if (isError) {
      setAnimationType('error');
    } else {
      setAnimationType(type);
    }

    // Fetch the animation JSON
    const fetchAnimation = async () => {
      try {
        const response = await fetch(loadingAnimations[animationType]);
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error('Failed to load animation:', error);
      }
    };

    fetchAnimation();
  }, [type, isSuccess, isError, animationType]);

  // Size mappings for the container
  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-28 h-28',
    lg: 'w-36 h-36',
    xl: 'w-44 h-44'
  };

  // Text color based on state
  const textColor = isSuccess ? 'text-green-600' : isError ? 'text-red-600' : `text-${color}-600`;

  // Status text based on state
  const statusText = isSuccess ? 'Success!' : isError ? 'Error!' : text;

  if (!animationData) {
    // Fallback loading indicator while fetching the animation
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <div className={`animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500`}></div>
        {showText && <p className="mt-3 text-sm font-medium text-orange-600">Loading animation...</p>}
      </div>
    );
  }

  return (
    <motion.div 
      className={`flex flex-col items-center justify-center ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <div className={sizeClasses[size]}>
        <Lottie 
          animationData={animationData} 
          loop={loop && !isSuccess && !isError} 
          autoplay={autoplay}
        />
      </div>
      
      {showText && (
        <motion.p 
          className={`mt-3 text-sm font-medium ${textColor}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {statusText}
        </motion.p>
      )}
    </motion.div>
  );
};

export default AnimatedLoader; 