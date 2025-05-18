'use client'
import Link from 'next/link';
import Head from 'next/head';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';

const PartnerSchema = Yup.object().shape({
  fullName: Yup.string().min(3,"Too Short").required('Full name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
});

const SignUp = () => {
  const router = useRouter();

  const signupForm = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    onSubmit: (values, {resetForm}) => {
      axios.post('http://localhost:5000/partner/add', values)
        .then((result) => {
          console.log(result.data);
          toast.success('Partner account created successfully!');
          resetForm();
          router.push('/login');
        }).catch((err) => {
          toast.error('Error creating partner account!');
        });
    },
    validationSchema: PartnerSchema,
  });

  return (
    <>
      <Head>
        <title>Partner Sign Up | Grow-Together</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-white to-orange-50">
        <div className="absolute -right-40 top-0 w-80 h-80 bg-orange-100/20 rounded-full filter blur-3xl -z-10"></div>
        <div className="absolute -left-40 bottom-0 w-80 h-80 bg-amber-100/20 rounded-full filter blur-3xl -z-10"></div>
        <div className="absolute right-1/4 bottom-1/4 w-40 h-40 bg-orange-100/20 rounded-full filter blur-xl -z-10"></div>

        <div className="max-w-md w-full space-y-8 relative z-10">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Create your partner account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Already a partner?{' '}
              <Link href="/login" className="font-medium text-orange-600 hover:text-orange-500">
                Sign in
              </Link>
            </p>
          </div>

          {/* Form Section */}
          <div className="mt-8 bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-100">
            <form className="space-y-6" onSubmit={signupForm.handleSubmit}>
              <div className="grid grid-cols-1 gap-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    id="fullName"
                    type="text"
                    onChange={signupForm.handleChange}
                    value={signupForm.values.fullName}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                  {signupForm.errors.fullName && signupForm.touched.fullName && (
                    <div className="text-red-500 text-sm mt-1">{signupForm.errors.fullName}</div>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                  <input
                    id="email"
                    name="email"
                    onChange={signupForm.handleChange}
                    value={signupForm.values.email}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                  {signupForm.errors.email && signupForm.touched.email && (
                    <div className="text-red-500 text-sm mt-1">{signupForm.errors.email}</div>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={signupForm.handleChange}
                    value={signupForm.values.password}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                  {signupForm.errors.password && signupForm.touched.password && (
                    <div className="text-red-500 text-sm mt-1">{signupForm.errors.password}</div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm password</label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    onChange={signupForm.handleChange}
                    value={signupForm.values.confirmPassword}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                  {signupForm.errors.confirmPassword && signupForm.touched.confirmPassword && (
                    <div className="text-red-500 text-sm mt-1">{signupForm.errors.confirmPassword}</div>
                  )}
                </div>

                {/* Terms Agreement */}
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
                    <Link href="/terms" className="font-medium text-orange-600 hover:text-orange-500">Terms of Service</Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="font-medium text-orange-600 hover:text-orange-500">Privacy Policy</Link> as a partner.
                  </label>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white font-medium px-6 py-3 rounded-lg hover:shadow-lg transition-shadow duration-300"
                  >
                    Create partner account
                  </button>
                </div>
              </div>
            </form>

            {/* OR Section */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* Social Icons */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div>
                  <a href="#" className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    {/* GitHub or any icon */}
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">...</svg>
                  </a>
                </div>
                <div>
                  <a href="#" className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    {/* Twitter or any icon */}
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">...</svg>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
