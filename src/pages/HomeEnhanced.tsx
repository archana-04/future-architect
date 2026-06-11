import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { LoadingScreen } from '../components/LoadingScreen';
import { MultiStepFormWizard, FormStep } from '../components/MultiStepFormWizard';
import { FadeIn, SlideIn } from '../components/FormAnimations';
import { useToast } from '../context/ToastContext';
import { UserProfile } from '../types/user';

const INITIAL_PROFILE: UserProfile = {
  name: '',
  age: 25,
  currentRole: '',
  skills: [],
  dreamCareer: '',
  personalGoals: [],
};

export const HomeEnhanced: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [skillInput, setSkillInput] = useState('');
  const [goalInput, setGoalInput] = useState('');

  // Step 1: Personal Information
  const personalInfoValid = profile.name.trim() !== '' && profile.age >= 16 && profile.age <= 100;

  // Step 2: Current Role
  const currentRoleValid = profile.currentRole.trim() !== '';

  // Step 3: Skills
  const skillsValid = profile.skills.length > 0;

  // Step 4: Dream Career
  const dreamCareerValid = profile.dreamCareer.trim() !== '';

  // Step 5: Personal Goals
  const goalsValid = profile.personalGoals.length > 0;

  const formSteps: FormStep[] = [
    {
      id: 'personal-info',
      title: 'Personal Information',
      description: 'Let\'s start with your basic information',
      isValid: personalInfoValid,
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Name *</label>
            <input
              type="text"
              value={profile.name}
              onChange={e => setProfile(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your name"
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Age *</label>
            <input
              type="number"
              min="16"
              max="100"
              value={profile.age}
              onChange={e => setProfile(prev => ({ ...prev, age: parseInt(e.target.value) }))}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
      ),
    },
    {
      id: 'current-role',
      title: 'Current Role',
      description: 'What\'s your current position?',
      isValid: currentRoleValid,
      content: (
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">Current Role *</label>
          <input
            type="text"
            value={profile.currentRole}
            onChange={e => setProfile(prev => ({ ...prev, currentRole: e.target.value }))}
            placeholder="e.g., Software Engineer, Designer, Product Manager"
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      ),
    },
    {
      id: 'skills',
      title: 'Your Skills',
      description: 'What are you good at?',
      isValid: skillsValid,
      content: (
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={skillInput}
              onChange={e => setSkillInput(e.target.value)}
              onKeyPress={e => {
                if (e.key === 'Enter' && skillInput.trim() && !profile.skills.includes(skillInput.trim())) {
                  e.preventDefault();
                  setProfile(prev => ({
                    ...prev,
                    skills: [...prev.skills, skillInput.trim()],
                  }));
                  setSkillInput('');
                  addToast('Skill added!', 'success', 2000);
                }
              }}
              placeholder="Add a skill (e.g., React, Leadership)"
              className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
            <button
              onClick={() => {
                if (skillInput.trim() && !profile.skills.includes(skillInput.trim())) {
                  setProfile(prev => ({
                    ...prev,
                    skills: [...prev.skills, skillInput.trim()],
                  }));
                  setSkillInput('');
                  addToast('Skill added!', 'success', 2000);
                }
              }}
              className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              Add
            </button>
          </div>

          {profile.skills.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm text-slate-400">Added skills ({profile.skills.length}):</p>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map(skill => (
                  <div
                    key={skill}
                    className="px-3 py-1 bg-blue-500/20 border border-blue-500/50 text-blue-300 rounded-full text-sm flex items-center gap-2 group hover:bg-blue-500/30 transition-all"
                  >
                    {skill}
                    <button
                      onClick={() =>
                        setProfile(prev => ({
                          ...prev,
                          skills: prev.skills.filter(s => s !== skill),
                        }))
                      }
                      className="text-blue-300 hover:text-red-400 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'dream-career',
      title: 'Dream Career',
      description: 'What\'s your ultimate goal?',
      isValid: dreamCareerValid,
      content: (
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            What\'s your dream career? *
          </label>
          <textarea
            value={profile.dreamCareer}
            onChange={e => setProfile(prev => ({ ...prev, dreamCareer: e.target.value }))}
            placeholder="e.g., AI Innovator, Tech Leader, Entrepreneur"
            rows={3}
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
          />
        </div>
      ),
    },
    {
      id: 'personal-goals',
      title: 'Personal Goals',
      description: 'What matters most to you?',
      isValid: goalsValid,
      content: (
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={goalInput}
              onChange={e => setGoalInput(e.target.value)}
              onKeyPress={e => {
                if (e.key === 'Enter' && goalInput.trim() && !profile.personalGoals.includes(goalInput.trim())) {
                  e.preventDefault();
                  setProfile(prev => ({
                    ...prev,
                    personalGoals: [...prev.personalGoals, goalInput.trim()],
                  }));
                  setGoalInput('');
                  addToast('Goal added!', 'success', 2000);
                }
              }}
              placeholder="Add a personal goal"
              className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
            <button
              onClick={() => {
                if (goalInput.trim() && !profile.personalGoals.includes(goalInput.trim())) {
                  setProfile(prev => ({
                    ...prev,
                    personalGoals: [...prev.personalGoals, goalInput.trim()],
                  }));
                  setGoalInput('');
                  addToast('Goal added!', 'success', 2000);
                }
              }}
              className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              Add
            </button>
          </div>

          {profile.personalGoals.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm text-slate-400">Personal Goals ({profile.personalGoals.length}):</p>
              <div className="flex flex-wrap gap-2">
                {profile.personalGoals.map(goal => (
                  <div
                    key={goal}
                    className="px-3 py-1 bg-purple-500/20 border border-purple-500/50 text-purple-300 rounded-full text-sm flex items-center gap-2 hover:bg-purple-500/30 transition-all"
                  >
                    {goal}
                    <button
                      onClick={() =>
                        setProfile(prev => ({
                          ...prev,
                          personalGoals: prev.personalGoals.filter(g => g !== goal),
                        }))
                      }
                      className="text-purple-300 hover:text-red-400 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ),
    },
  ];

  const handleFormComplete = async () => {
    setIsLoading(true);
    addToast('Generating your future...', 'info');

    // Simulate API processing for 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));

    localStorage.setItem('userProfile', JSON.stringify(profile));
    addToast('Future generated successfully!', 'success', 2000);
    navigate('/results');
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingScreen />}

      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <FadeIn show={true} delay={0}>
            <div className="text-center space-y-6 mb-16">
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl opacity-75 animate-pulse"></div>
                  <div className="relative w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center border-2 border-slate-700">
                    <Sparkles className="w-12 h-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-bounce" />
                  </div>
                </div>
              </div>

              <h1 className="text-5xl md:text-6xl font-black leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  Future Me AI
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                See the story of who you could become.
              </p>
            </div>
          </FadeIn>

          {/* Form Section */}
          <SlideIn show={true} direction="up" delay={200}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>

              <div className="relative bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-8 md:p-12 hover:border-blue-500/50 transition-all duration-300">
                <MultiStepFormWizard
                  steps={formSteps}
                  onComplete={handleFormComplete}
                  showProgressBar={true}
                />
              </div>
            </div>
          </SlideIn>
        </div>

        {/* Floating background elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-4000"></div>
        </div>
      </main>
    </>
  );
};
