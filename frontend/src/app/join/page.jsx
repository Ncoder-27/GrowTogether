'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import FadeIn from '@/components/animations/FadeIn';
import AnimatedButton from '@/components/animations/AnimatedButton';
import AnimatedCard from '@/components/animations/AnimatedCard';

const JoinNetwork = () => {
  const router = useRouter();
  const [hoveredOption, setHoveredOption] = useState(null);

  const handleCardClick = (path) => {
    router.push(path);
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-white to-orange-50">
        {/* Decorative elements */}
        <motion.div 
          className="absolute -right-40 top-0 w-80 h-80 bg-orange-100/20 rounded-full filter blur-3xl -z-10"
          animate={{ 
            x: [0, 10, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'mirror'
          }}
        />
        <motion.div 
          className="absolute -left-40 bottom-0 w-80 h-80 bg-amber-100/20 rounded-full filter blur-3xl -z-10"
          animate={{ 
            x: [0, -10, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            repeatType: 'mirror'
          }}
        />
        <motion.div 
          className="absolute right-1/4 bottom-1/4 w-40 h-40 bg-orange-100/20 rounded-full filter blur-xl -z-10"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.7, 0.5]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: 'mirror'
          }}
        />
        
        <div className="max-w-4xl w-full space-y-8 relative z-10">
          <FadeIn direction="down" duration={0.7}>
            <div className="text-center">
              <h2 className="mt-6 text-4xl font-bold text-gray-900">Join Our Network</h2>
              <p className="mt-4 text-xl text-gray-600">
                Choose how you want to join Grow-Together
              </p>
            </div>
          </FadeIn>
          
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {/* Business Option */}
            <FadeIn direction="left" delay={0.2} duration={0.6}>
              <AnimatedCard
                className="border border-orange-100 h-full cursor-pointer"
                onClick={() => handleCardClick('/business-Signup')}
                hoverScale={1.03}
              >
                <div className="px-6 py-8 relative z-10">
                  <motion.div 
                    className="w-16 h-16 mx-auto bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center mb-6"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    animate={{ 
                      boxShadow: ['0px 0px 0px rgba(249, 115, 22, 0)', '0px 0px 20px rgba(249, 115, 22, 0.3)', '0px 0px 0px rgba(249, 115, 22, 0)'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: 'mirror'
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">For Business</h3>
                  <p className="text-gray-600 text-center mb-6">Register your business to find strategic partners and expand your network.</p>
                  <ul className="space-y-3 mb-8">
                    <motion.li 
                      className="flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Access to AI-powered partner matching</span>
                    </motion.li>
                    <motion.li 
                      className="flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Business verification services</span>
                    </motion.li>
                    <motion.li 
                      className="flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Exclusive networking events</span>
                    </motion.li>
                  </ul>
                  <AnimatedButton onClick={() => handleCardClick('/business-Signup')} className="w-full">
                    Register as Business
                  </AnimatedButton>
                </div>
              </AnimatedCard>
            </FadeIn>

            {/* Partner Option */}
            <FadeIn direction="right" delay={0.3} duration={0.6}>
              <AnimatedCard
                className="border border-orange-100 h-full cursor-pointer"
                onClick={() => handleCardClick('/partner-Signup')}
                hoverScale={1.03}
              >
                <div className="px-6 py-8 relative z-10">
                  <motion.div 
                    className="w-16 h-16 mx-auto bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center mb-6"
                    whileHover={{ rotate: -5, scale: 1.1 }}
                    animate={{ 
                      boxShadow: ['0px 0px 0px rgba(249, 115, 22, 0)', '0px 0px 20px rgba(249, 115, 22, 0.3)', '0px 0px 0px rgba(249, 115, 22, 0)'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: 'mirror'
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">For Partner</h3>
                  <p className="text-gray-600 text-center mb-6">Connect with businesses as a partner and develop strategic relationships.</p>
                  <ul className="space-y-3 mb-8">
                    <motion.li 
                      className="flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Showcase your expertise</span>
                    </motion.li>
                    <motion.li 
                      className="flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Find complementary businesses</span>
                    </motion.li>
                    <motion.li 
                      className="flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Collaborative opportunities</span>
                    </motion.li>
                  </ul>
                  <AnimatedButton onClick={() => handleCardClick('/partner-Signup')} className="w-full">
                    Register as Partner
                  </AnimatedButton>
                </div>
              </AnimatedCard>
            </FadeIn>
          </div>
          
          <FadeIn direction="up" delay={0.5}>
            <div className="text-center mt-8">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-orange-600 hover:text-orange-500 relative group">
                  Sign in
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                </Link>
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </PageTransition>
  );
};

export default JoinNetwork; 