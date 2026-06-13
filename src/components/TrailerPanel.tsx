import { Clapperboard, Play } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TrailerPanelProps {
  title: string;
  script: string;
}

export function TrailerPanel({ title, script }: TrailerPanelProps) {
  const [text, setText] = useState('');

  useEffect(() => {
    let index = 0;
    setText('');

    const timer = window.setInterval(() => {
      index += 1;
      setText(script.slice(0, index));
      if (index >= script.length) {
        window.clearInterval(timer);
      }
    }, 18);

    return () => window.clearInterval(timer);
  }, [script]);

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-glow">
      <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[280px] bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.2),_transparent_40%),linear-gradient(135deg,_rgba(15,23,42,1),_rgba(2,6,23,1))] p-8">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute left-8 top-8 h-32 w-32 rounded-full border border-cyan-400/20" />
            <div className="absolute left-16 top-16 h-44 w-44 rounded-full border border-fuchsia-400/15" />
            <div className="absolute left-24 top-24 h-56 w-56 rounded-full border border-white/5" />
          </div>

          <div className="relative flex h-full flex-col justify-between">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-300 shadow-glow">
              <Clapperboard className="h-4 w-4 text-cyan-200" />
              Future Trailer
            </div>

            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Cinematic reveal</p>
              <h3 className="font-space text-3xl font-semibold text-white sm:text-4xl balanced-text">{title}</h3>
              <button className="inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20 hover:scale-[1.01]">
                <Play className="h-4 w-4" />
                Play Trailer
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center bg-white/5 p-8 lg:p-10">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-300">Narration</p>
            <p className="font-serif text-2xl leading-10 text-slate-100 sm:text-[1.65rem] sm:leading-[2.6rem] balanced-text">
              {text}
              <span className="ml-1 inline-block h-6 w-0.5 animate-pulse bg-cyan-300 align-middle" />
            </p>
            <p className="max-w-2xl text-sm leading-7 text-slate-400 balanced-text">
              The typewriter reveal is animated in plain React to keep the experience lightweight, reliable, and easy to demo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
