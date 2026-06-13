import { CalendarDays, CircleDot } from 'lucide-react';
import type { FutureTimelineEvent } from '../types/future';

interface TimelineProps {
  events: FutureTimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  return (
    <div className="relative space-y-5 pl-1 sm:pl-2">
      <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-cyan-400/60 via-sky-400/30 to-fuchsia-500/20" />
      {events.map((event, index) => (
        <article key={`${event.year}-${event.title}`} className="relative pl-14 animate-fadeUp sm:pl-16" style={{ animationDelay: `${index * 90}ms` }}>
          <div className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-slate-950 shadow-glow">
            <div className="absolute inset-0 rounded-full border border-cyan-300/20 animate-ping opacity-20" />
            <CircleDot className="h-4 w-4 text-cyan-200" />
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-glow backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/10 hover:shadow-[0_22px_80px_rgba(56,189,248,0.12)]">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">
                <CalendarDays className="h-3.5 w-3.5" />
                {event.year}
              </span>
              <h3 className="text-xl font-semibold text-white">{event.title}</h3>
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-300">{event.description}</p>
            <div className="mt-4 rounded-2xl border border-cyan-400/15 bg-cyan-400/10 p-4 text-sm text-cyan-50">{event.highlight}</div>
          </div>
        </article>
      ))}
    </div>
  );
}
