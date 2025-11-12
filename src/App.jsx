import React from 'react'
import Spline from '@splinetool/react-spline'
import { ArrowRight, Shield, Zap, Layers } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <header className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-sm bg-white"></div>
            <span className="text-sm tracking-widest uppercase text-white/80">Solana Token Studio</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
            <a className="hover:text-white transition-colors" href="#features">Features</a>
            <a className="hover:text-white transition-colors" href="#how">How it works</a>
            <a className="hover:text-white transition-colors" href="#faq">FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="#" className="hidden sm:inline-flex items-center text-sm text-white/70 hover:text-white transition-colors">Sign in</a>
            <a href="#" className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/0 px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-black transition-colors">
              Launch App
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero with Spline */}
      <section className="relative h-[78vh] min-h-[560px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/FduaNp3csZktbOi3/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          {/* Soft gradient to keep content readable; doesn't block interaction */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-white/60"></span>
              Live on Solana — mainnet ready
            </div>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl">
              Create and launch tokens on Solana in minutes
            </h1>
            <p className="mt-4 text-lg text-white/70">
              A sleek, enterprise‑grade platform to mint, configure, and deploy Solana tokens with audit‑friendly metadata and automated best practices.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#get-started" className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-medium text-black hover:bg-white/90 transition-colors">
                Start creating
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#docs" className="inline-flex items-center gap-2 rounded-md border border-white/20 px-5 py-3 text-sm font-medium text-white hover:bg-white/10 transition-colors">
                View docs
              </a>
            </div>
            <div className="mt-6 flex items-center gap-6 text-xs text-white/50">
              <span>Program-safe minting</span>
              <span className="h-1 w-1 rounded-full bg-white/30"></span>
              <span>No-code & CLI workflows</span>
              <span className="h-1 w-1 rounded-full bg-white/30"></span>
              <span>Immutable metadata support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 border-t border-white/10 bg-black">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <FeatureCard
              icon={<Shield className="h-5 w-5" />}
              title="Secure by default"
              desc="Built‑in safeguards, freeze authority options, and verifiable supply to protect your holders."
            />
            <FeatureCard
              icon={<Zap className="h-5 w-5" />}
              title="Lightning fast"
              desc="Deploy in seconds with pre‑audited flows optimized for Solana performance and fees."
            />
            <FeatureCard
              icon={<Layers className="h-5 w-5" />}
              title="Composable"
              desc="Works with token metadata, mint authorities, and extensions used across the Solana ecosystem."
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="relative z-10 border-t border-white/10 bg-black/95">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold">From idea to token — in three steps</h2>
            <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
              <Step index="01" title="Configure" desc="Name, symbol, supply, decimals, authorities, and metadata in one place." />
              <Step index="02" title="Review" desc="Automatic checks and gas estimates before you deploy to mainnet or devnet." />
              <Step index="03" title="Launch" desc="Mint, verify, and publish. Export SDK or use the dashboard to manage." />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/90">
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <span>© {new Date().getFullYear()} Solana Token Studio</span>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Docs</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:bg-white/[0.04]">
      <div className="absolute inset-px rounded-[11px] bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none" />
      <div className="relative z-10">
        <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/15 bg-white/5 text-white/80">
          {icon}
        </div>
        <h3 className="text-base font-medium">{title}</h3>
        <p className="mt-2 text-sm text-white/70">{desc}</p>
      </div>
    </div>
  )
}

function Step({ index, title, desc }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
      <div className="text-white/40 text-xs font-mono">{index}</div>
      <div className="mt-2 text-sm font-medium">{title}</div>
      <div className="mt-1 text-sm text-white/70">{desc}</div>
    </div>
  )
}

export default App
