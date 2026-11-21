import { RadioStation, LiveMatch, QuranReciter, ApkItem, DeviceSubscription, Reseller, AppSettings, XtreamChannel, XtreamVod } from '../types';

export const initialSettings: AppSettings = {
  storeName: "AZ SAT CONNECT",
  whatsapp: "+21626117917",
  welcomeMessage: "مرحباً بكم عند AZ SAT CONNECT - أفضل أجهزة الاستقبال والاشتراكات",
  logoUrl: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=200",
  versionCode: 1,
  versionName: "1.8",
  apkDownloadUrl: "https://az-sat-connect-por-2384.ai.studio",
  backgroundWallpaper: "mosque",
  colorTheme: "emerald"
};

export const wallpapers = [
  { id: 'mosque', name: 'جامع و تراث (Islamic Mosque)', url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1920' },
  { id: 'livingroom', name: 'صالون عصري (Modern TV Lounge)', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1920' },
  { id: 'stadium', name: 'ملعب كرة قدم (Stadium Arena)', url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1920' },
  { id: 'cinematic', name: 'سينما استوديو (Cinematic Dark)', url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=1920' },
  { id: 'nature', name: 'طبيعة ساحرة (Nature View)', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1920' }
];

export const colorThemes = [
  { id: 'emerald', name: 'أخضر زمردي (Emerald Green)', primary: 'from-emerald-600 to-teal-800', accent: 'emerald', border: 'border-emerald-500/40' },
  { id: 'blue', name: 'أزرق ملكي (Royal Blue)', primary: 'from-blue-600 to-indigo-900', accent: 'blue', border: 'border-blue-500/40' },
  { id: 'gold', name: 'ذهبي فاخر (Luxury Gold)', primary: 'from-amber-600 to-yellow-800', accent: 'amber', border: 'border-amber-500/40' },
  { id: 'ruby', name: 'أحمر قاني (Ruby Red)', primary: 'from-rose-600 to-red-900', accent: 'rose', border: 'border-rose-500/40' },
  { id: 'dark', name: 'داكن عصري (Dark Obsidian)', primary: 'from-gray-800 to-zinc-950', accent: 'zinc', border: 'border-zinc-700/50' }
];

export const tunisianRadios: RadioStation[] = [
  { id: 'rad-1', name: 'إذاعة موزاييك أف أم', frequency: '94.9 FM', logo: '🎵', streamUrl: 'https://radio.mosaiquefm.net/mosamar', genre: 'منوعة / أخبار / موسيقى', description: 'الإذاعة الخاصة الأكثر استماعاً في تونس' },
  { id: 'rad-2', name: 'إذاعة جوهرة أف أم', frequency: '102.7 FM', logo: '📻', streamUrl: 'https://stream.jawharafm.net/live', genre: 'منوعة / رياضة / أغاني', description: 'صوت الساحل التونسي وكل البلاد' },
  { id: 'rad-3', name: 'إذاعة إكسبريس أف أم', frequency: '103.6 FM', logo: '💼', streamUrl: 'https://expressfm.ice.infomaniak.ch/expressfm-high.mp3', genre: 'اقتصاد / مال / منوعات', description: 'إذاعة الاقتصاد والأعمال الأولى في تونس' },
  { id: 'rad-4', name: 'إذاعة ديوان أف أم', frequency: '92.0 FM', logo: '🌊', streamUrl: 'https://diwanfm.ice.infomaniak.ch/diwanfm.mp3', genre: 'جهوية / منوعة / رياضة', description: 'نبض الجنوب والوسط التونسي' },
  { id: 'rad-5', name: 'إذاعة الزيتونة للقرآن الكريم', frequency: '107.4 FM', logo: '📖', streamUrl: 'https://radio.tanitweb.com/zitouna', genre: 'ديني / قرآن كريم', description: 'إذاعة القرآن الكريم والسنة النبوية الشريفة' },
  { id: 'rad-6', name: 'إذاعة إف أم ميسك', frequency: '94.5 FM', logo: '🎶', streamUrl: 'https://misk.ice.infomaniak.ch/misk-high.mp3', genre: 'ثقافة / موسيقى بديلة', description: 'موسيقى تونسية وعالمية راقية' },
  { id: 'rad-7', name: 'الإذاعة الوطنية التونسية', frequency: '88.3 FM', logo: '🏛️', streamUrl: 'https://radios.rtci.tn/nat.mp3', genre: 'وطنية / أخبار / ثقافة', description: 'الإذاعة الرسمية للجمهورية التونسية' },
  { id: 'rad-8', name: 'إذاعة RTCI الدولية', frequency: '92.5 FM', logo: '🌍', streamUrl: 'https://radios.rtci.tn/rtci.mp3', genre: 'أجنبية / منوعة', description: 'Radio Tunis Chaîne Internationale' },
  { id: 'rad-9', name: 'إذاعة كاب أف أم', frequency: '95.6 FM', logo: '📡', streamUrl: 'https://capfm.e-s-h.io/stream', genre: 'جهوية / شبابية', description: 'من الوطن القبلي إلى كل تونس' },
  { id: 'rad-10', name: 'إذاعة إي أف أم (IFM)', frequency: '100.6 FM', logo: '⚡', streamUrl: 'https://ifm.ice.infomaniak.ch/ifm.mp3', genre: 'كوميديا / منوعات / أغاني', description: 'إف إم.. تفضلك وتعبر عليك' },
  { id: 'rad-11', name: 'إذاعة أكسجين أف أم', frequency: '104.5 FM', logo: '💨', streamUrl: 'https://oxygenefm.ice.infomaniak.ch/oxygenefm.mp3', genre: 'بنزرت / منوعات', description: 'صوت بنزرت والشمال التونسي' },
  { id: 'rad-12', name: 'إذاعة أوليس أف أم', frequency: '97.2 FM', logo: '🌴', streamUrl: 'https://ulyssefm.net/live', genre: 'جربة / الجنوب', description: 'عبير جزيرة الأحلام جربة' },
  { id: 'rad-13', name: 'إذاعة صبرا أف أم', frequency: '99.3 FM', logo: '🏺', streamUrl: 'https://sabrafm.net/live', genre: 'القيروان / الوسط', description: 'إذاعة عاصمة الأغالبة' },
  { id: 'rad-14', name: 'إذاعة قفصة', frequency: '93.7 FM', logo: '⛏️', streamUrl: 'https://radiogafsa.tn/live', genre: 'المنجمية / الجنوب الغربي', description: 'صوت الحوض المنجمي وجنوبنا الغربي' },
  { id: 'rad-15', name: 'إذاعة صفاقس', frequency: '98.5 FM', logo: '🏛️', streamUrl: 'https://radiosfax.tn/live', genre: 'صفاقس / الجنوب', description: 'عاصمة الجنوب وثقافتها العريقة' },
  { id: 'rad-16', name: 'إذاعة المنستير', frequency: '106.6 FM', logo: '⚓', streamUrl: 'https://radiomonastir.tn/live', genre: 'الساحل التونسي', description: 'عروس الساحل التونسي' },
  { id: 'rad-17', name: 'إذاعة الكاف', frequency: '91.8 FM', logo: '⛰️', streamUrl: 'https://radiokef.tn/live', genre: 'الشمال الغربي', description: 'شموخ الجبال والشمال الغربي' },
  { id: 'rad-18', name: 'إذاعة تطاوين', frequency: '93.3 FM', logo: '🏜️', streamUrl: 'https://radiotataouine.tn/live', genre: 'الصحراء والجنوب', description: 'بوابة الصحراء والجنوب الشرقي' }
];

export const liveMatches: LiveMatch[] = [
  { id: 'm-1', homeTeam: 'الترجي الرياضي التونسي', homeLogo: '🔴🟡', awayTeam: 'النجم الرياضي الساحلي', awayLogo: '⭐🔴', score: '2 - 1', time: 'LIVE 78\'', status: 'LIVE', league: 'رابطة المحترفين الأولى تونس', channel: 'الوطنية 1 HD / الكأس' },
  { id: 'm-2', homeTeam: 'النادي الإفريقي', homeLogo: '🔴⚪', awayTeam: 'النادي الرياضي الصفاقسي', awayLogo: '⚫⚪', score: '0 - 0', time: 'الشوط الأول', status: 'LIVE', league: 'رابطة المحترفين الأولى تونس', channel: 'الوطنية 2 HD' },
  { id: 'm-3', homeTeam: 'ريال مدريد', homeLogo: '⚪', awayTeam: 'برشلونة', awayLogo: '🔵🔴', score: '3 - 2', time: 'انتهت', status: 'FT', league: 'الدوري الإسباني (الكلاسيكو)', channel: 'beIN Sports 1 HD' },
  { id: 'm-4', homeTeam: 'مانشستر سيتي', homeLogo: '🔵', awayTeam: 'أرسنال', awayLogo: '🔴⚪', score: '1 - 1', time: '21:00', status: 'UPCOMING', league: 'الدوري الإنجليزي الممتاز', channel: 'beIN Sports 2 HD' },
  { id: 'm-5', homeTeam: 'بايرن ميونخ', homeLogo: '🔴', awayTeam: 'بوروسيا دورتموند', awayLogo: '🟡⚫', score: '0 - 0', time: '22:00', status: 'UPCOMING', league: 'دوري أبطال أوروبا', channel: 'beIN Sports 3 HD' }
];

export const quranReciters: QuranReciter[] = [
  { id: 'rec-1', name: 'عبد الباسط عبد الصمد', style: 'مرتل / مجود (حفص عن عاصم)' },
  { id: 'rec-2', name: 'السديس والشريم', style: 'الحرم المكي الشريف' },
  { id: 'rec-3', name: 'ماهر المعيقلي', style: 'صوت خاشع وندي' },
  { id: 'rec-4', name: 'مشاري راشد العفاسي', style: 'أداء عذب ورائع' },
  { id: 'rec-5', name: 'سعد الغامدي', style: 'ترتيل هادئ ومؤثر' },
  { id: 'rec-6', name: 'يسر الدوسري', style: 'تلاوة عطرة خاشعة' }
];

export const sampleSurahs = [
  { number: 1, name: 'الفاتحة', englishName: 'Al-Fatihah', numberOfAyahs: 7, revelationType: 'مكية' },
  { number: 2, name: 'البقرة', englishName: 'Al-Baqarah', numberOfAyahs: 286, revelationType: 'مدنية' },
  { number: 3, name: 'آل عمران', englishName: 'Ali \'Imran', numberOfAyahs: 200, revelationType: 'مدنية' },
  { number: 18, name: 'الكهف', englishName: 'Al-Kahf', numberOfAyahs: 110, revelationType: 'مكية' },
  { number: 36, name: 'يس', englishName: 'Ya-Sin', numberOfAyahs: 83, revelationType: 'مكية' },
  { number: 55, name: 'الرحمن', englishName: 'Ar-Rahman', numberOfAyahs: 78, revelationType: 'مكية' },
  { number: 67, name: 'الملك', englishName: 'Al-Mulk', numberOfAyahs: 30, revelationType: 'مكية' },
  { number: 112, name: 'الإخلاص', englishName: 'Al-Ikhlas', numberOfAyahs: 4, revelationType: 'مكية' }
];

export const initialApks: ApkItem[] = [
  { id: 'apk-1', name: 'YouTube TV', packageName: 'io.gh.reisxd.tizentube.cobalt', version: '2.4', iconUrl: 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png', apkUrl: 'https://github.com/prosat216-colab/mytv/releases/download/v1.8/youtube.apk', visibility: 'Global', pinProtected: false },
  { id: 'apk-2', name: 'Max Player 4K', packageName: 'com.max.maxplayer', version: '4.1', iconUrl: 'https://cdn-icons-png.flaticon.com/512/2504/2504031.png', apkUrl: 'https://github.com/prosat216-colab/mytv/releases/download/v1.8/maxplayer.apk', visibility: 'Client', pinProtected: false },
  { id: 'apk-3', name: 'FullBox IPTV', packageName: 'com.rebrandapps.fork', version: '3.0', iconUrl: 'https://cdn-icons-png.flaticon.com/512/3076/3076785.png', apkUrl: 'https://github.com/prosat216-colab/mytv/releases/download/v1.8/fullbox.apk', visibility: 'Client', pinProtected: true, pinCode: '1234' },
  { id: 'apk-4', name: 'Downloader App', packageName: 'com.esaba.downloader', version: '1.9', iconUrl: 'https://cdn-icons-png.flaticon.com/512/2989/2989988.png', apkUrl: 'https://github.com/prosat216-colab/mytv/releases/download/v1.8/downloader.apk', visibility: 'Client', pinProtected: false },
  { id: 'apk-5', name: 'Beta IPTV', packageName: 'com.ultra8k.iptv', version: '2.1', iconUrl: 'https://cdn-icons-png.flaticon.com/512/5556/5556468.png', apkUrl: 'https://github.com/prosat216-colab/mytv/releases/download/v1.8/beta.apk', visibility: 'Client', pinProtected: false }
];

export const initialSubscriptions: DeviceSubscription[] = [
  { id: 'sub-1', clientName: 'REDBOX', code: 'W2GQ9', boxModel: 'Amlogic V1 NanoX3', reseller: 'CONNECT TV', expireDate: '2027-11-19', status: 'active', xtreamUsername: 'user_rb1', xtreamPassword: 'pwd123', xtreamUrl: 'http://xtream.azsat.net:8080' },
  { id: 'sub-2', clientName: 'atef saldawi', code: 'RB4KK', boxModel: 'Xiaomi MiTV-AFKRO', reseller: 'CONNECT TV', expireDate: '2027-11-17', status: 'active' },
  { id: 'sub-3', clientName: 'TEL AHMED', code: 'VSVHX', boxModel: 'Xiaomi 23106RN0DA', reseller: 'CONNECT TV', expireDate: '2027-11-17', status: 'active' },
  { id: 'sub-4', clientName: 'winbox', code: 'XATYV', boxModel: 'Google WINBOX-PRO', reseller: 'CONNECT TV', expireDate: '2027-11-17', status: 'active' },
  { id: 'sub-5', clientName: 'dar champre acoucher', code: 'M93KX', boxModel: 'Xiaomi MIBOX4', reseller: 'CONNECT TV', expireDate: '2027-11-17', status: 'active' },
  { id: 'sub-6', clientName: 'ahmed hamdi tv', code: 'K281Z', boxModel: 'MediaTek SMART_TV', reseller: 'CONNECT TV', expireDate: '2027-11-17', status: 'active' }
];

export const initialResellers: Reseller[] = [
  { id: 'res-1', boutiqueName: 'AZ SAT STORE TUNIS', username: 'admin', password: 'password123', whatsapp: '+21626117917', logoUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=200', maxBoxes: 100, activeBoxes: 6 }
];

export const xtreamDemoChannels: XtreamChannel[] = [
  { id: 'ch-1', name: 'الوطنية 1 HD - Wataniya 1', category: 'Tunisia / القنوات التونسية', streamUrl: 'https://stream.tanitweb.com/wataniya1', logo: '📺', isFavorite: true },
  { id: 'ch-2', name: 'الوطنية 2 HD - Wataniya 2', category: 'Tunisia / القنوات التونسية', streamUrl: 'https://stream.tanitweb.com/wataniya2', logo: '📺', isFavorite: true },
  { id: 'ch-3', name: 'حنان TV - Hannan TV', category: 'Tunisia / القنوات التونسية', streamUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', logo: '🎬', isFavorite: false },
  { id: 'ch-4', name: 'تونسنا TV - Tounsisna', category: 'Tunisia / القنوات التونسية', streamUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', logo: '⭐', isFavorite: false },
  { id: 'ch-5', name: 'beIN Sports 1 HD (Live)', category: 'Sports / الرياضة', streamUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', logo: '⚽', isFavorite: true },
  { id: 'ch-6', name: 'beIN Sports 2 HD (Live)', category: 'Sports / الرياضة', streamUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', logo: '⚽', isFavorite: true },
  { id: 'ch-7', name: 'SSC 1 HD Sports', category: 'Sports / الرياضة', streamUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', logo: '🏆', isFavorite: false },
  { id: 'ch-8', name: 'AD Sports 1 HD', category: 'Sports / الرياضة', streamUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', logo: '🏅', isFavorite: false },
  { id: 'ch-9', name: 'MBC 1 HD', category: 'Entertainment / ترفيه', streamUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', logo: '🌟', isFavorite: true },
  { id: 'ch-10', name: 'MBC Masr HD', category: 'Entertainment / ترفيه', streamUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', logo: '🌙', isFavorite: false },
  { id: 'ch-11', name: 'Al Jazeera HD News', category: 'News / الأخبار', streamUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', logo: '📰', isFavorite: true },
  { id: 'ch-12', name: 'Al Arabiya HD News', category: 'News / الأخبار', streamUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', logo: '📡', isFavorite: false }
];

export const xtreamDemoVod: XtreamVod[] = [
  { id: 'vod-1', title: 'ولاد مفيدة - الموسم 5', category: 'مسلسلات تونسية', year: '2024', rating: '8.9', poster: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80&w=400', streamUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', description: 'دراما رمضانية مشوقة في الشارع التونسي' },
  { id: 'vod-2', title: 'حرقة - السلسلة الكبرى', category: 'مسلسلات تونسية', year: '2023', rating: '9.2', poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=400', streamUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', description: 'ملحمة درامية عن الهجرة السرية والتحديات' },
  { id: 'vod-3', title: 'المصارع الأخير 4K', category: 'أفلام أجنبية حديثة', year: '2025', rating: '8.5', poster: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&q=80&w=400', streamUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', description: 'فيلم إثارة وحركة عالمي مترجم' },
  { id: 'vod-4', title: 'مهمة مستحيلة: الحساب النهائي', category: 'أفلام أجنبية حديثة', year: '2025', rating: '9.0', poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400', streamUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', description: 'أقوى أفلام الأكشن والمغامرات لعام 2025' }
];
