import React, { useState, useEffect } from 'react';
import { Settings, Shield, Palette, Radio, Tv, Smartphone, RefreshCw, MessageCircle } from 'lucide-react';
import { AppSettings } from '../types';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  settings: AppSettings;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setIsAdminOpen: (open: boolean) => void;
  setIsThemeOpen: (open: boolean) => void;
  setIsActivationOpen: (open: boolean) => void;
  setIsInstallationOpen?: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  activeTab,
  setActiveTab,
  setIsAdminOpen,
  setIsThemeOpen,
  setIsActivationOpen,
  setIsInstallationOpen
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString('ar-TN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formattedDate = currentTime.toLocaleDateString('ar-TN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <header className="w-full bg-black/60 backdrop-blur-md border-b border-white/10 text-white px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl z-30 relative">
      {/* Brand & Logo */}
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveTab('home')}>
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-70 animate-pulse"></div>
          <div className="relative w-12 h-12 bg-gray-900 border border-white/20 rounded-xl flex items-center justify-center overflow-hidden">
            <img src={settings.logoUrl} alt="Logo" className="w-full h-full object-cover" />
          </div>
        </div>
        <div>
          <h1 className="text-xl font-black tracking-wider bg-gradient-to-r from-white via-emerald-200 to-emerald-400 bg-clip-text text-transparent">
            {settings.storeName}
          </h1>
          <p className="text-xs text-emerald-400 font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            Smart TV & IPTV Portal v{settings.versionName} • APK Ready
          </p>
        </div>
      </div>

      {/* Center Widget: Weather & Time & Prayer countdown */}
      <div className="hidden lg:flex items-center gap-6 bg-white/5 border border-white/10 px-5 py-2 rounded-2xl text-xs">
        <div className="flex items-center gap-2 border-l border-white/10 pl-6">
          <span className="text-2xl">🌤️</span>
          <div>
            <p className="font-bold">تونس العاصمة 29°C</p>
            <p className="text-gray-400">غيون متفرقة</p>
          </div>
        </div>

        <div className="flex items-center gap-2 border-l border-white/10 pl-6">
          <span className="text-2xl">🕌</span>
          <div>
            <p className="font-bold text-emerald-400">الصلاة القادمة: صلاة العشاء</p>
            <p className="text-gray-300">يتبقى 01:14:32</p>
          </div>
        </div>

        <div className="text-right">
          <p className="font-mono text-base font-bold text-emerald-300">{formattedTime}</p>
          <p className="text-gray-400">{formattedDate}</p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 flex-wrap justify-center">
        <a
          href={`https://wa.me/${settings.whatsapp.replace('+', '')}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 bg-emerald-600/80 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-lg hover:scale-105 border border-emerald-400/40"
        >
          <MessageCircle className="w-4 h-4 text-emerald-200" />
          <span>واتساب الدعم</span>
        </a>

        <PWAInstallButton variant="header" />

        {setIsInstallationOpen && (
          <button
            onClick={() => setIsInstallationOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-lg hover:scale-105 border border-emerald-400/40"
            title="طرق تثبيت التطبيق على التلفاز والهاتف"
          >
            <Smartphone className="w-4 h-4 text-emerald-200" />
            <span>تثبيت APK / Downloader</span>
          </button>
        )}

        <button
          onClick={() => setIsActivationOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-lg hover:scale-105 border border-blue-400/40"
        >
          <Tv className="w-4 h-4 text-blue-200" />
          <span>تفعيل الجهاز (W2GQ9)</span>
        </button>

        <button
          onClick={() => setIsThemeOpen(true)}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-xl text-xs font-bold transition border border-white/10 hover:border-white/30"
          title="تغيير الخلفية والألوان"
        >
          <Palette className="w-4 h-4 text-pink-400" />
          <span className="hidden sm:inline">الخلفية والمظهر</span>
        </button>

        <button
          onClick={() => setIsAdminOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-gray-950 px-4 py-2 rounded-xl text-xs font-black transition shadow-lg hover:scale-105 border border-amber-300"
        >
          <Shield className="w-4 h-4 text-gray-950" />
          <span>لوحة التحكم المستقلة</span>
        </button>
      </div>
    </header>
  );
};
