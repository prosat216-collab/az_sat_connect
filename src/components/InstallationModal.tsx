import React, { useState } from 'react';
import { X, Tv, Download, Smartphone, Copy, Check, ExternalLink, AlertTriangle, Globe, Sparkles } from 'lucide-react';
import { AppSettings } from '../types';
import { PWAInstallButton } from './PWAInstallButton';

interface InstallationModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
}

export const InstallationModal: React.FC<InstallationModalProps> = ({ isOpen, onClose, settings }) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!isOpen) return null;

  const appLiveUrl = window.location.origin;
  const adminLiveUrl = `${window.location.origin}/?admin=true`;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-4xl bg-gradient-to-b from-gray-900 via-gray-950 to-black border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden text-white relative my-8">
        {/* Header Modal */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Tv className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-cyan-200">
                دليل الحصول على ملف APK وتثبيت التطبيق على التلفاز والهاتف
              </h3>
              <p className="text-xs text-gray-400">
                طرق رسمية لتحويل {settings.storeName} إلى ملف APK أو تثبيته مباشرة على الجهاز
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Explanation Notice Banner */}
        <div className="p-6 pb-2">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <h4 className="font-bold text-amber-300">
                لماذا يفتح الرابط التطبيق في المتصفح ولا ينزل ملف APK مباشرة؟
              </h4>
              <p className="text-gray-300 leading-relaxed">
                هذا النظام هو تطبيق ويب سحابي (Web App)، والرابط <code className="bg-black/40 px-1 py-0.5 rounded text-amber-200 font-mono">{appLiveUrl}</code> يفتح التطبيق مباشرة للعمل فوراً.
                <strong className="text-emerald-400 block mt-1">
                  للحصول على ملف .apk حقيقي لتثبيته على أجهزة Android TV و Smart Box أو توزيعه عبر Downloader، اتبع إحدى الطرق الثلاث التالية:
                </strong>
              </p>
            </div>
          </div>
        </div>

        {/* 3 Main Methods */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Method 1: PWABuilder (1-Minute Real Signed APK) */}
            <div className="bg-white/5 border border-emerald-500/40 rounded-2xl p-5 flex flex-col justify-between hover:border-emerald-400 transition shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-sm">
                    1
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                    ملف APK حقيقي في دقيقة 📦
                  </span>
                </div>
                <h4 className="font-black text-sm text-white mb-2 flex items-center gap-2">
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>استخراج ملف APK الآن (PWABuilder)</span>
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed mb-3">
                  التطبيق مجهز الآن بملفات PWA الرسمية (Service Worker + أيقونات PNG). اضغط الزر أدناه لفتح أداة مايكروسوفت الرسمية وتحميل ملف <strong>.apk</strong> جاهز فوراً:
                </p>
                <div className="space-y-1 text-[11px] text-gray-300 bg-black/40 p-3 rounded-xl border border-white/5 mb-3">
                  <p>1. اضغط الزر الأخضر بالأسفل</p>
                  <p>2. اختر <strong>Package for Stores</strong></p>
                  <p>3. اختر <strong>Android</strong> وحمل الـ APK!</p>
                </div>
              </div>
              <div className="space-y-2">
                <PWAInstallButton variant="card" />
                <a
                  href={`https://www.pwabuilder.com/reportcard?site=${encodeURIComponent(appLiveUrl)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>توليد وتحميل ملف APK مجاناً</span>
                </a>
              </div>
            </div>

            {/* Method 2: Auto-Build APK via GitHub */}
            <div className="bg-white/5 border border-purple-500/40 rounded-2xl p-5 flex flex-col justify-between hover:border-purple-400 transition shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-sm">
                    2
                  </span>
                  <span className="text-[10px] bg-purple-500/20 text-purple-300 font-bold px-2 py-0.5 rounded-full">
                    بناء APK تلقائي عبر GitHub ⚙️
                  </span>
                </div>
                <h4 className="font-black text-sm text-white mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-purple-400" />
                  <span>بناء app.apk تلقائياً في GitHub</span>
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed mb-3">
                  تمت إضافة ملف البناء التلقائي <code className="text-purple-300 font-mono text-[10px]">.github/workflows/build-apk.yml</code> في المشروع.
                </p>
                <div className="space-y-1.5 text-[11px] text-gray-300 bg-black/40 p-3 rounded-xl border border-white/5 mb-3">
                  <p>1. اضغط زر <strong>GitHub</strong> أعلى المنصة وادفع الكود لمستودعك (CONNECT-TV)</p>
                  <p>2. سيقوم GitHub ببناء <strong>app.apk</strong> تلقائياً خلال 3 دقائق</p>
                  <p>3. ستجد ملف app.apk في تبويب <strong>Actions</strong> أو قسم <strong>Releases</strong>!</p>
                </div>
              </div>
              <a
                href="https://github.com/prosat216-colab/CONNECT-TV/releases"
                target="_blank"
                rel="noreferrer"
                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition"
              >
                <ExternalLink className="w-4 h-4" />
                <span>فتح صفحة Releases على GitHub</span>
              </a>
            </div>

            {/* Method 3: Downloader Browser Direct */}
            <div className="bg-white/5 border border-cyan-500/40 rounded-2xl p-5 flex flex-col justify-between hover:border-cyan-400 transition shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-sm">
                    3
                  </span>
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-300 font-bold px-2 py-0.5 rounded-full">
                    تشغيل فوري على التلفاز ⚡
                  </span>
                </div>
                <h4 className="font-black text-sm text-white mb-2 flex items-center gap-2">
                  <Tv className="w-4 h-4 text-cyan-400" />
                  <span>تشغيل مباشر عبر Downloader</span>
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed mb-4">
                  لا تنتظر ملف APK؛ افتح تطبيق <strong>Downloader</strong> على التلفاز، اختر <strong>Browser</strong> واكتب رابط موقعك المنشور مباشرة:
                </p>
                <div className="bg-black/60 p-2.5 rounded-xl border border-white/10 font-mono text-[11px] text-cyan-300 break-all select-all mb-3">
                  {appLiveUrl}
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(appLiveUrl, 'app')}
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition"
              >
                {copiedType === 'app' ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copiedType === 'app' ? 'تم النسخ بنجاح!' : 'نسخ الرابط لإدخاله في Downloader'}</span>
              </button>
            </div>

          </div>

          {/* Step-by-Step Downloader Illustrated Guide */}
          <div className="bg-black/50 border border-white/10 rounded-2xl p-5 space-y-4">
            <h4 className="font-bold text-base text-amber-300 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>شرح خطوة بخطوة: كيفية فتح التطبيق داخل جهاز التلفاز عبر تطبيق Downloader</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl space-y-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-gray-950 font-black flex items-center justify-center text-xs">1</span>
                <p className="font-bold text-white">تثبيت تطبيق Downloader</p>
                <p className="text-gray-400 text-[11px]">من متجر التلفاز Google Play Store أو Aptoide TV على جهاز الاستقبال أو Xiaomi Mi Box.</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl space-y-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-gray-950 font-black flex items-center justify-center text-xs">2</span>
                <p className="font-bold text-white">الدخول إلى قسم Browser</p>
                <p className="text-gray-400 text-[11px]">في القائمة اليسرى لتطبيق Downloader، اختر "Browser" (المتصفح المدمج).</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl space-y-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-gray-950 font-black flex items-center justify-center text-xs">3</span>
                <p className="font-bold text-white">كتابة رابط التطبيق</p>
                <p className="text-gray-400 text-[11px]">أدخل: <br/><strong className="text-cyan-300 font-mono text-[10px] break-all">{appLiveUrl}</strong></p>
              </div>

              <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl space-y-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-gray-950 font-black flex items-center justify-center text-xs">4</span>
                <p className="font-bold text-white">إضافة للمفضلة وشاشة كاملة</p>
                <p className="text-gray-400 text-[11px]">اضغط على زر الخيارات في الريموت واختر "Add Current Page to Favorites" لتشغيله دائماً بنقرة واحدة!</p>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="bg-gradient-to-r from-gray-900 to-black border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-right">
              <span className="text-xs text-amber-400 font-bold">لوحة التحكم المستقلة للإدارة والموزعين:</span>
              <p className="text-xs text-gray-300 font-mono">{adminLiveUrl}</p>
            </div>
            <button
              onClick={() => copyToClipboard(adminLiveUrl, 'admin')}
              className="bg-amber-500 hover:bg-amber-400 text-gray-950 font-black px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition shadow-lg"
            >
              {copiedType === 'admin' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedType === 'admin' ? 'تم نسخ رابط الإدارة!' : 'نسخ رابط لوحة التحكم'}</span>
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-black/60 border-t border-white/10 flex justify-between items-center text-xs text-gray-400">
          <span>{settings.storeName} • واتساب الدعم الفني: {settings.whatsapp}</span>
          <button
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-xl transition font-bold"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
