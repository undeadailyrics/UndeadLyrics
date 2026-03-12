import { GoogleGenAI, Modality, ThinkingLevel } from "@google/genai";
import { 
  StylePreset, RhymeComplexity, StorytellingDepth, EmotionalTone, 
  VocabularyLevel, AdLibIntensity, RegionalFlavor, EnergyLevel,
  AlliterationLevel, PunchlineDensity, MetaphorDensity, SlangIntensity, InternalRhymeLevel
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
    case 'BOOM_BAP': return `STYLE: 90s BOOM BAP. Focus on lyricism, storytelling, and classic rhythm. [Beat: Gritty Drum Breaks]`;
    case 'MUMBLE_RAP': return `STYLE: MELODIC/MUMBLE. Focus on melodic hooks, slurred delivery, and vibe over clarity. [Beat: Hazy Synths]`;
    case 'HORRORCORE': return `STYLE: HORRORCORE. Focus on dark, macabre imagery and aggressive delivery. [Beat: Distorted Bass & Screams]`;
    case 'JAZZ_RAP': return `STYLE: JAZZ RAP. Focus on smooth delivery, sophisticated wordplay, and relaxed flow. [Beat: Upright Bass & Sax]`;
    case 'LATIN_TRAP': return `STYLE: LATIN TRAP. Focus on reggaeton-influenced rhythms and high-energy delivery. [Beat: Dembow & Trap 808s]`;
    case 'HYPHY': return `STYLE: HYPHY. Focus on high-energy, Bay Area slang, and party vibes. [Beat: Slapping Bass & Fast Synths]`;
    case 'CLOUD_RAP': return `STYLE: CLOUD RAP. Focus on ethereal, hazy atmospheres and slow, relaxed delivery. [Beat: Reverb-heavy Pads]`;
    case 'TRAP_METAL': return `STYLE: TRAP METAL. Aggressive, distorted vocals with heavy metal influence and trap 808s. [Beat: Distorted Guitars & Hard 808s]`;
    case 'SHUFFLE_RAP': return `STYLE: SHUFFLE RAP. Upbeat, rhythmic flow designed for dancing, often with a swing feel. [Beat: Fast Electronic Bounce]`;
    case 'MELODIC_GRIME': return `STYLE: MELODIC GRIME. UK Grime energy mixed with melodic hooks and smoother delivery. [Beat: 140 BPM Melodic Electronic]`;
    case 'JAPANESE_HIPHOP': return `STYLE: JAPANESE HIPHOP. Focus on precise flow, unique cultural references, and often jazzy or futuristic production. [Beat: Jazzy or Tech-focused Hip Hop]`;
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
  metaphorDensity: MetaphorDensity;
  slangIntensity: SlangIntensity;
  internalRhymeLevel: InternalRhymeLevel;
  artistReference: string;
}

