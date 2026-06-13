import { BrainCircuit, Rocket, Users } from 'lucide-react';
import type { MentorAdvice } from '../types/future';

interface MentorPanelProps {
  mentors: MentorAdvice[];
}

const icons = {
  brain: BrainCircuit,
  users: Users,
  rocket: Rocket,
};

export function MentorPanel({ mentors }: MentorPanelProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {mentors.map(mentor => {
        const Icon = icons[mentor.iconKey];

        return (
          <article
            key={mentor.role}
            className="group rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/25 hover:bg-white/10 hover:shadow-[0_22px_80px_rgba(56,189,248,0.12)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 transition duration-300 group-hover:scale-105 group-hover:bg-cyan-400/15">
                  <Icon className="h-6 w-6 text-cyan-200" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">{mentor.role}</h3>
                <p className="mt-1 text-sm text-cyan-200">{mentor.specialty}</p>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.7rem] uppercase tracking-[0.25em] text-slate-400">
                Mentor
              </div>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-300 balanced-text">{mentor.advice}</p>
          </article>
        );
      })}
    </div>
  );
}
