'use client';
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link';


const services = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    title: 'AI-Powered Business Matchmaking',
    description: 'Our advanced algorithms analyze your company profile, goals, and requirements to identify the most compatible business partners.',
    link: '/services/ai-matchmaking',
    features: ['Industry-specific matching', 'Compatibility analysis', 'Customizable criteria']
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Business Verification & Trust Tools',
    description: 'Establish credibility and trust between potential partners with our comprehensive verification services.',
    link: '/services/verification',
    features: ['Identity verification', 'Business credentials check', 'Secure authentication']
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: 'Secure Communication & Collaboration',
    description: 'Connect with potential partners through our encrypted messaging system and collaborative tools.',
    link: '/services/communication',
    features: ['End-to-end encryption', 'Virtual meeting rooms', 'Document sharing']
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Networking & Virtual Events',
    description: 'Expand your business connections through exclusive industry-specific networking events and forums.',
    link: '/services/networking',
    features: ['Industry-focused events', 'Moderated discussions', 'Connection opportunities']
  }
];



const Home = () => {

  const [isLoaded, setIsLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const featureSectionRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      if (featureSectionRef.current) {
        const rect = featureSectionRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.75;
        setScrolled(isVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <>

      {/* hero section  */}

      <section id="hero" className="relative min-h-screen flex items-center py-24 overflow-hidden bg-gradient-to-b from-orange-50 via-amber-50 to-white">
        {/* Background pattern */}
        <div className="absolute inset-0 -z-10 opacity-[0.15]" aria-hidden="true" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F97316' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute -left-24 top-1/3 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-amber-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -right-24 top-1/2 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 delay-300 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className={`px-3 py-1 rounded-full bg-orange-100 text-orange-600 font-medium text-sm mb-4 inline-block transition-all duration-700 delay-500 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                Connecting Business Leaders for Strategic Partnerships
              </span>
              <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight max-w-3xl transition-all duration-700 delay-700 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                Find your ideal <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">business partner</span>
              </h1>
              <h2 className={`text-xl sm:text-2xl font-medium text-gray-900 mb-4 max-w-2xl transition-all duration-700 delay-800 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                with AI-powered matchmaking
              </h2>
              <p className={`text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mb-6 sm:mb-8 transition-all duration-700 delay-900 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                Our platform connects you with strategic partners through AI-powered matchmaking, secure communication channels, and structured business connections.
              </p>
              <div className={`flex flex-col sm:flex-row gap-4 mb-8 sm:mb-0 transition-all duration-700 delay-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <Link
                  href="/join"
                  className="text-center bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1 transition-all duration-300"
                >
                  Join the Network
                </Link>
                <a
                  href="#approach"
                  className="text-center bg-white text-orange-600 border-2 border-orange-200 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-orange-50 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
                >
                  <span>See How It Works</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>

              {/* Social Proof */}
              <div className={`mt-8 sm:mt-12 transition-all duration-700 delay-1100 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <p className="text-sm text-gray-500 mb-3 sm:mb-4">Trusted by leading companies worldwide</p>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 sm:gap-6 items-center">
                  <div className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <svg className="h-8" viewBox="0 0 124 24" fill="currentColor">
                      <path d="M12 0C5.375 0 0 5.375 0 12s5.375 12 12 12 12-5.375 12-12S18.625 0 12 0zm-1.25 17.5v-11l8.5 5.5-8.5 5.5z" className="text-orange-500" />
                      <path d="M37.5 6H29v12h3V6h5.5v12h3V6h5.5v12h3V6h-11.5zM52 6h-3v12h8.5v-3H52V6zm10.5 0h-3v12h3V6zm5 0H64v12h8.5v-3h-5V6zm17.5 0H77v12h3V6h5zm10.5 0h-8.5v12h8.5v-3h-5.5v-1.5h5v-3h-5V9h5.5V6z" className="text-gray-500" />
                    </svg>
                  </div>
                  <div className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <svg className="h-5" viewBox="0 0 180 34" fill="currentColor">
                      <path d="M59.4 0h7.8v23.4h14.5v6.1H59.4V0zm41.8 29.5h-7.2v-2.4c-2.4 2.1-5.5 3-9.3 3-4.8 0-8.5-2.2-8.5-7.4 0-5.5 4.2-7.6 9.9-7.6h7.2v-1.5c0-2.4-2-3.3-5-3.3-2.4 0-4.7.6-6.5 1.7l-2.6-5c3-1.8 6.9-2.5 10.4-2.5 7.2 0 12.5 3 12.5 10.3v14.7h-.9zm-7.8-8.5h-5.9c-2.2 0-3.5.9-3.5 2.3 0 1.4 1.3 2.3 3.4 2.3 2.1 0 4.2-.6 6-1.6v-3zm46-5.5c0 8.4-6.2 14.8-14.9 14.8-8.6 0-14.9-6.4-14.9-14.8 0-8.3 6.2-14.8 14.9-14.8 8.6 0 14.9 6.5 14.9 14.8zm-22.3 0c0 4.6 3.2 8 7.4 8s7.4-3.4 7.4-8c0-4.6-3.2-8-7.4-8s-7.4 3.4-7.4 8zm38.6-14.2c8.5 0 14.4 6.2 14.4 14.6 0 .5 0 .9-.1 1.4h-20.9c.7 3.4 3.6 5.5 7.6 5.5 2.5 0 4.9-.7 6.8-1.9l3.4 4.4c-2.7 2.3-7.1 3.6-11.3 3.6-8.4 0-14.7-5.5-14.7-13.8 0-8.2 6-13.8 14.8-13.8zm-6.8 10.4h13.9c-.7-3.1-3.1-4.9-7-4.9-3.8 0-6.1 1.9-6.9 4.9zm48.7 5.8c0 5-4.2 8.5-10.9 8.5-4.4 0-8.8-1.5-11.7-4.2l3.6-4.5c2 1.7 4.9 2.8 7.6 2.8 2.4 0 3.9-.7 3.9-2.1 0-3.7-14.3.2-14.3-10.1 0-4.9 4.2-8.3 10.6-8.3 4 0 8 1.2 10.6 3.4l-3.5 4.5c-1.8-1.3-4.2-2.2-6.6-2.2-2.1 0-3.5.7-3.5 1.9 0 3.4 14.2-.3 14.2 10.3z" className="text-gray-700" />
                    </svg>
                  </div>
                  <div className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <svg className="h-7" viewBox="0 0 124 24" fill="currentColor">
                      <path d="M23 0H7.3C3.3 0 0 3.3 0 7.3v9.4C0 20.7 3.3 24 7.3 24H23c4 0 7.3-3.3 7.3-7.3V7.3C30.3 3.3 27 0 23 0zm-7.5 15.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z" className="text-orange-400" />
                      <path d="M52.1 6.4h-4.8v12.2h2.5v-4.2h2.3c2.6 0 4.5-1.9 4.5-4.3v-.1c0-2.2-1.7-3.6-4.5-3.6zm2 4c0 1-.7 1.7-1.9 1.7h-2.4V8.8h2.4c1.2 0 1.9.7 1.9 1.6zM61.3 6.4H58v12.2h3.3c3.3 0 6.6-1.9 6.6-6.1 0-4.3-3.2-6.1-6.6-6.1zm0 9.7h-.8V9h.8c2.3 0 4.2 1.2 4.2 3.6 0 2.3-1.9 3.5-4.2 3.5zM78.9 9h-3.6v-2.6h-2.5v12.2h2.5v-7.1h3.6v7.1h2.5v-12.2h-2.5zM90.5 6.4H88v12.2h2.5v-4.2h2.3c2.6 0 4.5-1.9 4.5-4.3v-.1c0-2.2-1.7-3.6-4.5-3.6zm2 4c0 1-.7 1.7-1.9 1.7h-2.4V8.8h2.4c1.2 0 1.9.7 1.9 1.6zM102.1 6.4H99v12.2h3.1c4.1 0 6.9-2.7 6.9-6.1s-2.8-6.1-6.9-6.1zm0 9.7h-.6V9h.6c2.6 0 4.4 1.7 4.4 3.6 0 1.8-1.8 3.5-4.4 3.5zM116.6 6.2c-3.5 0-6.3 2.7-6.3 6.3 0 3.6 2.8 6.3 6.3 6.3s6.3-2.7 6.3-6.3c0-3.6-2.8-6.3-6.3-6.3zm0 10.1c-2.1 0-3.8-1.7-3.8-3.8s1.7-3.8 3.8-3.8 3.8 1.7 3.8 3.8-1.7 3.8-3.8 3.8z" className="text-gray-700" />
                    </svg>
                  </div>
                  <div className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <svg className="h-6" viewBox="0 0 124 24" fill="currentColor">
                      <path d="M24.5 12c0-6.627-5.373-12-12-12S.5 5.373.5 12s5.373 12 12 12 12-5.373 12-12zm-12 7c-3.866 0-7-3.134-7-7s3.134-7 7-7 7 3.134 7 7-3.134 7-7 7z" className="text-amber-500" />
                      <path d="M47.5 16h-5V8h5c2.209 0 4 1.791 4 4s-1.791 4-4 4zm0-10h-7v12h7c3.314 0 6-2.686 6-6s-2.686-6-6-6zM66.5 6h-9v12h2v-5h7c1.105 0 2-.895 2-2V8c0-1.105-.895-2-2-2zm0 5h-7V8h7v3zM80.5 6h10.5c.828 0 1.5.672 1.5 1.5v10.5h-3v-9h-7.5v-3zM109 5h-10.5c-.828 0-1.5.672-1.5 1.5v10.5h3v-9h7.5v-3zM44.5 8c-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.015-4.5-4.5-4.5zM69.5 8c-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.015-4.5-4.5-4.5zM95 8c-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.015-4.5-4.5-4.5z" className="text-gray-700" />
                    </svg>
                  </div>
                  <div className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <svg className="h-6" viewBox="0 0 124 24" fill="currentColor">
                      <path d="M14.5 0c-5.247 0-9.5 4.253-9.5 9.5 0 5.247 4.253 9.5 9.5 9.5 5.247 0 9.5-4.253 9.5-9.5 0-5.247-4.253-9.5-9.5-9.5zm0 14c-2.485 0-4.5-2.015-4.5-4.5s2.015-4.5 4.5-4.5 4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5z" className="text-orange-600" />
                      <path d="M36.5 5h-3v10.5c0 .828.672 1.5 1.5 1.5h9v-3h-7.5v-9zM62 5h-9v3h7.5v9h3v-10.5c0-.828-.672-1.5-1.5-1.5zM76 5h10.5c.828 0 1.5.672 1.5 1.5v10.5h-3v-9h-7.5v-3zM109 5h-10.5c-.828 0-1.5.672-1.5 1.5v10.5h3v-9h7.5v-3zM44.5 8c-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.015-4.5-4.5-4.5zM69.5 8c-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.015-4.5-4.5-4.5zM95 8c-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.015-4.5-4.5-4.5z" className="text-gray-700" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className={`relative transition-all duration-1000 delay-500 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="absolute -inset-px bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-2xl blur"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-orange-100/20 p-6 shadow-xl overflow-hidden group">
                <div className="relative">
                  <img
                    src="/hero-illustration.svg"
                    alt="Grow-Together Business Network Illustration"
                    className="w-full h-auto group-hover:scale-105 transition-transform duration-500 animate-[float_4s_ease-in-out_infinite]"
                  />

                  {/* Video play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      className="bg-orange-600 bg-opacity-90 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300"
                      onClick={() => alert("Video would play here in a modal. This is a placeholder for the demo.")}
                      aria-label="Play demonstration video"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>

                  {/* "Watch How It Works" text */}
                  <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-block bg-black bg-opacity-75 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Watch How It Works
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature highlights with scroll animation */}
          <div
            ref={featureSectionRef}
            className={`mt-20 transition-all duration-1000 transform ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How Our Platform Works</h3>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className={`bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md border border-orange-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${scrolled ? 'animate-[float_4s_ease-in-out_infinite]' : ''}`} style={{ animationDelay: '0.1s' }}>
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Matching</h3>
                <p className="text-gray-600">Our intelligent algorithms connect you with the most compatible business partners based on your specific needs and goals.</p>
              </div>

              <div className={`bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md border border-orange-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${scrolled ? 'animate-[float_4s_ease-in-out_infinite]' : ''}`} style={{ animationDelay: '0.3s' }}>
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Communication</h3>
                <p className="text-gray-600">Exchange ideas and discuss opportunities with potential partners through our encrypted messaging system.</p>
              </div>

              <div className={`bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md border border-orange-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${scrolled ? 'animate-[float_4s_ease-in-out_infinite]' : ''}`} style={{ animationDelay: '0.5s' }}>
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Structured Connections</h3>
                <p className="text-gray-600">Follow our proven framework for establishing and maintaining successful business partnerships.</p>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}

        </div>
      </section>
      { /*How it works */}
      <section id="how-it-works" className="relative min-h-screen flex items-center py-24 overflow-hidden bg-gradient-to-b from-white to-orange-50">
        {/* Decorative elements */}
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-orange-100/30 to-transparent rounded-tl-full -z-10"></div>
        <div className="absolute top-1/4 left-0 w-1/4 h-1/4 bg-gradient-to-br from-amber-100/30 to-transparent rounded-br-full -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 font-medium text-sm mb-4 inline-block">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 max-w-3xl">
              Find your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">perfect match</span> in four simple steps
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              Our comprehensive platform guides you through a seamless process to connect with the right business partners for your strategic needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Create Your Business Profile</h3>
              <p className="text-gray-600">
                Enter your company details, industry focus, partnership goals, and the specific capabilities you're looking for in a strategic partner.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Partner Matching</h3>
              <p className="text-gray-600">
                Our AI algorithm analyzes your profile and requirements to identify the most compatible business partners with complementary strengths.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Secure Communication</h3>
              <p className="text-gray-600">
                Connect with potential partners through our secure messaging system, schedule virtual meetings, and share documents in a protected environment.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Partnership Growth</h3>
              <p className="text-gray-600">
                Access exclusive networking events, collaboration tools, and ongoing support to nurture and develop your business partnerships over time.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <a
              href="#services"
              className="inline-flex items-center bg-white text-orange-600 border border-orange-200 font-medium px-6 py-3 rounded-lg hover:bg-orange-50 transition-all"
            >
              <span>Explore our services</span>
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative min-h-screen flex items-center py-24 overflow-hidden bg-gradient-to-b from-orange-50 to-white">
        <div className="absolute left-0 top-1/3 w-1/2 h-1/2 bg-gradient-to-r from-orange-50 to-transparent rounded-r-full -z-10"></div>
        <div className="absolute right-0 bottom-1/4 w-64 h-64 bg-amber-50 rounded-full -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 font-medium text-sm mb-4 inline-block">Our Services</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 max-w-3xl">
              Comprehensive tools to help you <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">find the perfect</span> business partnership
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              Our platform offers everything you need to find, connect with, and grow alongside the right strategic business partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
              >
                <div className="p-8">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <span className="text-orange-500 font-bold mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={service.link}
                    className="inline-flex items-center text-orange-600 font-medium hover:text-orange-700"
                  >
                    <span>Learn More</span>
                    <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a
              href="#contact"
              className="inline-flex items-center bg-gradient-to-r from-orange-600 to-amber-600 text-white font-medium px-6 py-3 rounded-lg hover:shadow-md transition-all"
            >
              <span>Start Connecting</span>
              <svg className="ml-2 w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="results" className="relative min-h-screen flex items-center py-24 overflow-hidden bg-gradient-to-b from-white to-orange-50">
        <div className="absolute -left-24 top-1/4 w-80 h-80 bg-gradient-to-br from-orange-100/30 to-amber-100/40 rounded-full blur-2xl -z-10"></div>
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-gradient-to-tl from-orange-100/30 to-amber-100/30 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 font-medium text-sm mb-4 inline-block">Success Stories</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 max-w-3xl">
              Businesses that <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">thrive together</span> through our platform
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              Discover how businesses across industries have found their ideal partners and achieved remarkable growth through our network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Metric Card 1 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group p-8">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 flex items-center justify-center text-orange-600 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="flex items-end mb-4">
                <span className="text-4xl font-bold text-gray-900">75%</span>
                <span className="text-sm font-medium text-orange-600 ml-2 mb-1">▲</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Partnership Success Rate</h3>
              <p className="text-gray-600">Businesses that connect through our platform report a 75% higher likelihood of forming successful long-term partnerships.</p>
            </div>

            {/* Metric Card 2 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group p-8">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 flex items-center justify-center text-orange-600 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="flex items-end mb-4">
                <span className="text-4xl font-bold text-gray-900">83%</span>
                <span className="text-sm font-medium text-orange-600 ml-2 mb-1">▲</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Business Growth</h3>
              <p className="text-gray-600">Partners matched through our platform experience an average 83% increase in business opportunities within the first year.</p>
            </div>

            {/* Metric Card 3 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group p-8">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 flex items-center justify-center text-orange-600 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex items-end mb-4">
                <span className="text-4xl font-bold text-gray-900">90%</span>
                <span className="text-sm font-medium text-orange-600 ml-2 mb-1">▲</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Time Saved</h3>
              <p className="text-gray-600">Our AI-powered matchmaking reduces the time spent finding compatible business partners by up to 90% compared to traditional networking.</p>
            </div>
          </div>

          <div className="mt-16">
            <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl shadow-lg overflow-hidden">
              <div className="px-8 py-10 md:p-12 flex flex-col md:flex-row items-center md:items-start">
                <div className="w-20 h-20 md:w-16 md:h-16 rounded-full bg-white/20 flex items-center justify-center mb-6 md:mb-0 md:mr-8 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/90 text-lg md:text-xl font-medium italic mb-6">
                    "Grow-Together completely transformed how we approach strategic partnerships. Within three months, we found two perfect manufacturing partners that aligned with our sustainability goals. The AI matching was remarkably accurate, and the secure communication tools made the entire process seamless."
                  </p>
                  <div className="flex items-center">
                    <div className="mr-4">
                      <p className="text-white font-bold">Michael Rodriguez</p>
                      <p className="text-white/80 text-sm">CEO, GreenTech Solutions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="px-8 py-10 md:p-12 flex flex-col md:flex-row items-center md:items-start">
                <div className="w-20 h-20 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center mb-6 md:mb-0 md:mr-8 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-700 text-lg md:text-xl font-medium italic mb-6">
                    "As a fintech startup, finding trustworthy partners was our biggest challenge. Grow-Together's verification system gave us the confidence to connect with established financial institutions. We've now launched three joint products that have revolutionized our business model."
                  </p>
                  <div className="flex items-center">
                    <div className="mr-4">
                      <p className="text-gray-900 font-bold">Jennifer Chen</p>
                      <p className="text-gray-500 text-sm">Founder, PaySmart Solutions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <a
              href="/case-studies"
              className="inline-flex items-center px-5 py-3 rounded-lg border border-orange-200 bg-orange-50 text-orange-600 font-medium hover:bg-orange-100 transition-colors duration-300"
            >
              <span>Explore success stories</span>
              <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}


      {/* Newsletter Section */}

    </>
  )
}

export default Home