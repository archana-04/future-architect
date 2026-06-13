import { Loader2, Mic, MicOff, SendHorizonal } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import type { FutureSimulation } from '../types/future';
import type { UserProfile } from '../types/user';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface WebEvidence {
  title: string;
  snippet: string;
  url: string;
}

interface SpeechRecognitionResultEvent extends Event {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: SpeechRecognitionResultEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

interface WindowWithSpeech extends Window {
  webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  SpeechRecognition?: new () => SpeechRecognitionLike;
}

interface AgentChatPanelProps {
  profile: UserProfile;
  simulation: FutureSimulation;
}

const INITIAL_PROMPT = 'Ask me follow-up questions about your future results. I can break down skills, timelines, goals, and next actions.';

export function AgentChatPanel({ profile, simulation }: AgentChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'assistant-1',
      role: 'assistant',
      content: INITIAL_PROMPT,
    },
  ]);
  const [question, setQuestion] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  const quickQuestions = useMemo(
    () => [
      `How can I become ${profile.dreamCareer} faster?`,
      'What should I prioritize in the next 90 days?',
      'Which skill gap is most important right now?',
    ],
    [profile.dreamCareer],
  );

  const submitQuestion = async (rawQuestion: string) => {
    const trimmed = rawQuestion.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
    };

    setMessages(previous => [...previous, userMessage]);
    setQuestion('');

    setIsThinking(true);
    try {
      const answerText = await generateAnswer(trimmed, profile, simulation);
      const answer: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: answerText,
      };
      setMessages(previous => [...previous, answer]);
    } catch {
      const answer: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: 'I could not fetch web context right now. Please try again in a moment.',
      };
      setMessages(previous => [...previous, answer]);
    } finally {
      setIsThinking(false);
    }
  };

  const startListening = () => {
    const speechWindow = window as WindowWithSpeech;
    const SpeechRecognitionCtor = speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) return;

    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    const recognition = new SpeechRecognitionCtor();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = event => {
      const transcript = event.results[0][0].transcript;
      setQuestion(transcript);
    };
    recognition.onerror = () => {
      setIsListening(false);
    };
    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
  };

  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-950/45 p-6 shadow-glow backdrop-blur-xl sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">Results Chat</p>
          <h3 className="mt-2 font-space text-2xl font-semibold text-white">Continue chatting with your AI future guide</h3>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-400">Live Q&A</div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {quickQuestions.map(item => (
          <button
            key={item}
            type="button"
            onClick={() => submitQuestion(item)}
            className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs text-cyan-100 transition hover:bg-cyan-400/20"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-5 max-h-72 space-y-3 overflow-y-auto pr-1">
        {messages.map(message => (
          <div
            key={message.id}
            className={`rounded-2xl border px-4 py-3 text-sm leading-7 ${
              message.role === 'assistant'
                ? 'border-cyan-400/20 bg-cyan-400/10 text-cyan-50'
                : 'border-white/10 bg-white/5 text-slate-100'
            }`}
          >
            <p className="mb-1 text-[0.7rem] uppercase tracking-[0.25em] text-slate-400">{message.role === 'assistant' ? 'Future Agent' : 'You'}</p>
            <p>{message.content}</p>
          </div>
        ))}
      </div>

      <form
        className="mt-5 flex gap-3"
        onSubmit={event => {
          event.preventDefault();
          submitQuestion(question);
        }}
      >
          <button
            type="button"
            onClick={startListening}
            disabled={isListening}
            className="inline-flex items-center gap-2 rounded-2xl border border-fuchsia-400/20 bg-fuchsia-400/10 px-4 py-3 font-semibold text-fuchsia-100 transition hover:bg-fuchsia-400/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            {isListening ? 'Listening...' : 'Listen'}
          </button>
        <input
          type="text"
          value={question}
          onChange={event => setQuestion(event.target.value)}
          placeholder="Ask about your next move..."
          className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-400/10"
        />
        <button
          type="submit"
            disabled={isThinking}
          className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
        >
            {isThinking ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendHorizonal className="h-4 w-4" />}
            {isThinking ? 'Thinking...' : 'Send'}
        </button>
      </form>
    </div>
  );
}

