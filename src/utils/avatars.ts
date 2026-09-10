export interface AvatarOption {
  id: string;
  name: string;
  bgColor: string;
  accentColor: string;
  iconName: string;
}

export const AVATAR_OPTIONS: AvatarOption[] = [
  {
    id: 'avatar-1',
    name: 'Tech Explorer',
    bgColor: '#eff6ff',
    accentColor: '#3b82f6',
    iconName: 'Laptop',
  },
  {
    id: 'avatar-2',
    name: 'Gamer Pro',
    bgColor: '#faf5ff',
    accentColor: '#a855f7',
    iconName: 'Gamepad2',
  },
  {
    id: 'avatar-3',
    name: 'Speed Runner',
    bgColor: '#fff7ed',
    accentColor: '#f97316',
    iconName: 'Zap',
  },
  {
    id: 'avatar-4',
    name: 'VIP Star',
    bgColor: '#fefce8',
    accentColor: '#eab308',
    iconName: 'Sparkles',
  },
  {
    id: 'avatar-5',
    name: 'Cyber Bot',
    bgColor: '#ecfdf5',
    accentColor: '#10b981',
    iconName: 'Bot',
  },
  {
    id: 'avatar-6',
    name: 'Audio Audiophile',
    bgColor: '#fdf2f8',
    accentColor: '#ec4899',
    iconName: 'Headphones',
  },
  {
    id: 'avatar-7',
    name: 'Smart Shopper',
    bgColor: '#f0fdfa',
    accentColor: '#14b8a6',
    iconName: 'ShoppingBag',
  },
  {
    id: 'avatar-8',
    name: 'Minimalist Ninja',
    bgColor: '#f1f5f9',
    accentColor: '#0f172a',
    iconName: 'ShieldCheck',
  },
];

export const getAvatarById = (id?: string): AvatarOption => {
  return AVATAR_OPTIONS.find((a) => a.id === id) || AVATAR_OPTIONS[0];
};
