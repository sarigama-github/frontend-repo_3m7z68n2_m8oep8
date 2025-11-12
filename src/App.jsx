import React, { useMemo, useState } from 'react'
import { ArrowRight, Shield, Zap, Layers, X, Check, ChevronRight, Wand2, Cpu, Rocket, Sparkles } from 'lucide-react'

function App() {
  // Wizard state (kept intact)
  const [openApp, setOpenApp] = useState(false)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '',
    symbol: '',
    decimals: 9,
    supply: '',
    freezeAuthority: true,
    mintAuthority: true,
    metadataUri: ''
  })
  const [launched, setLaunched] = useState(false)

  const canContinue = useMemo(() => {
    if (step === 1) return form.name && form.symbol && form.supply && Number(form.supply) > 0
    if (step === 2) return true
    return false
  }, [step, form])

  const estFees = useMemo(() => {
    const base = 0.002
    const features = (form.freezeAuthority ? 0.0004 : 0) + (form.mintAuthority ? 0.0003 : 0)
    return (base + features).toFixed(4)
  }, [form.freezeAuthority, form.mintAuthority])

  const tokenPreview = useMemo(() => {
    const n = form.name || 'Your Token'
    const s = form.symbol || 'SYMB'
    return `${n} (${s}) • ${form.decimals} dec • ${form.supply || '—'} supply`
  }, [form])

  function resetWizard() {
    setStep(1)
    setLaunched(false)
    setForm({ name: '', symbol: '', decimals: 9, supply: '', freezeAuthority: true, mintAuthority: true, metadataUri: '' })
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#05070f] text-slate-100">
      {/* Global aurora + starfield background */}
      <BackgroundFX />

      {/* Navbar */}
      <header className="relative z-20">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-cyan-400 to-violet-500">
              <Sparkles className="h-4 w-4 text-black" />
            </span>
            <span className="text-sm tracking-widest uppercase text-slate-300">Photon Mint</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300/80">
            <a className="hover:text-white transition-colors" href="#features">Features</a>
            <a className="hover:text-white transition-colors" href="#how">How</a>
            <a className="hover:text-white transition-colors" href="#faq">FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpenApp(true)}
              className="group inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-2 text-sm font-medium text-cyan-200 shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-colors hover:bg-cyan-400/20"
            >
              Launch App
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pt-10 pb-20 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Badge>Solana native • Mainnet ready</Badge>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl">
              <span className="bg-gradient-to-br from-white via-cyan-200 to-violet-300 bg-clip-text text-transparent">
                Launch tokens at light speed
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-300/80">
              A high‑fidelity studio for minting, configuring, and deploying Solana tokens. Neon‑clean visuals, audit‑friendly flows, zero guesswork.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setOpenApp(true)}
                className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-3 text-sm font-semibold text-black shadow-[0_10px_40px_-10px_rgba(99,102,241,0.6)] transition-transform hover:scale-[1.02]"
              >
                Start creating
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-200 hover:bg-white/10"
              >
                Explore features
              </a>
            </div>

            <div className="mt-8 grid max-w-xl grid-cols-3 gap-4 text-center text-xs text-slate-300/70">
              <Stat k="< 60s" v="to first mint" />
              <Stat k="0.002 SOL" v="avg. fees" />
              <Stat k="100%" v="authority control" />
            </div>
          </div>

          {/* Visual panel */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-0 backdrop-blur">
              <Orbits />
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(1200px_400px_at_80%_-20%,rgba(99,102,241,0.25),transparent)]" />
              <div className="relative z-10 p-6">
                <div className="grid grid-cols-2 gap-3">
                  <MiniCard icon={<Shield className='h-4 w-4' />} title="Secure by default" subtitle="Guard rails & checks" />
                  <MiniCard icon={<Zap className='h-4 w-4' />} title="Blazing fast" subtitle="Optimized fees" />
                  <MiniCard icon={<Layers className='h-4 w-4' />} title="Composable" subtitle="Metadata & extensions" />
                  <MiniCard icon={<Cpu className='h-4 w-4' />} title="Program‑safe" subtitle="Best practices" />
                </div>
                <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300/80">Est. fees</span>
                    <span className="rounded-md bg-white px-2 py-0.5 text-black">{estFees} SOL</span>
                  </div>
                  <div className="mt-3 text-slate-300/80">{tokenPreview}</div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[28px] bg-gradient-to-r from-cyan-500/20 to-violet-500/20 blur-2xl" />
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section id="features" className="relative z-10 border-t border-white/10 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold">Designed for builders, safe for holders</h2>
            <p className="mt-2 text-slate-300/80">Everything you need to go from concept to mainnet with confidence.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Wand2 className="h-5 w-5" />}
              title="No‑code studio"
              desc="Configure supply, decimals, authorities, and metadata in a single, friendly flow."
            />
            <FeatureCard
              icon={<Shield className="h-5 w-5" />}
              title="Security baked‑in"
              desc="Authority controls, freeze options, and pre‑flight checks to prevent mistakes."
            />
            <FeatureCard
              icon={<Rocket className="h-5 w-5" />}
              title="Mainnet in minutes"
              desc="Optimized transactions and fee estimates keep you speedy and predictable."
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="relative z-10 border-t border-white/10 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold">Three steps. Endless possibilities.</h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <Step index="01" title="Configure" desc="Name, symbol, supply, decimals, authorities, and metadata." />
            <Step index="02" title="Review" desc="Auto checks and fee preview across devnet or mainnet." />
            <Step index="03" title="Launch" desc="Mint and publish. Manage authorities with confidence." />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-10">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300/70">
          <span>© {new Date().getFullYear()} Photon Mint</span>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#features" className="hover:text-white">Features</a>
          </div>
        </div>
      </footer>

      {/* Launch App — Wizard (restyled to match theme) */}
      {openApp && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" onClick={() => setOpenApp(false)} />
          <div className="relative mx-auto mt-10 w-[92vw] max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_0_80px_-20px_rgba(56,189,248,0.35)]">
            <div className="absolute right-3 top-3">
              <button
                onClick={() => { setOpenApp(false); resetWizard() }}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[260px_1fr]">
              {/* Sidebar */}
              <aside className="hidden md:block rounded-l-2xl border-r border-white/10 bg-gradient-to-b from-cyan-500/10 to-violet-500/10 p-6">
                <div className="text-xs uppercase tracking-widest text-slate-300/80">Launch wizard</div>
                <ol className="mt-4 space-y-3 text-sm">
                  <WizardStep active={step===1} index={1} label="Configure" />
                  <WizardStep active={step===2} index={2} label="Review" />
                  <WizardStep active={step===3} index={3} label="Launch" />
                </ol>
                <div className="mt-8 rounded-xl border border-white/10 bg-black/30 p-4 text-xs text-slate-300/80">
                  <div className="font-medium text-slate-200">Preview</div>
                  <div className="mt-2 text-slate-200/90">{tokenPreview}</div>
                  <div className="mt-2 flex items-center gap-2"><span className="text-slate-300/70">Est. fees</span><span className="rounded bg-white px-2 py-0.5 text-black">{estFees} SOL</span></div>
                </div>
              </aside>

              {/* Content */}
              <main className="p-6 md:p-8">
                {step === 1 && (
                  <div>
                    <h3 className="text-xl font-semibold">Configure your token</h3>
                    <p className="mt-1 text-sm text-slate-300/80">Define the essentials. Adjust authorities and metadata anytime before launch.</p>

                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field label="Name">
                        <input value={form.name} onChange={e=>setForm(v=>({...v, name: e.target.value}))} className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none ring-0 focus:border-cyan-400/40 focus:bg-black/30" placeholder="e.g. Photon" />
                      </Field>
                      <Field label="Symbol">
                        <input value={form.symbol} onChange={e=>setForm(v=>({...v, symbol: e.target.value.toUpperCase().slice(0,8)}))} className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-cyan-400/40 focus:bg-black/30" placeholder="e.g. PHOTON" />
                      </Field>
                      <Field label="Total supply">
                        <input value={form.supply} onChange={e=>setForm(v=>({...v, supply: e.target.value.replace(/[^0-9]/g,'')}))} inputMode="numeric" className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-cyan-400/40 focus:bg-black/30" placeholder="e.g. 1,000,000" />
                      </Field>
                      <Field label="Decimals">
                        <select value={form.decimals} onChange={e=>setForm(v=>({...v, decimals: Number(e.target.value)}))} className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-cyan-400/40 focus:bg-black/30">
                          {[0,2,4,6,8,9].map(d=>(<option key={d} value={d}>{d}</option>))}
                        </select>
                      </Field>
                      <Field label="Freeze authority" hint="Ability to freeze token accounts">
                        <Toggle checked={form.freezeAuthority} onChange={val=>setForm(v=>({...v, freezeAuthority: val}))} />
                      </Field>
                      <Field label="Mint authority" hint="Permit additional minting after launch">
                        <Toggle checked={form.mintAuthority} onChange={val=>setForm(v=>({...v, mintAuthority: val}))} />
                      </Field>
                      <Field label="Metadata URI" full>
                        <input value={form.metadataUri} onChange={e=>setForm(v=>({...v, metadataUri: e.target.value}))} className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-cyan-400/40 focus:bg-black/30" placeholder="https://.../metadata.json" />
                      </Field>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-3">
                      <button onClick={()=>{ setOpenApp(false); resetWizard() }} className="rounded-md border border-white/15 px-4 py-2 text-sm text-slate-200 hover:bg-white/10">Cancel</button>
                      <button disabled={!canContinue} onClick={()=>setStep(2)} className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium ${canContinue ? 'bg-gradient-to-r from-cyan-400 to-violet-500 text-black hover:opacity-95' : 'bg-white/10 text-slate-400 cursor-not-allowed'}`}>
                        Continue
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h3 className="text-xl font-semibold">Review and confirm</h3>
                    <p className="mt-1 text-sm text-slate-300/80">Double‑check the details before you launch. You can still go back and edit.</p>

                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <SummaryItem k="Name" v={form.name} />
                      <SummaryItem k="Symbol" v={form.symbol} />
                      <SummaryItem k="Supply" v={form.supply} />
                      <SummaryItem k="Decimals" v={String(form.decimals)} />
                      <SummaryItem k="Freeze authority" v={form.freezeAuthority ? 'Enabled' : 'Disabled'} />
                      <SummaryItem k="Mint authority" v={form.mintAuthority ? 'Enabled' : 'Disabled'} />
                      <SummaryItem k="Metadata" v={form.metadataUri || '—'} full />
                    </div>

                    <div className="mt-6 flex items-center justify-between rounded-xl border border-white/10 bg-black/30 p-4">
                      <div className="text-sm text-slate-300/80">Estimated fees</div>
                      <div className="rounded-md bg-white px-3 py-1 text-sm font-medium text-black">{estFees} SOL</div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <button onClick={()=>setStep(1)} className="rounded-md border border-white/15 px-4 py-2 text-sm text-slate-200 hover:bg-white/10">Back</button>
                      <button onClick={()=>setStep(3)} className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-2 text-sm font-medium text-black hover:opacity-95">
                        Proceed to launch
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    {!launched ? (
                      <div>
                        <h3 className="text-xl font-semibold">Ready to launch</h3>
                        <p className="mt-1 text-sm text-slate-300/80">This will create your token and finalize authorities based on your settings.</p>

                        <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-slate-300/80">
                          By continuing, you acknowledge network fees and understand that on‑chain actions are irreversible.
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                          <button onClick={()=>setStep(2)} className="rounded-md border border-white/15 px-4 py-2 text-sm text-slate-200 hover:bg-white/10">Back</button>
                          <button onClick={()=>setLaunched(true)} className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-2 text-sm font-medium text-black hover:opacity-95">
                            Launch
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 text-black">
                          <Check className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-semibold">Token launched</h3>
                        <p className="mt-2 text-sm text-slate-300/80">Here’s your mock token address and next steps.</p>
                        <div className="mx-auto mt-6 max-w-lg rounded-xl border border-white/10 bg-black/30 p-4 text-left">
                          <SummaryItem k="Address" v={fakeAddress(form)} copyable full />
                          <SummaryItem k="Symbol" v={form.symbol} />
                          <SummaryItem k="Supply" v={form.supply} />
                        </div>
                        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                          <button onClick={()=>{ setOpenApp(false); resetWizard() }} className="rounded-md border border-white/15 px-4 py-2 text-sm text-slate-200 hover:bg-white/10">Close</button>
                          <button onClick={resetWizard} className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-2 text-sm font-medium text-black hover:opacity-95">
                            Create another
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </main>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Decorative background effects
function BackgroundFX(){
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {/* Stars */}
      <div className="absolute inset-0 bg-[radial-gradient(1px_1px_at_20%_30%,rgba(255,255,255,0.25)_1px,transparent_1px),radial-gradient(1px_1px_at_80%_20%,rgba(255,255,255,0.18)_1px,transparent_1px),radial-gradient(1px_1px_at_60%_70%,rgba(255,255,255,0.18)_1px,transparent_1px)] bg-[length:1400px_800px,1200px_700px,1600px_900px]" />
      {/* Aurora blobs */}
      <div className="absolute -top-40 left-1/2 h-[60vh] w-[80vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.25),transparent_60%)] blur-3xl" />
      <div className="absolute top-1/3 -left-20 h-[50vh] w-[50vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.20),transparent_60%)] blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[45vh] w-[45vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18),transparent_60%)] blur-3xl" />
    </div>
  )
}

function Orbits(){
  return (
    <div className="relative aspect-[5/4] w-full">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
        {[
          {size: 220, color: 'rgba(34,211,238,0.4)'},
          {size: 300, color: 'rgba(139,92,246,0.4)'},
          {size: 380, color: 'rgba(59,130,246,0.35)'}
        ].map((o, i) => (
          <div key={i} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" style={{ width: o.size, height: o.size }}>
            <div className={`absolute -left-1.5 -top-1/2 h-3 w-3 rounded-full`} style={{ background: o.color, animation: `orbit${i} 9s linear infinite` }} />
          </div>
        ))}
      </div>
      <style>{`
        @keyframes orbit0 { from { transform: rotate(0deg) translateX(110px) rotate(0deg); } to { transform: rotate(360deg) translateX(110px) rotate(-360deg); } }
        @keyframes orbit1 { from { transform: rotate(0deg) translateX(150px) rotate(0deg); } to { transform: rotate(360deg) translateX(150px) rotate(-360deg); } }
        @keyframes orbit2 { from { transform: rotate(0deg) translateX(190px) rotate(0deg); } to { transform: rotate(360deg) translateX(190px) rotate(-360deg); } }
      `}</style>
    </div>
  )
}

function fakeAddress(form){
  const base = `${(form.symbol||'SYMB').slice(0,4)}${(form.name||'TOKEN').slice(0,2)}`.toUpperCase()
  const rand = Math.random().toString(36).slice(2,8).toUpperCase()
  return `${base}${rand}...${Math.random().toString(36).slice(2,6).toUpperCase()}`
}

function Badge({ children }){
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300/80 backdrop-blur">
      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"></span>
      {children}
    </div>
  )
}

function Stat({ k, v }){
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
      <div className="text-slate-200 font-medium">{k}</div>
      <div className="mt-0.5 text-slate-300/70">{v}</div>
    </div>
  )
}

function MiniCard({ icon, title, subtitle }){
  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/30 p-4 transition-colors hover:bg-black/40">
      <div className="absolute inset-px rounded-[11px] bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none" />
      <div className="relative z-10">
        <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/15 bg-white/5 text-white/80">
          {icon}
        </div>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-slate-300/70">{subtitle}</div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:shadow-[0_10px_50px_-15px_rgba(99,102,241,0.5)]">
      <div className="absolute inset-px rounded-[18px] bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none" />
      <div className="relative z-10">
        <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/15 bg-gradient-to-br from-cyan-400/20 to-violet-500/20 text-white">
          {icon}
        </div>
        <h3 className="text-base font-medium">{title}</h3>
        <p className="mt-2 text-sm text-slate-300/80">{desc}</p>
      </div>
    </div>
  )
}

function Step({ index, title, desc }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="text-slate-400 text-xs font-mono">{index}</div>
      <div className="mt-2 text-sm font-medium">{title}</div>
      <div className="mt-1 text-sm text-slate-300/80">{desc}</div>
    </div>
  )
}

function WizardStep({ active, index, label }){
  return (
    <li className="flex items-center gap-3">
      <span className={`flex h-6 w-6 items-center justify-center rounded-full border ${active ? 'border-transparent bg-gradient-to-r from-cyan-400 to-violet-500 text-black' : 'border-white/20 text-slate-300/70'}`}>{index}</span>
      <span className={active ? 'text-white' : 'text-slate-300/80'}>{label}</span>
    </li>
  )
}

function Field({ label, hint, children, full }){
  return (
    <label className={`block ${full ? 'sm:col-span-2' : ''}`}>
      <div className="mb-1.5 flex items-center gap-2 text-xs text-slate-300/80">
        <span>{label}</span>
        {hint && <span className="text-slate-400">— {hint}</span>}
      </div>
      {children}
    </label>
  )
}

function SummaryItem({ k, v, full, copyable }){
  return (
    <div className={`flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm ${full ? 'sm:col-span-2' : ''}`}>
      <div className="text-slate-300/80">{k}</div>
      <div className="truncate text-slate-100">{v}</div>
      {copyable && (
        <button onClick={()=>navigator.clipboard.writeText(String(v))} className="rounded border border-white/15 px-2 py-1 text-xs text-slate-200 hover:bg-white/10">Copy</button>
      )}
    </div>
  )
}

function Toggle({ checked, onChange }){
  return (
    <button type="button" aria-pressed={checked} onClick={()=>onChange(!checked)} className={`relative inline-flex h-6 w-11 items-center rounded-full border transition-colors ${checked ? 'border-transparent bg-gradient-to-r from-cyan-400 to-violet-500' : 'border-white/20 bg-white/5'}`}>
      <span className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  )
}

export default App
