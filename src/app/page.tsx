'use client'; // Add 'use client' because we are using useContext hook

import { useContext } from 'react'; // Import useContext
import { Shield, DollarSign, Building2, ArrowRight, CheckCircle } from 'lucide-react';
import { PopupContext } from '../contexts/PopupContext'; // Import PopupContext

// Helper function to get common icon props
// Duplicated from layout.tsx as direct import is not feasible for this subtask.
// TODO: Move to a shared utils file or provide via Context API later.
const getIconProps = (size?: number, className?: string) => ({
  size: size || 24,
  strokeWidth: 2,
  className: `shrink-0 ${className || ''}`.trim(),
});

export default function Home() {
  const popupContext = useContext(PopupContext);

  if (!popupContext) {
    // This should ideally not happen if the provider is correctly set up in layout.tsx
    // For robustness, you could return null, a loading state, or throw an error.
    // Depending on the app's structure, a fallback UI might be rendered here,
    // or an error boundary could catch this.
    console.error("PopupContext not found. Make sure it's provided in a parent component.");
    // For now, let's throw an error to make it explicit during development.
    // In a production app, you might handle this more gracefully.
    throw new Error("PopupContext not found. This is an application setup error.");
  }

  const { setShowPopup } = popupContext;

  const handleHeroButtonClick = () => {
    setShowPopup(true); // Use setShowPopup from context
  };

  return (
    <>
      {/* Hero Section */}
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
            onClick={handleHeroButtonClick} // Updated to use context's setShowPopup
            className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 flex items-center mx-auto"
          >
            Boost Your Coverage <ArrowRight {...getIconProps(24, "ml-2")} />
          </button>
        </div>

        {/* How It Works */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How Yuvi Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Building2 {...getIconProps(48, "text-blue-600 mb-4")} />
              <h3 className="text-xl font-semibold mb-3">Employer Coverage</h3>
              <p className="text-gray-600">
                Your employer provides base insurance coverage with standard copay terms
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <DollarSign {...getIconProps(48, "text-blue-600 mb-4")} />
              <h3 className="text-xl font-semibold mb-3">Your Contribution</h3>
              <p className="text-gray-600">
                Pay an additional 10-20% premium to Yuvi to enhance your coverage
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Shield {...getIconProps(48, "text-blue-600 mb-4")} />
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
                  <CheckCircle {...getIconProps(24, "text-green-500 mr-2 mt-1")} />
                  <span>Employer insurance covers ₹5,00,000</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle {...getIconProps(24, "text-green-500 mr-2 mt-1")} />
                  <span>Hospital bill: ₹3,00,000</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle {...getIconProps(24, "text-green-500 mr-2 mt-1")} />
                  <span>Insurance pays: ₹2,50,000</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle {...getIconProps(24, "text-green-500 mr-2 mt-1")} />
                  <span>Your Yuvi premium: ₹2,000</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle {...getIconProps(24, "text-green-500 mr-2 mt-1")} />
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
    </>
  );
}