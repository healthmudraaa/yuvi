'use client';

import { useState } from 'react'; // Removed useEffect
import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link'; // Import Link
import { Shield, DollarSign, Building2, ArrowRight, CheckCircle, X } from 'lucide-react';
import { PopupContext } from '../contexts/PopupContext';
import './globals.css';

// Helper function to get common icon props
const getIconProps = (size?: number, className?: string) => ({
  size: size || 24,
  strokeWidth: 2,
  className: `shrink-0 ${className || ''}`.trim(),
});

export const metadata: Metadata = {
  title: 'Yuvi - Enhanced Employee Insurance Coverage',
  description: 'Reduce your copay burden with Yuvi\'s additional insurance coverage on top of your employer-provided insurance.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
  });
  const [formMessage, setFormMessage] = useState(''); // Added formMessage state

  // useEffect for Tawk.to script removed

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    setFormMessage('Thank you! We will contact you soon.'); // Set success message
    // setShowPopup(false); // Removed: Keep popup open to show message
    setFormData({ name: '', email: '', mobile: '' }); // Reset form
    // alert('Thank you! We will contact you soon.'); // Removed alert
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLiveChatToggle = () => {
    if (typeof (window as any).tawk_API?.toggle === 'function') {
      (window as any).tawk_API.toggle();
    } else {
      console.error('Tawk.to API not available or toggle function missing.');
      // Optionally, provide user feedback here, e.g., alert('Live Chat is currently unavailable.')
    }
  };

  return (
    <html lang="en">
      <body>
        <Script
          src="https://embed.tawk.to/62b3f9147b967b1179960fc5/1g67g9v4a"
          strategy="afterInteractive"
          charSet="UTF-8"
          crossOrigin="anonymous"
        />
        <PopupContext.Provider value={{ showPopup, setShowPopup }}>
          <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white relative">
            {/* Contact Form Popup */}
            {showPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4 relative">
                  <button
                    onClick={() => {
                      setShowPopup(false);
                      setFormMessage(''); // Clear message on close
                    }}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                  >
                    <X {...getIconProps(24, "")} />
                  </button>
                  <h2 className="text-2xl font-bold text-center mb-6">Get Started with Yuvi</h2>
                  {formMessage ? (
                    <p className="text-green-600 mt-2 mb-4 text-center">{formMessage}</p>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your mobile number"
                    />
                  </div>
                        Get Enhanced Coverage
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}

            {/* Navbar */}
            <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Shield {...getIconProps(32, "text-blue-600")} />
                  <span className="ml-2 text-2xl font-bold text-blue-900">Yuvi</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Link href="/about" className="px-4 py-2 text-blue-600 hover:text-blue-700">
                    About
                  </Link>
                  <button
                    onClick={handleLiveChatToggle}
                    className="px-4 py-2 text-blue-600 hover:text-blue-700 border border-blue-600 rounded-lg"
                  >
                    Live Chat
                  </button>
                  <button
                    onClick={() => setShowPopup(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
            </nav>

            {children}

            {/* Footer */}
            <footer className="bg-gray-50 mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Shield {...getIconProps(24, "text-blue-600")} />
                  <span className="ml-2 text-xl font-bold text-blue-900">Yuvi</span>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-gray-600">© 2024 Yuvi. All rights reserved.</p>
                  <button
                    onClick={handleLiveChatToggle}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Live Chat
                  </button>
                </div>
              </div>
            </div>
            </footer>
          </div>
        </PopupContext.Provider>
      </body>
    </html>
  );
}