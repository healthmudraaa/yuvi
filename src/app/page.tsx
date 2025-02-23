'use client';

import { useState, useEffect } from 'react';
import { Shield, DollarSign, Building2, ArrowRight, CheckCircle, X } from 'lucide-react';

// Helper function to get common icon props
const getIconProps = (size?: number) => ({
  size: size || 24,
  strokeWidth: 2,
  className: "shrink-0"
});

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
  });

  // Load Tawk.to script
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://embed.tawk.to/62b3f9147b967b1179960fc5/1g67g9v4a';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    setShowPopup(false);
    // Reset form
    setFormData({ name: '', email: '', mobile: '' });
    // Show success message (you can implement a toast notification here)
    alert('Thank you! We will contact you soon.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white relative">
      {/* Contact Form Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4 relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X {...getIconProps(24)} />
            </button>
            <h2 className="text-2xl font-bold text-center mb-6">Get Started with Yuvi</h2>
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
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Get Enhanced Coverage
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield {...getIconProps(32)} className="text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-blue-900">Yuvi</span>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={() => window.tawk_API?.toggle()} 
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Enhance Your Employee Insurance Coverage
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Reduce your copay burden by contributing a small additional premium. 
            Get better coverage on top of your employer-provided insurance.
          </p>
          <button
            onClick={() => setShowPopup(true)}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 flex items-center mx-auto"
          >
            Boost Your Coverage <ArrowRight {...getIconProps(24)} className="ml-2" />
          </button>
        </div>

        {/* How It Works */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How Yuvi Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Building2 {...getIconProps(48)} className="text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Employer Coverage</h3>
              <p className="text-gray-600">
                Your employer provides base insurance coverage with standard copay terms
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <DollarSign {...getIconProps(48)} className="text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Your Contribution</h3>
              <p className="text-gray-600">
                Pay an additional 10-20% premium to Yuvi to enhance your coverage
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Shield {...getIconProps(48)} className="text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Enhanced Protection</h3>
              <p className="text-gray-600">
                Get additional coverage on top of your employer's insurance
              </p>
            </div>
          </div>
        </div>

        {/* Example Case */}
        <div className="mt-24 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">See How Much You Can Save</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Example Scenario</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle {...getIconProps(24)} className="text-green-500 mr-2 mt-1" />
                  <span>Employer insurance covers ₹5,00,000</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle {...getIconProps(24)} className="text-green-500 mr-2 mt-1" />
                  <span>Hospital bill: ₹3,00,000</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle {...getIconProps(24)} className="text-green-500 mr-2 mt-1" />
                  <span>Insurance pays: ₹2,50,000</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle {...getIconProps(24)} className="text-green-500 mr-2 mt-1" />
                  <span>Your Yuvi premium: ₹2,000</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle {...getIconProps(24)} className="text-green-500 mr-2 mt-1" />
                  <span className="font-semibold">Yuvi covers the extra ₹50,000!</span>
                </li>
              </ul>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="text-center">
                <h4 className="text-xl font-semibold mb-4">Your Savings with Yuvi</h4>
                <div className="text-4xl font-bold text-blue-600 mb-2">₹48,000</div>
                <p className="text-gray-600">Pay ₹2,000 to save ₹50,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield {...getIconProps(24)} className="text-blue-600" />
              <span className="ml-2 text-xl font-bold text-blue-900">Yuvi</span>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-gray-600">© 2024 Yuvi. All rights reserved.</p>
              <button 
                onClick={() => window.tawk_API?.toggle()}
                className="text-blue-600 hover:text-blue-700"
              >
                Live Chat
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}