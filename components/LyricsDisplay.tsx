import React, { useState, useRef } from 'react';
import Loader from './Loader';
import type { LyricsDisplayProps } from '../types';

const LyricsDisplay: React.FC<LyricsDisplayProps> = ({ 
  lyrics, 
  isLoading, 
  error, 
  onGenerateAudio, 
  isAudioLoading, 
  audioUrl,
  audioError,
  audioProgress = 0
}) => {
  const [copied, setCopied] = useState(false);
  const [selectedBeat, setSelectedBeat] = useState<string>('none');
  const beatAudioRef = useRef<HTMLAudioElement | null>(null);
  const vocalAudioRef = useRef<HTMLAudioElement | null>(null);

  const beats = [
    { id: 'none', name: 'Acapella', url: '' },
    { id: 'trap', name: 'Trap Heat', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { id: 'boombap', name: 'Old School', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { id: 'lofi', name: 'Lo-Fi Chill', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
  ];

  const handlePlay = () => {
    if (vocalAudioRef.current) {
      vocalAudioRef.current.play();
      if (beatAudioRef.current && selectedBeat !== 'none') {
        beatAudioRef.current.currentTime = 0;
        beatAudioRef.current.play();
      }
    }
  };

  const handlePause = () => {
    if (vocalAudioRef.current) vocalAudioRef.current.pause();
    if (beatAudioRef.current) beatAudioRef.current.pause();
  };

  const handleCopy = async () => {
    if (!lyrics) return;
    try {
      await navigator.clipboard.writeText(lyrics);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const renderLyricsWithFormatting = (text: string) => {
    // We can use a regex to highlight text inside [brackets]
    const parts = text.split(/(\[.*?\])/g);
    return parts.map((part, i) => {
      if (part.startsWith('[') && part.endsWith(']')) {
        return (
          <span key={i} className="text-cyan-400 font-bold tracking-tight bg-cyan-400/10 px-1 rounded">
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full py-12">
          <Loader />
          <p className="mt-4 text-gray-400 animate-pulse font-medium">Laying down the tracks...</p>
          <p className="text-xs text-gray-500 mt-2">Engineering advanced wordplay & rhythmic pockets...</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-red-400 py-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-4 font-semibold">An Error Occurred</p>
          <p className="text-center text-sm mt-1">{error}</p>
        </div>
      );
    }
    if (lyrics) {
      return (
        <div className="relative group w-full">
          <div className="flex flex-wrap gap-2 absolute top-0 right-0 z-10">
            <button
              onClick={handleCopy}
              className="p-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg border border-gray-600 transition-all duration-200 flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
              title="Copy to clipboard"
            >
              {copied ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-green-400">Copied!</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  <span>Copy</span>
                </>
              )}
            </button>

            {!audioUrl && !isAudioLoading && (
              <button
                onClick={onGenerateAudio}
                className="p-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg border border-cyan-400 transition-all duration-200 flex items-center gap-2 text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                title="Generate AI Song Preview"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                <span>Generate Song</span>
              </button>
            )}

            {isAudioLoading && (
              <div className="p-2 bg-gray-800 text-cyan-400 rounded-lg border border-cyan-400/30 flex flex-col gap-1 min-w-[140px]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                  <div className="w-3 h-3 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>Recording {audioProgress}%</span>
                </div>
                <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-cyan-500 transition-all duration-300" 
                    style={{ width: `${audioProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {audioUrl && (
            <div className="mt-2 mb-6 p-6 bg-cyan-950/40 border border-cyan-400/30 rounded-2xl flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-500 pt-12 sm:pt-6 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping absolute inset-0"></div>
                    <div className="w-3 h-3 bg-cyan-400 rounded-full relative"></div>
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] font-black text-cyan-400">The Studio • Master Mix</span>
                </div>
                <button 
                  onClick={onGenerateAudio}
                  className="text-[10px] uppercase tracking-widest font-bold text-gray-500 hover:text-cyan-400 transition-colors"
                >
                  Regenerate Vocals
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Select Backing Track</label>
                  <div className="flex flex-wrap gap-2">
                    {beats.map((beat) => (
                      <button
                        key={beat.id}
                        onClick={() => setSelectedBeat(beat.id)}
                        className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${
                          selectedBeat === beat.id 
                            ? 'bg-cyan-500 border-cyan-400 text-white shadow-[0_0_10px_rgba(6,182,212,0.4)]' 
                            : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500'
                        }`}
                      >
                        {beat.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-end gap-2">
                  <div className="flex items-center gap-4 bg-black/40 p-3 rounded-xl border border-white/5">
                    <button 
                      onClick={handlePlay}
                      className="w-10 h-10 bg-cyan-500 hover:bg-cyan-400 rounded-full flex items-center justify-center text-white transition-all active:scale-95 shadow-lg"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                    <button 
                      onClick={handlePause}
                      className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-gray-300 transition-all active:scale-95"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    </button>
                    <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500 w-1/3 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hidden Audio Elements for Mixing */}
              <audio 
                ref={vocalAudioRef} 
                src={audioUrl} 
                onEnded={() => {
                  if (beatAudioRef.current) beatAudioRef.current.pause();
                }}
              />
              {selectedBeat !== 'none' && beats.find(b => b.id === selectedBeat)?.url && (
                <audio 
                  ref={beatAudioRef} 
                  src={beats.find(b => b.id === selectedBeat)?.url} 
                  loop 
                  className="hidden"
                />
              )}
            </div>
          )}

          {audioError && (
            <div className="mt-2 mb-6 p-3 bg-red-950/30 border border-red-400/20 rounded-lg text-red-400 text-[10px] uppercase tracking-wider font-bold text-center">
              Error: {audioError}
            </div>
          )}

          <div className={`whitespace-pre-wrap font-mono text-gray-300 text-sm sm:text-base leading-relaxed ${audioUrl ? 'pt-2' : 'pt-10'}`}>
            {renderLyricsWithFormatting(lyrics)}
          </div>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 py-12">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="mt-4 font-medium italic">"The mic is open... drop your concept above."</p>
      </div>
    );
  };

  return (
    <div className="mt-8 w-full min-h-[400px] bg-gray-950/50 border border-gray-800 rounded-xl p-6 shadow-2xl flex flex-col items-start overflow-hidden">
      {renderContent()}
    </div>
  );
};

export default LyricsDisplay;
