export interface SimpleItem {
  id: string;
  name: string;
  note?: string;
}

export const DIVINE_BEASTS: SimpleItem[] = [
  { id: 'ruta', name: 'Vah Ruta (Zora)', note: 'Trial of the Sword liga aqui perto depois' },
  { id: 'naboris', name: 'Vah Naboris (Gerudo)' },
  { id: 'rudania', name: 'Vah Rudania (Goron)' },
  { id: 'medoh', name: 'Vah Medoh (Rito)' },
];

export const MAIN_QUESTS: SimpleItem[] = [
  { id: 'plateau', name: 'Great Plateau completo (4 santuários + paraglider)' },
  { id: 'towers', name: 'Todas as 15 torres ativadas' },
  { id: 'beasts', name: 'As 4 Divine Beasts liberadas' },
  { id: 'memories', name: 'Trilha do Silêncio (13 memórias)' },
  { id: 'castle', name: 'Hyrule Castle explorado' },
  { id: 'ganon', name: 'Calamity Ganon derrotado' },
];

export const DLC: SimpleItem[] = [
  { id: 'trial', name: 'Trial of the Sword (Master Sword upgrade)' },
  { id: 'ballad', name: "Champion's Ballad completo" },
  { id: 'master', name: 'Master Mode (opcional, run separada)' },
];

export const TOTALS = {
  shrines: 120,
  koroks: 900,
  sidequests: 76,
} as const;
