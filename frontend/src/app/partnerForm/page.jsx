'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const PartnerFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  country: Yup.string()
    .required('Country is required'),
  businessName: Yup.string()
    .required('Business name is required'),
  businessType: Yup.string()
    .required('Business type is required')
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
  
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      country: '',
      businessName: '',
      businessType: ''
    },
    validationSchema: PartnerFormSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        // Replace with your API endpoint for partners
        const response = await axios.post('http://localhost:5000/partner/add', values);
        toast.success('Partner profile registered successfully!');
        router.push('/login');
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-white to-orange-50">
      {/* Decorative elements */}
      <div className="absolute -right-40 top-0 w-80 h-80 bg-orange-100/20 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute -left-40 bottom-0 w-80 h-80 bg-amber-100/20 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute right-1/4 bottom-1/4 w-40 h-40 bg-orange-100/20 rounded-full filter blur-xl -z-10"></div>
      
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/join" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to options
          </Link>
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
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formik.touched.name && formik.errors.name 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                  } transition-colors duration-200`}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.name}</p>
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formik.touched.email && formik.errors.email 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                  } transition-colors duration-200`}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
                )}
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