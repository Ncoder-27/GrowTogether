'use client'
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import PageTransition from '@/components/PageTransition';
import FadeIn from '@/components/animations/FadeIn';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const ViewBusiness = () => {
  const { id } = useParams();
  const [businessData, setBusinessData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBusinessDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/business/getbyid/${id}`);
      setBusinessData(res.data.data); // Update to use res.data.data
    } catch (error) {
      console.error('Error fetching business details:', error);
      toast.error('Failed to load business details');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinessDetails();
  }, [id]);

  const handleEmailClick = () => {
    if (businessData?.email) {
      const subject = `Interested in connecting with ${businessData.businessName}`;
      const body = `Hello ${businessData.fullName},\n\nI found your business profile on Grow-Together and I'm interested in exploring potential collaboration opportunities.\n\nBest regards,`;
      
      // Gmail compose URL
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(businessData.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Open Gmail in a new tab
      window.open(gmailUrl, '_blank');
    } else {
      toast.error('Email address not available');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!businessData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Business not found</p>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-orange-50">
        {/* Decorative elements */}
        <div className="absolute -right-40 top-0 w-80 h-80 bg-orange-100/20 rounded-full filter blur-3xl -z-10"></div>
        <div className="absolute -left-40 bottom-0 w-80 h-80 bg-amber-100/20 rounded-full filter blur-3xl -z-10"></div>

        <FadeIn>
          <div className="max-w-4xl mt-10 mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              <motion.h1 
                className="text-4xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {businessData.businessName}
              </motion.h1>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-orange-100">
              {/* Business Overview Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">Business Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-600"><span className="font-semibold">Owner Name:</span> {businessData.fullName}</p>
                    <p className="text-gray-600"><span className="font-semibold">Business Type:</span> {businessData.businessType}</p>
                    <p className="text-gray-600"><span className="font-semibold">Registration No:</span> {businessData.businessRegNo}</p>
                  </div>
                  <div>
                    <p className="text-gray-600"><span className="font-semibold">Business Plan:</span> {businessData.businessPlan}</p>
                    <p className="text-gray-600"><span className="font-semibold">Annual Revenue:</span> {businessData.annualRevenue}</p>
                    <p className="text-gray-600"><span className="font-semibold">Investment Budget:</span> {businessData.investmentBudget}</p>
                  </div>
                </div>
              </div>

              {/* Location and Expansion Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">Location & Expansion</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-600"><span className="font-semibold">Current Location:</span> {businessData.country}</p>
                    <p className="text-gray-600"><span className="font-semibold">Target Market:</span> {businessData.expansionCountry}</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-semibold">Email:</span> {businessData.email}
                    </p>
                    <div className="flex items-center space-x-4">
                      {businessData.linkedin && (
                        <a
                          href={businessData.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                          LinkedIn Profile
                        </a>
                      )}
                      {businessData.website && (
                        <a
                          href={businessData.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-600 hover:text-gray-700 transition-colors"
                        >
                          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                          </svg>
                          Website
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Connect Button */}
              <div className="mt-8 flex gap-10 justify-center">
                <button 
                  className="bg-gradient-to-r from-orange-600 to-amber-600 text-white font-medium px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300"
                  onClick={() => toast.success('Connection feature coming soon!')}
                >
                  Connect with Business
                </button>
                <button 
                  className="bg-gradient-to-r mailto: from-orange-600 to-amber-600 text-white font-medium px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300"
                  onClick={handleEmailClick}
                >
                  Connect with Mail
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </PageTransition>
  );
};

export default ViewBusiness;