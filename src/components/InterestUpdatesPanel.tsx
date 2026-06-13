import type { UserProfile } from '../types/user';

interface InterestUpdatesPanelProps {
  profile: UserProfile;
}

interface InterestUpdate {
  title: string;
  source: string;
  summary: string;
  url: string;
}

export function InterestUpdatesPanel({ profile }: InterestUpdatesPanelProps) {
  const interests = [...profile.skills, ...profile.goals].slice(0, 4);
  const updates = createUpdates(interests.length > 0 ? interests : [profile.dreamCareer]);

  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-950/45 p-6 shadow-glow backdrop-blur-xl sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-fuchsia-300">Knowledge Feed</p>
          <h3 className="mt-2 font-space text-2xl font-semibold text-white">Updates based on your interests</h3>
        </div>
        <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Auto-refresh ready</p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {updates.map(update => (
          <article key={update.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-[0.7rem] uppercase tracking-[0.28em] text-cyan-300">{update.source}</p>
            <h4 className="mt-2 text-lg font-semibold text-white">{update.title}</h4>
            <p className="mt-2 text-sm leading-7 text-slate-300">{update.summary}</p>
            <a
              href={update.url}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100 transition hover:bg-cyan-400/20"
            >
              Read latest
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}

function createUpdates(interests: string[]): InterestUpdate[] {
  return interests.map(interest => ({
    title: `${toTitleCase(interest)} weekly brief`,
    source: 'Curated intelligence',
    summary: `Key trends, practical playbooks, and new breakthroughs in ${interest}. Use this as your weekly signal to stay competitive in your field.`,
    url: `https://www.google.com/search?q=${encodeURIComponent(`${interest} latest news`)}`,
  }));
}

function toTitleCase(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
