import type { FutureTimelineEvent } from '../types/future';

interface GoalRoadmapPanelProps {
  goals: string[];
  skills: string[];
  timeline: FutureTimelineEvent[];
}

interface RoadmapStep {
  title: string;
  horizon: string;
  actions: string[];
}

export function GoalRoadmapPanel({ goals, skills, timeline }: GoalRoadmapPanelProps) {
  const steps = buildRoadmap(goals, skills, timeline);

  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-950/45 p-6 shadow-glow backdrop-blur-xl sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-amber-300">Execution Roadmap</p>
          <h3 className="mt-2 font-space text-2xl font-semibold text-white">A step-by-step path to achieve your goals</h3>
        </div>
        <p className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">Practical plan</p>
      </div>

      <div className="mt-6 space-y-4">
        {steps.map((step, index) => (
          <article key={`${step.title}-${index}`} className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-lg font-semibold text-white">{step.title}</h4>
              <p className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-100">{step.horizon}</p>
            </div>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-200">
              {step.actions.map(action => (
                <li key={action} className="rounded-2xl border border-white/10 bg-slate-900/50 px-3 py-2">
                  {action}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}

function buildRoadmap(goals: string[], skills: string[], timeline: FutureTimelineEvent[]): RoadmapStep[] {
  const primaryGoal = goals[0] ?? 'career growth';
  const secondaryGoal = goals[1] ?? primaryGoal;
  const primarySkill = skills[0] ?? 'focused execution';
  const secondarySkill = skills[1] ?? primarySkill;
  const firstMilestone = timeline[0]?.title ?? 'first milestone';
  const secondMilestone = timeline[1]?.title ?? 'second milestone';
  const longMilestone = timeline[timeline.length - 1]?.title ?? 'long-term target';

  return [
    {
      title: 'Foundation Sprint',
      horizon: '0-30 days',
      actions: [
        `Define one measurable weekly output linked to "${primaryGoal}".`,
        `Create a learning block for ${primarySkill} (minimum 4 sessions per week).`,
        `Ship a small public artifact that supports "${firstMilestone}".`,
      ],
    },
    {
      title: 'Momentum Phase',
      horizon: '30-90 days',
      actions: [
        `Apply ${secondarySkill} in a real project and document outcomes.`,
        `Find one mentor or accountability partner for "${secondaryGoal}".`,
        `Map your monthly progress to "${secondMilestone}" with clear metrics.`,
      ],
    },
    {
      title: 'Scale and Positioning',
      horizon: '3-12 months',
      actions: [
        `Lead at least one initiative that visibly supports "${longMilestone}".`,
        'Build a proof portfolio (projects, wins, testimonials, and measurable impact).',
        'Review roadmap monthly and remove low-impact activities aggressively.',
      ],
    },
  ];
}
