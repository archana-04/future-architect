import type { FutureSimulation } from '../types/future';
import type { UserProfile } from '../types/user';

const normalize = (value: string, fallback: string) => value.trim() || fallback;

const titleCase = (value: string) =>
  value
    .split(/\s+/)
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

const listText = (items: string[]) => {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;

  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
};

const normalizeList = (items: string[]) => items.map(item => item.trim()).filter(Boolean);

const themeFromProfile = (profile: UserProfile) => {
  const combined = `${profile.currentRole} ${profile.dreamCareer} ${profile.skills.join(' ')} ${profile.goals.join(' ')}`.toLowerCase();

  if (combined.includes('cloud')) return 'cloud';
  if (combined.includes('ai') || combined.includes('machine learning') || combined.includes('ml')) return 'ai';
  if (combined.includes('startup') || combined.includes('founder') || combined.includes('entrepreneur')) return 'startup';
  if (combined.includes('data')) return 'data';
  return 'general';
};

const pickTopSkill = (skills: string[]) => normalize(skills[0] ?? '', 'curiosity');
const pickSecondSkill = (skills: string[]) => normalize(skills[1] ?? skills[0] ?? '', 'adaptability');
const pickGoal = (goals: string[]) => normalize(goals[0] ?? '', 'meaningful impact');
const pickSecondGoal = (goals: string[]) => normalize(goals[1] ?? goals[0] ?? '', 'long-term growth');

