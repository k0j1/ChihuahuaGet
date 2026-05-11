import { GameItem } from './types';

export const GAME_DURATION_MS = 10000; // 1ゲーム10秒
export const ITEM_DISPLAY_MS = 1000; // アイテム表示時間 1.0秒
export const ITEM_INTERVAL_MS = 300; // 出現間隔 0.3秒

export const MAX_STAMINA = 10;
export const STAMINA_RECOVERY_MS = 60 * 60 * 1000; // 1時間に1回復

export const GAME_VERSION = 'v1.0.2';

export const ITEMS: GameItem[] = [
  { id: 'biscuit', name: 'ドッグビスケット', type: 'food', weight: 50, score: 10, icon: '🍪' },
  { id: 'bone', name: '骨スナック', type: 'food', weight: 25, score: 25, icon: '🦴' },
  { id: 'cheese', name: 'チーズスティック', type: 'food', weight: 15, score: 50, icon: '🧀' },
  { id: 'sausage', name: 'ソーセージ', type: 'food', weight: 7, score: 100, icon: '🌭' },
  { id: 'golden', name: 'ゴールデンビスケット', type: 'food', weight: 3, score: 200, icon: '🌟' },
  { id: 'can', name: '缶', type: 'trash', weight: 5, score: -10, icon: '🥫' },
  { id: 'plastic', name: 'ビニール袋', type: 'trash', weight: 3, score: -25, icon: '🛍️' },
  { id: 'cup', name: 'カップ麺の空容器', type: 'trash', weight: 2, score: -50, icon: '🥡' }
];

export const TOTAL_WEIGHT = ITEMS.reduce((sum, item) => sum + item.weight, 0);

export function getRandomItem(): GameItem {
  const r = Math.random() * TOTAL_WEIGHT;
  let current = 0;
  for (const item of ITEMS) {
    current += item.weight;
    if (r <= current) return item;
  }
  return ITEMS[0];
}
