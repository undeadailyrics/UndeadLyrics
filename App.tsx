import React, { useState, useCallback, useRef } from 'react';
import Header from './components/Header';
import LyricsForm from './components/LyricsForm';
import LyricsDisplay from './components/LyricsDisplay';
import { generateLyrics, generateAudio } from './services/geminiService';
import { 
  StylePreset, RhymeComplexity, StorytellingDepth, EmotionalTone, 
  VocabularyLevel, AdLibIntensity, RegionalFlavor, EnergyLevel,
  AlliterationLevel, PunchlineDensity, MetaphorDensity, SlangIntensity, InternalRhymeLevel
} from './types';

const App: React.FC = () => {
  const [idea, setIdea] = useState<string>('');
  const [isExplicit, setIsExplicit] = useState<boolean>(false);
  const [selectedPreset, setSelectedPreset] = useState<StylePreset>('ERB');

  // Core Technical Controls
  const [rhymeComplexity, setRhymeComplexity] = useState<RhymeComplexity>('COMPLEX');
  const [storytellingDepth, setStorytellingDepth] = useState<StorytellingDepth>('LINEAR');
  const [emotionalTone, setEmotionalTone] = useState<EmotionalTone>('AGGRESSIVE');
  const [vocabularyLevel, setVocabularyLevel] = useState<VocabularyLevel>('BALANCED');
  const [adLibIntensity, setAdLibIntensity] = useState<AdLibIntensity>('SPARSE');
  const [regionalFlavor, setRegionalFlavor] = useState<RegionalFlavor>('GLOBAL');
  const [energyLevel, setEnergyLevel] = useState<EnergyLevel>('MODERATE');
  
  // Stylistic Devices
  const [alliterationLevel, setAlliterationLevel] = useState<AlliterationLevel>('SUBTLE');
  const [punchlineDensity, setPunchlineDensity] = useState<PunchlineDensity>('BALANCED');
  const [metaphorDensity, setMetaphorDensity] = useState<MetaphorDensity>('SUBTLE');
  const [slangIntensity, setSlangIntensity] = useState<SlangIntensity>('MODERATE');
  const [internalRhymeLevel, setInternalRhymeLevel] = useState<InternalRhymeLevel>('SUBTLE');
  const [artistReference, setArtistReference] = useState<string>('');

  const [lyrics, setLyrics] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Audio State
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isAudioLoading, setIsAudioLoading] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState<number>(0);

  // Ref for auto-scrolling
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleGenerateLyrics = useCallback(async () => {
    if (!idea.trim()) {
      setError('Please enter an idea for your lyrics first.');
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return;
    }

    setIsLoading(true);
    setError(null);
    setLyrics('');
    
    setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    try {
      const result = await generateLyrics({
        idea,
        isExplicit,
        preset: selectedPreset,
        rhymeComplexity,
        storytellingDepth,
        emotionalTone,
        vocabularyLevel,
        adLibIntensity,
        regionalFlavor,
        energyLevel,
        alliterationLevel,
        punchlineDensity,
        metaphorDensity,
        slangIntensity,
        internalRhymeLevel,
        artistReference
      });
      setLyrics(result);
      setAudioUrl(null);
      setAudioError(null);
    } catch (err: any) {
      const errorMsg = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, [idea, isExplicit, selectedPreset, rhymeComplexity, storytellingDepth, emotionalTone, vocabularyLevel, adLibIntensity, regionalFlavor, energyLevel, alliterationLevel, punchlineDensity, metaphorDensity, slangIntensity, internalRhymeLevel, artistReference]);

  const handleGenerateAudio = useCallback(async () => {
    if (!lyrics) return;
    setIsAudioLoading(true);
    setAudioError(null);
    setAudioProgress(0);
    try {
      const url = await generateAudio(lyrics, selectedPreset, (p) => setAudioProgress(p));
      setAudioUrl(url);
    } catch (err: any) {
      setAudioError(err.message || "Failed to generate audio.");
    } finally {
      setIsAudioLoading(false);
    }
  }, [lyrics, selectedPreset]);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl">
        <Header />
        <main className="mt-8">
          <LyricsForm
            idea={idea} setIdea={setIdea} isExplicit={isExplicit} setIsExplicit={setIsExplicit}
            selectedPreset={selectedPreset} setSelectedPreset={setSelectedPreset}
            rhymeComplexity={rhymeComplexity} setRhymeComplexity={setRhymeComplexity}
            storytellingDepth={storytellingDepth} setStorytellingDepth={setStorytellingDepth}
            emotionalTone={emotionalTone} setEmotionalTone={setEmotionalTone}
            vocabularyLevel={vocabularyLevel} setVocabularyLevel={setVocabularyLevel}
            adLibIntensity={adLibIntensity} setAdLibIntensity={setAdLibIntensity}
            regionalFlavor={regionalFlavor} setRegionalFlavor={setRegionalFlavor}
            energyLevel={energyLevel} setEnergyLevel={setEnergyLevel}
            alliterationLevel={alliterationLevel} setAlliterationLevel={setAlliterationLevel}
            punchlineDensity={punchlineDensity} setPunchlineDensity={setPunchlineDensity}
            metaphorDensity={metaphorDensity} setMetaphorDensity={setMetaphorDensity}
            slangIntensity={slangIntensity} setSlangIntensity={setSlangIntensity}
            internalRhymeLevel={internalRhymeLevel} setInternalRhymeLevel={setInternalRhymeLevel}
            artistReference={artistReference} setArtistReference={setArtistReference}
            onSubmit={handleGenerateLyrics} isLoading={isLoading}
          />
          <div ref={resultsRef}>
            <LyricsDisplay
                lyrics={lyrics} isLoading={isLoading} error={error}
                onGenerateAudio={handleGenerateAudio} isAudioLoading={isAudioLoading}
                audioUrl={audioUrl} audioError={audioError} audioProgress={audioProgress}
            />
          </div>
        </main>
        <footer className="text-center mt-12 text-gray-700 text-[10px] uppercase tracking-[0.4em] font-black">
          <p>The Lyricist Engine V2.1 • Powered by Gemini 3 Flash</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
