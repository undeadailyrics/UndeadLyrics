import type React from 'react';

export type StylePreset = 'ERB' | 'ICP' | 'OLD_SCHOOL' | 'MODERN_TRAP' | 'UK_DRILL' | 'SOUTHERN_GOSICK' | 'G_FUNK' | 'GRIME' | 'EMO_RAP' | 'CHOPPER' | 'LOFI_HIPHOP' | 'CONSCIOUS' | 'BOOM_BAP' | 'MUMBLE_RAP' | 'HORRORCORE' | 'JAZZ_RAP' | 'LATIN_TRAP' | 'HYPHY' | 'CLOUD_RAP' | 'TRAP_METAL' | 'SHUFFLE_RAP' | 'MELODIC_GRIME' | 'JAPANESE_HIPHOP';
export type RhymeComplexity = 'SIMPLE' | 'COMPLEX' | 'GOD_TIER';
export type StorytellingDepth = 'LINEAR' | 'FRAGMENTED' | 'CONVOLUTED';
export type EmotionalTone = 'AGGRESSIVE' | 'INTROSPECTIVE' | 'HUMOROUS' | 'DARK' | 'TRIUMPHANT' | 'MELANCHOLIC' | 'BOASTFUL';
export type VocabularyLevel = 'STREET' | 'BALANCED' | 'LITERARY' | 'SCIENTIFIC';
export type AdLibIntensity = 'NONE' | 'SPARSE' | 'HEAVY' | 'CHAOTIC';
export type RegionalFlavor = 'GLOBAL' | 'EAST_COAST' | 'WEST_COAST' | 'SOUTHERN' | 'UK' | 'MIDWEST' | 'WEST_INDIES';
export type EnergyLevel = 'CHILL' | 'MODERATE' | 'HIGH_ENERGY' | 'FRENZIED';
export type AlliterationLevel = 'NONE' | 'SUBTLE' | 'HEAVY';
export type PunchlineDensity = 'SPARSE' | 'BALANCED' | 'LETHAL';
export type MetaphorDensity = 'NONE' | 'SUBTLE' | 'HEAVY' | 'CRYPTIC';
export type SlangIntensity = 'NONE' | 'MODERATE' | 'HEAVY';
export type InternalRhymeLevel = 'NONE' | 'SUBTLE' | 'HEAVY';

export interface LyricsFormProps {
  idea: string;
  setIdea: React.Dispatch<React.SetStateAction<string>>;
  isExplicit: boolean;
  setIsExplicit: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPreset: StylePreset;
  setSelectedPreset: React.Dispatch<React.SetStateAction<StylePreset>>;
  rhymeComplexity: RhymeComplexity;
  setRhymeComplexity: React.Dispatch<React.SetStateAction<RhymeComplexity>>;
  storytellingDepth: StorytellingDepth;
  setStorytellingDepth: React.Dispatch<React.SetStateAction<StorytellingDepth>>;
  emotionalTone: EmotionalTone;
  setEmotionalTone: React.Dispatch<React.SetStateAction<EmotionalTone>>;
  vocabularyLevel: VocabularyLevel;
  setVocabularyLevel: React.Dispatch<React.SetStateAction<VocabularyLevel>>;
  adLibIntensity: AdLibIntensity;
  setAdLibIntensity: React.Dispatch<React.SetStateAction<AdLibIntensity>>;
  regionalFlavor: RegionalFlavor;
  setRegionalFlavor: React.Dispatch<React.SetStateAction<RegionalFlavor>>;
  energyLevel: EnergyLevel;
  setEnergyLevel: React.Dispatch<React.SetStateAction<EnergyLevel>>;
  alliterationLevel: AlliterationLevel;
  setAlliterationLevel: React.Dispatch<React.SetStateAction<AlliterationLevel>>;
  punchlineDensity: PunchlineDensity;
  setPunchlineDensity: React.Dispatch<React.SetStateAction<PunchlineDensity>>;
  metaphorDensity: MetaphorDensity;
  setMetaphorDensity: React.Dispatch<React.SetStateAction<MetaphorDensity>>;
  slangIntensity: SlangIntensity;
  setSlangIntensity: React.Dispatch<React.SetStateAction<SlangIntensity>>;
  internalRhymeLevel: InternalRhymeLevel;
  setInternalRhymeLevel: React.Dispatch<React.SetStateAction<InternalRhymeLevel>>;
  artistReference: string;
  setArtistReference: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
  isLoading: boolean;
}

export interface LyricsDisplayProps {
  lyrics: string;
  isLoading: boolean;
  error: string | null;
  onGenerateAudio: () => void;
  isAudioLoading: boolean;
  audioUrl: string | null;
  audioError: string | null;
  audioProgress?: number;
}
