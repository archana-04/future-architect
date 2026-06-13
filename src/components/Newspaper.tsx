import type { FutureArticle } from '../types/future';

interface NewspaperProps {
  article: FutureArticle;
}

export function Newspaper({ article }: NewspaperProps) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-amber-100/10 bg-[#f4eddc] text-slate-900 shadow-[0_28px_90px_rgba(15,23,42,0.35)]">
      <div className="border-b border-slate-900/10 bg-gradient-to-r from-[#f4eddc] via-[#f7f0e2] to-[#f4eddc] px-6 py-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.6em] text-slate-500">{article.publication}</p>
            <h3 className="mt-2 font-serif text-3xl font-bold tracking-tight sm:text-4xl">{article.headline}</h3>
          </div>
          <div className="text-right text-sm text-slate-500">
            <p>{article.date}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.3em]">{article.byline}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 px-6 py-6 sm:px-8 lg:grid-cols-[1fr_0.45fr]">
        <div className="space-y-4">
          <p className="border-l-4 border-slate-800 pl-4 text-lg font-medium leading-8 text-slate-800 balanced-text">{article.dek}</p>
          {article.body.map(paragraph => (
            <p key={paragraph} className="font-serif text-[1.05rem] leading-8 text-slate-800 balanced-text">
              {paragraph}
            </p>
          ))}
        </div>

        <aside className="space-y-4 rounded-3xl border border-slate-900/10 bg-slate-900 px-5 py-5 text-slate-100 shadow-[0_18px_45px_rgba(2,6,23,0.28)]">
          <p className="text-xs uppercase tracking-[0.4em] text-cyan-300">Edition Notes</p>
          <div className="space-y-3 text-sm leading-7 text-slate-300">
            <p>Global recognition followed a decade of measured execution and visible mentorship.</p>
            <p>The story highlights how technical credibility and human leadership can coexist in one career arc.</p>
            <p>This feature is designed to feel like a credible 2040 front-page profile, not a generic AI output.</p>
          </div>
        </aside>
      </div>
    </article>
  );
}
