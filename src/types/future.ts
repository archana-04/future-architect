import type { UserProfile } from './user';

export interface FutureTimelineEvent {
  year: number;
  title: string;
  description: string;
  highlight: string;
}

export interface MentorAdvice {
  role: string;
  specialty: string;
  advice: string;
  iconKey: 'brain' | 'users' | 'rocket';
}

export interface FutureArticle {
  publication: string;
  date: string;
  headline: string;
  dek: string;
  body: string[];
  byline: string;
}

export interface AchievementCardData {
  label: string;
  value: string;
  description: string;
  iconKey: 'briefcase' | 'crown' | 'sparkles' | 'wallet';
  trend: string;
}

export interface FutureScore {
  label: string;
  value: number;
  subtitle: string;
}

export interface FutureSimulation {
  profile: UserProfile;
  summary: string;
  timeline: FutureTimelineEvent[];
  newspaper: FutureArticle;
  mentors: MentorAdvice[];
  trailer: string;
  trailerVideoUrl: string;
  achievements: AchievementCardData[];
  scores: FutureScore[];
}
