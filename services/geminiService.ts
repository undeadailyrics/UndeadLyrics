import { GoogleGenAI } from "@google/genai";
import { 
  StylePreset, RhymeComplexity, StorytellingDepth, EmotionalTone, 
  VocabularyLevel, AdLibIntensity, RegionalFlavor, EnergyLevel,
  AlliterationLevel, PunchlineDensity 
} from "../types";

const getStyleInstructions = (preset: StylePreset): string => {
  switch (preset) {
    case 'ERB': return `STYLE: EPIC RAP BATTLES OF HISTORY. Focus on competitive historical references and high-speed multi-syllabic punchlines. [Beat: Orchestral Boom-Bap]`;
    case 'OLD_SCHOOL': return `STYLE: 90s BOOM BAP. Focus on social commentary, rhythm, and authority. [Beat: Dusty Soul Samples]`;
    case 'MODERN_TRAP': return `STYLE: MODERN TRAP. Focus on melodic bounce, triplets, and vibe. [Beat: Dark 808s]`;
    case 'UK_DRILL': return `STYLE: UK DRILL. Focus on gritty syncopation and sliding bass pockets. [Beat: Cold Sliding 808s]`;
    case 'CONSCIOUS': return `STYLE: CONSCIOUS. Focus on philosophy and truth-seeking. [Beat: Jazzy Melodies]`;
    case 'CHOPPER': return `STYLE: CHOPPER. Focus on technical speed and breath control. [Beat: Fast 130 BPM]`;
    case 'G_FUNK': return `STYLE: G-FUNK. West Coast authority and sunny grooves. [Beat: Funky Bass & High Synths]`;
    case 'GRIME': return `STYLE: UK GRIME. High-energy electronic aggression. [Beat: 140 BPM Electronic]`;
    case 'EMO_RAP': return `STYLE: EMO RAP. Vulnerability and melancholic melody. [Beat: Sad Guitar Loops]`;
    case 'LOFI_HIPHOP': return `STYLE: LOFI. Conversational chill flow. [Beat: Dusty Piano & Rain]`;
    case 'ICP': return `STYLE: DARK CARNIVAL (Horrorcore). Theatrical wickedness. [Beat: Eerie Carnival Synths]`;
    case 'SOUTHERN_GOSICK': return `STYLE: SOUTHERN CRUNK. Anthemic club energy. [Beat: Loud Brass & Bass]`;
    default: return '';
  }
};

interface GenerateParams {
  idea: string;
  isExplicit: boolean;
  preset: StylePreset;
  rhymeComplexity: RhymeComplexity;
  storytellingDepth: StorytellingDepth;
  emotionalTone: EmotionalTone;
  vocabularyLevel: VocabularyLevel;
  adLibIntensity: AdLibIntensity;
  regionalFlavor: RegionalFlavor;
  energyLevel: EnergyLevel;
  alliterationLevel: AlliterationLevel;
  punchlineDensity: PunchlineDensity;
  artistReference: string;
}

export const generateLyrics = async (params: GenerateParams): Promise<string> => {
  const { 
    idea, isExplicit, preset, rhymeComplexity, storytellingDepth, 
    emotionalTone, vocabularyLevel, adLibIntensity, regionalFlavor, 
    energyLevel, alliterationLevel, punchlineDensity, artistReference 
  } = params;

  // IMPORTANT: Create new instance to pick up latest API key from state/env
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const styleInfo = getStyleInstructions(preset);
  
  const prompt = `
    You are a sophisticated elite technical ghostwriter.
    MISSION: Write an elite complete rap song based on this concept: "${idea}".

    CONSTRAINTS:
    - Use [Beat Style], [Vocal Style], [Flow], and [Section Name] tags.
    - Structure: [Intro], [Verse 1], [Chorus], [Verse 2], [Bridge], [Verse 3], [Outro].

    SPECS:
    - Base Style: ${styleInfo}
    - Rhyme: ${rhymeComplexity} (Level: ${rhymeComplexity === 'GOD_TIER' ? 'Infinite/Mosaic' : rhymeComplexity})
    - Logic: ${storytellingDepth} narrative path.
    - Tone: ${emotionalTone} energy.
    - Vocabulary: ${vocabularyLevel} level.
    - Regional: ${regionalFlavor} flavor.
    - Energy: ${energyLevel} performance.
    - Stylistics: ${alliterationLevel} alliteration, ${punchlineDensity} punchline density.
    - Ad-libs: ${adLibIntensity} intensity.
    - Artist Reference: ${artistReference || 'None specified'}.
    - Explicit: ${isExplicit ? 'ALLOWED (Use raw profanity)' : 'STRICTLY CLEAN'}.

    TECHNICAL: Use sophisticated double-entendres and rhythmic assonance. 
    OUTPUT: Lyrics and tags only.
  `;

  try {
    const response = await ai.models.generateContent({
        // Switched to slash to avoid Pro tier restrictions while maintaining quality
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          temperature: 0.9,
          // Removed thinkingConfig for Flash to ensure robustness
        }
    });
    
    const text = response.text;
    if (!text) throw new Error("It returned an empty blueprint.");
    return text.trim();
  } catch (error: any) {
    console.error("Lyrical Engine Error:", error);
    throw new Error(error.message || "The creative engine encountered a critical failure. Check your connection.");
  }
};
  
