'use client';

import { useState, useEffect } from 'react';
import {
  Shield,
  ArrowRight,
  CheckCircle,
  X,
  Link2,
  Layers,
  Puzzle,
  HeartPulse,
  Stethoscope,
  Brain,
  PiggyBank,
  Users,
  Building2,
  Webhook,
  Code2,
  KeyRound,
} from 'lucide-react';

const getIconProps = (size?: number) => ({
  size: size || 24,
  strokeWidth: 2,
  className: 'shrink-0',
});

const ADDONS = [
  { icon: Stethoscope, name: 'OPD & Teleconsults', desc: 'Doctor visits, diagnostics and pharmacy on top of the base policy.' },
  { icon: HeartPulse, name: 'Copay Waiver', desc: 'Pay a small premium, Yuvi waives the employee copay gap at claim time.' },
  { icon: Brain, name: 'Mental Health', desc: 'Therapy and counselling sessions bundled as a selectable add-on.' },
  { icon: PiggyBank, name: 'Critical Illness Top-up', desc: 'Extra sum insured for high-cost diagnoses, stacked on any group plan.' },
];

const API_ENDPOINTS = [
  { method: 'POST', path: '/v1/groups/link', desc: 'Link an employer’s existing group policy, any insurer.' },
  { method: 'GET', path: '/v1/addons', desc: 'List available add-ons for a linked policy.' },
  { method: 'POST', path: '/v1/addons/subscribe', desc: 'Enroll an employee into one or more add-ons.' },
  { method: 'POST', path: '/v1/claims/copay-waiver', desc: 'Submit a claim gap for copay-waiver settlement.' },
];

