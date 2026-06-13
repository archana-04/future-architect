import { Sparkles } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/55 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-white">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/25 bg-cyan-400/10 shadow-glow">
            <div className="absolute inset-0 rounded-2xl border border-cyan-300/20 animate-pulse" />
            <Sparkles className="h-5 w-5 text-cyan-200" />
          </div>
          <div>
            <p className="font-space text-lg font-semibold tracking-wide text-white sm:text-xl">Future Me AI</p>
            <p className="text-xs text-slate-400 sm:text-sm">See the Story of Who You Could Become</p>
          </div>
        </Link>

        <nav className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 text-sm text-slate-300 shadow-glow">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `rounded-full px-4 py-2 transition ${isActive ? 'bg-white text-slate-950 shadow-lg' : 'hover:bg-white/10 hover:text-white'}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/results"
            className={({ isActive }) =>
              `rounded-full px-4 py-2 transition ${isActive ? 'bg-white text-slate-950 shadow-lg' : 'hover:bg-white/10 hover:text-white'}`
            }
          >
            Results
          </NavLink>
          <NavLink
            to="/history"
            className={({ isActive }) =>
              `rounded-full px-4 py-2 transition ${isActive ? 'bg-white text-slate-950 shadow-lg' : 'hover:bg-white/10 hover:text-white'}`
            }
          >
            History
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
