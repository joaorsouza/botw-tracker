export interface ChecklistItem {
  id: string;
  name: string;
  sub?: string;
  detail?: string;
}

export interface Region {
  key: string;
  id: string;
  name: string;
  description: string;
  koroksTotal: number;
  quests?: ChecklistItem[];
  towers: ChecklistItem[];
  shrines: ChecklistItem[];
  sidequests: ChecklistItem[];
  extras: ChecklistItem[];
}

export type BoolMap = Record<string, boolean>;
export type RegionCounts = Record<string, { koroks: number }>;
export type RegionsState = Record<string, BoolMap>;
