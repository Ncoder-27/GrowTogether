'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import PageTransition from '@/components/PageTransition';
import FadeIn from '@/components/animations/FadeIn';
import AnimatedInput from '@/components/animations/AnimatedInput';

const countries = [
  'All Countries',
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
  'France', 'Italy', 'Spain', 'Japan', 'China', 'India', 'Brazil',
  'Singapore', 'UAE'
];

const businessTypes = [
  'All Types',
  'Technology', 'Finance', 'Healthcare', 'Education', 'Manufacturing',
  'Retail', 'Transportation', 'Hospitality', 'Agriculture', 'Construction',
  'Entertainment', 'Media', 'Consulting', 'Real Estate', 'Energy'
];

const industries = [
  'All Industries',
  'Software', 'Banking', 'Healthcare', 'E-commerce', 'Automotive',
  'Aerospace', 'Telecommunications', 'Food & Beverage', 'Pharmaceuticals',
  'Consumer Goods'
];

const investmentRanges = [
  'All Ranges',
  '$10,000 - $50,000',
  '$50,000 - $100,000',
  '$100,000 - $500,000',
  '$500,000 - $1,000,000',
  '$1,000,000+'
];

const BrowsePartners = () => {
  const [partners, setPartners] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    country: 'All Countries',
    businessType: 'All Types',
    industry: 'All Industries',
    investmentCapacity: 'All Ranges'
  });

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/partner/getall`);
      setPartners(response.data.data);
      setFilteredPartners(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch partners');
      console.error('Error fetching partners:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    filterPartners();
  }, [searchTerm, filters, partners]);

  const filterPartners = () => {
    let filtered = [...partners];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(partner =>
        partner.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        partner.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        partner.helpDescription?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply dropdown filters
    if (filters.country !== 'All Countries') {
      filtered = filtered.filter(partner => partner.country === filters.country);
    }
    if (filters.businessType !== 'All Types') {
      filtered = filtered.filter(partner => partner.businessType === filters.businessType);
    }
    if (filters.industry !== 'All Industries') {
      filtered = filtered.filter(partner => partner.industry === filters.industry);
    }
    if (filters.investmentCapacity !== 'All Ranges') {
      filtered = filtered.filter(partner => partner.investmentCapacity === filters.investmentCapacity);
    }

    setFilteredPartners(filtered);
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <PageTransition>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-orange-50">
        {/* Decorative elements */}
        <div className="absolute -right-40 top-0 w-80 h-80 bg-orange-100/20 rounded-full filter blur-3xl -z-10"></div>
        <div className="absolute -left-40 bottom-0 w-80 h-80 bg-amber-100/20 rounded-full filter blur-3xl -z-10"></div>

        <FadeIn>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Partners</h1>
              <p className="text-lg text-gray-600">Find the perfect partner for your business growth</p>
            </div>

            {/* Search and Filters */}
            <div className="mb-8 space-y-4 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="col-span-2 lg:col-span-1">
                <AnimatedInput
                  type="text"
                  placeholder="Search partners..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>

              <select
                value={filters.country}
                onChange={(e) => handleFilterChange('country', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>

              <select
                value={filters.businessType}
                onChange={(e) => handleFilterChange('businessType', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                {businessTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <select
                value={filters.industry}
                onChange={(e) => handleFilterChange('industry', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>

              <select
                value={filters.investmentCapacity}
                onChange={(e) => handleFilterChange('investmentCapacity', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                {investmentRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>

            {/* Partners Grid */}
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPartners.map((partner) => (
                  <motion.div
                    key={partner._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{partner.fullName}</h3>
                        <p className="text-gray-600">{partner.businessName}</p>
                      </div>
                      <div className="flex space-x-2">
                        {partner.linkedin && (
                          <a
                            href={partner.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                          </a>
                        )}
                        {partner.website && (
                          <a
                            href={partner.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-700"
                          >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <p className="text-gray-600"><span className="font-semibold">Location:</span> {partner.country}</p>
                      <p className="text-gray-600"><span className="font-semibold">Industry:</span> {partner.industry}</p>
                      <p className="text-gray-600"><span className="font-semibold">Experience:</span> {partner.experienceYears} years</p>
                      <p className="text-gray-600"><span className="font-semibold">Investment Capacity:</span> {partner.investmentCapacity}</p>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-gray-900 mb-2">How I Can Help:</h4>
                      <p className="text-gray-600 line-clamp-3">{partner.helpDescription}</p>
                    </div>

                    <div className="mt-4">
                      <button className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white font-medium px-4 py-2 rounded-lg hover:shadow-lg transition-shadow duration-300">
                        Connect
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {!isLoading && filteredPartners.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl text-gray-600">No partners found matching your criteria</h3>
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </PageTransition>
  );
};

export default BrowsePartners;