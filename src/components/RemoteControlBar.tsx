import React from 'react';
import { Home, Tv, Radio, Trophy, BookOpen, Settings, Volume2, Shield } from 'lucide-react';

interface RemoteControlBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setIsAdminOpen: (open: boolean) => void;
}

export const RemoteControlBar: React.FC<RemoteControlBarProps> = ({ activeTab, setActiveTab, setIsAdminOpen }) => {
  return (
    <div className="w-full bg-black/80 backdrop-blur-md border-t border-white/10 py-3 px-6 flex items-center justify-center gap-2 sm:gap-4 flex-wrap z-30 shadow-2xl">
      <button
        onClick={() => setActiveTab('home')}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${activeTab === 'home' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white/5 hover:bg-white/10 text-gray-300'}`}
      >
        <Home className="w-4 h-4" />
        <span>الرئيسية (Home)</span>
      </button>

      <button
        onClick={() => setActiveTab('xtreme')}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${activeTab === 'xtreme' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-white/5 hover:bg-white/10 text-gray-300'}`}
      >
        <Tv className="w-4 h-4" />
        <span>CONNECT TV</span>
      </button>

      <button
        onClick={() => setActiveTab('radios')}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${activeTab === 'radios' ? 'bg-amber-600 text-white shadow-lg' : 'bg-white/5 hover:bg-white/10 text-gray-300'}`}
      >
        <Radio className="w-4 h-4" />
        <span>راديوات تونس</span>
      </button>

      <button
        onClick={() => setActiveTab('matches')}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${activeTab === 'matches' ? 'bg-green-600 text-white shadow-lg' : 'bg-white/5 hover:bg-white/10 text-gray-300'}`}
      >
        <Trophy className="w-4 h-4" />
        <span>مباريات اليوم</span>
      </button>

      <button
        onClick={() => setActiveTab('quran')}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${activeTab === 'quran' ? 'bg-teal-600 text-white shadow-lg' : 'bg-white/5 hover:bg-white/10 text-gray-300'}`}
      >
        <BookOpen className="w-4 h-4" />
        <span>القرآن الكريم</span>
      </button>

      <button
        onClick={() => setIsAdminOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition bg-gradient-to-r from-amber-500 to-yellow-600 text-gray-950 shadow-lg hover:scale-105"
      >
        <Shield className="w-4 h-4" />
        <span>لوحة التحكم</span>
      </button>
    </div>
  );
};
