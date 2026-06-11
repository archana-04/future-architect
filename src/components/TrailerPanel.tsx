import React from 'react';
import { Film } from 'lucide-react';

interface TrailerPanelProps {
  narration: string;
}

export const TrailerPanel: React.FC<TrailerPanelProps> = ({ narration }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-pink-500/10 rounded-lg border border-pink-500/30">
            <Film className="w-5 h-5 text-pink-400" />
          </div>
          <h2 className="text-4xl font-bold text-white">Your Story - In Motion</h2>
        </div>
        <p className="text-slate-400 text-lg font-light">
          A cinematic journey through your future
        </p>
      </div>

      <div className="group relative animate-scale-in">
        {/* Animated glow background */}
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-blue-500/30 rounded-2xl blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

        {/* Main trailer card */}
        <div className="relative bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80 backdrop-blur-xl border border-slate-700/40 rounded-2xl overflow-hidden hover:border-pink-500/30 transition-all duration-500 shadow-2xl">
          {/* Top gradient accent */}
          <div className="h-1.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-gradient-animation"></div>

          {/* Content container */}
          <div className="p-8 md:p-12 lg:p-16 space-y-8">
            {/* Play icon simulation */}
            <div className="flex justify-center">
              <div className="relative w-24 h-24 group/play">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-2xl opacity-60 group-hover/play:opacity-100 transition-all duration-300 animate-pulse"></div>
                <div className="absolute inset-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-lg animate-pulse animation-delay-2000"></div>
                <div className="relative w-24 h-24 bg-glass rounded-full flex items-center justify-center border-2 border-pink-500/40 group-hover/play:border-pink-400 transition-all duration-300 group-hover/play:shadow-xl group-hover/play:shadow-pink-500/40">
                  <div className="relative flex items-center justify-center">
                    <div className="w-0 h-0 border-l-8 border-l-transparent border-r-0 border-t-5 border-t-transparent border-b-5 border-b-transparent ml-1"
                      style={{
                        borderLeft: '10px solid transparent',
                        borderRight: '0px solid transparent',
                        borderTop: '6px solid transparent',
                        borderBottom: '6px solid transparent',
                        borderLeft: '10px solid rgb(244, 114, 182)',
                      }}
                    >
                    </div>
                    <div className="absolute w-8 h-8 border-2 border-pink-400 rounded-full opacity-0 group-hover/play:opacity-100 animate-ping-custom"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Narration text */}
            <div className="space-y-6">
              <p className="text-lg md:text-xl lg:text-2xl text-slate-100 leading-relaxed font-light text-center whitespace-pre-line group-hover:text-white transition-colors duration-300">
                {narration}
              </p>
            </div>

            {/* Animated bottom accent */}
            <div className="flex justify-center gap-2 pt-8">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-300 group-hover:from-pink-400 group-hover:to-purple-400"
                  style={{
                    width: `${16 - i * 3}px`,
                    height: '4px',
                    opacity: 0.9 - i * 0.15,
                    animation: `float ${2 + i * 0.2}s ease-in-out infinite`,
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Bottom gradient accent */}
          <div className="h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-animation" style={{ animation: 'gradient-animation 15s ease infinite' }}></div>

          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-pink-500/20 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-purple-500/20 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
    </div>
  );
};
