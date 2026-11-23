'use client';

import { useState, useEffect } from 'react';
import {
  Shield,
  ArrowRight,
  Check,
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
  Megaphone,
  ClipboardCheck,
  Banknote,
  ShieldCheck,
  ArrowRight as ArrowSm,
  FileWarning,
} from 'lucide-react';

const getIconProps = (size?: number) => ({
  size: size || 24,
  strokeWidth: 1.75,
  className: 'shrink-0',
});

const VALUE_PILLARS = [
  {
    mark: '§01',
    icon: Puzzle,
    title: 'Create customized products',
    desc: 'Combine any linked group policy with OPD, wellness, critical-illness top-up and copay-gap protection, packaged per partner.',
  },
  {
    mark: '§02',
    icon: Users,
    title: 'Manage the end-to-end lifecycle',
    desc: 'Enroll, update, add-on and off-board employees across every linked insurer from a single partner dashboard.',
  },
  {
    mark: '§03',
    icon: Banknote,
    title: 'Get instant, digital payments',
    desc: 'Add-on premiums and eligible-claim payouts settle digitally, with no manual reconciliation between partner, insurer and employee.',
  },
];

const ECOSYSTEM_SOURCES = [
  { icon: Shield, label: 'Insurers', sub: 'Risk & coverage' },
  { icon: ClipboardCheck, label: 'TPAs', sub: 'Claims administration' },
  { icon: Building2, label: 'HR platforms', sub: 'Distribution channel' },
  { icon: Megaphone, label: 'Brokers', sub: 'Insurance distribution' },
];

const CONNECT_CAPS = ['API', 'Policy normalisation', 'Benefits engine', 'Claims workflows'];
const EMPLOYEE_CAPS = ['Coverage visibility', 'Additional protection', 'Claims assistance'];

const PRODUCT_SUITE = [
  { icon: Link2, name: 'Yuvi Connect', buyer: 'Fintech, NBFC & HR-tech engineering teams', desc: 'The core integration layer — fetches and normalizes policy, coverage and claims data across insurers and TPAs.' },
  { icon: Users, name: 'Yuvi Employee', buyer: 'The insured employee', desc: 'Shows existing coverage, copay, sub-limits and dependents, plus the additional protection available to close the gap.' },
  { icon: Building2, name: 'Yuvi Employer', buyer: 'HR & benefits teams', desc: 'Manage employee enrollment, coverage changes and additional benefits across every linked policy.' },
  { icon: ClipboardCheck, name: 'Yuvi Claims', buyer: 'Claims & operations teams', desc: 'Claims tracking, copay calculation, document collection and coordination with insurers and TPAs.' },
  { icon: Webhook, name: 'Yuvi Partner API', buyer: 'HR software, payroll & broker platforms', desc: 'Lets partner platforms integrate Yuvi directly into their own product, end to end.' },
];

const ADDONS = [
  { icon: Stethoscope, name: 'OPD & Teleconsults', desc: 'Doctor visits, diagnostics and pharmacy on top of the base policy.' },
  { icon: HeartPulse, name: 'Copay-Gap Protection', desc: 'An eligible, insurer-underwritten add-on that can cover the employee copay gap at claim time.' },
  { icon: Brain, name: 'Mental Health', desc: 'Therapy and counselling sessions bundled as a selectable add-on.' },
  { icon: PiggyBank, name: 'Critical Illness Top-up', desc: 'Extra sum insured for high-cost diagnoses, stacked on any group plan.' },
];

const API_ENDPOINTS = [
  { method: 'POST', path: '/v1/groups/link', desc: 'Link an employer’s existing group policy from an onboarded insurer/TPA.' },
  { method: 'GET', path: '/v1/addons', desc: 'List available add-ons for a linked policy.' },
  { method: 'POST', path: '/v1/addons/subscribe', desc: 'Enroll an employee into one or more add-ons.' },
  { method: 'POST', path: '/v1/claims/copay-gap', desc: 'Submit a claim gap for eligible copay-protection settlement.' },
];

const CODE_SNIPPET = `curl -X POST https://api.yuvi.co/v1/claims/copay-gap \\
  -H "Authorization: Bearer YUVI_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "policy_id": "grp_8f2c1a",
    "employee_id": "emp_2291",
    "claim_amount": 200000,
    "insurer_settled": 160000
  }'

# 200 OK
{ "settlement_id": "st_019a", "status": "approved", "eligible_amount": 40000 }`;

