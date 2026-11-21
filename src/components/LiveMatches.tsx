import React, { useState } from 'react';
import { Calendar, Trophy, Tv, ArrowRight, Play, Clock, CheckCircle } from 'lucide-react';
import { LiveMatch } from '../types';
import { liveMatches } from '../data/mockData';

interface LiveMatchesProps {
  onBack: () => void;
}

export const LiveMatches: React.FC<LiveMatchesProps> = ({ onBack }) => {
  const [matches, setMatches] = useState<LiveMatch[]>(liveMatches);
  const [filter, setFilter] = useState<'all' | 'LIVE' | 'UPCOMING' | 'FT'>('all');

  const filteredMatches = matches.filter(m => filter === 'all' || m.status === filter);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 text-white">
      {/* Top Banner with Stadium Image */}
      <div className="relative rounded-3xl overflow-hidden mb-6 border border-emerald-500/30 shadow-2xl">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1600')` }}></div>
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
              <div className="w-12 h-12 bg-gradient-to-tr from-emerald-600 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-emerald-300 to-green-200 bg-clip-text text-transparent">
                  مباريات اليوم (Flashscore Live Match Center)
                </h2>
                <p className="text-xs text-gray-300">تابع النتائج المباشرة، الأهداف، والبطولات المحلية والعالمية</p>
              </div>
            </div>
          </div>

          {/* Filter buttons */}
          <div className="flex items-center gap-2 bg-black/60 p-1.5 rounded-xl border border-white/10">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition ${filter === 'all' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
            >
              جميع المباريات
            </button>
            <button
              onClick={() => setFilter('LIVE')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${filter === 'LIVE' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span>مباشر (Live)</span>
            </button>
            <button
              onClick={() => setFilter('UPCOMING')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition ${filter === 'UPCOMING' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
            >
              القادمة
            </button>
            <button
              onClick={() => setFilter('FT')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition ${filter === 'FT' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
            >
              المنتهية
            </button>
          </div>
        </div>
      </div>

      {/* Matches List */}
      <div className="space-y-4">
        {filteredMatches.map(match => (
          <div
            key={match.id}
            className="bg-gray-900/85 hover:bg-gray-800/95 border border-white/10 hover:border-emerald-500/40 rounded-2xl p-5 shadow-xl transition flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md"
          >
            {/* League info */}
            <div className="flex items-center gap-3 w-full md:w-64 border-b md:border-b-0 md:border-l border-white/10 pb-3 md:pb-0 md:pl-4">
              <Trophy className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <p className="font-bold text-xs text-amber-200">{match.league}</p>
                <p className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                  <Tv className="w-3 h-3 text-cyan-400" />
                  <span>{match.channel}</span>
                </p>
              </div>
            </div>

            {/* Teams & Score */}
            <div className="flex items-center justify-center gap-6 flex-grow">
              {/* Home Team */}
              <div className="flex items-center gap-3 justify-end w-40 sm:w-48 text-right">
                <span className="font-bold text-sm sm:text-base line-clamp-1">{match.homeTeam}</span>
                <span className="text-2xl">{match.homeLogo}</span>
              </div>

              {/* Score / Time badge */}
              <div className="px-5 py-2.5 bg-black/60 border border-white/10 rounded-xl text-center min-w-[110px]">
                {match.status === 'LIVE' ? (
                  <div>
                    <p className="font-black text-lg text-emerald-400 font-mono tracking-widest">{match.score}</p>
                    <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-md font-bold border border-red-500/30">
                      {match.time}
                    </span>
                  </div>
                ) : match.status === 'FT' ? (
                  <div>
                    <p className="font-black text-lg text-gray-300 font-mono tracking-widest">{match.score}</p>
                    <span className="text-[10px] text-gray-400 font-medium">انتهت (FT)</span>
                  </div>
                ) : (
                  <div>
                    <p className="font-bold text-sm text-cyan-300">{match.time}</p>
                    <span className="text-[10px] text-cyan-400 font-medium">قريباً</span>
                  </div>
                )}
              </div>

              {/* Away Team */}
              <div className="flex items-center gap-3 justify-start w-40 sm:w-48 text-left">
                <span className="text-2xl">{match.awayLogo}</span>
                <span className="font-bold text-sm sm:text-base line-clamp-1">{match.awayTeam}</span>
              </div>
            </div>

            {/* Action button */}
            <div>
              <button
                onClick={() => alert(`جاري فتح البث الحي لمباراة ${match.homeTeam} ضد ${match.awayTeam} عبر قناة ${match.channel}`)}
                className="flex items-center gap-2 bg-emerald-600/80 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-lg hover:scale-105 border border-emerald-400/40"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>مشاهدة البث</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
