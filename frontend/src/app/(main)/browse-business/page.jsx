'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import PageTransition from '@/components/PageTransition';
import FadeIn from '@/components/animations/FadeIn';
import AnimatedInput from '@/components/animations/AnimatedInput';
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';

const countries = [
  'All Countries',
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
  'France', 'Italy', 'Spain', 'Japan', 'China', 'India', 'Brazil',
  'Singapore', 'UAE'
];

const BrowseBusinesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    country: 'All Countries',
    targetCountry: 'All Countries'
  });
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [connectMessage, setConnectMessage] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [partnerInfo, setPartnerInfo] = useState(null);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/business/getall`);
      const simplifiedBusinesses = response.data.map(business => ({
        _id: business._id,
        fullName: business.fullName,
        businessName: business.businessName,
        country: business.country,
        expansionCountry: business.expansionCountry, // This is the target country
        website: business.website,
        linkedin: business.linkedin
      }));
      setBusinesses(simplifiedBusinesses);
      setFilteredBusinesses(simplifiedBusinesses);
    } catch (error) {
      toast.error('Failed to fetch businesses');
      console.error('Error fetching businesses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    filterBusinesses();
  }, [searchTerm, filters, businesses]);

  const filterBusinesses = () => {
    let filtered = [...businesses];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(business =>
        business.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.businessName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply dropdown filters
    if (filters.country !== 'All Countries') {
      filtered = filtered.filter(business => business.country === filters.country);
    }
    if (filters.targetCountry !== 'All Countries') {
      filtered = filtered.filter(business => business.expansionCountry === filters.targetCountry);
    }

    setFilteredBusinesses(filtered);
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const token = localStorage.getItem('user-token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setPartnerInfo({
          name: decoded.fullName,
          email: decoded.email
        });
      } catch (error) {
        console.error('Error decoding token:', error);
        toast.error('Please login to connect with businesses');
      }
    }
  }, []);

  const handleConnect = async (business) => {
    if (!partnerInfo) {
      toast.error('Please login as a partner to connect with businesses');
      router.push('/login');
      return;
    }
    setSelectedBusiness(business);
    setShowConnectModal(true);
  };

  const handleSendRequest = async () => {
    if (!connectMessage.trim()) {
      toast.error('Please write a message');
      return;
    }

    setIsConnecting(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/business/connect`, {
        businessId: selectedBusiness._id,
        partnerName: partnerInfo.name,
        partnerEmail: partnerInfo.email,
        message: connectMessage
      });
      
      toast.success('Connection request sent successfully!');
      setShowConnectModal(false);
      setConnectMessage('');
    } catch (error) {
      console.error('Error sending connection request:', error);
      toast.error('Failed to send connection request. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-orange-50">
        {/* Decorative elements */}
        <div className="absolute top-0 w-80 h-80 bg-orange-100/20 rounded-full filter blur-3xl -z-10"></div>
        <div className="absolute  bottom-0 w-80 h-80 bg-amber-100/20 rounded-full filter blur-3xl -z-10"></div>

        <FadeIn>
          <div className="max-w-7xl mt-10 mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Businesses</h1>
              <p className="text-lg text-gray-600">Find the perfect business for your growth</p>
            </div>

            {/* Search and Filters */}
            <div className="mb-8 space-y-4 md:space-y-0 md:grid md:grid-cols-3 gap-4">
              <div>
                <AnimatedInput
                  type="text"
                  placeholder="Search businesses..."
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
                <option value="All Countries">All Countries</option>
                {countries.slice(1).map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>

              <select
                value={filters.targetCountry}
                onChange={(e) => handleFilterChange('targetCountry', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="All Countries">All Target Countries</option>
                {countries.slice(1).map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            {/* Businesses Grid */}
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBusinesses.map((business) => (
                  <motion.div
                    key={business._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{business.fullName}</h3>
                        <p className="text-gray-600">{business.businessName}</p>
                      </div>
                      <div className="flex space-x-2">
                        {business.linkedin && (
                          <a
                            href={business.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                          </a>
                        )}
                        {business.website && (
                          <a
                            href={business.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-700"
                          >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <p className="text-gray-600"><span className="font-semibold">Current Location:</span> {business.country}</p>
                      <p className="text-gray-600"><span className="font-semibold">Target Market:</span> {business.expansionCountry}</p>
                    </div>

                    <div className="mt-4">
                      <Link 
                        href={`/view-business/${business._id}`}
                        className="block w-full text-center bg-gradient-to-r from-orange-600 to-amber-600 text-white font-medium px-4 py-2 rounded-lg hover:shadow-lg transition-shadow duration-300"
                      >
                        View Profile
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {!isLoading && filteredBusinesses.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl text-gray-600">No businesses found matching your criteria</h3>
              </div>
            )}
          </div>
        </FadeIn>
      </div>

      {/* Connect Modal */}
      {/* {showConnectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-semibold mb-4">Connect with {selectedBusiness.businessName}</h3>
            <p className="text-gray-600 mb-4">Your message will be sent to the business owner via email.</p>
            
            <textarea
              value={connectMessage}
              onChange={(e) => setConnectMessage(e.target.value)}
              placeholder="Write your message here..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => {
                  setShowConnectModal(false);
                  setConnectMessage('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSendRequest}
                disabled={isConnecting}
                className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg hover:shadow-lg transition-shadow duration-300 disabled:opacity-50"
              >
                {isConnecting ? 'Sending...' : 'Send Request'}
              </button>
            </div>
          </motion.div>
        </div>
      )} */}
    </PageTransition>
  );
};

export default BrowseBusinesses;
