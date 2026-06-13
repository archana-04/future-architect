import { Loader2, Sparkles } from 'lucide-react';
import { ProgressTracker } from './ProgressTracker';

interface LoadingScreenProps {
  currentStep: number;
}

export function LoadingScreen({ currentStep }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/92 px-4 backdrop-blur-2xl">
      <div className="absolute inset-0 bg-radial-glow opacity-90" />
      <div className="absolute inset-0 premium-grid opacity-[0.08]" />
      <div className="relative w-full max-w-4xl rounded-[2.25rem] border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-2xl sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="flex flex-col items-center justify-center gap-4 text-center lg:items-start lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-200">
              <Sparkles className="h-4 w-4" />
              Generating story
            </div>

            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10 shadow-glow">
              <div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-[pulse_2.5s_ease-out_infinite]" />
              <Loader2 className="h-10 w-10 animate-spin text-cyan-200" />
            </div>

            <div>
              <h2 className="mt-1 font-space text-3xl font-semibold text-white sm:text-4xl">Future Me AI is mapping your path</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                We are analyzing your profile, assembling milestones, and generating a premium future story experience.
              </p>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/55 p-4 sm:p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Simulation engine</p>
                <p className="mt-1 text-sm font-medium text-white">Progression scan</p>
              </div>
              <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                Active
              </div>
            </div>
            <ProgressTracker currentStep={currentStep} />
          </div>
        </div>
      </div>
    </div>
  );
}
