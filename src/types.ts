export interface DeviceSubscription {
  id: string;
  clientName: string;
  code: string; // e.g. W2GQ9
  boxModel: string;
  reseller: string;
  expireDate: string;
  status: 'active' | 'expired' | 'pending';
  xtreamUsername?: string;
  xtreamPassword?: string;
  xtreamUrl?: string;
}

export interface Reseller {
  id: string;
  boutiqueName: string;
  username: string;
  password?: string;
  whatsapp: string;
  logoUrl?: string;
  maxBoxes: number;
  activeBoxes: number;
}

export interface ApkItem {
  id: string;
  name: string;
  packageName: string;
  version: string;
  iconUrl: string;
  apkUrl: string;
  visibility: 'Client' | 'Global' | 'Reseller';
  pinProtected: boolean;
  pinCode?: string;
}

export interface RadioStation {
  id: string;
  name: string;
  frequency: string;
  logo: string;
  streamUrl: string;
  genre: string;
  description: string;
}

export interface LiveMatch {
  id: string;
  homeTeam: string;
  homeLogo: string;
  awayTeam: string;
  awayLogo: string;
  score: string;
  time: string;
  status: 'LIVE' | 'FT' | 'UPCOMING';
  league: string;
  channel: string;
}

export interface QuranSurah {
  number: number;
  name: string;
  englishName: string;
  numberOfAyahs: number;
  revelationType: string;
  audioUrl?: string;
}

export interface QuranReciter {
  id: string;
  name: string;
  style: string;
}

export interface XtreamChannel {
  id: string;
  name: string;
  category: string;
  streamUrl: string;
  logo: string;
  isFavorite?: boolean;
}

export interface XtreamVod {
  id: string;
  title: string;
  category: string;
  year: string;
  rating: string;
  poster: string;
  streamUrl: string;
  description: string;
}

export interface AppSettings {
  storeName: string;
  whatsapp: string;
  welcomeMessage: string;
  logoUrl: string;
  versionCode: number;
  versionName: string;
  apkDownloadUrl: string;
  backgroundWallpaper: string;
  colorTheme: string; // 'emerald' | 'blue' | 'gold' | 'ruby' | 'dark'
}