const CODE_SNIPPET = `curl -X POST https://api.yuvi.co/v1/claims/copay-waiver \\
  -H "Authorization: Bearer YUVI_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "policy_id": "grp_8f2c1a",
    "employee_id": "emp_2291",
    "claim_amount": 300000,
    "insurer_settled": 250000
  }'

# 200 OK
{ "waiver_id": "wv_019a", "status": "approved", "waived_amount": 50000 }`;

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '' });

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
    console.log('Form submitted:', formData);
    setShowPopup(false);
    setFormData({ name: '', email: '', mobile: '' });
    alert('Thank you! We will contact you soon.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white relative">
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X {...getIconProps(24)} />
            </button>
            <h2 className="text-2xl font-bold text-center mb-6">Talk to the Yuvi team</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Work Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your work email" />
              </div>
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <input type="tel" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your mobile number" />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Request a Demo
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Shield {...getIconProps(30)} className="text-blue-600" />
            <span className="ml-2 text-2xl font-bold text-blue-900">Yuvi</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#how-it-works" className="hover:text-blue-600">How it works</a>
            <a href="#addons" className="hover:text-blue-600">Add-ons</a>
            <a href="/developers" className="hover:text-blue-600">Tech & API</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => window.tawk_API?.toggle()} className="hidden sm:block px-4 py-2 text-blue-600 hover:text-blue-700 border border-blue-600 rounded-lg text-sm">
              Live Chat
            </button>
            <button onClick={() => setShowPopup(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
            One API. Every group policy. Zero rip-and-replace.
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            The embedded layer for<br className="hidden md:block" /> group health insurance
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Yuvi plugs into the group health policy your employees already have — any insurer, any TPA —
            and lets them stack add-ons and waive the copay gap, without your HR team touching a thing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setShowPopup(true)} className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 flex items-center justify-center">
              Request a Demo <ArrowRight {...getIconProps(22)} className="ml-2" />
            </button>
            <a href="/developers" className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-50 flex items-center justify-center">
              View API Docs
            </a>
          </div>
        </div>
      </header>

      {/* With / Without */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">With, or without Yuvi</h2>
        <p className="text-center text-gray-500 mb-12">Same employer policy. Very different employee experience.</p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border border-gray-200 rounded-2xl p-8">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">Without Yuvi</h3>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start"><X {...getIconProps(20)} className="text-red-400 mr-3 mt-0.5" /> One policy, one insurer, fixed terms for the whole year</li>
              <li className="flex items-start"><X {...getIconProps(20)} className="text-red-400 mr-3 mt-0.5" /> No way to add OPD, dental or mental health without a broker renewal cycle</li>
              <li className="flex items-start"><X {...getIconProps(20)} className="text-red-400 mr-3 mt-0.5" /> Employee pays the full copay gap out of pocket at claim time</li>
              <li className="flex items-start"><X {...getIconProps(20)} className="text-red-400 mr-3 mt-0.5" /> Switching insurers means switching every integration</li>
            </ul>
          </div>
          <div className="border-2 border-blue-600 rounded-2xl p-8 bg-blue-50/40 relative">
            <span className="absolute -top-3 right-6 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">Recommended</span>
            <h3 className="text-sm font-semibold text-blue-700 uppercase tracking-wide mb-4">With Yuvi</h3>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start"><CheckCircle {...getIconProps(20)} className="text-green-500 mr-3 mt-0.5" /> Link one, two or ten group policies across insurers into a single employee view</li>
              <li className="flex items-start"><CheckCircle {...getIconProps(20)} className="text-green-500 mr-3 mt-0.5" /> Employees self-serve add-ons mid-year — no renewal, no broker call</li>
              <li className="flex items-start"><CheckCircle {...getIconProps(20)} className="text-green-500 mr-3 mt-0.5" /> Copay waiver settles the gap automatically against the linked claim</li>
              <li className="flex items-start"><CheckCircle {...getIconProps(20)} className="text-green-500 mr-3 mt-0.5" /> Insurer-agnostic API — swap or add insurers without touching your app</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How Yuvi works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Link2, title: 'Link', desc: 'Connect existing group policies via insurer/TPA integration or a single CSV upload.' },
              { icon: Layers, title: 'Aggregate', desc: 'Yuvi normalizes coverage, sub-limits and copay terms across every linked policy.' },
              { icon: Puzzle, title: 'Offer add-ons', desc: 'Employees browse and subscribe to OPD, mental health and top-up covers.' },
              { icon: HeartPulse, title: 'Waive the copay', desc: 'At claim time, Yuvi settles the gap between insurer payout and the bill.' },
            ].map((step, i) => (
              <div key={step.title} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">{i + 1}</div>
                  <step.icon {...getIconProps(28)} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons marketplace */}
      <section id="addons" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">An add-on marketplace, not a single plan</h2>
        <p className="text-center text-gray-500 mb-12">Every add-on stacks on top of whatever group policy the employee already has.</p>
        <div className="grid md:grid-cols-4 gap-6">
          {ADDONS.map((a) => (
            <div key={a.name} className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition">
              <a.icon {...getIconProps(32)} className="text-blue-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">{a.name}</h3>
              <p className="text-sm text-gray-600">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Example savings case */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">The copay-waiver math</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ul className="space-y-4">
              <li className="flex items-start"><CheckCircle {...getIconProps(24)} className="text-green-500 mr-2 mt-1" /> Employer group policy covers ₹5,00,000</li>
              <li className="flex items-start"><CheckCircle {...getIconProps(24)} className="text-green-500 mr-2 mt-1" /> Hospital bill: ₹3,00,000</li>
              <li className="flex items-start"><CheckCircle {...getIconProps(24)} className="text-green-500 mr-2 mt-1" /> Insurer settles: ₹2,50,000 (copay clause applies)</li>
              <li className="flex items-start"><CheckCircle {...getIconProps(24)} className="text-green-500 mr-2 mt-1" /> Employee's Yuvi copay-waiver add-on: ₹2,000/yr</li>
              <li className="flex items-start"><CheckCircle {...getIconProps(24)} className="text-green-500 mr-2 mt-1" /> <span className="font-semibold">Yuvi waives the remaining ₹50,000</span></li>
            </ul>
            <div className="bg-blue-50 p-6 rounded-xl text-center">
              <h4 className="text-xl font-semibold mb-4">Out-of-pocket avoided</h4>
              <div className="text-4xl font-bold text-blue-600 mb-2">₹48,000</div>
              <p className="text-gray-600">Pay ₹2,000 in premium, avoid ₹50,000 at claim time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech / API */}
      <section id="tech" className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-800 text-blue-300 text-sm font-semibold mb-6">
              <Code2 {...getIconProps(16)} /> Built for developers
            </span>
            <h2 className="text-3xl font-bold mb-3">One integration, every insurer</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-4">
              REST API, webhooks for claim status, and a sandbox environment — so your HRMS or benefits app
              can link policies and settle copay waivers without a single manual reconciliation.
            </p>
            <a href="/developers" className="text-blue-400 hover:text-blue-300 text-sm font-semibold inline-flex items-center gap-1">
              Full API reference <ArrowRight {...getIconProps(14)} />
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-start mb-16">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Webhook {...getIconProps(20)} className="text-blue-400" /> Core endpoints</h3>
              <div className="space-y-3">
                {API_ENDPOINTS.map((e) => (
                  <div key={e.path} className="flex items-start gap-3 bg-gray-800 rounded-lg p-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded shrink-0 ${e.method === 'GET' ? 'bg-emerald-900 text-emerald-300' : 'bg-blue-900 text-blue-300'}`}>
                      {e.method}
                    </span>
                    <div>
                      <code className="text-sm text-gray-100">{e.path}</code>
                      <p className="text-xs text-gray-400 mt-1">{e.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><KeyRound {...getIconProps(20)} className="text-blue-400" /> Settle a copay waiver</h3>
              <pre className="bg-gray-800 rounded-lg p-5 text-xs md:text-sm text-gray-100 overflow-x-auto">
                <code>{CODE_SNIPPET}</code>
              </pre>
            </div>
          </div>

          {/* Flow diagram */}
          <div>
            <h3 className="text-lg font-semibold mb-8 text-center">API flow: from policy link to copay settlement</h3>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 overflow-x-auto pb-2">
              {[
                { icon: Building2, label: 'Employer HRMS / app' },
                { icon: Link2, label: 'Yuvi link API' },
                { icon: Layers, label: 'Insurer / TPA integrations' },
                { icon: Users, label: 'Employee self-serve add-ons' },
                { icon: HeartPulse, label: 'Claims & copay-waiver engine' },
              ].map((node, i, arr) => (
                <div key={node.label} className="flex items-center gap-4 shrink-0">
                  <div className="flex flex-col items-center text-center w-36">
                    <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center mb-3">
                      <node.icon {...getIconProps(26)} className="text-white" />
                    </div>
                    <span className="text-sm text-gray-300">{node.label}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <ArrowRight {...getIconProps(20)} className="text-gray-500 hidden md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Bring every group policy under one roof</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Whether you run HR for one company or benefits for a hundred, Yuvi's API sits on top of what your
          employees already have — no insurer lock-in, no renewal-cycle wait for add-ons.
        </p>
        <button onClick={() => setShowPopup(true)} className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 inline-flex items-center">
          Request a Demo <ArrowRight {...getIconProps(22)} className="ml-2" />
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <Shield {...getIconProps(24)} className="text-blue-600" />
            <span className="ml-2 text-xl font-bold text-blue-900">Yuvi</span>
          </div>
          <div className="flex items-center gap-6">
            <p className="text-gray-500 text-sm">© 2026 Yuvi. All rights reserved.</p>
            <button onClick={() => window.tawk_API?.toggle()} className="text-blue-600 hover:text-blue-700 text-sm">
              Live Chat
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
