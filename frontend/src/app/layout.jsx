'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>Grow-Together - Building Strategic Business Partnerships</title>
        <meta name="description" content="Grow-Together helps businesses form strategic partnerships through AI-powered matchmaking, secure communication, and structured business connections." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen text-gray-700">
          <Navbar />
          <main className="flex-grow w-full">
            <AnimatePresence mode='wait'>
              {children}
            </AnimatePresence>
          </main>
          <Footer />
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#fff',
              color: '#333',
              border: '1px solid #f0f0f0',
              padding: '16px',
              borderRadius: '10px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            },
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
              style: {
                border: '1px solid #D1FAE5',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
              style: {
                border: '1px solid #FEE2E2',
              },
            },
            duration: 4000,
          }}
        />
      </body>
    </html>
  );
}
