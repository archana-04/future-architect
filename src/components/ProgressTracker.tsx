const STEPS = ['Analyzing Profile', 'Building Future Simulation', 'Generating Timeline', 'Creating Success Story', 'Future Ready'];

interface ProgressTrackerProps {
  currentStep: number;
}

export function ProgressTracker({ currentStep }: ProgressTrackerProps) {
  return (
    <div className="space-y-4">
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-fuchsia-500 transition-all duration-500"
          style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-5">
        {STEPS.map((step, index) => {
          const stepNumber = index + 1;
          const active = stepNumber === currentStep;
          const completed = stepNumber < currentStep;

          return (
            <div
              key={step}
              className={`rounded-2xl border p-4 text-left transition duration-300 ${
                active
                  ? 'border-cyan-400/40 bg-cyan-400/10 text-white shadow-glow scale-[1.01]'
                  : completed
                    ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-100'
                    : 'border-white/10 bg-white/5 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                    active ? 'bg-cyan-300 text-slate-950' : completed ? 'bg-emerald-300 text-slate-950' : 'bg-white/10 text-slate-300'
                  }`}
                >
                  {stepNumber}
                </div>
                <p className="text-sm font-semibold leading-5">{step}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
