import React, { useState } from 'react';
import { Header } from './components/Header';
import { RemoteControlBar } from './components/RemoteControlBar';
import { XtremePlayer } from './components/XtremePlayer';
import { TunisianRadios } from './components/TunisianRadios';
import { LiveMatches } from './components/LiveMatches';
import { QuranKareem } from './components/QuranKareem';
import { AdminPanel } from './components/AdminPanel';
import { ThemeSettings } from './components/ThemeSettings';
import { ActivationModal } from './components/ActivationModal';
import { InstallationModal } from './components/InstallationModal';
import { OfflineIndicator } from './components/PWAInstallButton';
import { initialSettings, wallpapers, colorThemes } from './data/mockData';
import { AppSettings } from './types';
import { Tv, Radio, Trophy, BookOpen, Shield, Play, Settings, Smartphone, MessageCircle, ExternalLink, Star, Download } from 'lucide-react';

export default function App() {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('connect_tv_app_settings');
    if (saved) {
      try {
        return { ...initialSettings, ...JSON.parse(saved) };
      } catch {
        return initialSettings;
      }
    }
    return initialSettings;
  });

  const handleUpdateSettings: React.Dispatch<React.SetStateAction<AppSettings>> = (newVal) => {
    setSettings(prev => {
      const updated = typeof newVal === 'function' ? newVal(prev) : newVal;
      localStorage.setItem('connect_tv_app_settings', JSON.stringify(updated));
      return updated;
    });
  };

  const [activeTab, setActiveTab] = useState<string>('home');
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isThemeOpen, setIsThemeOpen] = useState<boolean>(false);
  const [isActivationOpen, setIsActivationOpen] = useState<boolean>(false);
  const [isInstallationOpen, setIsInstallationOpen] = useState<boolean>(false);

  // Auto-open Admin Panel if accessed via independent Admin URL (?admin=true or #admin)
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true' || window.location.hash === '#admin') {
      setIsAdminOpen(true);
    }
  }, []);

  const currentWallpaper = wallpapers.find(w => w.id === settings.backgroundWallpaper)?.url || wallpapers[0].url;

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center text-white relative select-none font-sans overflow-x-hidden"
      style={{ backgroundImage: `url(${currentWallpaper})` }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-black/95 backdrop-blur-sm z-0"></div>

      {/* Header */}
      <div className="relative z-20">
        <Header
          settings={settings}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setIsAdminOpen={setIsAdminOpen}
          setIsThemeOpen={setIsThemeOpen}
          setIsActivationOpen={setIsActivationOpen}
          setIsInstallationOpen={setIsInstallationOpen}
        />
      </div>

      {/* Main Content Body */}
      <main className="flex-grow relative z-20 flex flex-col justify-center">
        {activeTab === 'home' && (
          <div className="w-full max-w-7xl mx-auto px-4 py-8">
            {/* Welcome banner with phone number */}
            <div className="bg-gradient-to-r from-black/80 via-gray-900/90 to-black/80 border border-white/10 rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-right">
                <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-3.5 py-1.5 rounded-full text-xs font-bold border border-emerald-500/30">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>رقم الهاتف والدعم: {settings.whatsapp} • متصل عالمياً عبر APK</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black bg-gradient-to-r from-white via-gray-200 to-emerald-300 bg-clip-text text-transparent">
                  مرحباً بكم عند {settings.storeName}
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
                  {settings.welcomeMessage} • استمتع ببث IPTV فائق الجودة، القنوات الحية، راديوات تونس الكاملة، مباريات اليوم، والقرآن الكريم.
                </p>
              </div>

              <div className="flex items-center gap-3 flex-wrap justify-center">
                <button
                  onClick={() => setIsInstallationOpen(true)}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-5 py-3.5 rounded-2xl font-black text-sm shadow-xl transition transform hover:scale-105 flex items-center gap-2 border border-emerald-400/40"
                >
                  <Download className="w-5 h-5 text-emerald-200" />
                  <span>تثبيت التطبيق على التلفاز (APK / Downloader)</span>
                </button>

                <button
                  onClick={() => setActiveTab('xtreme')}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-6 py-3.5 rounded-2xl font-black text-sm shadow-xl transition transform hover:scale-105 flex items-center gap-2 border border-cyan-400/40"
                >
                  <Tv className="w-5 h-5" />
                  <span>CONNECT TV (IPTV)</span>
                </button>
              </div>
            </div>

            {/* Smart TV Launcher Main Grid with Correct Gorgeous Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Card 1: CONNECT TV */}
              <div
                onClick={() => setActiveTab('xtreme')}
                className="group relative rounded-3xl overflow-hidden border border-cyan-500/30 hover:border-cyan-400 cursor-pointer transition transform hover:-translate-y-2 shadow-2xl flex flex-col justify-end aspect-[4/3]"
              >
                <div className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-110" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=800')` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                <div className="relative p-6 z-10">
                  <div className="w-12 h-12 bg-cyan-600 text-white rounded-2xl flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition">
                    <Tv className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black mb-1 text-cyan-200">CONNECT TV</h3>
                  <p className="text-xs text-gray-300 line-clamp-2">بث حي للقنوات التونسية والعالمية، والأفلام والمسلسلات VOD.</p>
                </div>
              </div>

              {/* Card 2: Tunisian Radios */}
              <div
                onClick={() => setActiveTab('radios')}
                className="group relative rounded-3xl overflow-hidden border border-amber-500/30 hover:border-amber-400 cursor-pointer transition transform hover:-translate-y-2 shadow-2xl flex flex-col justify-end aspect-[4/3]"
              >
                <div className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-110" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800')` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                <div className="relative p-6 z-10">
                  <div className="w-12 h-12 bg-amber-600 text-white rounded-2xl flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition">
                    <Radio className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black mb-1 text-amber-200">راديوات تونس كاملة</h3>
                  <p className="text-xs text-gray-300 line-clamp-2">أكثر من 18 إذاعة تونسية وطنية وجهوية بث مباشر فائق النقاء.</p>
                </div>
              </div>

              {/* Card 3: Live Matches (Corrected Football Pitch Image) */}
              <div
                onClick={() => setActiveTab('matches')}
                className="group relative rounded-3xl overflow-hidden border border-emerald-500/30 hover:border-emerald-400 cursor-pointer transition transform hover:-translate-y-2 shadow-2xl flex flex-col justify-end aspect-[4/3]"
              >
                <div className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-110" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800')` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                <div className="relative p-6 z-10">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black mb-1 text-emerald-200">مباريات اليوم (Flashscore)</h3>
                  <p className="text-xs text-gray-300 line-clamp-2">تابع النتائج المباشرة وأجمل مباريات البطولات المحلية والعالمية.</p>
                </div>
              </div>

              {/* Card 4: Quran Kareem (Authentic Quran Book Image) */}
              <div
                onClick={() => setActiveTab('quran')}
                className="group relative rounded-3xl overflow-hidden border border-teal-500/30 hover:border-teal-400 cursor-pointer transition transform hover:-translate-y-2 shadow-2xl flex flex-col justify-end aspect-[4/3]"
              >
                <div className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-110" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=800')` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                <div className="relative p-6 z-10">
                  <div className="w-12 h-12 bg-teal-600 text-white rounded-2xl flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black mb-1 text-teal-200">القرآن الكريم</h3>
                  <p className="text-xs text-gray-300 line-clamp-2">114 سورة كاملة بصوت أشهر قراء العالم الإسلامي.</p>
                </div>
              </div>

            </div>
          </div>
        )}

        {activeTab === 'xtreme' && <XtremePlayer onBack={() => setActiveTab('home')} />}
        {activeTab === 'radios' && <TunisianRadios onBack={() => setActiveTab('home')} />}
        {activeTab === 'matches' && <LiveMatches onBack={() => setActiveTab('home')} />}
        {activeTab === 'quran' && <QuranKareem onBack={() => setActiveTab('home')} />}
      </main>

      {/* Footer Remote Control Bar */}
      <div className="relative z-20">
        <RemoteControlBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setIsAdminOpen={setIsAdminOpen}
        />
      </div>

      {/* Modals */}
      {isAdminOpen && (
        <AdminPanel
          settings={settings}
          setSettings={handleUpdateSettings}
          onClose={() => setIsAdminOpen(false)}
        />
      )}

      {isThemeOpen && (
        <ThemeSettings
          settings={settings}
          setSettings={handleUpdateSettings}
          onClose={() => setIsThemeOpen(false)}
        />
      )}

      {isActivationOpen && (
        <ActivationModal
          onClose={() => setIsActivationOpen(false)}
        />
      )}

      <InstallationModal
        isOpen={isInstallationOpen}
        onClose={() => setIsInstallationOpen(false)}
        settings={settings}
      />

      <OfflineIndicator />
    </div>
  );
}
