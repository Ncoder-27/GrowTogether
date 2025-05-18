'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const PartnerFormSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .required('Full name is required'),
  country: Yup.string()
    .required('Country is required'),
  businessName: Yup.string()
    .required('Business name is required'),
  businessType: Yup.string()
    .required('Business type is required'),
  industry: Yup.string().required('Industry is required'),
  businessRegNo: Yup.string().required('Business registration number is required'),
  website: Yup.string().url('Invalid URL format'),
  linkedin: Yup.string().url('Invalid URL format'),
  experienceYears: Yup.number()
    .min(0, 'Experience must be a positive number')
    .required('Experience is required'),
  investmentCapacity: Yup.string().required('Investment capacity is required'),
  availability: Yup.string().required('Availability is required'),
  helpDescription: Yup.string().required('Help description is required'),
});

const countries = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 
  'France', 'Italy', 'Spain', 'Japan', 'China', 'India', 'Brazil',
  'Mexico', 'South Africa', 'Nigeria', 'Egypt', 'Saudi Arabia', 'UAE',
  'Singapore', 'Malaysia', 'Indonesia', 'Pakistan', 'Bangladesh', 'Russia'
];

const businessTypes = [
  'Technology', 'Finance', 'Healthcare', 'Education', 'Manufacturing',
  'Retail', 'Transportation', 'Hospitality', 'Agriculture', 'Construction',
  'Entertainment', 'Media', 'Consulting', 'Real Estate', 'Energy'
];

const PartnerForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [partnerId, setPartnerId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const formik = useFormik({
    initialValues: {
      // fullName: '',
      // email: '',
      country: '',
      businessName: '',
      businessType: '',
      industry: '',
      businessRegNo: '',
      website: '',
      linkedin: '',
      experienceYears: '',
      investmentCapacity: '',
      availability: '',
      helpDescription: '',
    },
    validationSchema: PartnerFormSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (!partnerId) {
        toast.error('Partner ID not found. Please login again.');
        router.push('/login');
        return;
      }
      setIsSubmitting(true);
      setFormStatus('loading');


      
      try {
        const token = localStorage.getItem('user-token');
        const response = await axios.put(
          `http://localhost:5000/partner/update/${partnerId}`,
          values,
          { headers: { 'x-auth-token': token } }
        );
        console.log('Update response:', response.data);
        toast.success('Partner profile updated successfully!');
        router.push('/');
      } catch (error) {
        console.error('Update error:', error);
        toast.error(error.response?.data?.message || 'Update failed. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const fetchPartnerDetails = async (id, token) => {
    try {
      console.log('Fetching partner details for ID:', id);
      const response = await axios.get(`http://localhost:5000/partner/getbyid/${id}`, {
        headers: { 'x-auth-token': token }
      });
      console.log('Partner details response:', response.data);
      
      if (response.data.data) {
        const partnerData = response.data.data;
        
        // Keep token-based data (email, fullName) and merge with API data
        const updatedValues = {
          ...formik.values,
          ...partnerData,
          // Ensure token data is preserved
          fullName: formik.values.fullName || partnerData.fullName || '',
          email: formik.values.email || partnerData.email || '',
        };
        
        console.log('Setting updated form values:', updatedValues);
        formik.setValues(updatedValues);
      }
    } catch (error) {
      console.error('Error fetching partner details:', error);
      toast.error('Failed to load partner details');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('user-token');
    const userType = localStorage.getItem('user-type');

    if (!token || userType !== 'partner') {
      toast.error('Please login as a partner first');
      router.push('/login');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      console.log('Decoded token:', decoded);
      setPartnerId(decoded._id);
      
      // First set the token data
      const tokenData = {
        ...formik.values,
        fullName: decoded.fullName || '',
        email: decoded.email || ''
      };
      console.log('Setting initial values from token:', tokenData);
      formik.setValues(tokenData);

      // Then fetch additional details
      if (decoded._id) {
        fetchPartnerDetails(decoded._id, token);
      }
    } catch (error) {
      console.error('Error processing token:', error);
      toast.error('Session expired. Please login again');
      router.push('/login');
    }
  }, []);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-white to-orange-50">
      {/* Decorative elements */}
      <div className="absolute -right-40 top-0 w-80 h-80 bg-orange-100/20 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute -left-40 bottom-0 w-80 h-80 bg-amber-100/20 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute right-1/4 bottom-1/4 w-40 h-40 bg-orange-100/20 rounded-full filter blur-xl -z-10"></div>
      
      <div className="max-w-3xl mt-16 mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Partner Registration</h2>
          <p className="mt-2 text-lg text-gray-600">
            Register as a partner to collaborate with businesses
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-orange-100">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Personal Details Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Personal Information</h3>
              
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fullName}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formik.touched.fullName && formik.errors.fullName 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                  } transition-colors duration-200`}
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.fullName}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  readOnly
                  value={formik.values.email || ''}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 cursor-not-allowed"
                />
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.country}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formik.touched.country && formik.errors.country 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                  } transition-colors duration-200`}
                >
                  <option value="">Select a country</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
                {formik.touched.country && formik.errors.country && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.country}</p>
                )}
              </div>
            </div>

            {/* Business Details Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Business Information</h3>
              
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name
                </label>
                <input
                  id="businessName"
                  name="businessName"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.businessName}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formik.touched.businessName && formik.errors.businessName 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                  } transition-colors duration-200`}
                />
                {formik.touched.businessName && formik.errors.businessName && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.businessName}</p>
                )}
              </div>

              <div>
                <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Type
                </label>
                <select
                  id="businessType"
                  name="businessType"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.businessType}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formik.touched.businessType && formik.errors.businessType 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                  } transition-colors duration-200`}
                >
                  <option value="">Select a business type</option>
                  {businessTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {formik.touched.businessType && formik.errors.businessType && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.businessType}</p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Description (Optional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description || ''}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                  placeholder="Describe your business and what kind of partners you're looking for..."
                />
              </div>

              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                  Industry
                </label>
                <input
                  id="industry"
                  name="industry"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.industry}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formik.touched.industry && formik.errors.industry
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                  } transition-colors duration-200`}
                />
                {formik.touched.industry && formik.errors.industry && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.industry}</p>
                )}
              </div>

              <div>
                <label htmlFor="businessRegNo" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Registration Number
                </label>
                <input
                  id="businessRegNo"
                  name="businessRegNo"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.businessRegNo}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formik.touched.businessRegNo && formik.errors.businessRegNo
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                  } transition-colors duration-200`}
                />
                {formik.touched.businessRegNo && formik.errors.businessRegNo && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.businessRegNo}</p>
                )}
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  id="website"
                  name="website"
                  type="url"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.website}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formik.touched.website && formik.errors.website
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                  } transition-colors duration-200`}
                />
                {formik.touched.website && formik.errors.website && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.website}</p>
                )}
              </div>

              <div>
                <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn Profile
                </label>
                <input
                  id="linkedin"
                  name="linkedin"
                  type="url"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.linkedin}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formik.touched.linkedin && formik.errors.linkedin
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                  } transition-colors duration-200`}
                />
                {formik.touched.linkedin && formik.errors.linkedin && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.linkedin}</p>
                )}
              </div>

              <div>
                <label htmlFor="experienceYears" className="block text-sm font-medium text-gray-700 mb-1">
                  Years of Experience
                </label>
                <input
                  id="experienceYears"
                  name="experienceYears"
                  type="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.experienceYears}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formik.touched.experienceYears && formik.errors.experienceYears
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                  } transition-colors duration-200`}
                />
                {formik.touched.experienceYears && formik.errors.experienceYears && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.experienceYears}</p>
                )}
              </div>

              <div>
                <label htmlFor="investmentCapacity" className="block text-sm font-medium text-gray-700 mb-1">
                  Investment Capacity
                </label>
                <input
                  id="investmentCapacity"
                  name="investmentCapacity"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.investmentCapacity}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formik.touched.investmentCapacity && formik.errors.investmentCapacity
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                  } transition-colors duration-200`}
                />
                {formik.touched.investmentCapacity && formik.errors.investmentCapacity && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.investmentCapacity}</p>
                )}
              </div>

              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
                  Availability
                </label>
                <input
                  id="availability"
                  name="availability"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.availability}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formik.touched.availability && formik.errors.availability
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                  } transition-colors duration-200`}
                />
                {formik.touched.availability && formik.errors.availability && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.availability}</p>
                )}
              </div>

              <div>
                <label htmlFor="helpDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  How Can You Help
                </label>
                <textarea
                  id="helpDescription"
                  name="helpDescription"
                  rows={4}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.helpDescription}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formik.touched.helpDescription && formik.errors.helpDescription
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                  } transition-colors duration-200`}
                />
                {formik.touched.helpDescription && formik.errors.helpDescription && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.helpDescription}</p>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                required
                className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              />
              <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <Link href="/terms" className="font-medium text-orange-600 hover:text-orange-500">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="font-medium text-orange-600 hover:text-orange-500">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white font-medium px-6 py-3 rounded-lg 
                  ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg'} transition-all duration-300`}
              >
                {isSubmitting ? 'Registering...' : 'Register as Partner'}
              </button>
            </div>
          </form>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-orange-600 hover:text-orange-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PartnerForm;