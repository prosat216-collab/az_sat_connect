import React, { useState } from 'react';
import { Tv, Film, Search, Star, Play, Settings, RefreshCw, Volume2, ShieldCheck, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';
import { XtreamChannel, XtreamVod } from '../types';
import { xtreamDemoChannels, xtreamDemoVod } from '../data/mockData';

interface XtremePlayerProps {
  onBack: () => void;
}

export const XtremePlayer: React.FC<XtremePlayerProps> = ({ onBack }) => {
  const [activeSubTab, setActiveSubTab] = useState<'live' | 'vod' | 'login'>('live');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [channels, setChannels] = useState<XtreamChannel[]>(xtreamDemoChannels);
  const [vods, setVods] = useState<XtreamVod[]>(xtreamDemoVod);
  const [playingItem, setPlayingItem] = useState<{ title: string; url: string; type: 'live' | 'vod' } | null>(null);

  // Xtream Login state
  const [xtreamUrl, setXtreamUrl] = useState('http://xtream.azsat.net:8080');
  const [username, setUsername] = useState('user_rb1');
  const [password, setPassword] = useState('pwd123');
  const [isConnected, setIsConnected] = useState(true);

  const categories = ['all', 'Tunisia / القنوات التونسية', 'Sports / الرياضة', 'Entertainment / ترفيه', 'News / الأخبار'];
  const vodCategories = ['all', 'مسلسلات تونسية', 'أفلام أجنبية حديثة'];

  const filteredChannels = channels.filter(ch => {
    const matchesCat = selectedCategory === 'all' || ch.category === selectedCategory;
    const matchesSearch = ch.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const filteredVods = vods.filter(v => {
    const matchesCat = selectedCategory === 'all' || v.category === selectedCategory;
    const matchesSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleFavorite = (id: string) => {
    setChannels(prev => prev.map(ch => ch.id === id ? { ...ch, isFavorite: !ch.isFavorite } : ch));
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
            <div className="w-10 h-10 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Tv className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black bg-gradient-to-r from-cyan-400 to-blue-200 bg-clip-text text-transparent">
                CONNECT TV (IPTV & VOD Xtreme Codes)
              </h2>
              <p className="text-xs text-gray-400">تشغيل القنوات الحية، الأفلام، والمسلسلات بجودة عالية 4K / FHD</p>
            </div>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded-xl border border-white/10">
          <button
            onClick={() => { setActiveSubTab('live'); setSelectedCategory('all'); }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${activeSubTab === 'live' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
          >
            <Tv className="w-4 h-4" />
            <span>البث المباشر (Live TV)</span>
          </button>
          <button
            onClick={() => { setActiveSubTab('vod'); setSelectedCategory('all'); }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${activeSubTab === 'vod' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
          >
            <Film className="w-4 h-4" />
            <span>الأفلام والمسلسلات (VOD)</span>
          </button>
          <button
            onClick={() => setActiveSubTab('login')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${activeSubTab === 'login' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
          >
            <Settings className="w-4 h-4" />
            <span>بيانات Xtream API</span>
          </button>
        </div>
      </div>

      {/* Login Tab Content */}
      {activeSubTab === 'login' && (
        <div className="bg-gray-900/90 border border-white/10 rounded-2xl p-8 max-w-xl mx-auto shadow-2xl backdrop-blur-md">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-cyan-500/20 text-cyan-400 rounded-2xl mx-auto flex items-center justify-center mb-3 border border-cyan-500/30">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold">ربط حساب Xtream Codes API</h3>
            <p className="text-xs text-gray-400 mt-1">أدخل بيانات السيرفر الخاص بك لتزامن القنوات والباقات تلقائياً</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">رابط السيرفر (Server URL)</label>
              <input
                type="text"
                value={xtreamUrl}
                onChange={(e) => setXtreamUrl(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">اسم المستخدم (Username)</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">كلمة المرور (Password)</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <button
              onClick={() => {
                setIsConnected(true);
                alert('تم الاتصال بسيرفر Xtream بنجاح وتم تحميل الباقات!');
                setActiveSubTab('live');
              }}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 py-3.5 rounded-xl font-bold text-sm shadow-lg transition transform hover:scale-[1.02]"
            >
              اتصال وتحميل القنوات (Connect)
            </button>
          </div>
        </div>
      )}

      {/* Live TV & VOD Content */}
      {(activeSubTab === 'live' || activeSubTab === 'vod') && (
        <div>
          {/* Search & Categories */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div className="relative w-full md:w-80">
              <Search className="absolute right-4 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={activeSubTab === 'live' ? "ابحث عن قناة..." : "ابحث عن فيلم أو مسلسل..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900/80 border border-white/10 rounded-xl pr-11 pl-4 py-3 text-xs focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {(activeSubTab === 'live' ? categories : vodCategories).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition border ${selectedCategory === cat ? 'bg-cyan-600 text-white border-cyan-400 shadow-md' : 'bg-gray-900/60 text-gray-300 border-white/10 hover:bg-gray-800'}`}
                >
                  {cat === 'all' ? 'جميع التصنيفات' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Live Channels Grid */}
          {activeSubTab === 'live' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredChannels.map(channel => (
                <div
                  key={channel.id}
                  onClick={() => setPlayingItem({ title: channel.name, url: channel.streamUrl, type: 'live' })}
                  className="group bg-gray-900/80 hover:bg-gradient-to-b hover:from-cyan-950/60 hover:to-gray-900 border border-white/10 hover:border-cyan-500/50 rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer transition transform hover:-translate-y-1 shadow-xl relative overflow-hidden"
                >
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(channel.id); }}
                    className="absolute top-3 left-3 text-gray-400 hover:text-amber-400 transition"
                  >
                    <Star className={`w-4 h-4 ${channel.isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
                  </button>

                  <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-3xl mb-3 group-hover:scale-110 transition shadow-inner">
                    {channel.logo}
                  </div>
                  <h4 className="font-bold text-sm mb-1 line-clamp-1">{channel.name}</h4>
                  <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">
                    {channel.category.split('/')[0]}
                  </span>
                  <div className="mt-3 opacity-0 group-hover:opacity-100 transition flex items-center gap-1 text-xs text-emerald-400 font-bold">
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>تشغيل الآن</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* VOD Grid */}
          {activeSubTab === 'vod' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {filteredVods.map(vod => (
                <div
                  key={vod.id}
                  onClick={() => setPlayingItem({ title: vod.title, url: vod.streamUrl, type: 'vod' })}
                  className="group bg-gray-900/80 border border-white/10 hover:border-cyan-500/50 rounded-2xl overflow-hidden cursor-pointer transition transform hover:-translate-y-1 shadow-2xl flex flex-col"
                >
                  <div className="relative aspect-[2/3] overflow-hidden bg-gray-950">
                    <img src={vod.poster} alt={vod.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-amber-400 flex items-center gap-1 border border-white/10">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{vod.rating}</span>
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <div className="w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition">
                        <Play className="w-6 h-6 fill-white text-white ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow justify-between">
                    <div>
                      <h4 className="font-bold text-sm mb-1 line-clamp-1">{vod.title}</h4>
                      <p className="text-xs text-gray-400 line-clamp-2">{vod.description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10 text-[10px] text-gray-400">
                      <span>{vod.year}</span>
                      <span className="text-cyan-400 font-bold">{vod.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Video Player Modal */}
      {playingItem && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-5xl bg-gray-900 border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            <div className="px-6 py-4 bg-black/60 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                <h3 className="font-black text-base">{playingItem.title}</h3>
                <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2.5 py-0.5 rounded-md border border-cyan-500/30">
                  {playingItem.type === 'live' ? 'بث مباشر حي (HD)' : 'سينما VOD'}
                </span>
              </div>
              <button
                onClick={() => setPlayingItem(null)}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-xs font-bold transition"
              >
                إغلاق المشغل
              </button>
            </div>

            <div className="relative aspect-video bg-black flex items-center justify-center">
              <video
                src={playingItem.url}
                controls
                autoPlay
                className="w-full h-full object-contain"
                poster="https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=1200"
              />
            </div>

            <div className="px-6 py-4 bg-black/40 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
              <p>AZ SAT CONNECT Extreme Player - جودة عالية بدون تقطيع</p>
              <div className="flex items-center gap-4">
                <span>الصوت: ممتاز (AAC 5.1)</span>
                <span>الخادم: متصل (0ms Latency)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
