import type { Region } from '../../types';

const hateno: Region = {
  key: 'Hateno / Necluda',
  id: 'hateno',
  name: 'Hateno / Necluda',
  description: 'Cobre as regiões das torres Dueling Peaks e Hateno: Kakariko Village, Hateno Village, os Dueling Peaks, a face sul do Monte Lanayru e a costa de Necluda. É a primeira grande área depois do Great Plateau, com muitos santuários fáceis e as vilas mais importantes do início do jogo.',
  koroksTotal: 129,
  towers: [
    {
      id: 'tower_dueling_peaks',
      name: 'Dueling Peaks Tower',
      detail: 'Fica na margem sul do rio, a sudoeste dos Dueling Peaks — bem visível vindo do Great Plateau pela Proxim Bridge. Escalada tranquila, sem inimigos relevantes na base. Ativa o mapa de West Necluda.',
    },
    {
      id: 'tower_hateno',
      name: 'Hateno Tower',
      detail: 'A oeste de Hateno Village, no Ginner Woods, cercada por espinhos na base. Escale as rochas ao lado até um ponto acima da linha de espinhos, ou use plataformas de metal com Magnesis. Ativa o mapa de East Necluda.',
    },
  ],
  shrines: [
    {
      id: 'shrine_bosh_kala',
      name: 'Bosh Kala (The Wind Guides You)',
      detail: 'Na margem leste do rio Hylia, perto da Proxim Bridge e das East Post Ruins — provavelmente o primeiro santuário que você vê ao sair do Great Plateau. Use o paraglider nas correntes de vento para cruzar os vãos. Bem rápido.',
    },
    {
      id: 'shrine_toto_sah',
      name: 'Toto Sah (Toto Sah Apparatus)',
      detail: 'Escondido no Hickaly Woods, seguindo o rio ao sul/sudeste dos Dueling Peaks. A entrada fica atrás de rochas destrutíveis na encosta — quebre com bombas ou martelo. Puzzle de girar o aparato com controle de movimento.',
    },
    {
      id: 'shrine_shee_vaneer',
      name: 'Shee Vaneer (Twin Memories)',
      detail: 'No topo do pico sul dos Dueling Peaks — escalada longa, leve comida de stamina. Puzzle gêmeo com o Shee Venath (pico norte): a posição das esferas de um é a solução do outro. Anote ou fotografe o padrão antes de resolver.',
    },
    {
      id: 'shrine_ree_dahee',
      name: 'Ree Dahee (Timing is Critical)',
      detail: 'Na base dos Dueling Peaks, junto ao desfiladeiro do rio que corta as montanhas. Puzzle de pisar em interruptores no tempo certo para inclinar rampas e guiar a bola. Curto e simples.',
    },
    {
      id: 'shrine_shee_venath',
      name: 'Shee Venath (Twin Memories)',
      detail: 'No topo do pico norte dos Dueling Peaks. Par do Shee Vaneer: troque as posições das esferas entre os dois santuários (a configuração vista em um resolve o outro). Fazer os dois na mesma subida economiza tempo.',
    },
    {
      id: 'shrine_ha_dahamar',
      name: 'Ha Dahamar (The Water Guides)',
      detail: 'Ao lado do Dueling Peaks Stable, dentro de uma poça cercada de espinhos. Entre planando de cima ou crie pilares de gelo com Cryonis para passar por cima dos espinhos. Lá dentro, use Cryonis nas quedas d\'água e escadas.',
    },
    {
      id: 'shrine_taloh_naeg',
      name: 'Ta\'loh Naeg (Ta\'loh Naeg\'s Teaching)',
      detail: 'Na colina logo acima de Kakariko Village, subindo a trilha atrás da casa da Impa. Tutorial de combate: ensina side hop, backflip, perfect guard e ataque carregado. Vale fazer cedo — as técnicas ajudam o jogo inteiro.',
    },
    {
      id: 'shrine_hila_rao',
      name: 'Hila Rao (Drifting)',
      detail: 'No Floret Sandbar, ilhota no rio Hylia ao norte do Dueling Peaks Stable. A Magda cuida do jardim em volta — a side quest informal Watch Out for the Flowers: NÃO pise nas flores (pisar 3 vezes tem consequências). Dentro, puzzle de plataformas flutuando na correnteza.',
    },
    {
      id: 'shrine_lakna_rokee',
      name: 'Lakna Rokee (Lakna Rokee\'s Blessing)',
      detail: 'Atrás de Kakariko Village, liberado pela shrine quest The Stolen Heirloom: complete as side quests dos moradores (Flown the Coop, By Firefly\'s Light etc.) e, à noite, siga o Dorian até o pedestal do santuário. Derrote o Yiga Blademaster para abrir. Interior é só um baú de bênção.',
    },
    {
      id: 'shrine_chaas_qeta',
      name: 'Chaas Qeta (A Major Test of Strength)',
      detail: 'Na Tenoko Island, ilhota isolada na costa sul de Necluda. Chegue planando dos penhascos da costa (ponto alto + stamina) ou com jangada/Cryonis. Major Test of Strength: Guardian Scout IV — leve armas boas e aprenda o perfect guard antes.',
    },
    {
      id: 'shrine_myahm_agana',
      name: 'Myahm Agana (Myahm Agana Apparatus)',
      detail: 'Dentro de Hateno Village, na plataforma acima da lagoa. Puzzle de labirinto inclinável com controle de movimento — dica clássica: vire o labirinto de cabeça para baixo e role a bola pela superfície lisa de trás.',
    },
    {
      id: 'shrine_tahno_oah',
      name: 'Tahno O\'ah (Tahno O\'ah\'s Blessing)',
      detail: 'Escondido na Madorna Mountain, a leste de Hateno Village. Shrine quest Secret of the Cedars: fale com a Clavia em Hateno — os três cedros no topo apontam para uma parede rachada no penhasco; quebre-a com bomba ou martelo. Interior é baú de bênção (Climbing Boots).',
    },
    {
      id: 'shrine_jitan_sami',
      name: 'Jitan Sa\'mi (Jitan Sa\'mi\'s Blessing)',
      detail: 'No Spring of Wisdom, cume do Monte Lanayru. Shrine quest The Spring of Wisdom (o Medda, em Hateno, dá a dica): suba a montanha com resistência ao frio máxima e liberte a dragoa Naydra atirando nos olhos de Malice — no chão e depois planando atrás dela. Interior é baú de bênção (Frostspear).',
    },
    {
      id: 'shrine_dow_naeh',
      name: 'Dow Na\'eh (Three Boxes)',
      detail: 'Atrás da cachoeira no extremo leste do Lanayru Promenade, perto do Firly Pond. Use Cryonis na base da cachoeira para subir até a entrada. Puzzle de posicionar caixas com Magnesis e Cryonis.',
    },
    {
      id: 'shrine_kam_urog',
      name: 'Kam Urog (Trial of Passage)',
      detail: 'No Robred Dropoff, área de estátuas a leste do Fort Hateno. Shrine quest The Cursed Statue: fale com o Calip na casa próxima e, à noite, atire uma flecha na estátua de olhos brilhantes entre as demais. Dentro, puzzle de engrenagens giratórias — paciência com o timing das plataformas.',
    },
    {
      id: 'shrine_mezza_lo',
      name: 'Mezza Lo (Ancient Trifecta)',
      detail: 'No Rabia Plain, ao norte de Kakariko, do outro lado do rio. Shrine quest The Crowned Beast, do Kass: monte em um animal selvagem com chifres (cervo é o mais fácil — aproxime-se agachado) e leve-o até o pedestal ainda montado. Puzzle curto com laser, cristal e Stasis.',
    },
  ],
  sidequests: [
    {
      id: 'sq_wild_horses',
      name: 'Wild Horses',
      sub: 'Rensa — Dueling Peaks Stable',
      detail: 'O dono do estábulo desafia você a capturar um cavalo selvagem e trazê-lo registrável em até 2 minutos. Aproxime-se agachado por trás, monte e acalme apertando L repetidamente. Os cavalos ficam no campo logo ao lado do estábulo.',
    },
    {
      id: 'sq_misko_the_great_bandit',
      name: 'Misko, the Great Bandit',
      sub: 'Domidak & Prissen — Dueling Peaks Stable',
      detail: 'Pague 100 rupees ao Domidak pela charada: o tesouro do bandido Misko fica numa caverna atrás da pequena cachoeira rio acima da Little Twin Bridge, a oeste do estábulo. Suba o riacho e use Cryonis ou escale para entrar. Vários baús com rupees e itens.',
    },
    {
      id: 'sq_the_priceless_maracas',
      name: 'The Priceless Maracas',
      sub: 'Hestu — estrada para Kakariko (West Necluda)',
      detail: 'O Hestu fica na beira da estrada entre o Dueling Peaks Stable e Kakariko Village. As maracas dele estão num baú em um acampamento Bokoblin próximo — derrote-os ou roube o baú com Magnesis. Devolvendo, ele passa a expandir seu inventário em troca de Korok Seeds (a primeira expansão é grátis).',
    },
    {
      id: 'sq_flown_the_coop',
      name: 'Flown the Coop',
      sub: 'Cado — Kakariko Village',
      detail: 'As Cuccos do Cado fugiram do cercado. Elas estão espalhadas pela vila — em telhados, atrás de casas e na horta. Pegue cada uma no colo e jogue de volta no cercado. Dica: dá para planar segurando uma Cucco para alcançar lugares baixos.',
    },
    {
      id: 'sq_arrows_of_burning_heat',
      name: 'Arrows of Burning Heat',
      sub: 'Rola — loja de flechas de Kakariko',
      detail: 'A Rola, da loja de flechas The Curious Quiver, pede para acender as tochas ao redor da Goddess Statue da vila. Use flechas de fogo (ela mesma vende) ou passe uma flecha normal por uma chama antes de atirar.',
    },
    {
      id: 'sq_kokos_kitchen',
      name: 'Koko\'s Kitchen',
      sub: 'Koko — panela de Kakariko (dia)',
      detail: 'A pequena Koko cozinha na panela perto da loja durante a tarde. Nesta primeira quest ela precisa de um Swift Carrot — colha nas hortas da própria vila ou compre na loja. Entregue e assista ao preparo.',
    },
    {
      id: 'sq_cooking_with_koko',
      name: 'Cooking with Koko',
      sub: 'Koko — panela de Kakariko (dia)',
      detail: 'Segunda receita da Koko: ela precisa de Goat Butter (manteiga de cabra). Compre na loja de Kakariko mesmo, a High Spirits Produce. Entregue na panela durante a tarde.',
    },
    {
      id: 'sq_koko_cuisine',
      name: 'Koko Cuisine',
      sub: 'Koko — panela de Kakariko (dia)',
      detail: 'Terceira receita: a Koko precisa de Raw Meat (carne crua). Cace um javali ou veado nos arredores da vila — o arco resolve rápido. Disponível após completar as duas quests anteriores dela.',
    },
    {
      id: 'sq_kokos_specialty',
      name: 'Koko\'s Specialty',
      sub: 'Koko — panela de Kakariko (dia)',
      detail: 'Última receita: leve Courser Bee Honey (mel). Derrube colmeias com flechas nas árvores ao redor de Kakariko ou nos bosques próximos — cuidado com as abelhas. Completa a linha de quests da Koko.',
    },
    {
      id: 'sq_playtime_with_cottla',
      name: 'Playtime with Cottla',
      sub: 'Cottla — Kakariko Village (dia)',
      detail: 'Encontre a Cottla correndo pela vila durante o dia e aceite brincar. No esconde-esconde, ela costuma se esconder atrás de casas ou árvores da vila — procure perto das construções. Recompensa simples, quest rapidinha.',
    },
    {
      id: 'sq_by_fireflys_light',
      name: 'By Firefly\'s Light',
      sub: 'Lasli — casa dela em Kakariko (noite)',
      detail: 'Só aparece depois de progredir nas quests de Kakariko (Flown the Coop, Find the Fairy Fountain etc.). Visite a Lasli em casa à noite, quando a loja fecha. Capture 5 Sunset Fireflies (aparecem à noite na vila e arredores — agache para chegar perto) e solte-as DENTRO da casa dela.',
    },
    {
      id: 'sq_the_heros_cache',
      name: 'The Hero\'s Cache',
      sub: 'Kass — Kitano Bay (East Necluda)',
      detail: 'O Kass toca acordeão no alto de Kitano Bay, a nordeste do Fort Hateno. A música dá a charada de um tesouro antigo: o baú está submerso na baía — localize o ponto indicado e puxe-o com Magnesis. Recompensa: rupees.',
    },
    {
      id: 'sq_slated_for_upgrades',
      name: 'Slated for Upgrades',
      sub: 'Purah — Hateno Ancient Tech Lab',
      detail: 'Após reativar o laboratório (quest principal Locked Mementos), a Purah oferece melhorias no Sheikah Slate em troca de peças ancestrais: Ancient Screws, Ancient Shafts e Ancient Cores (3 de cada, por etapa). Melhora as runas Remote Bomb e Stasis — farme peças em Guardians destruídos.',
    },
    {
      id: 'sq_sunshroom_sensing',
      name: 'Sunshroom Sensing',
      sub: 'Symin — Hateno Ancient Tech Lab',
      detail: 'O Symin pede uma foto de um Sunshroom — há alguns crescendo nas árvores logo atrás do laboratório. Fotografe, e ele desbloqueia o Sensor+ (rastrear qualquer coisa fotografada). Depois, traga 3 Sunshrooms do Retsam Forest usando o próprio sensor para praticar.',
    },
    {
      id: 'sq_the_sheep_rustlers',
      name: 'The Sheep Rustlers',
      sub: 'Koyin — Hateno Pasture (sul da vila)',
      detail: 'A Koyin, do pasto ao sul de Hateno Village, teve ovelhas roubadas por monstros. Desça até Hateno Beach e limpe o acampamento de Bokoblins que fica na praia. Volte e fale com ela para a recompensa.',
    },
    {
      id: 'sq_the_weapon_connoisseur',
      name: 'The Weapon Connoisseur',
      sub: 'Nebb — Hateno Village',
      detail: 'O garoto Nebb quer VER uma série de armas, uma por vez: começa com uma Traveler\'s Sword e avança até itens raros como Fire Rod, Moblin Club, Duplex Bow, Windcleaver e Ancient Short Sword. Basta mostrar (não entrega a arma). Quest longa — vá completando conforme explora o mundo.',
    },
    {
      id: 'sq_a_gift_for_my_beloved',
      name: 'A Gift for My Beloved',
      sub: 'Manny — Hateno Village',
      detail: 'O Manny é apaixonado pela Prima, recepcionista da pousada. Converse com ela para descobrir o que ela gosta: Restless Crickets — e o Manny pede 100! Capture agachado na grama alta (corte a grama e agarre rápido) ou compre do Beedle nos estábulos, que é bem mais prático.',
    },
    {
      id: 'sq_the_statues_bargain',
      name: 'The Statue\'s Bargain',
      sub: 'Horned Statue — Hateno Village',
      detail: 'Reze na estátua de chifres perto da lagoa do santuário Myahm Agana e ela ROUBA um Heart Container ou Stamina Vessel. Compre de volta por 120 rupees (ela vende por 100). Concluída, a estátua vira um serviço permanente de troca entre corações e stamina.',
    },
    {
      id: 'sq_hylian_homeowner',
      name: 'Hylian Homeowner',
      sub: 'Bolson — casa abandonada em Hateno',
      detail: 'A Bolson Construction está demolindo a casa perto da ponte em Hateno. Compre-a por 3.000 rupees + 30 feixes de madeira (Wood — corte árvores com machado). Depois, pague 100 rupees por móvel/melhoria ao Bolson até completar tudo. A casa guarda armas, arcos e escudos em suportes.',
    },
  ],
  extras: [
    {
      id: 'mem_7',
      name: 'Memória #7 — West Necluda (Scout\'s Hill)',
      detail: 'Foto 7 do álbum da câmera. O ponto fica no Scout\'s Hill, colina em West Necluda a noroeste da Dueling Peaks Tower, no caminho entre o Great Plateau e Kakariko. Suba a colina e compare o enquadramento com a foto (os Dueling Peaks aparecem ao fundo). Na dúvida, mostre a foto ao Pikango para dicas.',
    },
    {
      id: 'mem_11',
      name: 'Memória #11 — Lanayru Road: East Gate',
      detail: 'Foto 11 do álbum. Fica no portal de pedra no extremo LESTE do Lanayru Promenade — o corredor de ruínas que liga Kakariko ao sopé do Monte Lanayru. Vá até o East Gate (perto do santuário Dow Na\'eh) e posicione-se junto ao arco de pedra conforme o enquadramento da foto.',
    },
    {
      id: 'mem_13',
      name: 'Memória #13 — Blatchery Plain / Ash Swamp (dada pela Impa após as outras 12)',
      detail: 'Só liberada depois de recuperar as 12 memórias das fotos: volte à Impa em Kakariko e ela entrega a foto final. O local é o Ash Swamp, na Blatchery Plain, logo a oeste do Fort Hateno — o campo cheio de Guardians destruídos. O ponto exato fica entre as carcaças de Guardian, onde Zelda protegeu Link há 100 anos.',
    },
    {
      id: 'great_fairy_cotera',
      name: 'Grande Fada Cotera',
      detail: 'Fonte da Grande Fada na colina acima de Kakariko, passando o santuário Ta\'loh Naeg (ligada à side quest Find the Fairy Fountain). Pague 100 rupees para despertá-la — é a mais barata das quatro, desperte esta primeiro. Desbloqueia upgrade de armaduras (nível 1; mais níveis conforme desperta outras fadas).',
    },
    {
      id: 'naydra_spring_of_wisdom',
      name: 'Naydra / Spring of Wisdom (Monte Lanayru)',
      detail: 'No cume do Monte Lanayru, com frio EXTREMO — precisa de 2 níveis de resistência (roupa quente + comida/elixir). Na primeira visita, liberte a dragoa Naydra da Malice atirando nos olhos corrompidos (shrine quest The Spring of Wisdom → santuário Jitan Sa\'mi). Depois, Naydra sobrevoa a região ao amanhecer — atire no corpo para farmar scales e outras partes usadas em upgrades de armadura.',
    },
    {
      id: 'hateno_tech_lab',
      name: 'Hateno Ancient Tech Lab',
      detail: 'No alto do morro a leste de Hateno Village (quest principal Locked Mementos). Para reativar, acenda uma tocha na fornalha de chama AZUL na vila e leve a chama ladeira acima, acendendo os lampiões do caminho como checkpoints — cuidado com chuva. Ativa a câmera do Sheikah Slate e abre as quests da Purah e do Symin.',
    },
    {
      id: 'link_house',
      name: 'Casa do Link em Hateno',
      detail: 'A casa perto da ponte que a Bolson Construction ia demolir — compre por 3.000 rupees + 30 feixes de madeira (side quest Hylian Homeowner). Vire seu ponto de apoio: cama grátis, suportes para exibir armas, arcos e escudos, e vizinhança segura. Pré-requisito para From the Ground Up.',
    },
    {
      id: 'hateno_koroks_guide',
      name: 'Koroks da região',
      sub: 'Use o contador da região + mapa interativo',
      detail: 'São centenas espalhados — inviável listar um a um. Use o mapa interativo objmap.zeldadungeon.net (camada Korok Seeds) e marque no contador abaixo conforme coletar.',
    },
  ],
}

export default hateno;
