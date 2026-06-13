import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { generateFutureSimulation } from '../services/simulation';
import type { FutureSimulation } from '../types/future';
import type { UserProfile } from '../types/user';

interface FutureContextValue {
  profile: UserProfile | null;
  futureData: FutureSimulation | null;
  submitProfile: (profile: UserProfile) => FutureSimulation;
  clearProfile: () => void;
}

const FutureContext = createContext<FutureContextValue | undefined>(undefined);

const PROFILE_STORAGE_KEY = 'futureProfile';
const SIMULATION_STORAGE_KEY = 'futureSimulation';

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

export function FutureProvider({ children }: { children: ReactNode }) {
  const storedProfile = readStoredProfile();
  const storedSimulation = readStoredSimulation();
  const initialProfile = storedProfile ?? storedSimulation?.profile ?? null;
  const initialFutureData = storedSimulation ?? (storedProfile ? generateFutureSimulation(storedProfile) : null);

  const [profile, setProfile] = useState<UserProfile | null>(initialProfile);
  const [futureData, setFutureData] = useState<FutureSimulation | null>(initialFutureData);

  useEffect(() => {
    if (!profile || !futureData) return;

    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    window.localStorage.setItem(SIMULATION_STORAGE_KEY, JSON.stringify(futureData));
  }, [profile, futureData]);

  const value = useMemo<FutureContextValue>(
    () => ({
      profile,
      futureData,
      submitProfile: submittedProfile => {
        const generatedFuture = generateFutureSimulation(submittedProfile);
        setProfile(submittedProfile);
        setFutureData(generatedFuture);
        console.log('Submitted Profile:', submittedProfile);
        console.log('Generated Future:', generatedFuture);
        return generatedFuture;
      },
      clearProfile: () => {
        setProfile(null);
        setFutureData(null);
        window.localStorage.removeItem(PROFILE_STORAGE_KEY);
        window.localStorage.removeItem(SIMULATION_STORAGE_KEY);
      },
    }),
    [futureData, profile],
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
