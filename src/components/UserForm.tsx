import { Plus, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';
import type { UserDraftProfile, UserProfile } from '../types/user';

interface UserFormProps {
  onSubmit: (profile: UserProfile) => void;
  disabled?: boolean;
}

const INITIAL_DRAFT: UserDraftProfile = {
  name: '',
  age: '',
  currentRole: '',
  skills: [],
  dreamCareer: '',
  goals: [],
};

type FieldKey = 'name' | 'age' | 'currentRole' | 'dreamCareer';

export function UserForm({ onSubmit, disabled = false }: UserFormProps) {
  const [draft, setDraft] = useState<UserDraftProfile>(INITIAL_DRAFT);
  const [skillInput, setSkillInput] = useState('');
  const [goalInput, setGoalInput] = useState('');
  const [touched, setTouched] = useState<Record<FieldKey, boolean>>({
    name: false,
    age: false,
    currentRole: false,
    dreamCareer: false,
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const errors = useMemo(() => {
    const messages: Partial<Record<FieldKey, string>> = {};

    if (!draft.name.trim()) messages.name = 'Enter your name.';
    const parsedAge = Number(draft.age);
    if (!draft.age.trim() || Number.isNaN(parsedAge) || parsedAge < 16 || parsedAge > 100) {
      messages.age = 'Age must be between 16 and 100.';
    }
    if (!draft.currentRole.trim()) messages.currentRole = 'Enter your current role.';
    if (!draft.dreamCareer.trim()) messages.dreamCareer = 'Describe your dream career.';

    return messages;
  }, [draft]);

  const canSubmit = Object.keys(errors).length === 0 && draft.skills.length > 0 && draft.goals.length > 0;

  const showError = (field: FieldKey) => Boolean(errors[field] && (touched[field] || hasSubmitted));

  const addChip = (kind: 'skill' | 'goal') => {
    const value = kind === 'skill' ? skillInput.trim() : goalInput.trim();
    const list = kind === 'skill' ? draft.skills : draft.goals;
    if (!value || list.includes(value)) return;

    setDraft(previous => ({
      ...previous,
      [kind === 'skill' ? 'skills' : 'goals']: [...list, value],
    }));

    if (kind === 'skill') setSkillInput('');
    else setGoalInput('');
  };

  const removeChip = (kind: 'skill' | 'goal', value: string) => {
    setDraft(previous => ({
      ...previous,
      [kind === 'skill' ? 'skills' : 'goals']: previous[kind === 'skill' ? 'skills' : 'goals'].filter(item => item !== value),
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setHasSubmitted(true);
    if (!canSubmit) return;

    onSubmit({
      name: draft.name.trim(),
      age: Number(draft.age),
      currentRole: draft.currentRole.trim(),
      skills: draft.skills,
      dreamCareer: draft.dreamCareer.trim(),
      goals: draft.goals,
    });
  };

  const handleEnterToAdd = (event: KeyboardEvent<HTMLInputElement>, kind: 'skill' | 'goal') => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    addChip(kind);
  };

  return (
    <form id="profile-form" onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Name"
          required
          value={draft.name}
          placeholder="Your name"
          error={showError('name') ? errors.name : undefined}
          onBlur={() => setTouched(previous => ({ ...previous, name: true }))}
          onChange={value => setDraft(previous => ({ ...previous, name: value }))}
        />
        <Field
          label="Age"
          required
          type="number"
          value={draft.age}
          placeholder="25"
          error={showError('age') ? errors.age : undefined}
          onBlur={() => setTouched(previous => ({ ...previous, age: true }))}
          onChange={value => setDraft(previous => ({ ...previous, age: value }))}
        />
        <Field
          label="Current Role"
          required
          value={draft.currentRole}
          placeholder="Your current role"
          error={showError('currentRole') ? errors.currentRole : undefined}
          onBlur={() => setTouched(previous => ({ ...previous, currentRole: true }))}
          onChange={value => setDraft(previous => ({ ...previous, currentRole: value }))}
        />
        <Field
          label="Dream Career"
          required
          value={draft.dreamCareer}
          placeholder="Your dream career"
          error={showError('dreamCareer') ? errors.dreamCareer : undefined}
          onBlur={() => setTouched(previous => ({ ...previous, dreamCareer: true }))}
          onChange={value => setDraft(previous => ({ ...previous, dreamCareer: value }))}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChipInput
          label="Skills"
          description="Add skills that define your current momentum."
          placeholder="Add a skill"
          value={skillInput}
          onChange={setSkillInput}
          onKeyDown={event => handleEnterToAdd(event, 'skill')}
          onAdd={() => addChip('skill')}
          chips={draft.skills}
          onRemove={value => removeChip('skill', value)}
        />

        <ChipInput
          label="Goals"
          description="Add the outcomes you want future-you to reach."
          placeholder="Add a goal"
          value={goalInput}
          onChange={setGoalInput}
          onKeyDown={event => handleEnterToAdd(event, 'goal')}
          onAdd={() => addChip('goal')}
          chips={draft.goals}
          onRemove={value => removeChip('goal', value)}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-300">
        <div>
          <p className="font-semibold text-white">Demo-ready simulation</p>
          <p className="mt-1 text-slate-400">This form validates inputs, supports chip-based skills and goals, and powers the route transition to results.</p>
        </div>
        <button
          type="submit"
          disabled={disabled}
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-fuchsia-500 px-6 py-4 font-semibold text-slate-950 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
        >
          Generate My Future
        </button>
      </div>
    </form>
  );
}

interface FieldProps {
  label: string;
  required?: boolean;
  type?: 'text' | 'number';
  value: string;
  placeholder: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}

function Field({ label, required, type = 'text', value, placeholder, error, onChange, onBlur }: FieldProps) {
  return (
    <label className="space-y-2">
      <div className="flex items-center justify-between text-sm font-medium text-slate-200">
        <span>{label}</span>
        {required ? <span className="text-xs uppercase tracking-[0.25em] text-cyan-300">Required</span> : null}
      </div>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={event => onChange(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/50 focus:bg-slate-950 focus:ring-4 focus:ring-cyan-400/10"
      />
      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
    </label>
  );
}

interface ChipInputProps {
  label: string;
  description: string;
  placeholder: string;
  value: string;
  chips: string[];
  onChange: (value: string) => void;
  onAdd: () => void;
  onRemove: (value: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

function ChipInput({ label, description, placeholder, value, chips, onChange, onAdd, onRemove, onKeyDown }: ChipInputProps) {
  return (
    <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5">
      <div>
        <h3 className="text-lg font-semibold text-white">{label}</h3>
        <p className="mt-1 text-sm text-slate-400">{description}</p>
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={event => onChange(event.target.value)}
          onKeyDown={onKeyDown}
          className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-400/10"
        />
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-4 font-semibold text-cyan-200 transition hover:bg-cyan-400/20"
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {chips.length === 0 ? (
          <span className="text-sm text-slate-500">No items added yet.</span>
        ) : (
          chips.map(item => (
            <span key={item} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm text-slate-100">
              {item}
              <button type="button" onClick={() => onRemove(item)} className="text-slate-400 transition hover:text-rose-300">
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ))
        )}
      </div>
    </div>
  );
}
