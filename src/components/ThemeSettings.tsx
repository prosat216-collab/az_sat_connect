import React from 'react';
import { Palette, X, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { AppSettings } from '../types';
import { wallpapers, colorThemes } from '../data/mockData';

interface ThemeSettingsProps {
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
  onClose: () => void;
}

export const ThemeSettings: React.FC<ThemeSettingsProps> = ({ settings, setSettings, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-gray-900 border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        <div className="px-6 py-4 bg-black/60 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-500/20 text-pink-400 rounded-xl flex items-center justify-center border border-pink-500/30">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">تخصيص الخلفيات والألوان (Wallpapers & Themes)</h3>
              <p className="text-xs text-gray-400">اختر خلفية التلفاز المفضلة وألوان الواجهة العصرية</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto max-h-[80vh] text-white">
          {/* Wallpapers */}
          <div>
            <h4 className="font-bold text-sm text-pink-400 mb-3 flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              <span>الخلفيات المتاحة (Arrière-plan)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {wallpapers.map(wp => {
                const isSelected = settings.backgroundWallpaper === wp.id;
                return (
                  <div
                    key={wp.id}
                    onClick={() => setSettings({ ...settings, backgroundWallpaper: wp.id })}
                    className={`group relative rounded-2xl overflow-hidden border-2 cursor-pointer transition transform hover:scale-[1.02] ${isSelected ? 'border-pink-500 shadow-xl shadow-pink-500/20' : 'border-white/10'}`}
                  >
                    <div className="aspect-video relative">
                      <img src={wp.url} alt={wp.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition"></div>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-between">
                      <span className="font-bold text-xs">{wp.name}</span>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-pink-400 fill-white" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Color Themes */}
          <div>
            <h4 className="font-bold text-sm text-pink-400 mb-3 flex items-center gap-2">
              <Palette className="w-4 h-4" />
              <span>ألوان الواجهة (Color Themes)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {colorThemes.map(th => {
                const isSelected = settings.colorTheme === th.id;
                return (
                  <div
                    key={th.id}
                    onClick={() => setSettings({ ...settings, colorTheme: th.id })}
                    className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${isSelected ? 'bg-white/10 border-pink-500 shadow-lg' : 'bg-black/40 border-white/10 hover:bg-white/5'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl bg-gradient-to-r ${th.primary} shadow-md`}></div>
                      <span className="font-bold text-xs">{th.name}</span>
                    </div>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-pink-400" />}
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-3.5 rounded-xl text-xs transition shadow-lg"
          >
            تطبيق وحفظ التغييرات
          </button>
        </div>
      </div>
    </div>
  );
};
