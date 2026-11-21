import React, { useState } from 'react';
import { Tv, Key, X, CheckCircle2, AlertCircle } from 'lucide-react';

interface ActivationModalProps {
  onClose: () => void;
}

export const ActivationModal: React.FC<ActivationModalProps> = ({ onClose }) => {
  const [code, setCode] = useState('W2GQ9');
  const [isActivated, setIsActivated] = useState(false);

  const handleActivate = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      setIsActivated(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900 border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        <div className="px-6 py-4 bg-black/60 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center border border-blue-500/30">
              <Tv className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">تفعيل جهاز أندرويد بوكس (Activation)</h3>
              <p className="text-xs text-gray-400">أدخل رمز الجهاز للتحقق من الاشتراك</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 text-white">
          {isActivated ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-black text-lg text-emerald-300">تم تفعيل الجهاز بنجاح!</h4>
              <p className="text-xs text-gray-300">الاشتراك ساري المفعول حتى 2027-11-19 (+1An)</p>
            </div>
          ) : (
            <form onSubmit={handleActivate} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">رمز الجهاز (Device Activation Code)</label>
                <div className="relative">
                  <Key className="absolute right-4 top-3.5 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="W2GQ9"
                    className="w-full bg-black/50 border border-white/10 rounded-xl pr-11 pl-4 py-3 text-base font-mono font-bold tracking-widest text-blue-300 focus:border-blue-500 focus:outline-none uppercase"
                    required
                  />
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 text-xs text-blue-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>يتم إنشاء وتفعيل هذا الكود من لوحة التحكم المستقلة الخاصة بالمتجر لتأمين اشتراكك.</span>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-xl text-xs transition shadow-lg"
              >
                تفعيل الاشتراك الآن (Activate Box)
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