export const generateFutureSimulation = (profile: UserProfile): FutureSimulation => {
  const normalizedProfile: UserProfile = {
    name: normalize(profile.name, 'You'),
    age: profile.age,
    currentRole: normalize(profile.currentRole, 'Engineer'),
    skills: normalizeList(profile.skills),
    dreamCareer: normalize(profile.dreamCareer, 'Future Leader'),
    goals: normalizeList(profile.goals),
  };

  const name = normalizedProfile.name;
  const currentRole = normalizedProfile.currentRole;
  const dreamCareer = normalizedProfile.dreamCareer;
  const skills = normalizedProfile.skills;
  const goals = normalizedProfile.goals;
  const theme = themeFromProfile(normalizedProfile);
  const topSkill = titleCase(pickTopSkill(skills));
  const secondSkill = titleCase(pickSecondSkill(skills));
  const goalOne = titleCase(pickGoal(goals));
  const goalTwo = titleCase(pickSecondGoal(goals));
  const skillsText = listText(skills);
  const goalsText = listText(goals);
  const roleLower = currentRole.toLowerCase();
  const dreamCareerLower = dreamCareer.toLowerCase();
  const focus =
    theme === 'cloud' ? 'cloud architecture' : theme === 'ai' ? 'applied AI' : theme === 'startup' ? 'venture building' : theme === 'data' ? 'data systems' : 'career growth';

  const timeline = [
    {
      year: 2027,
      title: `Built a ${titleCase(focus)} Foundation`,
      description: `${name} turned ${roleLower} experience into visible progress by using ${topSkill} to solve problems that mattered.`,
      highlight: `Momentum started with ${topSkill} and a clear next step toward ${goalOne}.`,
    },
    {
      year: 2029,
      title:
        theme === 'cloud'
          ? 'Led a Cloud Modernization Program'
          : theme === 'ai'
            ? 'Shipped AI-Driven Product Work'
            : theme === 'startup'
              ? 'Validated a New Venture Idea'
              : `Expanded into ${titleCase(focus)} Leadership`,
      description:
        theme === 'cloud'
          ? `The path to ${dreamCareerLower} accelerated as ${secondSkill} helped design reliable systems for scale.`
          : theme === 'ai'
            ? `${name} used ${skillsText || topSkill} to move from experiments to real product impact.`
            : theme === 'startup'
              ? `The future began to look entrepreneurial as ${goalsText || goalOne} became a practical roadmap.`
              : `The role evolved into broader ownership, with ${secondSkill} supporting larger decisions and team influence.`,
      highlight: `The work started to shape the way others viewed ${name}.`,
    },
    {
      year: 2032,
      title: `Became ${titleCase(dreamCareer)}`,
      description: `${name} reached a new level of influence by translating ${skillsText || topSkill} into durable outcomes across teams and products.`,
      highlight: `The move from current role to dream career became visible and credible.`,
    },
    {
      year: 2035,
      title:
        theme === 'startup'
          ? 'Scaled a Founder-Led Company'
          : theme === 'cloud'
            ? 'Set the Standard for Cloud Systems'
            : theme === 'ai'
              ? 'Directed an Applied AI Portfolio'
              : `Scaled Impact Around ${goalOne}`,
      description:
        theme === 'cloud'
          ? `Mentoring and architecture work made ${name} a trusted voice in cloud transformation and long-term reliability.`
          : theme === 'ai'
            ? `The focus shifted from individual delivery to AI strategy, product direction, and team-wide leverage.`
            : theme === 'startup'
              ? `A real venture story emerged around ${goalOne.toLowerCase()} and ${goalTwo.toLowerCase()}.`
              : `The career story widened from execution to repeatable ownership and stronger leadership signal.`,
      highlight: `The results now reflected both ambition and discipline.`,
    },
    {
      year: 2040,
      title: `Recognized as a ${titleCase(focus)} Leader`,
      description: `${name} became known for combining ${skillsText || topSkill} with a commitment to ${goalsText || goalOne}.`,
      highlight: `${name} is now the person others cite when discussing practical ambition that actually compounds.`,
    },
  ];

  return {
    profile: normalizedProfile,
    summary: `${name} evolves from a ${roleLower} into a ${dreamCareerLower} by combining ${skillsText || 'curiosity and resilience'} with a focus on ${goalsText || goalOne}. The simulation is fully derived from the submitted profile and can later be swapped for an AI API call.`,
    timeline,
    newspaper: {
      publication: 'THE FUTURE TIMES',
      date: 'March 10, 2040',
      headline: `${name} Charts a Path Toward ${titleCase(dreamCareer)}`,
      dek: `${name} transformed a ${roleLower} background into a ${dreamCareerLower} journey, pairing ${skillsText || topSkill} with a clear focus on ${goalsText || goalOne}.`,
      body: [
        `${name} first gained attention for shipping practical systems that improved reliability, speed, and confidence across teams.`,
        `As the work expanded, so did the ambition. Guided by ${skillsText || topSkill}, ${name} became the kind of leader organizations trust with high-stakes transformation programs.`,
        `By 2040, the combination of ${roleLower}, ${dreamCareerLower}, and a clear set of goals has made ${name} a reference point for ambitious professionals worldwide.`,
      ],
      byline: 'By Staff Correspondent, Future Business Desk',
    },
    mentors: [
      {
        role: 'Tech Mentor',
        specialty: `Systems design for ${titleCase(focus)}`,
        advice: `Use ${topSkill} as the anchor skill and keep learning toward ${dreamCareerLower}. Every technical choice should make ${goalOne.toLowerCase()} easier to reach.`,
        iconKey: 'brain',
      },
      {
        role: 'Leadership Mentor',
        specialty: 'Influence and team building',
        advice: `Lean on ${secondSkill} to turn individual wins into team outcomes, especially while you pursue ${goalOne.toLowerCase()}.`,
        iconKey: 'users',
      },
      {
        role: 'Startup Mentor',
        specialty: 'Venture creation and market fit',
        advice: `Convert ${goalsText || goalOne} into a testable roadmap, then use ${skillsText || topSkill} to prove the idea fast.`,
        iconKey: 'rocket',
      },
    ],
    trailer: `${name} begins as a ${roleLower} with a vision. With ${skillsText || topSkill} as the engine and ${goalsText || goalOne} as the destination, the story builds toward becoming a ${dreamCareerLower} who leaves a lasting mark.`,
    achievements: [
      {
        label: 'Career Growth',
        value: `${Math.min(99, 70 + skills.length * 5 + goals.length * 4)}%`,
        description: `A steady climb from ${roleLower} execution to a future shaped by ${dreamCareerLower}.`,
        iconKey: 'briefcase',
        trend: `Built from ${skills.length} skills`,
      },
      {
        label: 'Leadership Score',
        value: `${Math.min(99, 68 + goals.length * 7 + (theme === 'cloud' ? 4 : 2))}%`,
        description: `Leadership grows as the profile keeps ${goalOne.toLowerCase()} in view.`,
        iconKey: 'crown',
        trend: `Driven by ${goals.length} goals`,
      },
      {
        label: 'Innovation Impact',
        value: `${Math.min(99, 72 + skills.length * 5 + (theme === 'ai' ? 5 : 0))}%`,
        description: `Ideas gain leverage when ${skillsText || topSkill} is tied to concrete outcomes.`,
        iconKey: 'sparkles',
        trend: `Shaped by ${titleCase(focus)}`,
      },
      {
        label: 'Future Net Worth Estimate',
        value: `$${(profile.age * 0.48 + skills.length * 1.6 + goals.length * 2.1).toFixed(1)}M`,
        description: `A directional estimate based on the scope of the submitted profile and the ambition it implies.`,
        iconKey: 'wallet',
        trend: 'Projected by 2040',
      },
    ],
    scores: [
      { label: 'Career Success', value: Math.min(99, 70 + skills.length * 6), subtitle: `${currentRole} to ${dreamCareer}` },
      { label: 'Innovation', value: Math.min(99, 68 + skills.length * 7), subtitle: `${skillsText || topSkill} applied to real outcomes` },
      { label: 'Leadership', value: Math.min(99, 66 + goals.length * 8), subtitle: `${goalOne} guiding leadership growth` },
      { label: 'Influence', value: Math.min(99, 64 + goals.length * 7), subtitle: 'Growing through repeated visibility and trust' },
    ],
  };
};
