import { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/layout/Layout';
import Head from 'next/head';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset request here
    console.log({ email });
    setIsSubmitted(true);
  };

  return (
    <Layout>
      <Head>
        <title>Forgot Password | Grow-Together</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-white to-orange-50">
        {/* Decorative elements */}
        <div className="absolute -right-40 top-0 w-80 h-80 bg-orange-100/20 rounded-full filter blur-3xl -z-10"></div>
        <div className="absolute -left-40 bottom-0 w-80 h-80 bg-amber-100/20 rounded-full filter blur-3xl -z-10"></div>
        
        <div className="max-w-md w-full space-y-8 relative z-10">
          <div className="text-center">
            <Link href="/" className="inline-block">
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">Grow-Together</h2>
            </Link>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Reset your password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>
          
          <div className="mt-8 bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-100">
            {!isSubmitted ? (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white font-medium px-6 py-3 rounded-lg hover:shadow-lg transition-shadow duration-300"
                  >
                    Send reset link
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 mb-4">
                  <svg className="h-6 w-6 text-orange-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Check your email</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    We've sent a password reset link to <span className="font-medium text-gray-900">{email}</span>.
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Please check your inbox and follow the instructions to reset your password.
                  </p>
                </div>
                <div className="mt-6">
                  <p className="text-sm text-gray-500">
                    Didn't receive the email?{' '}
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="font-medium text-orange-600 hover:text-orange-500"
                    >
                      Try again
                    </button>
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6 text-center">
              <Link href="/signin" className="text-sm font-medium text-orange-600 hover:text-orange-500">
                Back to sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 