interface GoalCompletionTrackerProps {
  goals: string[];
  completedMap: Record<string, boolean>;
  onToggleGoal: (goal: string) => void;
}

export function GoalCompletionTracker({ goals, completedMap, onToggleGoal }: GoalCompletionTrackerProps) {
  const completedCount = goals.filter(goal => completedMap[goal]).length;
  const percentage = goals.length === 0 ? 0 : Math.round((completedCount / goals.length) * 100);

  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-950/45 p-6 shadow-glow backdrop-blur-xl sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">Goal Tracker</p>
          <h3 className="mt-2 font-space text-2xl font-semibold text-white">Track completion level for your targets</h3>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">{percentage}% complete</div>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-300 via-cyan-300 to-sky-400 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="mt-5 space-y-3">
        {goals.map(goal => (
          <label key={goal} className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
            <input
              type="checkbox"
              checked={Boolean(completedMap[goal])}
              onChange={() => onToggleGoal(goal)}
              className="mt-1 h-4 w-4 rounded border-white/20 bg-slate-900 text-cyan-300"
            />
            <span>{goal}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
