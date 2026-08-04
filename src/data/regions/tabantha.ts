import type { Region } from '../../types';

const tabantha: Region = {
  key: 'Tabantha',
  id: 'tabantha',
  name: 'Tabantha',
  description: 'Cobre as regiões das torres Tabantha e Ridgeland: Rito Village e a Tabantha Frontier no noroeste, mais o Hyrule Ridge com seus estábulos e planícies a caminho do castelo. Terra dos Rito, do Divine Beast Vah Medoh e de muita tempestade no Thundra Plateau.',
  koroksTotal: 117,
  towers: [
    {
      id: 'tower_tabantha',
      name: 'Tabantha Tower',
      detail: 'Fica a leste da Tabantha Frontier, com a base tomada por Malice. Suba pelas plataformas laterais e atire uma flecha no olho de Malice pra limpar o caminho quando a gosma bloquear a escalada. Dela dá pra planar direto rumo ao Rito Village e às Ancient Columns.',
    },
    {
      id: 'tower_ridgeland',
      name: 'Ridgeland Tower',
      detail: 'Fica no Hyrule Ridge, cercada por um fosso de água e por wizzrobes elétricos — muito perigosos se você estiver com equipamento de metal. Derrube-os com flechas de longe ou simplesmente corra, nade e escale rápido. Do topo dá pra ver o Thundra Plateau logo a oeste.',
    },
  ],
  shrines: [
    {
      id: 'shrine_sha_warvo',
      name: 'Sha Warvo',
      sub: 'Path of Hidden Winds',
      detail: 'Fica em Dronoc\'s Pass, pertinho do Flight Range, a noroeste do Rito Village. A provação é toda de correntes de ar: use o paraglider nos updrafts pra subir de plataforma em plataforma. Bom lugar pra treinar voo antes do Vah Medoh.',
    },
    {
      id: 'shrine_voo_lota',
      name: 'Voo Lota',
      sub: 'The Winding Route — shrine quest Recital at Warbler\'s Nest',
      detail: 'Revelado pela shrine quest Recital at Warbler\'s Nest, no Warbler\'s Nest a oeste do Rito Village (após o Vah Medoh). Reúna as cinco filhas de Amali (Kheel espera no local) e use uma Korok Leaf pra soprar vento nos cinco pilares de pedra no ritmo da música. A quest Find Kheel, da Amali, te leva direto até lá.',
    },
    {
      id: 'shrine_akh_vaquot',
      name: 'Akh Va\'quot',
      sub: 'Windmills',
      detail: 'Fica dentro do próprio Rito Village, no alto da vila. Lá dentro, gire os cata-ventos (com Korok Leaf ou flechas) pra alinhar as pás e abrir o caminho. Tem bons baús escondidos girando cata-ventos extras.',
    },
    {
      id: 'shrine_bareeda_naag',
      name: 'Bareeda Naag',
      sub: 'Cannon — shrine quest The Ancient Rito Song',
      detail: 'Revelado pela shrine quest The Ancient Rito Song, dada por Bedoli no Rito Village (após o Vah Medoh). Vá ao pedestal ao sul da vila e acenda fogo nele quando a luz do sol, em formato de coração, incidir sobre ele por volta do meio-dia. Lá dentro, use o canhão com bombas pra abrir caminho.',
    },
    {
      id: 'shrine_tena_kosah',
      name: 'Tena Ko\'sah',
      sub: 'A Major Test of Strength',
      detail: 'Fica nas Ancient Columns, o planalto de colunas em ruínas a oeste da Tabantha Tower — mesmo lugar da Memória #3. É um Major Test of Strength: Guardian Scout IV com arsenal completo, então vá com armas e comida boas. Use Stasis e parry de escudo pra vencer com segurança.',
    },
    {
      id: 'shrine_kah_okeo',
      name: 'Kah Okeo',
      sub: 'Wind Guide',
      detail: 'Fica no extremo oeste das Rayne Highlands, perto da entrada oeste do Tanagar Canyon. O santuário está escondido sob uma laje de pedra: mova-a com Stasis ou Octo Balloons. Lá dentro, use a Korok Leaf pra girar cata-ventos, abrir grades e pilotar uma plataforma de balões.',
    },
    {
      id: 'shrine_mijah_rokee',
      name: 'Mijah Rokee',
      sub: 'A Modest Test of Strength — shrine quest Under a Red Moon',
      detail: 'Enterrado sob o Washa\'s Bluff, a sudoeste da Ridgeland Tower. A shrine quest Under a Red Moon (do Kass, que toca lá em cima) exige ficar no pedestal durante uma Blood Moon vestindo absolutamente nada. Depois é um Modest Test of Strength contra um Guardian Scout.',
    },
    {
      id: 'shrine_shae_loya',
      name: 'Shae Loya',
      sub: 'Aim for the Moment',
      detail: 'Fica no barranco logo acima (ao sul) do Tabantha Bridge Stable — ótimo teleporte pra região. Lá dentro, um lançador fica quicando uma esfera gigante: use Stasis na esfera no ar e acerte-a com uma flecha pra desviá-la do curso e liberar o mecanismo.',
    },
    {
      id: 'shrine_sheem_dagoze',
      name: 'Sheem Dagoze',
      sub: 'Moving in Parallel — shrine quest The Two Rings',
      detail: 'Revelado pela shrine quest The Two Rings: fale com o Kass ao norte da Jeddo Bridge, ao sul da Ridgeland Tower. Atire UMA flecha que atravesse dois anéis de pedra ao mesmo tempo — procure o par de anéis alinhados a oeste da posição do Kass. O santuário tem puzzle de plataformas que se movem em paralelo.',
    },
    {
      id: 'shrine_mogg_latan',
      name: 'Mogg Latan',
      sub: 'Synced Swing',
      detail: 'Fica perto do pico da Satori Mountain, no meio do caminho entre o Tabantha Bridge Stable e o Outskirt Stable. Escale pelo lado leste, aproveitando pra ver a cerejeira do Lord of the Mountain. Lá dentro, plataformas suspensas balançam em sincronia sobre o vazio — use Magnesis e paciência.',
    },
    {
      id: 'shrine_zalta_wa',
      name: 'Zalta Wa',
      sub: 'Two Orbs to Guide You',
      detail: 'Fica na Breach of Demise, o desfiladeiro a sudeste da Ridgeland Tower, no lado norte da trilha. Puzzle de guiar duas esferas até seus encaixes usando rampas e Magnesis. Rápido e tranquilo.',
    },
    {
      id: 'shrine_maag_norah',
      name: 'Maag No\'rah',
      sub: 'A Minor Test of Strength',
      detail: 'Escondido numa caverna no paredão norte do Lindor\'s Brow, a sudoeste do Serenne Stable e das Maritta Exchange Ruins. Suba na torre de vigia do acampamento bokoblin próximo e procure as rochas rachadas no penhasco: exploda-as com Remote Bomb ou Bomb Arrow. Dentro é só um Minor Test of Strength curtinho.',
    },
    {
      id: 'shrine_toh_yahsa',
      name: 'Toh Yahsa',
      sub: 'Bravery\'s Grasp — shrine quest Trial of Thunder',
      detail: 'Enterrado sob o Thundra Plateau, a oeste da Ridgeland Tower. A shrine quest Trial of Thunder exige colocar os quatro orbes coloridos espalhados pelo platô nos pedestais das cores certas — use Stasis pra arremessar os que estão fora do platô e cuidado com os wizzrobes e a tempestade eterna. O baú na entrada do santuário tem a Rubber Armor.',
    },
  ],
  sidequests: [
    {
      id: 'sq_find_kheel',
      name: 'Find Kheel',
      sub: 'Amali — Rito Village',
      detail: 'Disponível após libertar o Vah Medoh. Amali pede pra você achar a filha dela, Kheel, que está no Warbler\'s Nest, a oeste da vila, na beira do Lake Totori. Plane até lá, fale com Kheel e volte pra Amali. De quebra, abre a shrine quest do Voo Lota.',
    },
    {
      id: 'sq_face_the_frost_talus',
      name: 'Face the Frost Talus',
      sub: 'Gesane — Rito Village',
      detail: 'Disponível após o Vah Medoh. Gesane, o guarda Rito, aponta um Frost Talus no Coldsnap Hollow, nas montanhas Hebra ao norte. Leve armas de fogo (ou flechas de fogo) e roupa contra frio, quebre o depósito de minério nas costas dele e volte pra receber uma Silver Rupee.',
    },
    {
      id: 'sq_apple_of_my_eye',
      name: 'The Apple of My Eye',
      sub: 'Juney — Rito Village',
      detail: 'Juney, hospedada na pousada do Rito Village, quer uma maçã assada. Jogue uma maçã comum numa fogueira (ou perto de fogo) e entregue a Baked Apple pra ela. Recompensa gorda em rupees pra um esforço mínimo.',
    },
    {
      id: 'sq_spark_of_romance',
      name: 'The Spark of Romance',
      sub: 'Jogo — Rito Village',
      detail: 'Jogo, marido da Juney na pousada do Rito Village, precisa de um sílex (Flint) pra acender a fogueira. Você provavelmente já tem vários de quebrar minérios — entregue um e ganhe rupees. Se faltar, quebre depósitos de minério em qualquer caverna ou montanha.',
    },
    {
      id: 'sq_curry_for_what_ails_you',
      name: 'Curry for What Ails You',
      sub: 'Lester — Rito Stable',
      detail: 'Lester, no Rito Stable, quer Goron Spice pra fazer Curry Rice. O tempero vem de Goron City, mas a mercadora ambulante Yammo (circula entre os estábulos Tabantha Bridge e Serenne) vende quando está chovendo. Entregue o tempero e receba a recompensa.',
    },
    {
      id: 'sq_gift_great_fairy',
      name: 'A Gift for the Great Fairy',
      sub: 'Toren — Tabantha Bridge Stable',
      detail: 'Toren sonha em conhecer a Grande Fada Kaysa, mas tem medo dos Guardian Skywatchers da Tabantha Frontier. Leve a oferenda até a fonte da Kaysa, na colina ao sul da Tabantha Tower, desperte a fada e volte pra contar a novidade. Aproveite a viagem pra desbloquear os upgrades de armadura.',
    },
  ],
  extras: [
    {
      id: 'mem_3',
      name: 'Memória #3 — Ancient Columns',
      detail: 'Vá às Ancient Columns, o planalto de colunas em ruínas a oeste/sudoeste da Tabantha Tower, onde fica o santuário Tena Ko\'sah. O ponto exato da memória é no meio das colunas quebradas, perto do arco em ruínas — o Kass também costuma estar por lá. Plane da torre pra chegar fácil.',
    },
    {
      id: 'mem_6',
      name: 'Memória #6 — Irch Plain',
      detail: 'A Irch Plain fica a nordeste da Ridgeland Tower, na planície aberta entre o Lindor\'s Brow e o fosso oeste do Hyrule Castle. Plane da torre pra nordeste e procure o ponto da memória no meio do campo — compare com a foto do Sheikah Slate pra achar o ângulo exato.',
    },
    {
      id: 'mem_10',
      name: 'Memória #10 — Sanidin Park Ruins',
      detail: 'As Sanidin Park Ruins ficam no topo do Safula Hill, a oeste do Lake Kolomo e a noroeste do Outskirt Stable, no pé da Satori Mountain. O ponto da memória é junto da grande estátua de cabeça de cavalo, olhando pro campo. Suba a cavalo pela estrada que contorna a colina.',
    },
    {
      id: 'fairy_kaysa',
      name: 'Grande Fada Kaysa',
      detail: 'A fonte da Kaysa fica no alto da colina ao sul da Tabantha Tower — dá pra ver o botão de flor gigante planando da torre. Cuidado com os Guardian Skywatchers patrulhando a região. Pague a oferenda pra despertá-la e liberar mais um nível de upgrade de armaduras (e concluir a side quest do Toren).',
    },
    {
      id: 'flight_range',
      name: 'Flight Range',
      detail: 'Campo de treino de arco voador dos Rito, em Dronoc\'s Pass, a noroeste do Rito Village (perto do santuário Sha Warvo). É lá que você treina com o Teba durante a quest do Divine Beast Vah Medoh, usando updrafts pra atirar em alvos no ar. Depois da campanha, dá pra voltar e jogar o minigame de pontuação.',
    },
    {
      id: 'satori_mountain',
      name: 'Satori Mountain / Lord of the Mountain',
      detail: 'De vez em quando a Satori Mountain brilha com uma luz verde à noite — é sinal de que o Lord of the Mountain (Satori) apareceu. Ele surge perto da cerejeira e do laguinho no alto da montanha, cercado de Blupees. Aproxime-se agachado e monte nele: é a montaria mais rápida do jogo, mas não pode ser registrada no estábulo. Vale fotografar pro Compendium.',
    },
    {
      id: 'thundra_plateau',
      name: 'Thundra Plateau',
      detail: 'Platô a oeste da Ridgeland Tower castigado por uma tempestade elétrica eterna. Guarde o equipamento de metal, cuidado com os wizzrobes e resolva o puzzle dos quatro orbes coloridos (shrine quest Trial of Thunder) pra revelar o santuário Toh Yahsa. O baú com a Rubber Armor fica na entrada do santuário.',
    },
    {
      id: 'tabantha_koroks_guide',
      name: 'Koroks da região',
      sub: 'Use o contador da região + mapa interativo',
      detail: 'São centenas espalhados — inviável listar um a um. Use o mapa interativo objmap.zeldadungeon.net (camada Korok Seeds) e marque no contador abaixo conforme coletar.',
    },
  ],
}

export default tabantha;
