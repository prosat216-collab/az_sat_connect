import React, { useState } from 'react';
import { Shield, Tv, Users, FolderDown, Store, MessageSquare, Settings, Plus, Trash2, CheckCircle2, Lock, X, RefreshCw, Key, Download, Smartphone, Upload, Wifi, Activity, Check, Image as ImageIcon, LogOut, UserCheck, Copy, ExternalLink, AlertTriangle, Globe, Sparkles } from 'lucide-react';
import { AppSettings, DeviceSubscription, Reseller, ApkItem } from '../types';
import { initialSubscriptions, initialResellers, initialApks } from '../data/mockData';

interface AdminPanelProps {
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ settings, setSettings, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [usernameInput, setUsernameInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');

  // Admin login credentials with persistence in localStorage
  const [adminUsername, setAdminUsername] = useState<string>(() => {
    return localStorage.getItem('connect_tv_admin_username') || 'admin';
  });
  const [adminPassword, setAdminPassword] = useState<string>(() => {
    return localStorage.getItem('connect_tv_admin_password') || 'admin';
  });

  // Password / Username Change Form States
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newUsernameInput, setNewUsernameInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');

  const [activeTab, setActiveTab] = useState<'dashboard' | 'boxes' | 'resellers' | 'apks' | 'store' | 'apkbuilder' | 'settings'>('dashboard');
  const [subscriptions, setSubscriptions] = useState<DeviceSubscription[]>(initialSubscriptions);
  const [resellers, setResellers] = useState<Reseller[]>(initialResellers);
  const [apks, setApks] = useState<ApkItem[]>(initialApks);

  // Form states for adding device with Xtream and APK subscriptions
  const [newClientName, setNewClientName] = useState('');
  const [newBoxModel, setNewBoxModel] = useState('');
  const [newClientCode, setNewClientCode] = useState('');
  const [xtreamUrl, setXtreamUrl] = useState('http://xtream.azsat.net:8080');
  const [xtreamUser, setXtreamUser] = useState('');
  const [xtreamPass, setXtreamPass] = useState('');
  const [selectedApkSubs, setSelectedApkSubs] = useState<string[]>(['Max Player 4K', 'FullBox IPTV']);

  const [newApkName, setNewApkName] = useState('');
  const [newApkPackage, setNewApkPackage] = useState('');
  const [uploadedApkFileName, setUploadedApkFileName] = useState('');
  const [newApkImagePreview, setNewApkImagePreview] = useState<string>('');

  // Reseller Form states
  const [newResellerBoutique, setNewResellerBoutique] = useState('');
  const [newResellerUsername, setNewResellerUsername] = useState('');
  const [newResellerPassword, setNewResellerPassword] = useState('');
  const [newResellerWhatsapp, setNewResellerWhatsapp] = useState('');
  const [newResellerMaxBoxes, setNewResellerMaxBoxes] = useState<number>(100);
  const [newResellerLogo, setNewResellerLogo] = useState<string>('');
  const [customApkUrlInput, setCustomApkUrlInput] = useState(settings.apkDownloadUrl);

  const handleSaveApkDownloadUrl = (e: React.FormEvent) => {
    e.preventDefault();
    setSettings(prev => ({ ...prev, apkDownloadUrl: customApkUrlInput.trim() }));
    alert('تم حفظ رابط تحميل ملف APK المباشر بنجاح! سيتم توزيعه في جميع روابط Downloader والتلفاز.');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput.trim() === adminUsername && passwordInput === adminPassword) {
      setIsAuthenticated(true);
    } else {
      alert('اسم المستخدم أو كلمة المرور غير صحيحة!');
    }
  };

