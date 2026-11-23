'use client';

import { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Terminal,
  Building2,
  Link2,
  Layers,
  Users,
  HeartPulse,
  ShieldCheck,
  Info,
} from 'lucide-react';
import { DOC_SECTIONS, INTEGRATION_STEPS, API_USERS, type Endpoint } from './api-data';

const getIconProps = (size?: number) => ({
  size: size || 24,
  strokeWidth: 1.75,
  className: 'shrink-0',
});

const METHOD_STYLES: Record<Endpoint['method'], string> = {
  GET: 'bg-jade-soft text-jade-ink',
  POST: 'bg-white/10 text-ink',
  DELETE: 'bg-ledger-soft text-ledger',
};

function EndpointCard({ endpoint }: { endpoint: Endpoint }) {
  return (
    <div className="border border-hairline rounded-stamp p-6 mb-8 bg-surface">
      <div className="flex items-start gap-3 mb-2">
        <span className={`text-xs font-mono font-bold px-2 py-1 rounded shrink-0 mt-0.5 ${METHOD_STYLES[endpoint.method]}`}>
          {endpoint.method}
        </span>
        <div>
          <h3 className="font-display font-medium text-ink">{endpoint.title}</h3>
          <code className="text-xs text-ink-faint break-all">{endpoint.path}</code>
        </div>
      </div>
      {endpoint.desc && <p className="text-sm text-ink-muted mb-4">{endpoint.desc}</p>}

      {endpoint.params && endpoint.params.length > 0 && (
        <div className="overflow-x-auto mb-5">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-xs font-mono text-ink-faint uppercase tracking-wide border-b border-hairline">
                <th className="py-2 pr-4">Parameter</th>
                <th className="py-2 pr-4">Description</th>
                <th className="py-2 pr-4">Req</th>
                <th className="py-2">Type</th>
              </tr>
            </thead>
            <tbody>
              {endpoint.params.map((p) => (
                <tr key={p.name} className="border-b border-hairline align-top">
                  <td className="py-2 pr-4 font-mono text-xs text-ink whitespace-nowrap">{p.name}</td>
                  <td className="py-2 pr-4 text-ink-muted">{p.desc}</td>
                  <td className="py-2 pr-4">
                    <span
                      className={`text-[11px] font-mono font-semibold px-1.5 py-0.5 rounded ${
                        p.req === 'M' ? 'bg-ledger-soft text-ledger' : p.req === 'OM' ? 'bg-jade-soft text-jade-ink' : 'bg-paper text-ink-faint'
                      }`}
                    >
                      {p.req}
                    </span>
                  </td>
                  <td className="py-2 text-ink-faint">{p.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {endpoint.headers.length > 0 && (
        <div className="mb-5">
          <h4 className="text-xs font-mono text-ink-faint uppercase tracking-wide mb-2">Headers</h4>
          <div className="space-y-1">
            {endpoint.headers.map((h) => (
              <div key={h.name} className="text-xs text-ink-muted">
                <span className="font-mono text-ink">{h.name}</span>: {h.value}
                {h.desc && <span className="text-ink-faint"> — {h.desc}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-xs font-mono text-ink-faint uppercase tracking-wide mb-2">Example Request</h4>
          <pre className="bg-ink text-paper rounded-md p-4 text-xs overflow-x-auto"><code>{endpoint.requestExample}</code></pre>
        </div>
        <div>
          <h4 className="text-xs font-mono text-ink-faint uppercase tracking-wide mb-2">Example Response</h4>
          {endpoint.responseExample ? (
            <pre className="bg-ink text-paper rounded-md p-4 text-xs overflow-x-auto"><code>{endpoint.responseExample}</code></pre>
          ) : (
            <div className="border border-dashed border-hairline rounded-md p-4 text-xs text-ink-faint h-full flex items-center">
              This request doesn&apos;t return any response body.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Developers() {
  const [activeId, setActiveId] = useState(DOC_SECTIONS[0].id);
  const activeSection = DOC_SECTIONS.find((s) => s.id === activeId) ?? DOC_SECTIONS[0];

  return (
    <div className="min-h-screen bg-paper">
      {/* Nav */}
      <nav className="border-b border-hairline sticky top-0 bg-paper/90 backdrop-blur z-40">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-baseline gap-2">
            <span className="text-2xl font-display italic font-medium text-ink">Yuvi</span>
            <span className="hidden sm:inline font-mono text-[11px] text-ink-faint uppercase tracking-wider">Group Health API</span>
          </a>
          <a href="/" className="flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-jade-ink">
            <ArrowLeft {...getIconProps(16)} /> Back to home
          </a>
        </div>
      </nav>

      {/* Hero */}
      <header className="bg-ink text-paper">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-16 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 text-jade-soft text-xs font-mono uppercase tracking-wider mb-6">
            <Terminal {...getIconProps(15)} /> Yuvi Insurance API SDK
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-medium mb-4">Build on the Yuvi API</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8">
            Link a group health policy, offer add-ons, and coordinate eligible copay-gap settlements
            programmatically. Not for end customers — this is technical documentation for the teams
            integrating Yuvi into their own product.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {API_USERS.map((u) => (
              <span key={u} className="text-xs font-mono text-jade-soft border border-white/15 rounded-full px-3 py-1.5">
                {u}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Integration steps */}
      <section className="max-w-4xl mx-auto px-5 sm:px-6 py-16">
        <h2 className="text-2xl font-display font-medium text-center text-ink mb-2">The integration, end to end</h2>
        <p className="text-center text-ink-muted mb-10">Eight API capabilities take a partner from "show the plan" to "renew the policy."</p>
        <div className="border border-hairline rounded-stamp overflow-hidden">
          {INTEGRATION_STEPS.map((s, i) => (
            <div key={s.step} className={`flex items-center gap-4 px-5 py-3.5 ${i % 2 === 0 ? 'bg-surface' : 'bg-paper'}`}>
              <span className="font-mono text-xs text-ink-faint w-5 shrink-0">0{s.step}</span>
              <span className="font-display font-medium text-ink w-48 shrink-0">{s.capability}</span>
              <span className="text-sm text-ink-muted">{s.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Flow diagram */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-16">
        <h2 className="text-2xl font-display font-medium text-center text-ink mb-10">How a request flows through Yuvi</h2>
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
                <div className="w-12 h-12 rounded-full bg-jade flex items-center justify-center mb-3">
                  <node.icon {...getIconProps(22)} className="text-white" />
                </div>
                <span className="text-xs text-ink-muted">{node.label}</span>
              </div>
              {i < arr.length - 1 && <ArrowRight {...getIconProps(18)} className="text-hairline hidden md:block" />}
            </div>
          ))}
        </div>
      </section>

      {/* Docs: sidebar + content */}
      <section className="bg-surface border-t border-hairline">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-12 flex flex-col md:flex-row gap-10">
          <aside className="md:w-56 shrink-0">
            <nav className="md:sticky md:top-20 flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
              {DOC_SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveId(s.id)}
                  className={`text-left px-3 py-2 rounded-md text-sm whitespace-nowrap md:whitespace-normal transition ${
                    activeId === s.id ? 'bg-jade text-white font-semibold' : 'text-ink-muted hover:bg-paper'
                  }`}
                >
                  {s.title}
                </button>
              ))}
            </nav>
          </aside>

          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-display font-medium text-ink mb-6">{activeSection.title}</h2>

            {activeSection.intro && (
              <div className="bg-jade-soft border border-jade-soft-border rounded-stamp p-5 mb-8">
                <ul className="space-y-2">
                  {activeSection.intro.map((line) => (
                    <li key={line} className="flex items-start gap-2 text-sm text-ink">
                      <Info {...getIconProps(16)} className="text-jade-ink mt-0.5" /> {line}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeSection.endpoints.map((e) => (
              <EndpointCard key={e.title} endpoint={e} />
            ))}

            {activeSection.endpoints.length === 0 && !activeSection.intro && (
              <p className="text-sm text-ink-faint">No endpoints in this section yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-paper border-t border-hairline">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-lg font-display italic font-medium text-ink">Yuvi</span>
          <p className="text-ink-faint text-sm">© 2026 Yuvi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