export const generateLyrics = async (params: GenerateParams): Promise<string> => {
  const { 
    idea, isExplicit, preset, rhymeComplexity, storytellingDepth, 
    emotionalTone, vocabularyLevel, adLibIntensity, regionalFlavor, 
    energyLevel, alliterationLevel, punchlineDensity, metaphorDensity,
    slangIntensity, internalRhymeLevel, artistReference 
  } = params;

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const styleInfo = getStyleInstructions(preset);
  
  const prompt = `
    ROLE: You are a world-class, multi-platinum ghostwriter known for complex lyricism, rhythmic innovation, and deep storytelling.
    MISSION: Write a high-quality, professional rap song based on the concept: "${idea}".

    CORE REQUIREMENTS:
    - DO NOT refer to yourself as an AI, "The Architect", or any persona. 
    - DO NOT use the word "Architect" in the lyrics unless it is a specific, contextually relevant metaphor for the user's idea.
    - Focus on COHERENCE. Every verse must build on the central theme of "${idea}".
    - Avoid clichés and repetitive filler phrases.
    - Use sophisticated literary devices: extended metaphors, double-entendres, and vivid imagery.

    TECHNICAL SPECS:
    - Structure: [Intro], [Verse 1], [Chorus], [Verse 2], [Bridge], [Verse 3], [Outro].
    - Tags: Include [Beat Style], [Vocal Style], [Flow Pattern], and [Section Name].
    - Genre Aesthetic: ${styleInfo}
    - Rhyme Scheme: ${rhymeComplexity === 'GOD_TIER' ? 'Mosaic/Multi-syllabic/Internal' : rhymeComplexity}. Prioritize complex internal rhymes and assonance.
    - Narrative Path: ${storytellingDepth}. Ensure a clear beginning, middle, and end.
    - Tone/Vibe: ${emotionalTone} energy.
    - Vocabulary: ${vocabularyLevel}. Use precise, impactful word choices.
    - Regional Flavor: ${regionalFlavor}.
    - Energy: ${energyLevel} delivery.
    - Stylistics: ${alliterationLevel} alliteration, ${punchlineDensity} punchline density, ${metaphorDensity} metaphor density, ${internalRhymeLevel} internal rhyme level.
    - Slang: ${slangIntensity}.
    - Ad-libs: ${adLibIntensity}.
    - Artist Reference: ${artistReference || 'None'}.
    - Explicit Content: ${isExplicit ? 'ALLOWED (Use raw, authentic language)' : 'STRICTLY CLEAN'}.

    FLOW GUIDANCE:
    - Vary the rhythmic "pocket". Use triplets, syncopation, and unexpected pauses.
    - Ensure the transition between sections (e.g., Verse to Chorus) feels natural and impactful.

    Output: Lyrics and technical tags only. No introductory or concluding text.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          temperature: 0.8,
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW }
        }
    });
    
    const text = response.text;
    if (!text) throw new Error("Empty response from engine.");
    return text.trim();
  } catch (error: any) {
    console.error("Lyrical Engine Error:", error);
    throw new Error("The creative engine is currently busy or timed out. Please try again.");
  }
};

const addWavHeader = (base64Pcm: string, sampleRate: number = 24000): string => {
  const binaryString = atob(base64Pcm);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const header = new ArrayBuffer(44);
  const view = new DataView(header);

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  // RIFF identifier
  writeString(0, 'RIFF');
  // file length
  view.setUint32(4, 36 + len, true);
  // RIFF type
  writeString(8, 'WAVE');
  // format chunk identifier
  writeString(12, 'fmt ');
  // format chunk length
  view.setUint32(16, 16, true);
  // sample format (raw)
  view.setUint16(20, 1, true);
  // channel count
  view.setUint16(22, 1, true);
  // sample rate
  view.setUint32(24, sampleRate, true);
  // byte rate (sample rate * block align)
  view.setUint32(28, sampleRate * 2, true);
  // block align (channel count * bytes per sample)
  view.setUint16(32, 2, true);
  // bits per sample
  view.setUint16(34, 16, true);
  // data chunk identifier
  writeString(36, 'data');
  // data chunk length
  view.setUint32(40, len, true);

  const wavBytes = new Uint8Array(44 + len);
  wavBytes.set(new Uint8Array(header), 0);
  wavBytes.set(bytes, 44);

  // Robust base64 conversion for large arrays
  let binary = '';
  const chunkSize = 8192;
  for (let i = 0; i < wavBytes.length; i += chunkSize) {
    binary += String.fromCharCode.apply(null, Array.from(wavBytes.subarray(i, i + chunkSize)));
  }
  
  return `data:audio/wav;base64,${btoa(binary)}`;
};

export const generateAudio = async (lyrics: string, style: string, onProgress?: (p: number) => void): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Split lyrics into manageable chunks (roughly by section or line breaks)
  // We target ~600-800 chars per chunk for maximum stability and quality
  const sections = lyrics.split(/\n\n+/);
  const chunks: string[] = [];
  let currentChunk = "";

  for (const section of sections) {
    if ((currentChunk + section).length > 700) {
      if (currentChunk) chunks.push(currentChunk.trim());
      currentChunk = section;
    } else {
      currentChunk += (currentChunk ? "\n\n" : "") + section;
    }
  }
  if (currentChunk) chunks.push(currentChunk.trim());

  // Map styles to specific voices for better "character"
  const voiceMap: Record<string, string> = {
    'ERB': 'Fenrir',      // Deep, authoritative
    'TRAP': 'Charon',     // Smooth, rhythmic
    'OLD_SCHOOL': 'Puck', // High energy, clear
    'GRIME': 'Fenrir',    // Aggressive
    'LOFI': 'Zephyr',     // Mellow, breathy
    'DRILL': 'Charon',    // Dark, rhythmic
    'BOOM_BAP': 'Puck',
    'MUMBLE_RAP': 'Zephyr',
    'HORRORCORE': 'Fenrir',
    'JAZZ_RAP': 'Zephyr',
    'LATIN_TRAP': 'Charon',
    'HYPHY': 'Puck',
    'CLOUD_RAP': 'Zephyr',
    'TRAP_METAL': 'Fenrir',
    'SHUFFLE_RAP': 'Puck',
    'MELODIC_GRIME': 'Fenrir',
    'JAPANESE_HIPHOP': 'Zephyr',
  };
  const selectedVoice = voiceMap[style] || 'Zephyr';

  const pcmChunks: (Uint8Array | null)[] = await Promise.all(chunks.map(async (chunk, i) => {
    // Clean chunk for TTS
    const cleanChunk = chunk
      .replace(/\[.*?\]/g, '')
      .replace(/[^\w\s.,!?'"-]/g, '')
      .trim();

    if (!cleanChunk) return null;

    const performancePrompt = `
      ACT AS A PROFESSIONAL RECORDING ARTIST IN A STUDIO. 
      You are performing a ${style} track. 
      
      PERFORMANCE RULES:
      1. DO NOT JUST READ. You must PERFORM these lyrics with a strong rhythmic cadence, "flow", and musicality.
      2. VERSES: Use a sharp, rhythmic rap flow. Emphasize the rhymes and the "pocket" of the beat.
      3. CHORUS: Use a more melodic, slightly elongated singing tone.
      4. AD-LIBS: Add subtle vocal textures and professional studio ad-libs (like 'yo', 'uh-huh', 'yeah', 'check it') where they fit naturally to make it sound like a real produced master track.
      5. EMOTION: Match the energy level of the ${style} genre.
      
      LYRICS TO PERFORM:
      ${cleanChunk}
    `;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: performancePrompt }] }],
        config: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: selectedVoice },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const binaryString = atob(base64Audio);
        const bytes = new Uint8Array(binaryString.length);
        for (let j = 0; j < binaryString.length; j++) {
          bytes[j] = binaryString.charCodeAt(j);
        }
        return bytes;
      }
    } catch (error) {
      console.error(`Error generating chunk ${i}:`, error);
    }
    return null;
  }));

  const allPcmData = pcmChunks.filter((c): c is Uint8Array => c !== null);

  if (onProgress) onProgress(100);

  if (allPcmData.length === 0) {
    throw new Error("The Studio failed to capture any part of the performance.");
  }

  // Combine all PCM chunks
  const totalLength = allPcmData.reduce((acc, curr) => acc + curr.length, 0);
  const combinedPcm = new Uint8Array(totalLength);
  let offset = 0;
  for (const data of allPcmData) {
    combinedPcm.set(data, offset);
    offset += data.length;
  }

  // Convert combined PCM to base64 for the WAV header function
  let binary = '';
  const chunkSize = 8192;
  for (let i = 0; i < combinedPcm.length; i += chunkSize) {
    binary += String.fromCharCode.apply(null, Array.from(combinedPcm.subarray(i, i + chunkSize)));
  }
  
  return addWavHeader(btoa(binary), 24000);
};