  const handleChangeCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPasswordInput !== adminPassword) {
      alert('كلمة المرور الحالية غير صحيحة! يرجى إدخال كلمة المرور الحالية للتأكيد.');
      return;
    }
    if (newPasswordInput && newPasswordInput !== confirmPasswordInput) {
      alert('كلمة المرور الجديدة وتأكيدها غير متطابقين!');
      return;
    }

    const updatedUser = newUsernameInput.trim() || adminUsername;
    const updatedPass = newPasswordInput.trim() || adminPassword;

    setAdminUsername(updatedUser);
    setAdminPassword(updatedPass);
    localStorage.setItem('connect_tv_admin_username', updatedUser);
    localStorage.setItem('connect_tv_admin_password', updatedPass);

    setCurrentPasswordInput('');
    setNewUsernameInput('');
    setNewPasswordInput('');
    setConfirmPasswordInput('');

    alert(`تم تحديث اسم المستخدم وكلمة السر بنجاح!\nاسم المستخدم الجديد: ${updatedUser}`);
  };

  const handleAddBox = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName || !newBoxModel) return;
    const newSub: DeviceSubscription = {
      id: `sub-${Date.now()}`,
      clientName: newClientName,
      code: newClientCode || Math.random().toString(36).substring(2, 7).toUpperCase(),
      boxModel: newBoxModel,
      reseller: 'CONNECT TV',
      expireDate: '2027-11-19',
      status: 'active',
      xtreamUsername: xtreamUser || 'user_connect',
      xtreamPassword: xtreamPass || 'pass123',
      xtreamUrl: xtreamUrl || 'http://xtream.azsat.net:8080'
    };
    setSubscriptions([newSub, ...subscriptions]);
    setNewClientName('');
    setNewBoxModel('');
    setNewClientCode('');
    setXtreamUser('');
    setXtreamPass('');
    alert('تم تفعيل جهاز العميل CONNECT TV عبر Xtreme وربط اشتراكات APK بنجاح!');
  };

  const handleAppImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          const imgUrl = uploadEvent.target.result as string;
          setNewApkImagePreview(imgUrl);
          alert('تم اختيار صورة التطبيق من الحاسوب بنجاح!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateSingleApkImage = (apkId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          const newImg = uploadEvent.target.result as string;
          setApks(prev => prev.map(a => a.id === apkId ? { ...a, iconUrl: newImg } : a));
          alert('تم تحديث صورة التطبيق والاشتراك من الحاسوب بنجاح!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUploadApk = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedApkFileName(file.name);
      const appName = newApkName.trim() || file.name.replace('.apk', '');
      const newApk: ApkItem = {
        id: `apk-${Date.now()}`,
        name: appName,
        packageName: newApkPackage.trim() || `com.custom.${file.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
        version: '1.0',
        iconUrl: newApkImagePreview || 'https://cdn-icons-png.flaticon.com/512/3076/3076785.png',
        apkUrl: URL.createObjectURL(file),
        visibility: 'Client',
        pinProtected: false
      };
      setApks([newApk, ...apks]);
      setNewApkName('');
      setNewApkPackage('');
      setNewApkImagePreview('');
      alert(`تم إضافة تطبيق (${appName}) مع صورة الاشتراك من الحاسوب بنجاح!`);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setSettings({ ...settings, logoUrl: uploadEvent.target.result as string });
          alert('تم تحديث شعار التطبيق من الحاسوب بنجاح!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteBox = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الجهاز؟')) {
      setSubscriptions(subscriptions.filter(s => s.id !== id));
    }
  };

  const handleResellerLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setNewResellerLogo(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddReseller = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResellerBoutique.trim() || !newResellerUsername.trim() || !newResellerPassword.trim()) {
      alert('يرجى ملء الحقول المطلوبة: اسم البوتيك، اسم المستخدم، وكلمة المرور للموزع!');
      return;
    }
    const newRes: Reseller = {
      id: `res-${Date.now()}`,
      boutiqueName: newResellerBoutique.trim(),
      username: newResellerUsername.trim(),
      password: newResellerPassword.trim(),
      whatsapp: newResellerWhatsapp.trim() || settings.whatsapp,
      logoUrl: newResellerLogo || 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=200',
      maxBoxes: Number(newResellerMaxBoxes) || 100,
      activeBoxes: 0
    };
    setResellers([newRes, ...resellers]);
    setNewResellerBoutique('');
    setNewResellerUsername('');
    setNewResellerPassword('');
    setNewResellerWhatsapp('');
    setNewResellerMaxBoxes(100);
    setNewResellerLogo('');
    alert(`تم إنشاء حساب الموزع الجديد بنجاح!\nاسم المستخدم: ${newRes.username}\nكلمة المرور: ${newRes.password}`);
  };

  const handleDeleteReseller = (id: string) => {
    if (confirm('هل أنت متأكد من حذف حساب هذا الموزع؟')) {
      setResellers(resellers.filter(r => r.id !== id));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gray-900 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden p-8 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-6 left-6 text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-tr from-amber-500 to-yellow-600 text-gray-950 rounded-2xl mx-auto flex items-center justify-center font-black text-2xl shadow-xl mb-3">
              👑
            </div>
            <h3 className="text-xl font-black text-amber-300">CONNECT TV - لوحة التحكم المستقلة</h3>
            <p className="text-xs text-gray-400 mt-1">الرابط الآمن لإدارة الأجهزة، الاشتراكات، وبيع التطبيقات</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs text-gray-300 mb-1">اسم المستخدم (Username)</label>
              <input
                type="text"
                placeholder="admin"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-gray-300 mb-1">كلمة المرور (Password)</label>
              <input
                type="password"
                placeholder="admin"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-gray-950 font-black py-3.5 rounded-xl text-sm transition shadow-lg"
            >
              تسجيل الدخول للوحة التحكم
            </button>
            <p className="text-[10px] text-center text-gray-400 mt-2">
              {adminUsername === 'admin' ? 'الافتراضي: admin / admin' : `اسم المستخدم الحالي: ${adminUsername}`}
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-7xl bg-gray-900 border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Admin Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-amber-950 via-gray-900 to-amber-950 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-gray-950 font-black shadow-lg">
              👑
            </div>
            <div>
              <h2 className="text-lg font-black text-amber-300">CONNECT TV - SUPER ADMIN CONTROL PANEL</h2>
              <p className="text-xs text-gray-400">لوحة التحكم المستقلة لإدارة الأجهزة، الاشتراكات، ومكتبة APK للبيع في العالم</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsAuthenticated(false);
                setUsernameInput('');
                setPasswordInput('');
              }}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              title="تسجيل الخروج من لوحة التحكم"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">تسجيل الخروج</span>
            </button>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Admin Layout */}
        <div className="flex flex-col lg:flex-row flex-grow overflow-hidden">
          
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-72 bg-black/50 border-b lg:border-b-0 lg:border-l border-white/10 p-4 flex lg:flex-col gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition whitespace-nowrap ${activeTab === 'dashboard' ? 'bg-amber-500 text-gray-950 shadow-lg' : 'text-gray-300 hover:bg-white/5'}`}
            >
              <Shield className="w-4 h-4" />
              <span>لوحة القيادة (Dashboard)</span>
            </button>

            <button
              onClick={() => setActiveTab('boxes')}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition whitespace-nowrap ${activeTab === 'boxes' ? 'bg-amber-500 text-gray-950 shadow-lg' : 'text-gray-300 hover:bg-white/5'}`}
            >
              <Tv className="w-4 h-4" />
              <span>إدارة الأجهزة واشتراكات Xtreme ({subscriptions.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('resellers')}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition whitespace-nowrap ${activeTab === 'resellers' ? 'bg-amber-500 text-gray-950 shadow-lg' : 'text-gray-300 hover:bg-white/5'}`}
            >
              <Users className="w-4 h-4" />
              <span>المرخصون والرواد (Resellers)</span>
            </button>

            <button
              onClick={() => setActiveTab('apks')}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition whitespace-nowrap ${activeTab === 'apks' ? 'bg-amber-500 text-gray-950 shadow-lg' : 'text-gray-300 hover:bg-white/5'}`}
            >
              <FolderDown className="w-4 h-4" />
              <span>مكتبة APK واشتراكات التطبيقات ({apks.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('apkbuilder')}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition whitespace-nowrap ${activeTab === 'apkbuilder' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg' : 'text-gray-300 hover:bg-white/5'}`}
            >
              <Smartphone className="w-4 h-4" />
              <span>إنشاء وبيع تطبيق APK 🚀</span>
            </button>

            <button
              onClick={() => setActiveTab('store')}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition whitespace-nowrap ${activeTab === 'store' ? 'bg-amber-500 text-gray-950 shadow-lg' : 'text-gray-300 hover:bg-white/5'}`}
            >
              <Store className="w-4 h-4" />
              <span>صور البوتيك والمتجر</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition whitespace-nowrap ${activeTab === 'settings' ? 'bg-amber-500 text-gray-950 shadow-lg' : 'text-gray-300 hover:bg-white/5'}`}
            >
              <Settings className="w-4 h-4" />
              <span>الإعدادات وتغيير كلمة السر</span>
            </button>
          </div>

          {/* Main Content Area */}
          <div className="flex-grow p-6 overflow-y-auto text-white">
            
            {/* 1. Dashboard Tab with Internet Status */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-amber-300">إحصائيات المنصة وحالة الإنترنت</h3>
                  <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 px-3.5 py-1.5 rounded-xl text-xs text-emerald-400 font-bold">
                    <Wifi className="w-4 h-4 animate-pulse" />
                    <span>حالة الإنترنت: متصل (100 Mbps - Ping 12ms)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                    <p className="text-xs text-gray-400 mb-1">إجمالي المشتركين (Total Abonnés)</p>
                    <p className="text-3xl font-black text-amber-400">{subscriptions.length}</p>
                    <span className="text-[10px] text-emerald-400 mt-2 block">✓ جميع الأجهزة نشطة ومتصلة</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                    <p className="text-xs text-gray-400 mb-1">الأجهزة النشطة (Actifs)</p>
                    <p className="text-3xl font-black text-emerald-400">{subscriptions.filter(s => s.status === 'active').length}</p>
                    <span className="text-[10px] text-emerald-400 mt-2 block">✓ جاهزة للبث بدون تقطيع</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                    <p className="text-xs text-gray-400 mb-1">مكتبة التطبيقات (APKs)</p>
                    <p className="text-3xl font-black text-cyan-400">{apks.length}</p>
                    <span className="text-[10px] text-cyan-400 mt-2 block">✓ تطبيقات مدمجة ومحدثة</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                    <p className="text-xs text-gray-400 mb-1">حالة السيرفر (Server Status)</p>
                    <p className="text-3xl font-black text-purple-400">99.9%</p>
                    <span className="text-[10px] text-purple-400 mt-2 block">✓ خادم آمن ومتصل بالعالم</span>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Boxes & Subscriptions Tab (Activer CONNECT TV via Xtreme & APK Subscriptions) */}
            {activeTab === 'boxes' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <h3 className="text-xl font-bold text-amber-300">تفعيل CONNECT TV عبر Xtreme وإضافة اشتراكات APK للأجهزة</h3>
                </div>

                <form onSubmit={handleAddBox} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-gray-300 mb-1">اسم العميل / البوكس</label>
                      <input
                        type="text"
                        placeholder="مثال: ATEF IPTV"
                        value={newClientName}
                        onChange={(e) => setNewClientName(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:border-amber-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-300 mb-1">موديل الجهاز (Box Model)</label>
                      <input
                        type="text"
                        placeholder="مثال: Xiaomi MiTV Box"
                        value={newBoxModel}
                        onChange={(e) => setNewBoxModel(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:border-amber-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-300 mb-1">رمز التفعيل (Code)</label>
                      <input
                        type="text"
                        placeholder="W2GQ9"
                        value={newClientCode}
                        onChange={(e) => setNewClientCode(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono uppercase focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-white/10">
                    <div>
                      <label className="block text-xs text-gray-300 mb-1">رابط سيرفر Xtreme (CONNECT TV)</label>
                      <input
                        type="text"
                        value={xtreamUrl}
                        onChange={(e) => setXtreamUrl(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-300 mb-1">اسم مستخدم Xtreme</label>
                      <input
                        type="text"
                        placeholder="user_connect"
                        value={xtreamUser}
                        onChange={(e) => setXtreamUser(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-300 mb-1">كلمة مرور Xtreme</label>
                      <input
                        type="password"
                        placeholder="••••••"
                        value={xtreamPass}
                        onChange={(e) => setXtreamPass(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Selecting APK subscriptions to attach to the device */}
                  <div className="pt-2 border-t border-white/10">
                    <label className="block text-xs font-bold text-amber-300 mb-2">إضافة اشتراكات تطبيقات APK وتثبيتها تلقائياً على الجهاز:</label>
                    <div className="flex flex-wrap gap-3">
                      {apks.map(apk => {
                        const isSelected = selectedApkSubs.includes(apk.name);
                        return (
                          <div
                            key={apk.id}
                            onClick={() => {
                              if (isSelected) {
                                setSelectedApkSubs(selectedApkSubs.filter(n => n !== apk.name));
                              } else {
                                setSelectedApkSubs([...selectedApkSubs, apk.name]);
                              }
                            }}
                            className={`px-3.5 py-2 rounded-xl border text-xs cursor-pointer flex items-center gap-2 transition ${isSelected ? 'bg-amber-500 text-gray-950 font-bold border-amber-400 shadow-lg' : 'bg-black/50 text-gray-300 border-white/10'}`}
                          >
                            <img src={apk.iconUrl} alt={apk.name} className="w-5 h-5 rounded object-contain bg-white/20 p-0.5" />
                            <span>{apk.name}</span>
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 text-gray-950 font-black py-3 rounded-xl text-xs transition shadow-lg flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>تفعيل الجهاز وربط اشتراكات Xtreme و APK كاملاً</span>
                  </button>
                </form>

                <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-white/5 text-gray-400 border-b border-white/10">
                      <tr>
                        <th className="p-4">العميل / البوكس</th>
                        <th className="p-4">رمز التفعيل (Code)</th>
                        <th className="p-4">موديل الجهاز</th>
                        <th className="p-4">اشتراك CONNECT TV (Xtreme)</th>
                        <th className="p-4">تاريخ الإنتهاء</th>
                        <th className="p-4">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {subscriptions.map(sub => (
                        <tr key={sub.id} className="hover:bg-white/5 transition">
                          <td className="p-4 font-bold text-white">{sub.clientName}</td>
                          <td className="p-4 font-mono text-amber-400 font-bold">{sub.code}</td>
                          <td className="p-4 text-gray-300">{sub.boxModel}</td>
                          <td className="p-4 text-cyan-400">متصل (Xtreme API)</td>
                          <td className="p-4 text-gray-300">{sub.expireDate}</td>
                          <td className="p-4 flex items-center gap-2">
                            <button
                              onClick={() => handleDeleteBox(sub.id)}
                              className="p-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-lg transition"
                              title="حذف الجهاز"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. APK Library Tab with File & Image Upload from Computer */}
            {activeTab === 'apks' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-amber-300">مكتبة التطبيقات واشتراكات APK (إضافة صور اشتراك وتطبيقات من الحاسوب)</h3>

                <div className="bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/10 border border-amber-500/30 rounded-2xl p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-2xl mx-auto flex items-center justify-center border border-amber-500/30">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-amber-200">إضافة تطبيق APK جديد مع صورة الاشتراك من الحاسوب</h4>
                    <p className="text-xs text-gray-300 mt-1">اختر صورة التطبيق (الأيقونة / اللوجو) وملف الـ APK من حاسوبك لتثبيته فوراً على كافة الأجهزة</p>
                  </div>

                  {/* App image preview if uploaded */}
                  {newApkImagePreview && (
                    <div className="flex items-center justify-center gap-3 bg-black/60 p-3 rounded-2xl border border-amber-500/40 max-w-sm mx-auto shadow-lg">
                      <img src={newApkImagePreview} alt="App Preview" className="w-14 h-14 rounded-xl object-contain bg-white/10 p-1 border border-amber-400" />
                      <div className="text-right">
                        <p className="text-xs font-bold text-amber-300">تم اختيار صورة التطبيق بنجاح ✓</p>
                        <p className="text-[10px] text-emerald-400">ستربط تلقائياً مع التطبيق عند اختياره</p>
                      </div>
                    </div>
                  )}

                  {/* Optional Name / Package fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto text-right">
                    <div>
                      <label className="block text-[11px] text-gray-300 mb-1">اسم التطبيق (اختياري)</label>
                      <input
                        type="text"
                        placeholder="مثال: mytv, espro, smart iptv..."
                        value={newApkName}
                        onChange={(e) => setNewApkName(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-300 mb-1">معرف الحزمة (Package Name اختياري)</label>
                      <input
                        type="text"
                        placeholder="com.custom.app"
                        value={newApkPackage}
                        onChange={(e) => setNewApkPackage(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Action Upload Buttons */}
                  <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                    {/* Upload App Image from Computer */}
                    <label className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold px-5 py-3 rounded-xl text-xs cursor-pointer transition shadow-lg flex items-center gap-2 border border-cyan-400/30">
                      <ImageIcon className="w-4 h-4 text-cyan-200" />
                      <span>{newApkImagePreview ? 'تغيير صورة التطبيق المختارة' : '1. اختر صورة التطبيق من الحاسوب (Image)'}</span>
                      <input type="file" accept="image/*" onChange={handleAppImageUpload} className="hidden" />
                    </label>

                    {/* Upload APK File from Computer */}
                    <label className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-gray-950 font-black px-5 py-3 rounded-xl text-xs cursor-pointer transition shadow-lg flex items-center gap-2 border border-amber-300">
                      <Upload className="w-4 h-4 text-gray-950" />
                      <span>2. اختر ملف APK من الحاسوب (.apk)</span>
                      <input type="file" accept=".apk" onChange={handleFileUploadApk} className="hidden" />
                    </label>
                  </div>

                  {uploadedApkFileName && (
                    <p className="text-xs text-emerald-400 font-bold">تم رفع ملف الـ APK وتثبيته بنجاح: {uploadedApkFileName}</p>
                  )}
                </div>

                {/* APKs Cards Grid with Per-Card Image Change Option */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {apks.map(apk => (
                    <div key={apk.id} className="bg-white/5 border border-white/10 hover:border-amber-500/40 rounded-2xl p-4 flex flex-col justify-between gap-3 transition">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img src={apk.iconUrl} alt={apk.name} className="w-14 h-14 rounded-xl object-contain bg-white/10 p-1 border border-white/20 shadow-md" />
                          <div>
                            <h4 className="font-bold text-sm text-white">{apk.name}</h4>
                            <p className="text-[10px] text-gray-400 font-mono">{apk.packageName}</p>
                            <span className="text-[10px] text-cyan-400 font-bold block mt-0.5">صورة الاشتراك نشطة</span>
                          </div>
                        </div>

                        <button
                          onClick={() => setApks(apks.filter(a => a.id !== apk.id))}
                          className="p-2 text-red-400 hover:bg-red-500/20 rounded-xl transition"
                          title="حذف التطبيق"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Button to change image from computer directly */}
                      <label className="w-full bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white text-[11px] font-bold py-2 px-3 rounded-xl cursor-pointer transition flex items-center justify-center gap-2 border border-white/10">
                        <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                        <span>تغيير صورة التطبيق من الحاسوب</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleUpdateSingleApkImage(apk.id, e)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Sellable APK Builder & Downloader / Admin Links */}
            {activeTab === 'apkbuilder' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-emerald-900/80 to-teal-950 border border-emerald-500/40 rounded-3xl p-6 shadow-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-emerald-500 text-gray-950 rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg">
                      🚀
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-emerald-200">منصة بناء وبيع تطبيق APK وروابط التثبيت (Downloader & Admin)</h3>
                      <p className="text-xs text-gray-300 mt-1">أنشئ نسختك الخاصة من التطبيق مع شعارك، اسم متجرك، وقم ببيعها في جميع أنحاء العالم للعملاء والموزعين</p>
                    </div>
                  </div>

                  {/* Links Quick Access Card */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {/* Admin Panel Direct Link */}
                    <div className="bg-black/60 border border-amber-500/40 rounded-2xl p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                          <Key className="w-4 h-4 text-amber-400" />
                          <span>رابط لوحة التحكم المستقلة (Admin Link)</span>
                        </span>
                        <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono font-bold">
                          آمن ومحمي
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400">ادخل من هذا الرابط مباشرة من حاسوبك أو هاتفك لإدارة الأجهزة والموزعين:</p>
                      <div className="flex items-center gap-2 bg-black/80 border border-white/10 rounded-xl px-3 py-2">
                        <code className="text-xs text-amber-300 font-mono flex-grow truncate">
                          {window.location.origin}/?admin=true
                        </code>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(`${window.location.origin}/?admin=true`);
                            alert('تم نسخ رابط لوحة التحكم إلى الحافظة!');
                          }}
                          className="bg-amber-500 hover:bg-amber-400 text-gray-950 p-1.5 rounded-lg transition"
                          title="نسخ الرابط"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Downloader App URL for TV */}
                    <div className="bg-black/60 border border-cyan-500/40 rounded-2xl p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                          <Tv className="w-4 h-4 text-cyan-400" />
                          <span>رابط تطبيق Downloader لتثبيت التطبيق على التلفاز</span>
                        </span>
                        <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-mono font-bold">
                          Android TV / FireStick
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400">أدخل هذا الرابط في تطبيق Downloader على جهاز الاستقبال:</p>
                      <div className="flex items-center gap-2 bg-black/80 border border-white/10 rounded-xl px-3 py-2">
                        <code className="text-xs text-cyan-300 font-mono flex-grow truncate">
                          {settings.apkDownloadUrl}
                        </code>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(settings.apkDownloadUrl);
                            alert('تم نسخ رابط Downloader إلى الحافظة!');
                          }}
                          className="bg-cyan-500 hover:bg-cyan-400 text-gray-950 p-1.5 rounded-lg transition"
                          title="نسخ الرابط"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                    <div className="bg-black/50 border border-white/10 rounded-2xl p-5 space-y-4">
                      <h4 className="font-bold text-sm text-emerald-300">تخصيص العلامة التجارية (Branding)</h4>
                      <div>
                        <label className="block text-xs text-gray-300 mb-1">اسم المتجر / العلامة التجارية</label>
                        <input
                          type="text"
                          value={settings.storeName}
                          onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-300 mb-1">رقم واتساب ودعم العملاء</label>
                        <input
                          type="text"
                          value={settings.whatsapp}
                          onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="bg-black/50 border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-emerald-300 mb-2">تصدير حزمة APK جاهزة للبيع</h4>
                        <p className="text-xs text-gray-300 leading-relaxed">
                          يمكنك توليد ملف التثبيت المخصص بصيغة APK لأجهزة Android TV و Smart Box، وتوزيعها على عملائك في أي مكان في العالم مع لوحة التحكم المرتبطة تلقائياً.
                        </p>
                      </div>

                      <div className="mt-6 space-y-3">
                        <a
                          href={settings.apkDownloadUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-gray-950 font-black py-3.5 rounded-xl text-xs transition shadow-xl flex items-center justify-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          <span>تحميل ملف APK المخصص الآن</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. Resellers Tab */}
            {activeTab === 'resellers' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <h3 className="text-xl font-bold text-amber-300">إدارة الموزعين (Revendeurs)</h3>
                  <span className="text-xs text-gray-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                    إجمالي الموزعين النشطين: <strong className="text-amber-400">{resellers.length}</strong>
                  </span>
                </div>

                {/* Add New Reseller Form - Nouveau Revendeur */}
                <form onSubmit={handleAddReseller} className="bg-gradient-to-br from-gray-900 to-black border border-amber-500/30 rounded-2xl p-6 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <h4 className="font-bold text-base text-amber-200 flex items-center gap-2">
                      <Users className="w-5 h-5 text-amber-400" />
                      <span>إضافة موزع جديد (Nouveau Revendeur) بكلمة سر واسم مستخدم جديد</span>
                    </h4>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-md font-bold border border-amber-500/30">
                      حساب موزع فرعي
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-gray-300 mb-1">اسم البوتيك / المتجر (Nom Boutique) *</label>
                      <input
                        type="text"
                        placeholder="مثال: AZ SAT Sousse"
                        value={newResellerBoutique}
                        onChange={(e) => setNewResellerBoutique(e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-300 mb-1">اسم المستخدم للموزع (Utilisateur) *</label>
                      <input
                        type="text"
                        placeholder="مثال: reseller_sousse"
                        value={newResellerUsername}
                        onChange={(e) => setNewResellerUsername(e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-300 mb-1">كلمة المرور للموزع (Mot de passe) *</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={newResellerPassword}
                        onChange={(e) => setNewResellerPassword(e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-300 mb-1">رقم واتساب الموزع (WhatsApp)</label>
                      <input
                        type="text"
                        placeholder="+216 00 000 000"
                        value={newResellerWhatsapp}
                        onChange={(e) => setNewResellerWhatsapp(e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-300 mb-1">الحد الأقصى للأجهزة (Max Boîtiers)</label>
                      <input
                        type="number"
                        min="1"
                        max="1000"
                        value={newResellerMaxBoxes}
                        onChange={(e) => setNewResellerMaxBoxes(Number(e.target.value))}
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-300 mb-1">شعار البوتيك (Logo Boutique)</label>
                      <div className="flex items-center gap-3">
                        {newResellerLogo ? (
                          <img src={newResellerLogo} alt="Logo" className="w-10 h-10 rounded-xl object-cover border border-amber-400 bg-white/10" />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs text-gray-400">
                            Logo
                          </div>
                        )}
                        <label className="bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition border border-white/10 flex-grow text-center">
                          <span>اختر ملف من الحاسوب</span>
                          <input type="file" accept="image/*" onChange={handleResellerLogoUpload} className="hidden" />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-gray-950 font-black px-6 py-3 rounded-xl text-xs transition shadow-lg flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>إنشاء وإضافة الموزع (Créer Revendeur)</span>
                    </button>
                  </div>
                </form>

                {/* Resellers Table */}
                <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-white/5 text-gray-400 border-b border-white/10">
                      <tr>
                        <th className="p-4">الشعار</th>
                        <th className="p-4">اسم البوتيك</th>
                        <th className="p-4">اسم المستخدم (Utilisateur)</th>
                        <th className="p-4">كلمة المرور (Mot de passe)</th>
                        <th className="p-4">واتساب</th>
                        <th className="p-4">الأجهزة المسموحة / المفعلة</th>
                        <th className="p-4 text-center">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {resellers.map(res => (
                        <tr key={res.id} className="hover:bg-white/5 transition">
                          <td className="p-4">
                            <img
                              src={res.logoUrl || 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=200'}
                              alt={res.boutiqueName}
                              className="w-10 h-10 rounded-xl object-cover bg-white/10 border border-white/10 shadow-sm"
                            />
                          </td>
                          <td className="p-4 font-bold text-white">{res.boutiqueName}</td>
                          <td className="p-4 text-amber-400 font-mono font-bold">{res.username}</td>
                          <td className="p-4 text-gray-300 font-mono">
                            <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-[11px]">
                              {res.password || '••••••••'}
                            </span>
                          </td>
                          <td className="p-4 text-gray-300">{res.whatsapp}</td>
                          <td className="p-4">
                            <span className="text-emerald-400 font-bold">{res.activeBoxes}</span> / <span className="text-cyan-400 font-bold">{res.maxBoxes}</span>
                          </td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => handleDeleteReseller(res.id)}
                              className="p-2 text-red-400 hover:bg-red-500/20 rounded-xl transition"
                              title="حذف الموزع"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 6. Settings & Security / Change Password & Username */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-amber-300">الإعدادات العامة وأمان لوحة التحكم</h3>
                  <span className="text-xs text-gray-400 bg-white/5 border border-white/10 px-3 py-1 rounded-xl">
                    المستخدم النشط: <strong className="text-amber-400">{adminUsername}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Card 1: App Settings & Logo */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                    <h4 className="font-bold text-base text-amber-200 flex items-center gap-2">
                      <Settings className="w-5 h-5 text-amber-400" />
                      <span>إعدادات المتجر والشعار</span>
                    </h4>

                    <div>
                      <label className="block text-xs text-gray-300 mb-1">اسم المتجر الرئيسي</label>
                      <input
                        type="text"
                        value={settings.storeName}
                        onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-300 mb-1">رقم الهاتف / الواتساب الرسمي (يظهر للعملاء)</label>
                      <input
                        type="text"
                        value={settings.whatsapp}
                        onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    {/* Logo Upload */}
                    <div>
                      <label className="block text-xs text-gray-300 mb-2">شعار التطبيق (رفع شعار من الحاسوب)</label>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-black/50 border border-white/20 rounded-2xl overflow-hidden flex items-center justify-center">
                          <img src={settings.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                        </div>
                        <label className="bg-amber-500 hover:bg-amber-400 text-gray-950 font-black px-4 py-2.5 rounded-xl text-xs cursor-pointer transition shadow-md">
                          <span>اختر شعاراً من الحاسوب</span>
                          <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                        </label>
                      </div>
                    </div>

                    <button
                      onClick={() => alert('تم حفظ الإعدادات العامة بنجاح!')}
                      className="w-full bg-amber-500 hover:bg-amber-400 text-gray-950 font-black py-3 rounded-xl text-xs transition shadow-lg mt-2"
                    >
                      حفظ الإعدادات العامة
                    </button>
                  </div>

                  {/* Card 2: Security & Change Admin Username/Password */}
                  <form onSubmit={handleChangeCredentials} className="bg-gradient-to-br from-gray-900 to-black border border-amber-500/30 rounded-2xl p-6 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <h4 className="font-bold text-base text-amber-200 flex items-center gap-2">
                        <Key className="w-5 h-5 text-amber-400" />
                        <span>تغيير اسم المستخدم وكلمة السر للوحة التحكم</span>
                      </h4>
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-md font-bold border border-amber-500/30">
                        أمان لوحة التحكم
                      </span>
                    </div>

                    <div className="bg-black/40 p-3 rounded-xl border border-white/10 text-xs flex items-center justify-between">
                      <span className="text-gray-400">اسم المستخدم الحالي:</span>
                      <span className="font-mono text-amber-400 font-bold">{adminUsername}</span>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-300 mb-1">كلمة المرور الحالية (مطلوبة لتأكيد الهوية) *</label>
                      <input
                        type="password"
                        placeholder="أدخل كلمة المرور الحالية..."
                        value={currentPasswordInput}
                        onChange={(e) => setCurrentPasswordInput(e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-300 mb-1">اسم المستخدم الجديد (اتركه فارغاً للإبقاء على الحالي)</label>
                      <input
                        type="text"
                        placeholder={`الجديد (الحالي: ${adminUsername})`}
                        value={newUsernameInput}
                        onChange={(e) => setNewUsernameInput(e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-300 mb-1">كلمة المرور الجديدة</label>
                        <input
                          type="password"
                          placeholder="كلمة مرور جديدة..."
                          value={newPasswordInput}
                          onChange={(e) => setNewPasswordInput(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-300 mb-1">تأكيد كلمة المرور الجديدة</label>
                        <input
                          type="password"
                          placeholder="تأكيد الكلمة..."
                          value={confirmPasswordInput}
                          onChange={(e) => setConfirmPasswordInput(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <button
                        type="submit"
                        className="flex-grow bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-gray-950 font-black py-3 rounded-xl text-xs transition shadow-lg flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>حفظ بيانات الدخول الجديدة</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAuthenticated(false);
                          setUsernameInput('');
                          setPasswordInput('');
                        }}
                        className="bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white px-4 py-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border border-white/10"
                      >
                        <LogOut className="w-3.5 h-3.5 text-red-400" />
                        <span>تسجيل الخروج للتجربة</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
