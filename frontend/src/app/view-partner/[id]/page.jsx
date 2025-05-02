'use client'
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import PageTransition from '@/components/PageTransition';
import FadeIn from '@/components/animations/FadeIn';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const ViewPartner = () => {
  const { id } = useParams();
  const [partnerData, setPartnerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPartnerDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/partner/getbyid/${id}`);
      console.log(res.data.data);
      setPartnerData(res.data.data);
    } catch (error) {
      console.error('Error fetching partner details:', error);
      toast.error('Failed to load partner details');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPartnerDetails();
  }, [id]);

  const handleEmailClick = () => {
    if (partnerData?.email) {
      const subject = `Interested in connecting with ${partnerData.businessName}`;
      const body = `Hello ${partnerData.fullName},\n\nI found your profile on Grow-Together and I'm interested in exploring potential collaboration opportunities.\n\nBest regards,`;
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(partnerData.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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

  if (!partnerData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Partner not found</p>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-orange-50">
        {/* Decorative elements */}
        <div className="absolute top-0 w-80 h-80 bg-orange-100/20 rounded-full filter blur-3xl -z-10"></div>
        <div className="absolute bottom-0 w-80 h-80 bg-amber-100/20 rounded-full filter blur-3xl -z-10"></div>

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
                {partnerData.businessName}
              </motion.h1>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-orange-100">
              {/* Partner Overview Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">Partner Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-600"><span className="font-semibold">Partner Name:</span> {partnerData.fullName}</p>
                    <p className="text-gray-600"><span className="font-semibold">Business Name:</span> {partnerData.businessName}</p>
                    <p className="text-gray-600"><span className="font-semibold">Business Type:</span> {partnerData.businessType}</p>
                    <p className="text-gray-600"><span className="font-semibold">Industry:</span> {partnerData.industry}</p>
                  </div>
                  <div>
                    <p className="text-gray-600"><span className="font-semibold">Country:</span> {partnerData.country}</p>
                    <p className="text-gray-600"><span className="font-semibold">Experience:</span> {partnerData.experienceYears} years</p>
                    <p className="text-gray-600"><span className="font-semibold">Investment Capacity:</span> {partnerData.investmentCapacity}</p>
                    <p className="text-gray-600"><span className="font-semibold">Availability:</span> {partnerData.availability}</p>
                  </div>
                </div>
              </div>

              {/* Help Description Section */}
              {partnerData.helpDescription && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">How I Can Help</h2>
                  <p className="text-gray-600">{partnerData.helpDescription}</p>
                </div>
              )}

              {/* Contact Information */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-semibold">Email:</span> {partnerData.email}
                    </p>
                    <div className="flex items-center space-x-4">
                      {partnerData.linkedin && (
                        <a
                          href={partnerData.linkedin}
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
                      {partnerData.website && (
                        <a
                          href={partnerData.website}
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

              {/* Action Buttons */}
              <div className="mt-8 flex gap-4 justify-center">
                <button 
                  onClick={handleEmailClick}
                  className="bg-gradient-to-r from-orange-600 to-amber-600 text-white font-medium px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Connect via Email
                </button>
                <button 
                  className="bg-white text-orange-600 border-2 border-orange-200 font-medium px-8 py-3 rounded-lg hover:bg-orange-50 transition-all duration-300 flex items-center"
                  onClick={() => toast.success('Chat feature coming soon!')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Connect with Business
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </PageTransition>
  );
};

export default ViewPartner;