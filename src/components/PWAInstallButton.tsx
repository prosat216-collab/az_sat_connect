import React, { useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';
import { usePWAInstall, useOnlineStatus } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC<{ variant?: 'header' | 'card' }> = ({ variant = 'header' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        onClick={install}
        className={
          variant === 'card'
            ? 'w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-gray-950 font-black py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-lg'
            : 'flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-gray-950 px-3.5 py-2 rounded-xl text-xs font-black transition shadow-lg hover:scale-105 border border-emerald-300'
        }
      >
        <Download className="w-4 h-4" />
        <span>تثبيت التطبيق الآن (Install App)</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-2 bg-emerald-600/80 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-lg border border-emerald-400/40"
        >
          <Smartphone className="w-4 h-4" />
          <span>تثبيت على iPhone</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div className="w-full max-w-sm rounded-2xl bg-gray-900 border border-emerald-500/40 p-6 shadow-2xl text-white space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-emerald-300">تثبيت التطبيق على iPhone / iPad</h3>
                <button onClick={() => setShowIOSGuide(false)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                1. اضغط على زر <strong>المشاركة (Share)</strong> في متصفح Safari.<br />
                2. مرر للأسفل واختر <strong>إضافة إلى الشاشة الرئيسية (Add to Home Screen)</strong>.
              </p>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 py-2.5 text-xs font-bold text-white transition"
              >
                حسناً
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-20 left-4 z-50 flex items-center gap-2 rounded-xl bg-amber-600 px-3.5 py-2 text-xs font-bold text-white shadow-xl border border-amber-400/40">
      <span className="h-2.5 w-2.5 rounded-full bg-white animate-pulse" />
      <span>وضع عدم الاتصال — يتم عرض البيانات المحفوظة</span>
    </div>
  );
};
