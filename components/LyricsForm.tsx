import React, { useState, useRef } from 'react';
import type { 
  LyricsFormProps, StylePreset, RhymeComplexity, StorytellingDepth, EmotionalTone,
  VocabularyLevel, AdLibIntensity, RegionalFlavor, EnergyLevel,
  AlliterationLevel, PunchlineDensity, MetaphorDensity, SlangIntensity, InternalRhymeLevel
} from '../types';

const styles: { id: StylePreset; label: string; description: string; icon: string }[] = [
  { id: 'ERB', label: 'ERB Battle', description: 'Reference-heavy.', icon: '⚔️' },
  { id: 'OLD_SCHOOL', label: 'Old School', description: 'Classic Boom-Bap.', icon: '📻' },
  { id: 'MODERN_TRAP', label: 'Modern Trap', description: 'Triplet Flow.', icon: '💎' },
  { id: 'UK_DRILL', label: 'UK Drill', description: 'Aggressive Slides.', icon: '💂' },
  { id: 'CONSCIOUS', label: 'Conscious', description: 'Social Truths.', icon: '👁️' },
  { id: 'CHOPPER', label: 'Chopper', description: 'Rapid Fire.', icon: '🚁' },
  { id: 'G_FUNK', label: 'G-Funk', description: 'West Coast Funk.', icon: '🌴' },
  { id: 'GRIME', label: 'Grime', description: '140 BPM UK.', icon: '🔌' },
  { id: 'EMO_RAP', label: 'Emo Rap', description: 'Melancholic.', icon: '💔' },
  { id: 'LOFI_HIPHOP', label: 'Lofi / Jazz', description: 'Relaxed Wit.', icon: '☕' },
  { id: 'ICP', label: 'Dark Carnival', description: 'Horrorcore.', icon: '🤡' },
  { id: 'SOUTHERN_GOSICK', label: 'Crunk/South', description: 'Club Hype.', icon: '🐊' },
  { id: 'BOOM_BAP', label: '90s Boom Bap', description: 'Classic 90s.', icon: '📼' },
  { id: 'MUMBLE_RAP', label: 'Melodic/Mumble', description: 'Vibe-focused.', icon: '🍬' },
  { id: 'HORRORCORE', label: 'Horrorcore', description: 'Dark & Macabre.', icon: '🔪' },
  { id: 'JAZZ_RAP', label: 'Jazz Rap', description: 'Smooth & Sophisticated.', icon: '🎷' },
  { id: 'LATIN_TRAP', label: 'Latin Trap', description: 'Reggaeton Fusion.', icon: '🔥' },
  { id: 'HYPHY', label: 'Hyphy', description: 'Bay Area Energy.', icon: '🌉' },
  { id: 'CLOUD_RAP', label: 'Cloud Rap', description: 'Ethereal & Hazy.', icon: '☁️' },
  { id: 'TRAP_METAL', label: 'Trap Metal', description: 'Aggressive & Distorted.', icon: '🤘' },
  { id: 'SHUFFLE_RAP', label: 'Shuffle Rap', description: 'Dance-focused Bounce.', icon: '💃' },
  { id: 'MELODIC_GRIME', label: 'Melodic Grime', description: 'UK Energy + Hooks.', icon: '🇬🇧' },
  { id: 'JAPANESE_HIPHOP', label: 'Japanese Hip Hop', description: 'Precise & Futuristic.', icon: '🇯🇵' }
];

const structures = [
  { label: 'Intro', prefix: 'Rewrite a cinematic [Intro] for: ', icon: '🎬' },
  { label: 'Verse 1', prefix: 'Regenerate [Verse 1] with heavy wordplay for: ', icon: '🎤' },
  { label: 'Chorus', prefix: 'Draft an anthemic [Chorus] for: ', icon: '🎡' },
  { label: 'Verse 2', prefix: 'Regenerate [Verse 2] with deep story for: ', icon: '📜' },
  { label: 'Bridge', prefix: 'Write a mood-shifting [Bridge] for: ', icon: '🌉' },
  { label: 'Verse 3', prefix: 'Compose a high-intensity [Verse 3] for: ', icon: '🧨' },
  { label: 'Outro', prefix: 'Draft a fading [Outro] for: ', icon: '🏁' },
];