function Mark({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-xs tracking-wide text-ink-faint">{children}</span>;
}

function MergeGraphic() {
  const chips = [
    { label: 'Insurer A · ₹5L sum insured', tone: 'border-hairline bg-surface text-ink-muted' },
    { label: 'TPA · claims data', tone: 'border-hairline bg-surface text-ink-muted' },
    { label: 'Add-on · copay-gap protection', tone: 'border-jade-soft-border bg-jade-soft text-jade-ink' },
  ];
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-12">
      <div className="flex flex-col sm:flex-row gap-2">
        {chips.map((c) => (
          <span key={c.label} className={`font-mono text-[11px] px-3 py-1.5 rounded-full border ${c.tone}`}>
            {c.label}
          </span>
        ))}
      </div>
      <ArrowSm {...getIconProps(16)} className="text-ink-faint rotate-90 sm:rotate-0" />
      <span className="font-mono text-[11px] px-3 py-1.5 rounded-full border border-ink bg-ink text-paper">
        Yuvi · one connected coverage view
      </span>
    </div>
  );
}

function ConceptPreview({ title, rows, footnote }: { title: string; rows: string[]; footnote: string }) {
  return (
    <div className="border border-hairline rounded-stamp bg-surface p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">{title}</span>
        <span className="font-mono text-[10px] uppercase tracking-wide text-ledger bg-ledger-soft px-2 py-0.5 rounded">Concept preview</span>
      </div>
      <div className="space-y-2">
        {rows.map((r) => (
          <div key={r} className="flex items-center gap-2 text-xs text-ink bg-paper border border-hairline rounded px-3 py-2">
            <span className="w-1.5 h-1.5 rounded-full bg-jade shrink-0" />
            {r}
          </div>
        ))}
      </div>
      <p className="text-[11px] text-ink-faint mt-3">{footnote}</p>
    </div>
  );
}

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
    <div className="min-h-screen bg-paper relative">
      {showPopup && (
        <div className="fixed inset-0 bg-ink/40 flex items-center justify-center z-50 px-4">
          <div className="bg-surface-raised rounded-stamp shadow-xl p-8 max-w-md w-full relative border border-hairline">
            <button onClick={() => setShowPopup(false)} className="absolute top-5 right-5 text-ink-faint hover:text-ink">
              <X {...getIconProps(22)} />
            </button>
            <p className="font-mono text-xs tracking-wide text-jade-ink mb-1 uppercase">Partner enquiry</p>
            <h2 className="text-2xl font-display font-medium mb-6">Talk to the Yuvi team</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs font-mono text-ink-muted mb-1.5">Full Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                  className="w-full px-4 py-2.5 border border-hairline rounded-md bg-paper focus:ring-1 focus:ring-jade focus:border-jade outline-none"
                  placeholder="Enter your full name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-mono text-ink-muted mb-1.5">Work Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                  className="w-full px-4 py-2.5 border border-hairline rounded-md bg-paper focus:ring-1 focus:ring-jade focus:border-jade outline-none"
                  placeholder="Enter your work email" />
              </div>
              <div>
                <label htmlFor="mobile" className="block text-xs font-mono text-ink-muted mb-1.5">Mobile Number</label>
                <input type="tel" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} required
                  className="w-full px-4 py-2.5 border border-hairline rounded-md bg-paper focus:ring-1 focus:ring-jade focus:border-jade outline-none"
                  placeholder="Enter your mobile number" />
              </div>
              <button type="submit" className="w-full bg-jade text-white py-3 rounded-stamp font-semibold tracking-wide hover:bg-jade-ink transition-colors">
                Request a Demo
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="sticky top-0 bg-paper/90 backdrop-blur z-40 border-b border-hairline">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-display italic font-medium text-ink">Yuvi</span>
            <span className="hidden sm:inline font-mono text-[11px] text-ink-faint uppercase tracking-wider">Group Health Benefits Infrastructure</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-ink-muted">
            <a href="#products" className="hover:text-jade-ink">Product Suite</a>
            <a href="#addons" className="hover:text-jade-ink">Add-ons</a>
            <a href="#trust" className="hover:text-jade-ink">Underwriting</a>
            <a href="/developers" className="hover:text-jade-ink">Tech &amp; API</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => window.tawk_API?.toggle()} className="hidden sm:block px-4 py-2 text-ink-muted hover:text-jade-ink text-sm">
              Live Chat
            </button>
            <button onClick={() => setShowPopup(true)} className="px-5 py-2.5 bg-jade text-white rounded-stamp text-sm font-semibold tracking-wide hover:bg-jade-ink transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header>
        <div className="max-w-6xl mx-auto px-5 sm:px-6 pt-20 pb-16 text-center">
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-jade-ink border border-jade-soft-border bg-jade-soft px-4 py-1.5 rounded-full mb-7">
            One employee. Multiple policies. One connected view.
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-medium text-ink mb-6 leading-[1.08]">
            The <em className="text-jade-ink not-italic font-medium">group health coverage-gap</em><br className="hidden md:block" /> infrastructure layer
          </h1>
          <p className="text-lg md:text-xl text-ink-muted mb-10 max-w-2xl mx-auto">
            Yuvi connects to the group health policy your employees already have, shows them exactly where
            the coverage gap sits, and offers insurer-backed protection to close it — without your HR team
            touching a thing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setShowPopup(true)} className="px-7 py-3.5 bg-jade text-white rounded-stamp text-base font-semibold tracking-wide hover:bg-jade-ink flex items-center justify-center transition-colors">
              Request a Demo <ArrowRight {...getIconProps(20)} className="ml-2" />
            </button>
            <a href="/developers" className="px-7 py-3.5 border border-ink/20 text-ink rounded-stamp text-base font-semibold tracking-wide hover:border-jade hover:text-jade-ink flex items-center justify-center transition-colors">
              View API Docs
            </a>
          </div>
          <MergeGraphic />
        </div>
      </header>

      {/* Value Proposition */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-20">
        <h2 className="text-3xl font-display font-medium text-center text-ink mb-4 max-w-2xl mx-auto">
          End-to-end digital platform for group health insurance partners
        </h2>
        <p className="text-center text-ink-muted mb-14 max-w-2xl mx-auto">
          Yuvi lets insurance partners, HR platforms and brokers offer multiple group health policies to
          their employees at the click of a button, and deliver a richer benefits experience on every one.
        </p>
        <div className="grid md:grid-cols-3 gap-px bg-hairline border border-hairline rounded-stamp overflow-hidden">
          {VALUE_PILLARS.map((p) => (
            <div key={p.title} className="bg-surface p-8">
              <div className="flex items-center justify-between mb-5">
                <Mark>{p.mark}</Mark>
                <p.icon {...getIconProps(22)} className="text-jade-ink" />
              </div>
              <h3 className="text-lg font-display font-medium text-ink mb-2">{p.title}</h3>
              <p className="text-ink-muted text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* With / Without */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-20">
        <h2 className="text-3xl font-display font-medium text-center text-ink mb-2">With, or without Yuvi</h2>
        <p className="text-center text-ink-muted mb-12">Same employer policy. Very different employee experience.</p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border border-hairline rounded-stamp p-8 bg-surface">
            <Mark>WITHOUT YUVI</Mark>
            <ul className="space-y-4 text-ink-muted mt-5">
              <li className="flex items-start"><X {...getIconProps(18)} className="text-ink-faint mr-3 mt-0.5" /> One policy, one insurer, fixed terms for the whole year</li>
              <li className="flex items-start"><X {...getIconProps(18)} className="text-ink-faint mr-3 mt-0.5" /> No way to add OPD, dental or mental health without a broker renewal cycle</li>
              <li className="flex items-start"><X {...getIconProps(18)} className="text-ink-faint mr-3 mt-0.5" /> Employee pays the full copay gap out of pocket at claim time</li>
              <li className="flex items-start"><X {...getIconProps(18)} className="text-ink-faint mr-3 mt-0.5" /> Switching insurers means switching every integration</li>
            </ul>
          </div>
          <div className="border border-jade-soft-border rounded-stamp p-8 bg-jade-soft relative">
            <span className="absolute -top-3 right-6 bg-jade text-white text-xs font-mono tracking-wide px-3 py-1 rounded-full">Recommended</span>
            <span className="font-mono text-xs tracking-wide text-jade-ink">WITH YUVI</span>
            <ul className="space-y-4 text-ink mt-5">
              <li className="flex items-start"><Check {...getIconProps(18)} className="text-jade-ink mr-3 mt-0.5" /> Link one, two or ten linked group policies into a single employee view</li>
              <li className="flex items-start"><Check {...getIconProps(18)} className="text-jade-ink mr-3 mt-0.5" /> Employees self-serve add-ons mid-year — no renewal, no broker call</li>
              <li className="flex items-start"><Check {...getIconProps(18)} className="text-jade-ink mr-3 mt-0.5" /> Eligible copay-gap protection settles automatically against the linked claim</li>
              <li className="flex items-start"><Check {...getIconProps(18)} className="text-jade-ink mr-3 mt-0.5" /> One integration layer that grows with each insurer/TPA we onboard</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-surface py-20 border-y border-hairline">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <h2 className="text-3xl font-display font-medium text-center text-ink mb-14">How Yuvi works</h2>
          <div className="grid md:grid-cols-4 gap-px bg-hairline border border-hairline rounded-stamp overflow-hidden">
            {[
              { icon: Link2, title: 'Link', desc: 'Connect existing group policies via insurer/TPA integration or a single CSV upload.' },
              { icon: Layers, title: 'Normalize', desc: 'Yuvi normalizes coverage, sub-limits and copay terms across every linked policy.' },
              { icon: Puzzle, title: 'Offer add-ons', desc: 'Employees browse and subscribe to OPD, mental health and top-up covers.' },
              { icon: HeartPulse, title: 'Close the gap', desc: 'At claim time, Yuvi coordinates the eligible copay-gap settlement with the fronting insurer.' },
            ].map((step, i) => (
              <div key={step.title} className="bg-surface p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs text-ink-faint">0{i + 1}</span>
                  <div className="flex-1 border-t border-hairline" />
                  <step.icon {...getIconProps(22)} className="text-jade-ink" />
                </div>
                <h3 className="text-base font-display font-medium text-ink mb-2">{step.title}</h3>
                <p className="text-ink-muted text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <h2 className="text-3xl font-display font-medium text-center text-ink mb-2">How the Yuvi ecosystem connects</h2>
          <p className="text-center text-ink-muted mb-14 max-w-2xl mx-auto">
            Risk and distribution sit on one side. Yuvi Connect normalizes it into a single benefits engine.
            The employee sees one coverage view on the other.
          </p>

          <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-6">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 w-full lg:w-48 shrink-0">
              {ECOSYSTEM_SOURCES.map((s) => (
                <div key={s.label} className="border border-hairline rounded-md bg-surface p-3 flex items-center gap-2.5">
                  <s.icon {...getIconProps(18)} className="text-ink-faint shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-ink">{s.label}</div>
                    <div className="text-[10px] text-ink-faint">{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center shrink-0">
              <ArrowRight {...getIconProps(22)} className="text-ink-faint rotate-90 lg:rotate-0" />
            </div>

            <div className="flex-1 border-2 border-ink rounded-stamp bg-ink text-paper p-6 flex flex-col items-center justify-center text-center">
              <span className="font-mono text-[11px] uppercase tracking-widest text-jade-soft mb-2">Yuvi Connect</span>
              <div className="flex flex-wrap justify-center gap-2">
                {CONNECT_CAPS.map((c) => (
                  <span key={c} className="text-[11px] font-mono border border-white/20 rounded-full px-2.5 py-1 text-white/80">{c}</span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center shrink-0">
              <ArrowRight {...getIconProps(22)} className="text-ink-faint rotate-90 lg:rotate-0" />
            </div>

            <div className="w-full lg:w-52 shrink-0 border border-jade-soft-border rounded-stamp bg-jade-soft p-5 text-center">
              <Users {...getIconProps(26)} className="text-jade-ink mx-auto mb-2" />
              <div className="text-sm font-semibold text-ink mb-2">Employee Benefits Experience</div>
              <div className="flex flex-col gap-1">
                {EMPLOYEE_CAPS.map((c) => (
                  <span key={c} className="text-[11px] font-mono text-jade-ink">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Suite */}
      <section id="products" className="bg-surface py-20 border-y border-hairline">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <h2 className="text-3xl font-display font-medium text-center text-ink mb-2">The Yuvi Product Suite</h2>
          <p className="text-center text-ink-muted mb-14 max-w-2xl mx-auto">
            Not a single app — an operating system for group health benefits distribution, with one product
            per buyer in the ecosystem.
          </p>

          <div className="grid md:grid-cols-5 gap-px bg-hairline border border-hairline rounded-stamp overflow-hidden mb-12">
            {PRODUCT_SUITE.map((p) => (
              <div key={p.name} className="bg-surface p-5">
                <p.icon {...getIconProps(22)} className="text-jade-ink mb-4" />
                <h3 className="font-display font-medium text-ink mb-1.5 text-[15px]">{p.name}</h3>
                <p className="text-[11px] font-mono text-ink-faint mb-2 uppercase tracking-wide">{p.buyer}</p>
                <p className="text-xs text-ink-muted leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <ConceptPreview
              title="Yuvi Employee"
              rows={[
                'Insurer A · ₹5,00,000 sum insured',
                'Copay · 20% of eligible claim',
                'Add-on available · Copay-gap protection',
                'View my coverage →',
              ]}
              footnote="Illustrative interface concept."
            />
            <ConceptPreview
              title="Yuvi Employer"
              rows={[
                '1,000 employees enrolled',
                '3 insurers / TPAs linked',
                '42 active add-on subscriptions',
                'Renewal due in 68 days',
              ]}
              footnote="Illustrative interface concept."
            />
          </div>
        </div>
      </section>

      {/* Add-ons marketplace */}
      <section id="addons" className="max-w-6xl mx-auto px-5 sm:px-6 py-20">
        <h2 className="text-3xl font-display font-medium text-center text-ink mb-2">An add-on marketplace, not a single plan</h2>
        <p className="text-center text-ink-muted mb-12">Every add-on stacks on top of whatever group policy the employee already has.</p>
        <div className="grid md:grid-cols-4 gap-px bg-hairline border border-hairline rounded-stamp overflow-hidden">
          {ADDONS.map((a) => (
            <div key={a.name} className="bg-surface p-6 hover:bg-jade-soft/40 transition-colors">
              <a.icon {...getIconProps(28)} className="text-jade-ink mb-4" />
              <h3 className="font-display font-medium text-ink mb-2">{a.name}</h3>
              <p className="text-sm text-ink-muted">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Worked example */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-20">
        <div className="bg-surface border border-hairline rounded-stamp p-8">
          <h2 className="text-3xl font-display font-medium text-center text-ink mb-2">A worked example: ABC Technologies</h2>
          <p className="text-center text-ink-faint text-sm mb-8">1,000 employees · existing group policy with Insurer A</p>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ul className="space-y-4">
              <li className="flex items-start"><Check {...getIconProps(20)} className="text-jade-ink mr-2 mt-1" /> Sum insured: ₹5,00,000 · Employee copay: 20%</li>
              <li className="flex items-start"><Check {...getIconProps(20)} className="text-jade-ink mr-2 mt-1" /> Hospital bill: ₹2,00,000</li>
              <li className="flex items-start"><Check {...getIconProps(20)} className="text-jade-ink mr-2 mt-1" /> Existing group policy pays: ₹1,60,000</li>
              <li className="flex items-start"><Check {...getIconProps(20)} className="text-jade-ink mr-2 mt-1" /> Employee's original copay liability: ₹40,000</li>
              <li className="flex items-start"><Check {...getIconProps(20)} className="text-jade-ink mr-2 mt-1" /> <span className="font-semibold">Eligible copay-gap protection pays: ₹40,000</span></li>
            </ul>
            <div className="bg-ledger-soft p-6 rounded-stamp text-center">
              <h4 className="text-sm font-mono uppercase tracking-wide text-ledger mb-4">Employee's remaining cost</h4>
              <div className="text-4xl font-display font-medium text-ledger">₹0</div>
              <p className="text-ink-muted text-sm mt-2">Down from a ₹40,000 out-of-pocket copay</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5 mt-8 pt-6 border-t border-hairline">
            <FileWarning {...getIconProps(16)} className="text-ledger shrink-0 mt-0.5" />
            <p className="text-xs text-ink-faint">
              Illustrative only. Actual settlement depends on policy wording, exclusions, limits,
              coordination of benefits and insurer approval.
            </p>
          </div>
        </div>
      </section>

      {/* Trust / underwriting */}
      <section id="trust" className="bg-surface py-20 border-y border-hairline">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <div className="flex items-start gap-4 mb-10">
            <ShieldCheck {...getIconProps(28)} className="text-jade-ink mt-1" />
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-ink mb-3">How Yuvi underwrites</h2>
              <p className="text-ink-muted max-w-2xl">
                Yuvi is the distribution and claims-servicing layer, not the risk carrier. Any copay-gap
                protection is underwritten by a licensed insurance partner — Yuvi links the policy,
                normalizes the data and coordinates the claim, but the risk itself sits with a regulated insurer.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-hairline border border-hairline rounded-stamp overflow-hidden">
            <div className="bg-surface p-7">
              <Mark>PRODUCT STRUCTURE</Mark>
              <p className="text-ink mt-3 leading-relaxed text-sm">
                Under evaluation with insurers and regulatory counsel: a copay buyback/waiver cover, a
                supplementary group health benefit, or a top-up/additional group policy. These are not
                interchangeable — the right structure depends on the insurer partner.
              </p>
            </div>
            <div className="bg-surface p-7">
              <Mark>SCOPE, PHASE ONE</Mark>
              <p className="text-ink mt-3 leading-relaxed text-sm">
                Integration rolls out insurer by insurer and TPA by TPA, not as a single "every insurer"
                claim — phase one targets two insurers and two TPAs, proven end to end before expanding.
              </p>
            </div>
            <div className="bg-surface p-7">
              <Mark>DATA ACCESS</Mark>
              <p className="text-ink mt-3 leading-relaxed text-sm">
                Linking a policy does not automatically grant claims data access. Every integration requires
                the employer's and insurer/TPA's authorization under a proper data-sharing agreement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech / API */}
      <section id="tech" className="bg-ink text-paper py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 text-jade-soft text-xs font-mono uppercase tracking-wider mb-6">
              <Code2 {...getIconProps(15)} /> Built for developers
            </span>
            <h2 className="text-3xl font-display font-medium mb-3">One integration, every onboarded insurer</h2>
            <p className="text-white/60 max-w-2xl mx-auto mb-4">
              REST API, webhooks for claim status, and a sandbox environment — so your HRMS or benefits app
              can link policies and settle eligible copay-gap claims without manual reconciliation.
            </p>
            <a href="/developers" className="text-jade-soft hover:text-white text-sm font-semibold inline-flex items-center gap-1">
              Full API reference <ArrowRight {...getIconProps(14)} />
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-start mb-16">
            <div>
              <h3 className="text-lg font-display font-medium mb-4 flex items-center gap-2"><Webhook {...getIconProps(20)} className="text-jade-soft" /> Core endpoints</h3>
              <div className="space-y-3">
                {API_ENDPOINTS.map((e) => (
                  <div key={e.path} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-md p-4">
                    <span className={`text-xs font-mono font-bold px-2 py-1 rounded shrink-0 ${e.method === 'GET' ? 'bg-jade/20 text-jade-soft' : 'bg-white/10 text-white'}`}>
                      {e.method}
                    </span>
                    <div>
                      <code className="text-sm text-white">{e.path}</code>
                      <p className="text-xs text-white/50 mt-1">{e.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-display font-medium mb-4 flex items-center gap-2"><KeyRound {...getIconProps(20)} className="text-jade-soft" /> Settle a copay gap</h3>
              <pre className="bg-black/30 border border-white/10 rounded-md p-5 text-xs md:text-sm text-white/90 overflow-x-auto">
                <code>{CODE_SNIPPET}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-20 text-center">
        <h2 className="text-3xl font-display font-medium text-ink mb-4">Bring every linked policy under one roof</h2>
        <p className="text-ink-muted mb-8 max-w-2xl mx-auto">
          Whether you run HR for one company or benefits for a hundred, Yuvi's API sits on top of what your
          employees already have — no insurer lock-in, no renewal-cycle wait for add-ons.
        </p>
        <button onClick={() => setShowPopup(true)} className="px-8 py-4 bg-jade text-white rounded-stamp text-lg font-semibold tracking-wide hover:bg-jade-ink inline-flex items-center transition-colors">
          Request a Demo <ArrowRight {...getIconProps(22)} className="ml-2" />
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t border-hairline">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-lg font-display italic font-medium text-ink">Yuvi</span>
          <div className="flex items-center gap-6">
            <p className="text-ink-faint text-sm">© 2026 Yuvi. All rights reserved.</p>
            <button onClick={() => window.tawk_API?.toggle()} className="text-jade-ink hover:text-ink text-sm">
              Live Chat
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
