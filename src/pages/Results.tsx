import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { AchievementCards } from '../components/AchievementCards';
import { Footer } from '../components/Footer';
import { MentorPanel } from '../components/MentorPanel';
import { Navbar } from '../components/Navbar';
import { Newspaper } from '../components/Newspaper';
import { Timeline } from '../components/Timeline';
import { TrailerPanel } from '../components/TrailerPanel';
import { useFuture } from '../context/FutureContext';

export function Results() {
  const { futureData, profile } = useFuture();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!futureData || !profile) {
    return (
      <div className="page-shell min-h-screen bg-ink-950 text-white">
        <div className="noise-overlay" />
        <Navbar />
        <main className="relative overflow-hidden bg-radial-glow">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
            <section className="section-shell rounded-[2rem] p-8 text-center shadow-glow backdrop-blur-2xl">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">No profile found</p>
              <h1 className="mt-4 font-space text-4xl font-semibold text-white">Submit a profile to generate future results</h1>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                The results page reads from shared application state, so it only renders after a form submission.
              </p>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-shell min-h-screen bg-ink-950 text-white">
      <div className="noise-overlay" />
      <Navbar />

      <main className="relative overflow-hidden bg-radial-glow">
        <div className="mx-auto max-w-7xl space-y-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          <section className="section-shell rounded-[2rem] p-6 sm:p-8 lg:p-10 animate-fadeScale">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Future Simulation</p>
                <h1 className="font-space text-4xl font-semibold text-white sm:text-5xl balanced-text">{profile.name}'s Future Story</h1>
                <p className="max-w-4xl text-sm leading-7 text-slate-300 sm:text-base balanced-text">{futureData.summary}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ['Trajectory', 'From engineer to founder'],
                  ['Story type', 'Editorial-grade simulation'],
                  ['Mode', 'Premium visual narrative'],
                  ['Scope', 'Timeline, mentors, film, press'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-3xl border border-white/10 bg-slate-950/35 px-4 py-4 shadow-glow backdrop-blur-xl">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{label}</p>
                    <p className="mt-2 text-sm font-medium text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <SectionShell title="Future Achievement Overview" description="A concise view of the trajectory, leadership, innovation, and long-term impact." delay="0ms">
            <AchievementCards achievements={futureData.achievements} scores={futureData.scores} />
          </SectionShell>

          <SectionShell title="Future Timeline" description="Key milestones that shape the arc from today into 2040." delay="90ms">
            <Timeline events={futureData.timeline} />
          </SectionShell>

          <SectionShell title="Future Newspaper" description="A polished 2040 front-page profile written like a premium editorial feature." delay="180ms">
            <Newspaper article={futureData.newspaper} />
          </SectionShell>

          <SectionShell title="AI Mentor Council" description="Three mentor voices offering practical advice for the journey ahead." delay="270ms">
            <MentorPanel mentors={futureData.mentors} />
          </SectionShell>

          <SectionShell title="Future Movie Trailer" description="A cinematic summary of the future, revealed with a typewriter animation." delay="360ms">
            <TrailerPanel title={`${profile.name}'s Future Trailer`} script={futureData.trailer} />
          </SectionShell>
        </div>
      </main>

      <Footer />
    </div>
  );
}

interface SectionShellProps {
  title: string;
  description: string;
  delay: string;
  children: ReactNode;
}

function SectionShell({ title, description, delay, children }: SectionShellProps) {
  return (
    <section className="section-shell rounded-[2rem] p-6 shadow-glow backdrop-blur-2xl sm:p-8 animate-fadeUp" style={{ animationDelay: delay }}>
      <div className="mb-6 grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-300">Results</p>
          <h2 className="font-space text-3xl font-semibold text-white">{title}</h2>
          <p className="max-w-3xl text-sm leading-7 text-slate-300">{description}</p>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-400">
          Premium module
        </div>
      </div>
      {children}
    </section>
  );
}

export default Results;
