import { ArrowRight, Sparkles, Wand2 } from 'lucide-react';

interface HeroProps {
  onCtaClick: () => void;
}

export function Hero({ onCtaClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/5 px-6 py-14 shadow-glow backdrop-blur-2xl sm:px-10 lg:px-14 lg:py-20 animate-fadeScale">
      <div className="absolute inset-0 bg-radial-glow opacity-100" />
      <div className="absolute inset-0 premium-grid opacity-[0.08]" />
      <div className="absolute -left-12 top-10 h-48 w-48 rounded-full bg-cyan-400/15 blur-3xl animate-float" />
      <div className="absolute bottom-8 right-8 h-52 w-52 rounded-full bg-fuchsia-400/10 blur-3xl animate-drift" />

      <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-white/5 px-4 py-2 text-sm text-cyan-100 shadow-glow">
            <Wand2 className="h-4 w-4" />
            Premium future simulation for hackathon demos
          </div>

          <div className="space-y-5">
            <h1 className="font-space text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl balanced-text">Future Me AI</h1>
            <p className="max-w-2xl text-2xl font-medium text-slate-100 sm:text-3xl balanced-text">See the Story of Who You Could Become</p>
            <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg balanced-text">
              Generate a realistic simulation of your future career, achievements, impact, and life journey using AI-powered forecasting.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onCtaClick}
              className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-fuchsia-500 px-6 py-4 font-semibold text-slate-950 shadow-[0_12px_40px_rgba(56,189,248,0.25)] transition hover:scale-[1.02]"
            >
              Generate My Future
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </button>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 shadow-glow">
              <Sparkles className="h-4 w-4 text-cyan-300" />
              Mock data, premium UI, route-based demo
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ['AI Forecast', 'Story-first simulation'],
              ['Visual polish', 'Glass + cinematic depth'],
              ['Mobile ready', 'Stacked beautifully on small screens'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-3xl border border-white/10 bg-slate-950/35 px-4 py-4 shadow-glow backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{label}</p>
                <p className="mt-2 text-sm font-medium text-slate-100 balanced-text">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/15 to-white/5 blur-2xl" />
          <div className="relative space-y-5 rounded-[2rem] border border-white/10 bg-slate-900/65 p-6 backdrop-blur-xl shadow-[0_20px_80px_rgba(2,6,23,0.45)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Simulation quality</p>
                <p className="font-space text-2xl font-semibold text-white">Premium Forecast</p>
              </div>
              <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                Live Preview
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ['Career trajectory', 'Senior leadership to founder'],
                ['Impact', 'Cloud, AI, and mentorship'],
                ['Timeline depth', '2027 to 2040 milestones'],
                ['Tone', 'Serious, cinematic, credible'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{label}</p>
                  <p className="mt-2 text-sm font-medium text-slate-100">{value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm text-cyan-50">
              The MVP uses mock forecasting data to create a polished, interactive storytelling experience without any external AI API dependency.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
