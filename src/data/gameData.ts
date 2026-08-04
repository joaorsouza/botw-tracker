import type { ChecklistItem } from '../types';

export interface SimpleItem {
  id: string;
  name: string;
  note?: string;
}

// As 15 main quests oficiais do Adventure Log, em ordem aproximada de progressão.
export const MAIN_QUESTS: ChecklistItem[] = [
  {
    id: 'mq_follow_sheikah_slate',
    name: 'Follow the Sheikah Slate',
    sub: 'Shrine of Resurrection → Great Plateau Tower',
    detail: 'Acorde na Shrine of Resurrection e pegue a Sheikah Slate no altar. Saia da caverna, siga a voz misteriosa até o pedestal brilhante da Great Plateau Tower e encaixe a Slate — a torre sobe, o mapa da região é revelado e as outras 14 torres despertam pelo mapa.',
  },
  {
    id: 'mq_isolated_plateau',
    name: 'The Isolated Plateau',
    sub: '4 santuários do platô → Paraglider',
    detail: 'O Velho aparece ao pé da torre: ele promete o Paraglider em troca dos 4 Spirit Orbs do platô. Complete Oman Au (Magnesis), Ja Baij (Bombas), Owa Daim (Stasis) e Keh Namut (Cryonis) — pro Keh Namut, no alto do Monte Hylia, você precisa de comida de resistência ao frio ou do Warm Doublet. Com os 4 orbs, encontre o Velho no Temple of Time: ele se revela como Rei Rhoam, conta a história da Calamidade e te dá o Paraglider.',
  },
  {
    id: 'mq_seek_out_impa',
    name: 'Seek Out Impa',
    sub: 'Kakariko Village',
    detail: 'Saia do platô rumo leste: passe pelo Dueling Peaks Stable, suba a trilha do rio e siga as lanternas até Kakariko Village. Fale com Impa na casa principal — ela explica a missão das 4 Divine Beasts e da Calamidade, e te encaminha pro laboratório de Hateno. Aproveite pra ativar a Dueling Peaks Tower e os santuários no caminho (viram teleporte).',
  },
  {
    id: 'mq_locked_mementos',
    name: 'Locked Mementos',
    sub: 'Hateno Ancient Tech Lab (Purah)',
    detail: 'Leve a Sheikah Slate ao laboratório no alto de Hateno Village, a leste de Kakariko. Acenda a fornalha azul com a tocha (traga o fogo azul dos braseiros da vila) pra reativar o Guidance Stone: Purah desbloqueia a Camera Rune, o Hyrule Compendium e o álbum com as 12 fotos antigas da Zelda — que abrem a quest Captured Memories.',
  },
  {
    id: 'mq_find_fairy_fountain',
    name: 'Find the Fairy Fountain',
    sub: 'Great Fairy Cotera, acima de Kakariko',
    detail: 'Fale com o pintor Pikango em Kakariko: ele quer ver a fonte de fada perto da vila. Suba a trilha atrás do santuário Ta\'loh Naeg até a Great Fairy Cotera e pague 100 rupees pra despertá-la. Além de fechar a quest (Pikango passa a dar dicas de locais das memórias), Cotera libera o sistema de upgrade de armaduras — as outras 3 fontes ficam em Tabantha, Akkala e no deserto Gerudo.',
  },
  {
    id: 'mq_free_divine_beasts',
    name: 'Free the Divine Beasts',
    sub: 'Quest guarda-chuva das 4 feras',
    detail: 'Dada pela Impa: libertar Vah Ruta (Zora), Vah Rudania (Goron), Vah Medoh (Rito) e Vah Naboris (Gerudo). Conclui automaticamente quando as quatro Divine Beasts forem libertadas — cada uma tem sua própria quest abaixo. Cada fera libertada dispara um golpe de 12,5% de dano no Calamity Ganon na luta final (50% com as quatro).',
  },
  {
    id: 'mq_reach_zoras_domain',
    name: 'Reach Zora\'s Domain',
    sub: 'Trilha do Zora River com o Sidon',
    detail: 'Na região de Lanayru, o príncipe Sidon te aborda (Inogo Bridge) e pede ajuda contra o Vah Ruta. Suba a trilha do Zora River até o Domain — chove o tempo todo (escalada limitada), então siga pela estrada enfrentando Lizalfos e inimigos elétricos. Ao chegar, fale com o Rei Dorephan e o Muzu: você recebe a Zora Armor (nado em cachoeira) e a missão de conseguir shock arrows pra luta.',
  },
  {
    id: 'mq_vah_ruta',
    name: 'Divine Beast Vah Ruta',
    sub: 'East Reservoir Lake → Waterblight Ganon',
    detail: 'Consiga 20 shock arrows — o Lynel no topo do Ploymus Mountain tem várias espalhadas (dá pra pegar de fininho sem lutar). No East Reservoir Lake, monte no Sidon e acerte shock arrows nos 4 blocos de gelo do Ruta, nadando pelas cachoeiras pra desviar. Lá dentro: use o mapa pra inclinar o tronco do Ruta, ative os 5 terminais e derrote o Waterblight Ganon. Recompensa: Mipha\'s Grace (ressurreição automática) e um Heart Container.',
  },
  {
    id: 'mq_forbidden_city_entry',
    name: 'Forbidden City Entry',
    sub: 'Entrar em Gerudo Town (disfarce)',
    detail: 'Homens não entram em Gerudo Town. No telhado do Kara Kara Bazaar, encontre o "Vilia" e compre o conjunto Gerudo (600 rupees) — com o disfarce você entra na cidade e fala com a chefe Riju, abrindo a quest do Vah Naboris. O conjunto ainda dá resistência ao calor do deserto.',
  },
  {
    id: 'mq_vah_naboris',
    name: 'Divine Beast Vah Naboris',
    sub: 'Yiga Hideout → Thunderblight Ganon',
    detail: 'Recupere o Thunder Helm roubado: invada o Yiga Hideout no Karusa Valley (stealth — os Blademasters matam quase em um golpe; distraia os guardas com Mighty Bananas) e derrote o Master Kohga. Devolva o capacete à Riju, monte o seal ao lado dela e acerte flechas-bomba nos 4 cascos do Naboris enquanto desvia dos raios. Lá dentro: o gimmick são 3 cilindros giratórios e circuitos de eletricidade; ative os 5 terminais e derrote o Thunderblight Ganon — o boss mais difícil das feras. Recompensa: Urbosa\'s Fury.',
  },
  {
    id: 'mq_vah_rudania',
    name: 'Divine Beast Vah Rudania',
    sub: 'Death Mountain com Yunobo → Fireblight Ganon',
    detail: 'Você precisa de proteção contra fogo (Fireproof Elixirs ou a Flamebreaker Armor vendida em Goron City). Fale com o Bludo, ajude o Yunobo na Abandoned North Mine (canhões) e depois escolte-o na subida do Death Mountain à noite, evitando os holofotes das sentinelas — se te virem, chovem magma bombs. Use o Yunobo como bala de canhão pra derrubar o Rudania. Lá dentro: mapa às escuras, gimmick de rotacionar a fera 90°; 5 terminais e o Fireblight Ganon. Recompensa: Daruk\'s Protection (escudo perfeito).',
  },
  {
    id: 'mq_vah_medoh',
    name: 'Divine Beast Vah Medoh',
    sub: 'Flight Range com Teba → Windblight Ganon',
    detail: 'Em Rito Village, fale com o ancião Kaneli e depois encontre o Teba no Flight Range (noroeste, no cânion): complete o treino de tiro em pleno voo pra convencê-lo. Ele te leva até o Medoh — use as correntes de vento pra ganhar altura e destrua os 4 canhões com bomb arrows enquanto ele distrai a barreira. Lá dentro: gimmick de inclinar a fera pros lados; 5 terminais e o Windblight Ganon (o mais fácil). Recompensa: Revali\'s Gale (coluna de vento sob demanda).',
  },
  {
    id: 'mq_captured_memories',
    name: 'Captured Memories',
    sub: 'As 12 fotos do álbum + a 13ª memória',
    detail: 'Visite os locais exatos das 12 fotos do álbum da Zelda pra recuperar as memórias — o Pikango dá dicas de localização se você mostrar as fotos, e placas "quadro" no mapa ajudam a mirar o ângulo. Depois das 12, volte à Impa: ela revela a 13ª memória, no Ash Swamp (atrás do Dueling Peaks, onde a foto final foi tirada). Ver todas desbloqueia a cena extra no final do jogo (true ending).',
  },
  {
    id: 'mq_master_sword',
    name: 'The Master Sword',
    sub: 'Korok Forest — 13 corações completos',
    detail: 'Atravesse as Lost Woods (siga a direção das fagulhas de uma tocha acesa) até a Korok Forest e encontre a espada no pedestal diante do Great Deku Tree. Puxar a espada drena vida: são necessários 13 corações PERMANENTES (amarelos temporários não contam). Se precisar, troque vasos de stamina por corações na estátua do demônio em Hateno. A Master Sword recarrega sozinha após quebrar e dobra de dano perto de inimigos da Calamidade.',
  },
  {
    id: 'mq_destroy_ganon',
    name: 'Destroy Ganon',
    sub: 'Hyrule Castle — luta final',
    detail: 'Invada o Hyrule Castle — rotas boas: pelas docas (caverna a noroeste, subindo de barco/Cryonis) ou planando pela lateral oeste; vale saquear o castelo antes (Hylian Shield no Lockup, Royal Guard gear). No Sanctum, enfrente o Calamity Ganon: cada Divine Beast libertada tira 12,5% da vida dele no início (50% com as quatro). Depois, no Hyrule Field, monte no cavalo e acerte as Light Arrows da Zelda nos pontos brilhantes do Dark Beast Ganon pra fechar o jogo. Dica: o save pós-final marca uma estrela, mas o mundo volta pra antes da luta.',
  },
];

/** Migração de ids antigos da checklist genérica → quests reais equivalentes. */
export const MAIN_QUEST_MIGRATION: Record<string, string[]> = {
  plateau: ['mq_follow_sheikah_slate', 'mq_isolated_plateau'],
  beasts: ['mq_free_divine_beasts', 'mq_vah_ruta', 'mq_vah_naboris', 'mq_vah_rudania', 'mq_vah_medoh'],
  memories: ['mq_captured_memories'],
  ganon: ['mq_destroy_ganon'],
};

/** Migração da antiga seção "Divine Beasts" (slice `beasts`) → quests das feras. */
export const BEAST_MIGRATION: Record<string, string> = {
  ruta: 'mq_vah_ruta',
  naboris: 'mq_vah_naboris',
  rudania: 'mq_vah_rudania',
  medoh: 'mq_vah_medoh',
};

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
