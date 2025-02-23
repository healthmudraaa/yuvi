import React from 'react';
import { Shield, DollarSign, Building2, Users, ArrowRight, CheckCircle } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-blue-900">Yuvi</span>
            </div>
            <div className="flex space-x-4">
              <button className="px-4 py-2 text-blue-600 hover:text-blue-700">About</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
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
          <button className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 flex items-center mx-auto">
            Boost Your Coverage <ArrowRight className="ml-2" />
          </button>
        </div>

        {/* How It Works */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How Yuvi Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Building2 className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Employer Coverage</h3>
              <p className="text-gray-600">
                Your employer provides base insurance coverage with standard copay terms
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <DollarSign className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Your Contribution</h3>
              <p className="text-gray-600">
                Pay an additional 10-20% premium to Yuvi to enhance your coverage
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Shield className="h-12 w-12 text-blue-600 mb-4" />
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
                  <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-1" />
                  <span>Employer insurance covers ₹5,00,000</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-1" />
                  <span>Hospital bill: ₹3,00,000</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-1" />
                  <span>Insurance pays: ₹2,50,000</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-1" />
                  <span>Your Yuvi premium: ₹2,000</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-1" />
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

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Enhance Your Coverage?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of employees who have already optimized their insurance coverage with Yuvi
          </p>
          <button className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700">
            Get Started Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-blue-900">Yuvi</span>
            </div>
            <p className="text-gray-600">© 2024 Yuvi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;