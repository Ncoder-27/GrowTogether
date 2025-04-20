'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import FadeIn from '@/components/animations/FadeIn';
import AnimatedButton from '@/components/animations/AnimatedButton';
import AnimatedInput from '@/components/animations/AnimatedInput';
import AnimatedLoader from '@/components/AnimatedLoader';

const BusinessFormSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .required('Full name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  country: Yup.string()
    .required('Country is required'),
  businessName: Yup.string()
    .required('Business name is required'),
  businessRegNo: Yup.string()
    .required('Business registration number is required'),
  businessPlan: Yup.string()
    .required('Business plan is required')
});

const countries = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 
  'France', 'Italy', 'Spain', 'Japan', 'China', 'India', 'Brazil',
  'Mexico', 'South Africa', 'Nigeria', 'Egypt', 'Saudi Arabia', 'UAE',
  'Singapore', 'Malaysia', 'Indonesia', 'Pakistan', 'Bangladesh', 'Russia'
];


const BusinessForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      country: '',
      businessName: '',
      businessRegNo: '',
      businessPlan: ''
    },
    validationSchema: BusinessFormSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setFormStatus('loading');
      try {
        const response = await axios.post('http://localhost:5000/business/add', values);
        console.log(response.data);
        toast.success('Business registered successfully!');
        setFormStatus('success');
        router.push('/')
      } catch (error) {
        console.error(error);
        setFormStatus('error');
        toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
        // Reset form status after a delay
        setFormStatus('idle');
        setIsSubmitting(false);
      }
    }
  });

  // The container variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  // The item variants for individual form elements
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };




  const upload = (e) => {

    const file = e.target.files[0];
    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', 'growtogether')
    fd.append('cloud_name', 'dzgymg2jq')

    axios.post('https://api.cloudinary.com/v1_1/dzgymg2jq/image/upload', fd)
        .then((result) => {
            toast.success('file upload successfully');
            console.log(result.data);
            // setPreview(result.data.url);
            formik.setFieldValue('businessPlan', result.data.url);

        }).catch((err) => {
            console.log(err);
            toast.error('failed to upload file');

        });
};



  return (
    <PageTransition>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-white to-orange-50">
        {/* Decorative background elements */}
        <motion.div 
          className="absolute -right-40 top-0 w-80 h-80 bg-orange-100/20 rounded-full filter blur-3xl -z-10"
          animate={{ 
            x: [0, 15, 0],
            y: [0, -10, 0],
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
            x: [0, -15, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            repeatType: 'mirror'
          }}
        />
        
        <div className="max-w-3xl mt-16 mx-auto">
          <FadeIn direction="down">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Business Registration</h2>
              <p className="mt-2 text-lg text-gray-600">
                Register your business to find strategic partners
              </p>
            </div>
          </FadeIn>

          {formStatus === 'loading' || formStatus === 'success' || formStatus === 'error' ? (
            <div className="bg-white rounded-xl shadow-lg p-16 sm:p-20 border border-orange-100 flex justify-center items-center">
              <AnimatedLoader 
                type={formStatus === 'loading' ? 'default' : formStatus === 'success' ? 'success' : 'error'} 
                size="lg" 
                text={
                  formStatus === 'loading' ? 'Submitting your registration...' : 
                  formStatus === 'success' ? 'Registration successful!' : 
                  'Registration failed. Please try again.'
                }
                isSuccess={formStatus === 'success'}
                isError={formStatus === 'error'}
              />
            </div>
          ) : (
            <FadeIn>
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-orange-100">
                <motion.form 
                  onSubmit={formik.handleSubmit} 
                  className="space-y-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Personal Details Section */}
                  <motion.div className="space-y-4" variants={itemVariants}>
                    <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Personal Details</h3>
                    
                    <AnimatedInput
                      id="fullName"
                      name="fullName"
                      label="Full Name"
                      value={formik.values.fullName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.errors.fullName}
                      touched={formik.touched.fullName}
                      required
                    />

                    <AnimatedInput
                      id="email"
                      name="email"
                      type="email"
                      label="Email Address"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.errors.email}
                      touched={formik.touched.email}
                      required
                    />

                    <AnimatedInput
                      id="password"
                      name="password"
                      type="password"
                      label="Password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.errors.password}
                      touched={formik.touched.password}
                      required
                    />

                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <motion.select
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
                        whileFocus={{ scale: 1.01 }}
                      >
                        <option value="">Select a country</option>
                        {countries.map((country) => (
                          <option key={country} value={country}>{country}</option>
                        ))}
                      </motion.select>
                      {formik.touched.country && formik.errors.country && (
                        <motion.p 
                          className="mt-1 text-sm text-red-600"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {formik.errors.country}
                        </motion.p>
                      )}
                    </div>
                  </motion.div>

                  {/* Business Details Section */}
                  <motion.div className="space-y-4" variants={itemVariants}>
                    <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Business Details</h3>
                    
                    <AnimatedInput
                      id="businessName"
                      name="businessName"
                      label="Business Name"
                      value={formik.values.businessName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.errors.businessName}
                      touched={formik.touched.businessName}
                      required
                    />

                    <AnimatedInput
                      id="businessRegNo"
                      name="businessRegNo"
                      label="Business Registration Number"
                      value={formik.values.businessRegNo}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.errors.businessRegNo}
                      touched={formik.touched.businessRegNo}
                      required
                    />

                    <div>
                      <label htmlFor="upload" className="block text-sm font-medium text-gray-700 mb-1">
                        Business Plan <span className="text-red-500">*</span>
                        <input type="file" onChange={upload} hidden id='upload'/>
                      </label>
                      <motion.input
                        id="businessPlan"
                        type='text'
                        name="businessPlan"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.businessPlan}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          formik.touched.businessPlan && formik.errors.businessPlan 
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                            : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                        } transition-colors duration-200`}
                        whileFocus={{ scale: 1.01 }}
                      />
                      {formik.touched.businessPlan && formik.errors.businessPlan && (
                        <motion.p 
                          className="mt-1 text-sm text-red-600"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {formik.errors.businessPlan}
                        </motion.p>
                      )}
                    </div>
                  </motion.div>

                  <motion.div className="flex items-center" variants={itemVariants}>
                    <motion.input
                      id="agree-terms"
                      name="agree-terms"
                      type="checkbox"
                      required
                      className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                    <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
                      I agree to the{' '}
                      <Link href="/terms" className="font-medium text-orange-600 hover:text-orange-500 relative group">
                        Terms of Service
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="font-medium text-orange-600 hover:text-orange-500 relative group">
                        Privacy Policy
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                      </Link>
                    </label>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <AnimatedButton
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? 'Registering...' : 'Register Business'}
                    </AnimatedButton>
                  </motion.div>
                </motion.form>
              </div>
            </FadeIn>
          )}

          <FadeIn direction="up" delay={0.2}>
            <div className="text-center mt-6">
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

export default BusinessForm; 