async function generateAnswer(question: string, profile: UserProfile, simulation: FutureSimulation) {
  const lower = question.toLowerCase();
  const firstGoal = profile.goals[0] ?? 'steady growth';
  const firstSkill = profile.skills[0] ?? 'consistency';
  const firstMilestone = simulation.timeline[0]?.title ?? 'your first milestone';
  const lastMilestone = simulation.timeline[simulation.timeline.length - 1]?.title ?? 'long-term recognition';

  const webEvidence = await fetchWebEvidence(question, profile);
  const evidenceLine = webEvidence.length
    ? `\n\nWeb signal: ${webEvidence[0].title} - ${webEvidence[0].snippet} (${webEvidence[0].url})`
    : '';

  if (lower.includes('90') || lower.includes('next') || lower.includes('plan')) {
    return `Focus the next 90 days on ${firstSkill}, ship one visible project in your current role, and map it directly to ${firstGoal}. This creates a measurable bridge to ${firstMilestone}.${evidenceLine}`;
  }

  if (lower.includes('skill') || lower.includes('gap') || lower.includes('learn')) {
    return `Your strongest leverage is ${firstSkill}. Pair it with one adjacent skill that helps in ${profile.dreamCareer}, then apply both in weekly outputs so your profile compounds faster.${evidenceLine}`;
  }

  if (lower.includes('timeline') || lower.includes('when')) {
    return `Your timeline starts at "${firstMilestone}" and builds toward "${lastMilestone}". Keep checking if monthly actions still support that arc and adjust fast when they do not.${evidenceLine}`;
  }

  if (lower.includes('mentor') || lower.includes('advice')) {
    return `${simulation.mentors[0]?.advice ?? 'Use mentor feedback to convert ambitions into weekly execution.'}${evidenceLine}`;
  }

  return `Great question. Connect your current role (${profile.currentRole}) to ${profile.dreamCareer} by proving outcomes around ${firstGoal} every month. Consistent proof is what turns this simulation into reality.${evidenceLine}`;
}

async function fetchWebEvidence(question: string, profile: UserProfile): Promise<WebEvidence[]> {
  const query = `${question} ${profile.dreamCareer} ${profile.skills.slice(0, 2).join(' ')}`.trim();
  const [duck, wiki] = await Promise.all([fetchDuckDuckGo(query), fetchWikipedia(query)]);
  return [...duck, ...wiki].slice(0, 2);
}

async function fetchDuckDuckGo(query: string): Promise<WebEvidence[]> {
  try {
    const response = await fetch(
      `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1&origin=*`,
    );
    if (!response.ok) return [];

    const json = (await response.json()) as {
      Heading?: string;
      AbstractText?: string;
      AbstractURL?: string;
    };

    if (!json.AbstractText) return [];

    return [
      {
        title: json.Heading || 'DuckDuckGo',
        snippet: json.AbstractText,
        url: json.AbstractURL || 'https://duckduckgo.com/',
      },
    ];
  } catch {
    return [];
  }
}

async function fetchWikipedia(query: string): Promise<WebEvidence[]> {
  try {
    const searchResponse = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`,
    );
    if (!searchResponse.ok) return [];

    const searchJson = (await searchResponse.json()) as {
      query?: {
        search?: Array<{
          title: string;
          snippet: string;
        }>;
      };
    };

    const first = searchJson.query?.search?.[0];
    if (!first) return [];

    return [
      {
        title: first.title,
        snippet: stripHtml(first.snippet),
        url: `https://en.wikipedia.org/wiki/${encodeURIComponent(first.title.replace(/\s+/g, '_'))}`,
      },
    ];
  } catch {
    return [];
  }
}

function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, '');
}
