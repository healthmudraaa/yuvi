'use client';

import {
  Shield,
  ArrowRight,
  ArrowLeft,
  Webhook,
  KeyRound,
  Layers,
  Link2,
  Building2,
  Users,
  HeartPulse,
  ShieldCheck,
  Terminal,
} from 'lucide-react';

const getIconProps = (size?: number) => ({
  size: size || 24,
  strokeWidth: 2,
  className: 'shrink-0',
});

const ENDPOINT_GROUPS = [
  {
    title: 'Policy linking',
    endpoints: [
      { method: 'POST', path: '/v1/groups/link', desc: 'Link an employer’s existing group policy from any supported insurer/TPA.' },
      { method: 'GET', path: '/v1/groups/{group_id}', desc: 'Fetch normalized coverage, sub-limits and copay terms for a linked group.' },
      { method: 'POST', path: '/v1/groups/{group_id}/unlink', desc: 'Unlink a policy, e.g. on insurer switch at renewal.' },
    ],
  },
  {
    title: 'Add-ons',
    endpoints: [
      { method: 'GET', path: '/v1/addons', desc: 'List add-ons available for a linked policy (OPD, mental health, critical illness top-up, copay waiver).' },
      { method: 'POST', path: '/v1/addons/subscribe', desc: 'Enroll an employee into one or more add-ons mid-year.' },
      { method: 'DELETE', path: '/v1/addons/{subscription_id}', desc: 'Cancel an add-on subscription.' },
    ],
  },
  {
    title: 'Claims & copay waiver',
    endpoints: [
      { method: 'POST', path: '/v1/claims/copay-waiver', desc: 'Submit the gap between insurer settlement and bill amount for waiver.' },
      { method: 'GET', path: '/v1/claims/{claim_id}', desc: 'Poll claim/waiver status.' },
      { method: 'POST', path: '/v1/webhooks', desc: 'Register a webhook URL to receive claim.settled and waiver.approved events.' },
    ],
  },
];

const AUTH_SNIPPET = `# All requests are authenticated with a bearer API key
curl https://api.yuvi.co/v1/groups/grp_8f2c1a \\
  -H "Authorization: Bearer YUVI_API_KEY"`;

const LINK_SNIPPET = `curl -X POST https://api.yuvi.co/v1/groups/link \\
  -H "Authorization: Bearer YUVI_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "insurer": "star_health",
    "tpa_policy_number": "SH-GRP-44210",
    "employer_id": "emp_co_019"
  }'

# 201 Created
{ "group_id": "grp_8f2c1a", "status": "linked", "sum_insured": 500000 }`;

const WEBHOOK_SNIPPET = `{
  "event": "waiver.approved",
  "data": {
    "waiver_id": "wv_019a",
    "policy_id": "grp_8f2c1a",
    "employee_id": "emp_2291",
    "waived_amount": 50000
  }
}`;

export default function Developers() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center">
            <Shield {...getIconProps(30)} className="text-blue-600" />
            <span className="ml-2 text-2xl font-bold text-blue-900">Yuvi</span>
          </a>
          <a href="/" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600">
            <ArrowLeft {...getIconProps(16)} /> Back to home
          </a>
        </div>
      </nav>

      {/* Hero */}
      <header className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-800 text-blue-300 text-sm font-semibold mb-6">
            <Terminal {...getIconProps(16)} /> Developers
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Build on the Yuvi API</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
            Link any group health policy, offer add-ons, and settle copay waivers programmatically.
            REST over HTTPS, JSON in and out, a sandbox for every endpoint below.
          </p>
          <a href="#quickstart" className="inline-flex items-center px-6 py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700">
            Quickstart <ArrowRight {...getIconProps(18)} className="ml-2" />
          </a>
        </div>
      </header>

      {/* Flow diagram */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">How a request flows through Yuvi</h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 overflow-x-auto pb-2">
          {[
            { icon: Building2, label: 'Your app / HRMS' },
            { icon: Link2, label: 'Yuvi link API' },
            { icon: Layers, label: 'Insurer / TPA integration' },
            { icon: Users, label: 'Employee add-on enrollment' },
            { icon: HeartPulse, label: 'Copay-waiver settlement' },
            { icon: ShieldCheck, label: 'Webhook: waiver.approved' },
          ].map((node, i, arr) => (
            <div key={node.label} className="flex items-center gap-4 shrink-0">
              <div className="flex flex-col items-center text-center w-32">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mb-3">
                  <node.icon {...getIconProps(22)} className="text-white" />
                </div>
                <span className="text-xs text-gray-600">{node.label}</span>
              </div>
              {i < arr.length - 1 && <ArrowRight {...getIconProps(18)} className="text-gray-300 hidden md:block" />}
            </div>
          ))}
        </div>
      </section>

      {/* Quickstart */}
      <section id="quickstart" className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <KeyRound {...getIconProps(24)} className="text-blue-600" /> Quickstart
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">1. Authenticate</h3>
              <pre className="bg-gray-900 text-gray-100 rounded-lg p-5 text-sm overflow-x-auto"><code>{AUTH_SNIPPET}</code></pre>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">2. Link a group policy</h3>
              <pre className="bg-gray-900 text-gray-100 rounded-lg p-5 text-sm overflow-x-auto"><code>{LINK_SNIPPET}</code></pre>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">3. Listen for claim &amp; waiver events</h3>
              <pre className="bg-gray-900 text-gray-100 rounded-lg p-5 text-sm overflow-x-auto"><code>{WEBHOOK_SNIPPET}</code></pre>
            </div>
          </div>
        </div>
      </section>

      {/* Endpoint reference */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-10 flex items-center gap-2">
          <Webhook {...getIconProps(24)} className="text-blue-600" /> API reference
        </h2>
        <div className="space-y-10">
          {ENDPOINT_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{group.title}</h3>
              <div className="space-y-3">
                {group.endpoints.map((e) => (
                  <div key={e.path} className="flex items-start gap-3 border border-gray-200 rounded-lg p-4">
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded shrink-0 ${
                        e.method === 'GET'
                          ? 'bg-emerald-100 text-emerald-700'
                          : e.method === 'DELETE'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {e.method}
                    </span>
                    <div>
                      <code className="text-sm text-gray-900">{e.path}</code>
                      <p className="text-sm text-gray-500 mt-1">{e.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <Shield {...getIconProps(24)} className="text-blue-600" />
            <span className="ml-2 text-xl font-bold text-blue-900">Yuvi</span>
          </div>
          <p className="text-gray-500 text-sm">© 2026 Yuvi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
