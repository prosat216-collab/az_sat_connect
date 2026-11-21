import React, { useState, useRef } from 'react';
import { Radio, Play, Pause, Volume2, Search, Star, ArrowRight, Music, Disc } from 'lucide-react';
import { RadioStation } from '../types';
import { tunisianRadios } from '../data/mockData';

interface TunisianRadiosProps {
  onBack: () => void;
}

export const TunisianRadios: React.FC<TunisianRadiosProps> = ({ onBack }) => {
  const [radios, setRadios] = useState<RadioStation[]>(tunisianRadios);
  const [currentRadio, setCurrentRadio] = useState<RadioStation | null>(tunisianRadios[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [volume, setVolume] = useState<number>(0.8);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const filteredRadios = radios.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.frequency.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePlayRadio = (radio: RadioStation) => {
    if (currentRadio?.id === radio.id && isPlaying) {
      setIsPlaying(false);
      audioRef.current?.pause();
    } else {
      setCurrentRadio(radio);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = radio.streamUrl;
        audioRef.current.play().catch(err => {
          console.log("Stream playback simulated for browser compatibility:", err);
        });
      }
    }
  };

  const toggleFavorite = (id: string) => {
    // We can mark favorite in state if needed, or just keep it simple
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 text-white">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-gray-900/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 mb-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-bold transition border border-white/10"
          >
            <ArrowRight className="w-4 h-4" />
            <span>رجوع للرئيسية</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <Radio className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black bg-gradient-to-r from-amber-300 to-orange-200 bg-clip-text text-transparent">
                راديوات تونس كاملة (Tunisian Live Radios)
              </h2>
              <p className="text-xs text-gray-400">استمع لأكثر من 18 إذاعة تونسية وطنية وجهوية وموضوعاتية بجودة عالية</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute right-4 top-3.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن إذاعة (موزاييك، جوهرة، الزيتونة...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-xl pr-11 pl-4 py-3 text-xs focus:border-amber-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Now Playing Banner */}
      {currentRadio && (
        <div className="bg-gradient-to-r from-amber-950/80 via-gray-900 to-amber-950/80 border border-amber-500/30 rounded-3xl p-6 mb-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md">
          <div className="flex items-center gap-5">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-4xl shadow-xl ${isPlaying ? 'animate-bounce' : ''}`}>
              {currentRadio.logo}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-xs text-emerald-400 font-bold">بث مباشر الآن (Live)</span>
              </div>
              <h3 className="text-2xl font-black text-amber-200">{currentRadio.name}</h3>
              <p className="text-xs text-gray-300 mt-1">{currentRadio.description} • <span className="text-amber-400 font-bold">{currentRadio.frequency}</span></p>
            </div>
          </div>

          {/* Player controls */}
          <div className="flex items-center gap-6">
            {/* Visualizer bars */}
            <div className="hidden sm:flex items-center gap-1 h-8">
              {[40, 70, 30, 90, 50, 80, 60, 40].map((h, i) => (
                <div
                  key={i}
                  className={`w-1.5 bg-amber-400 rounded-full transition-all duration-300 ${isPlaying ? 'animate-pulse' : 'h-2'}`}
                  style={{ height: isPlaying ? `${Math.max(15, h * Math.random())}px` : '8px' }}
                ></div>
              ))}
            </div>

            <button
              onClick={() => handlePlayRadio(currentRadio)}
              className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-gray-950 flex items-center justify-center shadow-2xl transition transform hover:scale-110"
            >
              {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
            </button>
          </div>
        </div>
      )}

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Radios Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredRadios.map(radio => {
          const isSelected = currentRadio?.id === radio.id;
          return (
            <div
              key={radio.id}
              onClick={() => handlePlayRadio(radio)}
              className={`group bg-gray-900/80 hover:bg-gray-800/90 border rounded-2xl p-4 flex items-center justify-between cursor-pointer transition transform hover:-translate-y-1 shadow-xl ${isSelected ? 'border-amber-500/80 bg-amber-950/20' : 'border-white/10 hover:border-amber-500/40'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-inner ${isSelected && isPlaying ? 'bg-amber-500 text-gray-950 animate-pulse' : 'bg-white/5 border border-white/10 text-white'}`}>
                  {radio.logo}
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-0.5 group-hover:text-amber-300 transition">{radio.name}</h4>
                  <p className="text-xs text-amber-400 font-medium">{radio.frequency}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">{radio.genre}</p>
                </div>
              </div>

              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition ${isSelected && isPlaying ? 'bg-amber-500 text-gray-950 shadow-lg' : 'bg-white/5 text-gray-400 group-hover:bg-amber-500/20 group-hover:text-amber-300'}`}>
                {isSelected && isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
