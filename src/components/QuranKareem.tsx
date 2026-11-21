import React, { useState, useRef } from 'react';
import { BookOpen, Play, Pause, Search, Volume2, ArrowRight, Star, Disc } from 'lucide-react';
import { QuranReciter, QuranSurah } from '../types';
import { quranReciters, sampleSurahs } from '../data/mockData';

interface QuranKareemProps {
  onBack: () => void;
}

export const QuranKareem: React.FC<QuranKareemProps> = ({ onBack }) => {
  const [reciters] = useState<QuranReciter[]>(quranReciters);
  const [selectedReciter, setSelectedReciter] = useState<QuranReciter>(quranReciters[0]);
  const [surahs] = useState<QuranSurah[]>(sampleSurahs);
  const [currentSurah, setCurrentSurah] = useState<QuranSurah | null>(sampleSurahs[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const filteredSurahs = surahs.filter(s =>
    s.name.includes(searchQuery) ||
    s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.number.toString().includes(searchQuery)
  );

  const handlePlaySurah = (surah: QuranSurah) => {
    if (currentSurah?.number === surah.number && isPlaying) {
      setIsPlaying(false);
      audioRef.current?.pause();
    } else {
      setCurrentSurah(surah);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = `https://download.quranicaudio.com/quran/abdul_basit_murattal/${String(surah.number).padStart(3, '0')}.mp3`;
        audioRef.current.play().catch(err => {
          console.log("Audio playback simulated for browser compatibility:", err);
        });
      }
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 text-white">
      {/* Top Banner with authentic Quran Book Image */}
      <div className="relative rounded-3xl overflow-hidden mb-6 border border-teal-500/30 shadow-2xl">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=1600')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/90"></div>
        
        <div className="relative p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-bold transition border border-white/10"
            >
              <ArrowRight className="w-4 h-4" />
              <span>رجوع للرئيسية</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-tr from-teal-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-teal-300 to-emerald-200 bg-clip-text text-transparent">
                  القرآن الكريم (114 سورة كاملة)
                </h2>
                <p className="text-xs text-gray-300">استمع إلى تلاوة القرآن الكريم بصوت أشهر القراء في العالم الإسلامي</p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute right-4 top-3.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث عن اسم السورة أو رقمها..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-xl pr-11 pl-4 py-3 text-xs focus:border-teal-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Reciters Selection */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-teal-400 mb-3">اختر القارئ المفضل:</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {reciters.map(reciter => {
            const isSelected = selectedReciter.id === reciter.id;
            return (
              <button
                key={reciter.id}
                onClick={() => setSelectedReciter(reciter)}
                className={`p-3.5 rounded-2xl border text-right transition flex flex-col justify-between ${isSelected ? 'bg-gradient-to-br from-teal-600 to-emerald-800 border-teal-400 shadow-xl scale-105' : 'bg-gray-900/80 border-white/10 hover:bg-gray-800'}`}
              >
                <div>
                  <h4 className="font-bold text-xs mb-1 line-clamp-1">{reciter.name}</h4>
                  <p className="text-[10px] text-teal-200 line-clamp-1">{reciter.style}</p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] text-gray-300">مختبر الصوت</span>
                  <div className={`w-3 h-3 rounded-full ${isSelected ? 'bg-white' : 'bg-white/20'}`}></div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Now Playing Banner */}
      {currentSurah && (
        <div className="bg-gradient-to-r from-teal-950/80 via-gray-900 to-teal-950/80 border border-teal-500/30 rounded-3xl p-6 mb-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-600 flex items-center justify-center text-2xl font-black shadow-xl">
              {currentSurah.number}
            </div>
            <div>
              <p className="text-xs text-teal-400 font-bold mb-1">القارئ: {selectedReciter.name}</p>
              <h3 className="text-2xl font-black text-teal-200">سورة {currentSurah.name}</h3>
              <p className="text-xs text-gray-300 mt-1">{currentSurah.englishName} • {currentSurah.numberOfAyahs} آية • {currentSurah.revelationType}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <audio
              ref={audioRef}
              controls
              autoPlay={isPlaying}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full md:w-80 h-12"
            />
          </div>
        </div>
      )}

      {/* Surahs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredSurahs.map(surah => {
          const isSelected = currentSurah?.number === surah.number;
          return (
            <div
              key={surah.number}
              onClick={() => handlePlaySurah(surah)}
              className={`group bg-gray-900/80 hover:bg-gray-800/90 border rounded-2xl p-4 flex items-center justify-between cursor-pointer transition transform hover:-translate-y-1 shadow-xl ${isSelected ? 'border-teal-500/85 bg-teal-950/20' : 'border-white/10 hover:border-teal-500/40'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm shadow-inner ${isSelected && isPlaying ? 'bg-teal-500 text-gray-950 animate-pulse' : 'bg-white/5 border border-white/10 text-teal-400'}`}>
                  {surah.number}
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-0.5 group-hover:text-teal-300 transition">سورة {surah.name}</h4>
                  <p className="text-xs text-gray-400">{surah.numberOfAyahs} آية • {surah.revelationType}</p>
                </div>
              </div>

              <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition ${isSelected && isPlaying ? 'bg-teal-500 text-gray-950 shadow-lg' : 'bg-white/5 text-gray-400 group-hover:bg-teal-500/20 group-hover:text-teal-300'}`}>
                {isSelected && isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
