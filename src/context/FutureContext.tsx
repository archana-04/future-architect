import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { generateFutureSimulation } from '../services/simulation';
import type { FutureSimulation } from '../types/future';
import type { UserProfile } from '../types/user';

interface FutureContextValue {
  profile: UserProfile | null;
  futureData: FutureSimulation | null;
  history: FutureSimulation[];
  submitProfile: (profile: UserProfile) => FutureSimulation;
  revisitSimulation: (simulation: FutureSimulation) => void;
  clearProfile: () => void;
}

const FutureContext = createContext<FutureContextValue | undefined>(undefined);

const PROFILE_STORAGE_KEY = 'futureProfile';
const SIMULATION_STORAGE_KEY = 'futureSimulation';
const HISTORY_STORAGE_KEY = 'futureSimulationHistory';

const isUserProfile = (value: unknown): value is UserProfile => {
  if (!value || typeof value !== 'object') return false;

  const profile = value as UserProfile;
  return (
    typeof profile.name === 'string' &&
    typeof profile.age === 'number' &&
    typeof profile.currentRole === 'string' &&
    Array.isArray(profile.skills) &&
    Array.isArray(profile.goals) &&
    typeof profile.dreamCareer === 'string'
  );
};

const readStoredProfile = (): UserProfile | null => {
  if (typeof window === 'undefined') return null;

  const rawProfile = window.localStorage.getItem(PROFILE_STORAGE_KEY);
  if (!rawProfile) return null;

  try {
    const parsed = JSON.parse(rawProfile) as unknown;
    return isUserProfile(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

const readStoredSimulation = (): FutureSimulation | null => {
  if (typeof window === 'undefined') return null;

  const rawSimulation = window.localStorage.getItem(SIMULATION_STORAGE_KEY);
  if (!rawSimulation) return null;

  try {
    const parsed = JSON.parse(rawSimulation) as FutureSimulation;
    return parsed?.profile ? parsed : null;
  } catch {
    return null;
  }
};

const readStoredHistory = (): FutureSimulation[] => {
  if (typeof window === 'undefined') return [];

  const rawHistory = window.localStorage.getItem(HISTORY_STORAGE_KEY);
  if (!rawHistory) return [];

  try {
    const parsed = JSON.parse(rawHistory) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(item => {
      const simulation = item as FutureSimulation;
      return Boolean(simulation?.profile && simulation?.summary);
    });
  } catch {
    return [];
  }
};

export function FutureProvider({ children }: { children: ReactNode }) {
  const storedProfile = readStoredProfile();
  const storedSimulation = readStoredSimulation();
  const storedHistory = readStoredHistory();
  const initialProfile = storedProfile ?? storedSimulation?.profile ?? null;
  const initialFutureData = storedSimulation ?? (storedProfile ? generateFutureSimulation(storedProfile) : null);

  const [profile, setProfile] = useState<UserProfile | null>(initialProfile);
  const [futureData, setFutureData] = useState<FutureSimulation | null>(initialFutureData);
  const [history, setHistory] = useState<FutureSimulation[]>(storedHistory);

  useEffect(() => {
    if (!profile || !futureData) return;

    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    window.localStorage.setItem(SIMULATION_STORAGE_KEY, JSON.stringify(futureData));
  }, [profile, futureData]);

  useEffect(() => {
    window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const value = useMemo<FutureContextValue>(
    () => ({
      profile,
      futureData,
      history,
      submitProfile: submittedProfile => {
        const generatedFuture = generateFutureSimulation(submittedProfile);
        setProfile(submittedProfile);
        setFutureData(generatedFuture);
        setHistory(previous => {
          const next = [generatedFuture, ...previous.filter(item => JSON.stringify(item.profile) !== JSON.stringify(generatedFuture.profile))];
          return next.slice(0, 20);
        });
        console.log('Submitted Profile:', submittedProfile);
        console.log('Generated Future:', generatedFuture);
        return generatedFuture;
      },
      revisitSimulation: simulation => {
        setProfile(simulation.profile);
        setFutureData(simulation);
      },
      clearProfile: () => {
        setProfile(null);
        setFutureData(null);
        window.localStorage.removeItem(PROFILE_STORAGE_KEY);
        window.localStorage.removeItem(SIMULATION_STORAGE_KEY);
      },
    }),
    [futureData, history, profile],
  );

  return <FutureContext.Provider value={value}>{children}</FutureContext.Provider>;
}

export function useFuture() {
  const context = useContext(FutureContext);
  if (!context) {
    throw new Error('useFuture must be used within FutureProvider');
  }

  return context;
}
