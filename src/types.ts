export type ScreenType = 'title' | 'play' | 'result' | 'apps' | 'paper';

export type ItemType = 'food' | 'trash';

export interface GameItem {
  id: string;
  name: string;
  type: ItemType;
  weight: number;
  score: number;
  icon: string;
}

export interface GameResult {
  score: number;
}
