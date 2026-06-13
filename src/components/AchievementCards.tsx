import { BriefcaseBusiness, Crown, Sparkles, WalletCards } from 'lucide-react';
import type { AchievementCardData, FutureScore } from '../types/future';

interface AchievementCardsProps {
  achievements: AchievementCardData[];
  scores: FutureScore[];
}

const iconMap = {
  briefcase: BriefcaseBusiness,
  crown: Crown,
  sparkles: Sparkles,
  wallet: WalletCards,
};

export function AchievementCards({ achievements, scores }: AchievementCardsProps) {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {achievements.map(card => {
          const Icon = iconMap[card.iconKey];

          return (
            <article key={card.label} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 shadow-glow backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/10 hover:shadow-[0_22px_80px_rgba(56,189,248,0.12)]">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 via-transparent to-fuchsia-400/0 opacity-0 transition duration-300 group-hover:opacity-100" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">{card.label}</p>
                  <h3 className="mt-2 text-3xl font-semibold text-white">{card.value}</h3>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 transition duration-300 group-hover:scale-105 group-hover:bg-cyan-400/15">
                  <Icon className="h-5 w-5 text-cyan-200" />
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-300 balanced-text">{card.description}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.28em] text-cyan-200">{card.trend}</p>
            </article>
          );
        })}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {scores.map(score => (
          <article key={score.label} className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center shadow-glow backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/10">
            <div
              className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-[conic-gradient(from_180deg,rgba(34,211,238,1)_0%,rgba(56,189,248,1)_40%,rgba(217,70,239,1)_100%)] shadow-[0_20px_60px_rgba(56,189,248,0.18)]"
              style={{ background: `conic-gradient(from 180deg, rgba(34,211,238,1) 0%, rgba(56,189,248,1) ${score.value}%, rgba(15,23,42,0.95) ${score.value}% 100%)` }}
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-950 text-white">
                <div>
                  <p className="text-2xl font-bold">{score.value}%</p>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{score.label}</p>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-300 balanced-text">{score.subtitle}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
