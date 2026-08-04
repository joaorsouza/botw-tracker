export interface ChecklistItem {
  id: string;
  name: string;
  sub?: string;
  detail?: string;
}

/** Posição no mapa do jogo (coordenadas de jogo, X leste / Z sul) para deep-links no objmap. */
export interface MapPos {
  x: number;
  z: number;
  zoom: number;
}

export interface Region {
  key: string;
  id: string;
  name: string;
  description: string;
  koroksTotal: number;
  mapPos?: MapPos;
  quests?: ChecklistItem[];
  towers: ChecklistItem[];
  shrines: ChecklistItem[];
  sidequests: ChecklistItem[];
  extras: ChecklistItem[];
}

/** Um korok datamined: ID oficial da comunidade + coordenadas de jogo + refs p/ deep-link no objmap. */
export interface KorokSeed {
  id: string;
  x: number;
  z: number;
  map: string;
  hash: number;
}

/** Um baú datamined do overworld: conteúdo + posição + refs p/ deep-link no objmap. */
export interface Chest {
  hash: number;
  map: string;
  x: number;
  z: number;
  /** Conteúdo do baú (nome do item em inglês, como no jogo). */
  name: string;
  /** Tipo do baú (madeira/ferro/pedra/acampamento...). */
  kind: string;
}

export type BoolMap = Record<string, boolean>;
export type RegionCounts = Record<string, { koroks: number }>;
export type RegionsState = Record<string, BoolMap>;
