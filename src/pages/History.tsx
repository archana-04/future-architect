import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { useFuture } from '../context/FutureContext';

export function History() {
  const { history, revisitSimulation } = useFuture();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="page-shell min-h-screen bg-ink-950 text-white">
      <div className="noise-overlay" />
      <Navbar />

      <main className="relative overflow-hidden bg-radial-glow">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <section className="section-shell rounded-[2rem] p-6 sm:p-8 lg:p-10">
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">Search History</p>
            <h1 className="mt-3 font-space text-4xl font-semibold text-white">Revisit your previous future searches</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
              Every submitted profile is saved locally. You can open any past simulation and continue exploring from there.
            </p>

            {history.length === 0 ? (
              <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-300">
                No previous search data found yet. Create your first simulation from Home.
              </div>
            ) : (
              <div className="mt-6 grid gap-4">
                {history.map((item, index) => (
                  <article key={`${item.profile.name}-${index}`} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Entry #{history.length - index}</p>
                        <h2 className="mt-2 text-xl font-semibold text-white">{item.profile.name} - {item.profile.dreamCareer}</h2>
                        <p className="mt-2 text-sm leading-7 text-slate-300">{item.summary}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          revisitSimulation(item);
                          navigate('/results');
                        }}
                        className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
                      >
                        Open result
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default History;
