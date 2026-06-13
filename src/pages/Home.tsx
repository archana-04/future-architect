import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Hero } from '../components/Hero';
import { LoadingScreen } from '../components/LoadingScreen';
import { Navbar } from '../components/Navbar';
import { UserForm } from '../components/UserForm';
import { useFuture } from '../context/FutureContext';
import type { UserProfile } from '../types/user';

const LOADING_STEPS = [1, 2, 3, 4, 5];

export function Home() {
  const navigate = useNavigate();
  const { submitProfile } = useFuture();
  const formRef = useRef<HTMLDivElement | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (!isGenerating) return;

    const timeouts = LOADING_STEPS.map((step, index) =>
      window.setTimeout(() => setCurrentStep(step), index * 600),
    );

    const navigateTimeout = window.setTimeout(() => {
      setIsGenerating(false);
      navigate('/results');
    }, 3000);

    return () => {
      timeouts.forEach(timeout => window.clearTimeout(timeout));
      window.clearTimeout(navigateTimeout);
    };
  }, [isGenerating, navigate]);

  const handleGenerate = (profile: UserProfile) => {
    submitProfile(profile);
    setCurrentStep(1);
    setIsGenerating(true);
  };

  return (
    <div className="page-shell min-h-screen bg-ink-950 text-white">
      <div className="noise-overlay" />
      {isGenerating ? <LoadingScreen currentStep={currentStep} /> : null}
      <Navbar />

      <main className="relative overflow-hidden bg-radial-glow">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          <Hero onCtaClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })} />

          <div ref={formRef} className="section-shell mt-8 rounded-[2rem] p-6 sm:p-8 lg:p-10 animate-fadeUp">
            <div className="mb-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">User Profile</p>
                <h2 className="font-space text-3xl font-semibold text-white sm:text-4xl balanced-text">Tell Future Me AI who you are today</h2>
                <p className="max-w-3xl text-sm leading-7 text-slate-300 sm:text-base balanced-text">
                Enter your current role, strengths, dream career, and goals. The simulation turns those inputs into a polished future story.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:justify-self-end">
                {[
                  ['01', 'Profile'],
                  ['02', 'Forecast'],
                  ['03', 'Story'],
                ].map(([step, label]) => (
                  <div key={label} className="rounded-3xl border border-white/10 bg-slate-950/35 px-4 py-4 text-center shadow-glow backdrop-blur-xl">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Step {step}</p>
                    <p className="mt-2 text-sm font-medium text-white">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <UserForm onSubmit={handleGenerate} disabled={isGenerating} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