const Segment: React.FC<{
  label: string;
  options: { value: string; label: string }[];
  current: string;
  onChange: (val: any) => void;
  disabled?: boolean;
}> = ({ label, options, current, onChange, disabled }) => (
  <div className="space-y-1">
    <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest pl-1">{label}</span>
    <div className="flex bg-black/40 p-1 rounded-xl border border-gray-800">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          disabled={disabled}
          className={`flex-1 py-1 rounded-lg text-[10px] font-black transition-all ${
            current === o.value ? 'bg-cyan-600 text-white' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  </div>
);

const LyricsForm: React.FC<LyricsFormProps> = ({ 
  idea, setIdea, isExplicit, setIsExplicit, selectedPreset, setSelectedPreset,
  rhymeComplexity, setRhymeComplexity, storytellingDepth, setStorytellingDepth,
  emotionalTone, setEmotionalTone, vocabularyLevel, setVocabularyLevel,
  adLibIntensity, setAdLibIntensity, regionalFlavor, setRegionalFlavor,
  energyLevel, setEnergyLevel, alliterationLevel, setAlliterationLevel,
  punchlineDensity, setPunchlineDensity, metaphorDensity, setMetaphorDensity,
  slangIntensity, setSlangIntensity, internalRhymeLevel, setInternalRhymeLevel,
  artistReference, setArtistReference,
  onSubmit, isLoading 
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [shake, setShake] = useState(false);

  const applyStructure = (prefix: string) => {
    const cleanIdea = idea.replace(/^(Rewrite|Regenerate|Draft|Compose|Write).+?for: /i, '').trim();
    setIdea(`${prefix}${cleanIdea}`);
  };

  const handleLaunch = () => {
    if (!idea.trim()) {
      setShake(true);
      textareaRef.current?.focus();
      setTimeout(() => setShake(false), 500);
      return; // Still trigger onSubmit in App to show error, but focus here first
    }
    onSubmit();
  };

  return (
    <div className="bg-gray-900/40 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-gray-800/60 shadow-[0_0_100px_rgba(0,0,0,0.8)] space-y-10">
      {/* 1. Concept & Wizard */}
      <div className={`space-y-4 transition-transform ${shake ? 'translate-x-2' : ''}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <label className="text-xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center text-sm shadow-[0_0_15px_rgba(6,182,212,0.4)]">1</span>
            The Blueprint
          </label>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest mr-1">Wizard:</span>
            {structures.map((s) => (
              <button
                key={s.label}
                onClick={() => applyStructure(s.prefix)}
                disabled={isLoading}
                className="px-3 py-1.5 rounded-lg bg-gray-800/40 border border-gray-700 text-[9px] font-black text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all whitespace-nowrap active:scale-95"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
        <textarea
          ref={textareaRef}
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Describe your track idea here to unlock the Launch button..."
          className={`w-full h-36 p-6 bg-black/60 border rounded-3xl text-white font-mono text-sm transition-all resize-none shadow-inner outline-none placeholder-gray-600 ${shake ? 'border-red-500/50 ring-2 ring-red-500/10' : 'border-gray-800 focus:border-cyan-500/40 focus:ring-4 focus:ring-cyan-500/5'}`}
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* 2. Style Core */}
        <div className="lg:col-span-5 space-y-6">
          <label className="text-xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center text-sm shadow-[0_0_15px_rgba(6,182,212,0.4)]">2</span>
            Style Core
          </label>
          <div className="space-y-4">
            <div className="bg-black/60 p-4 rounded-2xl border border-gray-800 space-y-2 group focus-within:border-cyan-500/50 transition-colors">
              <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest pl-1">Artist Flow Reference</span>
              <input
                type="text"
                value={artistReference}
                onChange={(e) => setArtistReference(e.target.value)}
                placeholder="Mimic cadence (e.g. Kendrick, Nas)..."
                className="w-full bg-transparent border-none text-cyan-400 text-sm focus:ring-0 outline-none placeholder-gray-800 font-bold"
                disabled={isLoading}
              />
            </div>
            <div className="grid grid-cols-1 gap-2 max-h-[360px] overflow-y-auto pr-2 no-scrollbar border-t border-gray-800/40 pt-4">
              {styles.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedPreset(s.id)}
                  disabled={isLoading}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left group ${
                    selectedPreset === s.id 
                      ? 'bg-cyan-900/20 border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.1)] translate-x-1' 
                      : 'bg-black/20 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <span className={`text-3xl transition-transform duration-300 group-hover:scale-110 ${selectedPreset === s.id ? 'grayscale-0' : 'grayscale'}`}>{s.icon}</span>
                  <div>
                    <div className={`text-xs font-black uppercase tracking-tight ${selectedPreset === s.id ? 'text-cyan-400' : 'text-white'}`}>{s.label}</div>
                    <div className="text-[10px] text-gray-500 font-bold">{s.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Refinement */}
        <div className="lg:col-span-7 space-y-8">
          <div className="flex justify-between items-end">
            <label className="text-xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center text-sm shadow-[0_0_15px_rgba(6,182,212,0.4)]">3</span>
              Technical Detail
            </label>
            <button 
              onClick={() => setShowAdvanced(!showAdvanced)} 
              className="text-[10px] font-black uppercase text-cyan-500 border-b border-cyan-500/30 pb-0.5 tracking-widest"
              disabled={isLoading}
            >
              {showAdvanced ? 'Standard View' : 'Full Technical Controls'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-5">
              <Segment label="Rhyme Complexity" current={rhymeComplexity} onChange={setRhymeComplexity} disabled={isLoading} options={[{value:'SIMPLE',label:'Basic'},{value:'COMPLEX',label:'Multi'},{value:'GOD_TIER',label:'Elite'}]} />
              <Segment label="Punchline Density" current={punchlineDensity} onChange={setPunchlineDensity} disabled={isLoading} options={[{value:'SPARSE',label:'Low'},{value:'BALANCED',label:'Med'},{value:'LETHAL',label:'Max'}]} />
              <Segment label="Alliteration" current={alliterationLevel} onChange={setAlliterationLevel} disabled={isLoading} options={[{value:'NONE',label:'Off'},{value:'SUBTLE',label:'Low'},{value:'HEAVY',label:'High'}]} />
            </div>
            <div className="space-y-5">
              <Segment label="Story Flow" current={storytellingDepth} onChange={setStorytellingDepth} disabled={isLoading} options={[{value:'LINEAR',label:'Clear'},{value:'FRAGMENTED',label:'Vibe'},{value:'CONVOLUTED',label:'Meta'}]} />
              <Segment label="Emotional Tone" current={emotionalTone} onChange={setEmotionalTone} disabled={isLoading} options={[{value:'AGGRESSIVE',label:'Aggro'},{value:'INTROSPECTIVE',label:'Deep'},{value:'HUMOROUS',label:'Witty'},{value:'DARK',label:'Dark'},{value:'TRIUMPHANT',label:'Win'},{value:'MELANCHOLIC',label:'Sad'},{value:'BOASTFUL',label:'Flex'}]} />
              <Segment label="Energy Level" current={energyLevel} onChange={setEnergyLevel} disabled={isLoading} options={[{value:'CHILL',label:'Chill'},{value:'MODERATE',label:'Mid'},{value:'HIGH_ENERGY',label:'Hype'},{value:'FRENZIED',label:'Wild'}]} />
            </div>
          </div>

          {showAdvanced && (
            <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 border-t border-gray-800/40 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="space-y-5">
                <Segment label="Vocabulary" current={vocabularyLevel} onChange={setVocabularyLevel} disabled={isLoading} options={[{value:'STREET',label:'Street'},{value:'BALANCED',label:'Mid'},{value:'LITERARY',label:'Scholar'},{value:'SCIENTIFIC',label:'Nerd'}]} />
                <Segment label="Ad-Lib Frequency" current={adLibIntensity} onChange={setAdLibIntensity} disabled={isLoading} options={[{value:'NONE',label:'Dry'},{value:'SPARSE',label:'Med'},{value:'HEAVY',label:'Loud'},{value:'CHAOTIC',label:'Wild'}]} />
                <Segment label="Metaphor Density" current={metaphorDensity} onChange={setMetaphorDensity} disabled={isLoading} options={[{value:'NONE',label:'None'},{value:'SUBTLE',label:'Low'},{value:'HEAVY',label:'High'},{value:'CRYPTIC',label:'Deep'}]} />
              </div>
              <div className="space-y-5">
                <Segment label="Regional Flavor" current={regionalFlavor} onChange={setRegionalFlavor} disabled={isLoading} options={[{value:'GLOBAL',label:'Std'},{value:'EAST_COAST',label:'East'},{value:'WEST_COAST',label:'West'},{value:'SOUTHERN',label:'South'},{value:'UK',label:'UK'},{value:'MIDWEST',label:'MidW'},{value:'WEST_INDIES',label:'WI'}]} />
                <Segment label="Slang Intensity" current={slangIntensity} onChange={setSlangIntensity} disabled={isLoading} options={[{value:'NONE',label:'None'},{value:'MODERATE',label:'Mid'},{value:'HEAVY',label:'Max'}]} />
                <Segment label="Internal Rhyme" current={internalRhymeLevel} onChange={setInternalRhymeLevel} disabled={isLoading} options={[{value:'NONE',label:'None'},{value:'SUBTLE',label:'Low'},{value:'HEAVY',label:'High'}]} />
                <div className="flex items-center justify-between p-3.5 bg-black/40 rounded-2xl border border-gray-800">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Explicit Logic</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={isExplicit} 
                    onChange={() => setIsExplicit(!isExplicit)} 
                    disabled={isLoading}
                    className="w-6 h-6 rounded-lg border-gray-800 bg-gray-950 text-cyan-600 focus:ring-0 cursor-pointer transition-all" 
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleLaunch}
        disabled={isLoading}
        className={`group relative w-full py-6 bg-gradient-to-br from-cyan-600 via-cyan-500 to-blue-700 text-white font-black rounded-3xl shadow-[0_20px_60px_-15px_rgba(6,182,212,0.5)] hover:scale-[1.01] active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale uppercase tracking-[0.5em] text-2xl overflow-hidden cursor-pointer ${isLoading ? 'cursor-not-allowed' : ''}`}
      >
        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
        <span className="relative z-10 flex items-center justify-center gap-4">
          {isLoading ? (
            <>
              <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              PROCESSING...
            </>
          ) : (
            <>
              LAUNCH
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </>
          )}
        </span>
      </button>
    </div>
  );
};

export default LyricsForm;
