import React, { useMemo, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { ArrowRight, Shield, Zap, Layers, X, Check, ChevronRight } from 'lucide-react'

function App() {
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
    // playful mock estimate
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
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <header className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-sm bg-white" aria-hidden="true"></div>
            <span className="text-sm tracking-widest uppercase text-white/80">Solana Token Studio</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
            <a className="hover:text-white transition-colors" href="#features">Features</a>
            <a className="hover:text-white transition-colors" href="#how">How it works</a>
            <a className="hover:text-white transition-colors" href="#faq">FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => setOpenApp(true)} className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/0 px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-black transition-colors">
              Launch App
              <ArrowRight className="h-4 w-4" />
            </button>
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
              <button onClick={() => setOpenApp(true)} className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-medium text-black hover:bg-white/90 transition-colors">
                Start creating
                <ArrowRight className="h-4 w-4" />
              </button>
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

      {/* Launch App — Glassy Wizard */}
      {openApp && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" onClick={() => setOpenApp(false)} />
          <div className="relative mx-auto mt-10 w-[92vw] max-w-5xl rounded-2xl border border-white/10 bg-white/[0.03] p-0 shadow-2xl">
            <div className="absolute right-3 top-3">
              <button
                onClick={() => { setOpenApp(false); resetWizard() }}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[240px_1fr]">
              {/* Sidebar */}
              <aside className="hidden md:block rounded-l-2xl border-r border-white/10 bg-white/[0.02] p-6">
                <div className="text-xs uppercase tracking-widest text-white/50">Launch wizard</div>
                <ol className="mt-4 space-y-3 text-sm">
                  <WizardStep active={step===1} index={1} label="Configure" />
                  <WizardStep active={step===2} index={2} label="Review" />
                  <WizardStep active={step===3} index={3} label="Launch" />
                </ol>
                <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs text-white/60">
                  <div className="font-medium text-white/80">Preview</div>
                  <div className="mt-2 text-white/70">{tokenPreview}</div>
                  <div className="mt-2 flex items-center gap-2"><span className="text-white/50">Est. fees</span><span className="rounded bg-white/10 px-2 py-0.5 text-white/80">{estFees} SOL</span></div>
                </div>
              </aside>

              {/* Content */}
              <main className="p-6 md:p-8">
                {step === 1 && (
                  <div>
                    <h3 className="text-xl font-semibold">Configure your token</h3>
                    <p className="mt-1 text-sm text-white/70">Define the essentials. You can adjust authorities and metadata anytime before launch.</p>

                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field label="Name">
                        <input value={form.name} onChange={e=>setForm(v=>({...v, name: e.target.value}))} className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none ring-0 focus:border-white/30 focus:bg-black/30" placeholder="e.g. Photon" />
                      </Field>
                      <Field label="Symbol">
                        <input value={form.symbol} onChange={e=>setForm(v=>({...v, symbol: e.target.value.toUpperCase().slice(0,8)}))} className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-white/30 focus:bg-black/30" placeholder="e.g. PHOTON" />
                      </Field>
                      <Field label="Total supply">
                        <input value={form.supply} onChange={e=>setForm(v=>({...v, supply: e.target.value.replace(/[^0-9]/g,'')}))} inputMode="numeric" className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-white/30 focus:bg-black/30" placeholder="e.g. 1,000,000" />
                      </Field>
                      <Field label="Decimals">
                        <select value={form.decimals} onChange={e=>setForm(v=>({...v, decimals: Number(e.target.value)}))} className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-white/30 focus:bg-black/30">
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
                        <input value={form.metadataUri} onChange={e=>setForm(v=>({...v, metadataUri: e.target.value}))} className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-white/30 focus:bg-black/30" placeholder="https://.../metadata.json" />
                      </Field>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-3">
                      <button onClick={()=>{ setOpenApp(false); resetWizard() }} className="rounded-md border border-white/15 px-4 py-2 text-sm text-white hover:bg-white/10">Cancel</button>
                      <button disabled={!canContinue} onClick={()=>setStep(2)} className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium ${canContinue ? 'bg-white text-black hover:bg-white/90' : 'bg-white/10 text-white/50 cursor-not-allowed'}`}>
                        Continue
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h3 className="text-xl font-semibold">Review and confirm</h3>
                    <p className="mt-1 text-sm text-white/70">Double‑check the details before you launch. You can still go back and edit.</p>

                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <SummaryItem k="Name" v={form.name} />
                      <SummaryItem k="Symbol" v={form.symbol} />
                      <SummaryItem k="Supply" v={form.supply} />
                      <SummaryItem k="Decimals" v={String(form.decimals)} />
                      <SummaryItem k="Freeze authority" v={form.freezeAuthority ? 'Enabled' : 'Disabled'} />
                      <SummaryItem k="Mint authority" v={form.mintAuthority ? 'Enabled' : 'Disabled'} />
                      <SummaryItem k="Metadata" v={form.metadataUri || '—'} full />
                    </div>

                    <div className="mt-6 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="text-sm text-white/70">Estimated fees</div>
                      <div className="rounded-md bg-white px-3 py-1 text-sm font-medium text-black">{estFees} SOL</div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <button onClick={()=>setStep(1)} className="rounded-md border border-white/15 px-4 py-2 text-sm text-white hover:bg-white/10">Back</button>
                      <button onClick={()=>setStep(3)} className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90">
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
                        <p className="mt-1 text-sm text-white/70">This will create your token and finalize authorities based on your settings.</p>

                        <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/70">
                          By continuing, you acknowledge network fees and understand that on‑chain actions are irreversible.
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                          <button onClick={()=>setStep(2)} className="rounded-md border border-white/15 px-4 py-2 text-sm text-white hover:bg-white/10">Back</button>
                          <button onClick={()=>setLaunched(true)} className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90">
                            Launch
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black">
                          <Check className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-semibold">Token launched</h3>
                        <p className="mt-2 text-sm text-white/70">Here’s your mock token address and next steps.</p>
                        <div className="mx-auto mt-6 max-w-lg rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left">
                          <SummaryItem k="Address" v={fakeAddress(form)} copyable full />
                          <SummaryItem k="Symbol" v={form.symbol} />
                          <SummaryItem k="Supply" v={form.supply} />
                        </div>
                        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                          <button onClick={()=>{ setOpenApp(false); resetWizard() }} className="rounded-md border border-white/15 px-4 py-2 text-sm text-white hover:bg-white/10">Close</button>
                          <button onClick={resetWizard} className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90">
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

function fakeAddress(form){
  const base = `${(form.symbol||'SYMB').slice(0,4)}${(form.name||'TOKEN').slice(0,2)}`.toUpperCase()
  const rand = Math.random().toString(36).slice(2,8).toUpperCase()
  return `${base}${rand}...${Math.random().toString(36).slice(2,6).toUpperCase()}`
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

function WizardStep({ active, index, label }){
  return (
    <li className="flex items-center gap-3">
      <span className={`flex h-6 w-6 items-center justify-center rounded-full border ${active ? 'border-white bg-white text-black' : 'border-white/20 text-white/60'}`}>{index}</span>
      <span className={active ? 'text-white' : 'text-white/60'}>{label}</span>
    </li>
  )
}

function Field({ label, hint, children, full }){
  return (
    <label className={`block ${full ? 'sm:col-span-2' : ''}`}>
      <div className="mb-1.5 flex items-center gap-2 text-xs text-white/70">
        <span>{label}</span>
        {hint && <span className="text-white/40">— {hint}</span>}
      </div>
      {children}
    </label>
  )
}

function SummaryItem({ k, v, full, copyable }){
  return (
    <div className={`flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm ${full ? 'sm:col-span-2' : ''}`}>
      <div className="text-white/60">{k}</div>
      <div className="truncate text-white/90">{v}</div>
      {copyable && (
        <button onClick={()=>navigator.clipboard.writeText(String(v))} className="rounded border border-white/15 px-2 py-1 text-xs text-white/80 hover:bg-white/10">Copy</button>
      )}
    </div>
  )
}

function Toggle({ checked, onChange }){
  return (
    <button type="button" aria-pressed={checked} onClick={()=>onChange(!checked)} className={`relative inline-flex h-6 w-11 items-center rounded-full border ${checked ? 'border-white bg-white' : 'border-white/20 bg-white/5'} transition-colors`}>
      <span className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  )
}

export default App
