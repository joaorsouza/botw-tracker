import type { Region } from '../../types';

const gerudo: Region = {
  key: 'Gerudo',
  id: 'gerudo',
  name: 'Gerudo',
  description:
    'Cobre as regiões das torres Wasteland e Gerudo: o deserto Gerudo com Gerudo Town e Kara Kara Bazaar, e as montanhas geladas das Gerudo Highlands. Calor extremo de dia, frio congelante à noite — uma das áreas com mais side quests do jogo.',
  koroksTotal: 105,
  towers: [
    {
      id: 'tower_wasteland',
      name: 'Wasteland Tower',
      detail:
        'Fica na borda leste do deserto, cercada por um lamaçal de areia movediça. Use as colunas de pedra ao redor pra ganhar altura e planar até a base da torre. Dá pra chegar vindo do Gerudo Canyon antes mesmo de entrar no deserto profundo.',
    },
    {
      id: 'tower_gerudo',
      name: 'Gerudo Tower',
      detail:
        'Uma das torres mais altas do jogo, num pilar de rocha entre o deserto e as Gerudo Highlands. Escalar do chão é longo — aproxime-se pelos penhascos mais altos ao norte/leste e plane até ela pra economizar stamina. O Kass fica no topo com a shrine quest Sign of the Shadow.',
    },
  ],
  shrines: [
    {
      id: 'shrine_hawa_koth',
      name: 'Hawa Koth',
      detail:
        'Extremo sudoeste do deserto, perto do Gerudo Great Skeleton (onde fica a Grande Fada Tera). Provação "The Current Solution": puzzle de circuitos elétricos usando engrenagens e Magnesis. A travessia até lá é longa — vá de sand seal.',
    },
    {
      id: 'shrine_kema_zoos',
      name: 'Kema Zoos',
      detail:
        'Noroeste do deserto, revelado pela shrine quest The Silent Swordswomen (Laine, no portão oeste de Gerudo Town): siga a direção apontada pelas pequenas estátuas de espadachins na areia. Provação "A Delayed Puzzle", com barris-bomba de detonação atrasada.',
    },
    {
      id: 'shrine_tho_kayu',
      name: 'Tho Kayu',
      detail:
        'Escondido na tempestade de areia de Toruma Dunes, oeste do deserto — lá a bússola e o mapa param de funcionar. Revelado pela shrine quest The Eye of the Sandstorm (Nobiro, Kara Kara Bazaar). É um santuário de bênção: baú e orbe direto.',
    },
    {
      id: 'shrine_raqa_zunzo',
      name: 'Raqa Zunzo',
      detail:
        'Em Palu Wasteland, sudoeste de Gerudo Town. Revelado pela shrine quest The Undefeated Champ: vença a corrida de sand seal do rali (perto da cidade) em menos de 1:30. Santuário de bênção — a recompensa inclui a armadura de sand seal na quest.',
    },
    {
      id: 'shrine_misae_suma',
      name: 'Misae Suma',
      detail:
        'No sudeste do deserto, na região do East Barrens. Revelado pela shrine quest The Perfect Drink: a Pokki desmaiou no pedestal — leve gelo do Northern Icehouse até a Furosa no Noble Canteen pra fazer o drink Noble Pursuit. Santuário de bênção.',
    },
    {
      id: 'shrine_dila_maag',
      name: 'Dila Maag',
      detail:
        'Dentro do South Lomei Labyrinth, no extremo sudeste do deserto. A shrine quest The Desert Labyrinth é navegar o labirinto até o centro — pelas muralhas dá pra encurtar bastante escalando e planando. Santuário de bênção; cuidado com os Guardians enterrados.',
    },
    {
      id: 'shrine_korsh_ohu',
      name: 'Korsh O\'hu',
      detail:
        'Nas East Gerudo Ruins, revelado pela shrine quest The Seven Heroines (Rotana, em Gerudo Town). Coloque os sete orbes nos nichos das estátuas das heroínas combinando os símbolos — use Magnesis e observe o símbolo que cada estátua segura. Santuário de bênção.',
    },
    {
      id: 'shrine_kay_noh',
      name: 'Kay Noh',
      detail:
        'No Gerudo Canyon, na rota entre o Gerudo Canyon Stable e o deserto — bom teleporte pra quem está chegando. Provação "Power of Electricity": conduza a corrente elétrica movendo blocos e orbes.',
    },
    {
      id: 'shrine_dako_tah',
      name: 'Dako Tah',
      detail:
        'No alto dos penhascos a nordeste do Kara Kara Bazaar. Provação "Electric Path": use plataformas móveis e objetos metálicos pra fechar circuitos elétricos — cuidado pra não se eletrocutar segurando metal. Tem baú com espada elétrica no caminho.',
    },
    {
      id: 'shrine_suma_sahma',
      name: 'Suma Sahma',
      detail:
        'No Mount Granajh, montanha gelada ao sudeste do deserto — leve roupa de frio. Revelado pela shrine quest Secret of the Snowy Peaks: leia o diário na cabana, ponha uma bola de neve na plataforma de pedra e espere a sombra dela bater no ponto certo no fim da tarde (~16h). Santuário de bênção.',
    },
    {
      id: 'shrine_jee_noh',
      name: 'Jee Noh',
      detail:
        'No início do Gerudo Canyon, ao lado da estrada pro deserto. Provação "On the Move": acerte orbes em movimento nas esteiras pra encaixá-los nos receptáculos — Stasis e flechas ajudam muito no timing.',
    },
    {
      id: 'shrine_daqo_chisay',
      name: 'Daqo Chisay',
      detail:
        'Bem em frente ao portão de Gerudo Town — o teleporte mais útil da região. Provação "The Whole Picture": mais um puzzle de eletricidade, conectando a corrente com blocos metálicos e Magnesis.',
    },
    {
      id: 'shrine_keeha_yoog',
      name: 'Keeha Yoog',
      detail:
        'No paredão do Gerudo Summit, nas Highlands, junto às inscrições rupestres da shrine quest Cliffside Etchings (Geggle, no Tabantha Bridge Stable). O jeito mais fácil de chegar é planar da Gerudo Tower ou dos picos vizinhos. Leve roupa de frio.',
    },
    {
      id: 'shrine_kuh_takkar',
      name: 'Kuh Takkar',
      detail:
        'Em Laparoh Mesa, nas Gerudo Highlands, preso dentro de um bloco de gelo gigante — provação "Melting Ice Hazard". Derreta o gelo com fogo (flechas de fogo, tocha ou fogueira). Região congelante: prepare roupa de frio ou comida apimentada.',
    },
    {
      id: 'shrine_kema_kosassa',
      name: 'Kema Kosassa',
      detail:
        'No Risoka Snowfield, oeste das Gerudo Highlands. Provação "A Major Test of Strength" — um dos Guardian Scouts mais fortes do jogo, então vá com boas armas e escudo. A área é gelada e cheia de penhascos; venha planando dos picos.',
    },
    {
      id: 'shrine_sasa_kai',
      name: 'Sasa Kai',
      detail:
        'Em Birida Lookout, a oeste da Gerudo Tower. Revelado pela shrine quest Sign of the Shadow (Kass, no topo da Gerudo Tower): no fim da tarde, suba no pedestal apontado pela sombra e atire uma flecha em direção ao sol. Lá dentro, "A Modest Test of Strength".',
    },
    {
      id: 'shrine_joloo_nah',
      name: 'Joloo Nah',
      detail:
        'No Mount Nabooru, revelado pela shrine quest Test of Will: aguente o desafio de calor dos irmãos Goron (Bayge, Mihen e Kabetta) dentro do círculo — na segunda rodada, sem resistência a fogo, elixires de resistência ao calor ajudam. Provação "Joloo Nah Apparatus", puzzle de girar o aparato com o giroscópio.',
    },
    {
      id: 'shrine_sho_dantu',
      name: 'Sho Dantu',
      detail:
        'Na entrada do Karusa Valley, noroeste do deserto — o mesmo caminho que leva ao Yiga Clan Hideout. Provação "Two Bombs": puzzle usando as bombas redonda e cúbica pra ativar interruptores e abrir caminho.',
    },
  ],
  sidequests: [
    {
      id: 'sq_the_thunder_helm',
      name: 'The Thunder Helm',
      detail:
        'Dada pela Riju em Gerudo Town depois de zerar a Divine Beast Vah Naboris. Ela empresta o Thunder Helm (imunidade a raios) se você resolver os problemas do povo: complete The Search for Barta, Tools of the Trade, The Mystery Polluter e Medicinal Molduga, e depois volte a falar com ela.',
    },
    {
      id: 'sq_the_search_for_barta',
      name: 'The Search for Barta',
      detail:
        'Parte da cadeia do Thunder Helm — fale com a Liana no quartel de Gerudo Town. A soldada Barta sumiu: ela está desmaiada no Gerudo Great Skeleton, no extremo sudoeste do deserto. Leve um hydromelon pra reanimá-la. Vá de sand seal, é longe.',
    },
    {
      id: 'sq_tools_of_the_trade',
      name: 'Tools of the Trade',
      detail:
        'Parte da cadeia do Thunder Helm — a joalheira Isha, de Gerudo Town, precisa de 10 flint pra reabrir a loja. Flint cai fácil minerando depósitos de minério (Eldin e Highlands têm de sobra). Recompensa: joia de brinde e a joalheria Starlight Memories aberta.',
    },
    {
      id: 'sq_the_mystery_polluter',
      name: 'The Mystery Polluter',
      detail:
        'Parte da cadeia do Thunder Helm — a menina Dalia, no canto noroeste de Gerudo Town, reclama de cascas de melão poluindo a água. Siga o canal até a Calyban, no alto da muralha, e leve 10 wildberries pra ela parar. Wildberries crescem nas áreas geladas das Highlands e do Hebra.',
    },
    {
      id: 'sq_medicinal_molduga',
      name: 'Medicinal Molduga',
      detail:
        'Parte da cadeia do Thunder Helm — a Malena, em Gerudo Town, precisa de Molduga guts pro remédio do marido. Mate um dos quatro Molduga do deserto (veja a entrada de Molduga nos extras) e traga a víscera pra ela.',
    },
    {
      id: 'sq_the_secret_clubs_secret',
      name: 'The Secret Club\'s Secret',
      detail:
        'Em Gerudo Town, a porta trancada do beco é o Gerudo Secret Club da Greta. Escute a conversa das clientes do lado de fora do Noble Canteen à noite pra descobrir a senha ("GSC♦") e entre. A loja vende as armaduras Radiant e Desert Voe.',
    },
    {
      id: 'sq_the_eighth_heroine',
      name: 'The Eighth Heroine',
      detail:
        'Fale com o Bozai correndo perto do portão de Gerudo Town (vestido de vai). Ele quer uma foto da lendária oitava heroína: a estátua fica nas Gerudo Highlands, na passagem entre o Gerudo Summit e o Mount Agaat. Fotografe a cabeça da estátua e volte. Recompensa: Sand Boots.',
    },
    {
      id: 'sq_the_forgotten_sword',
      name: 'The Forgotten Sword',
      detail:
        'Continuação de The Eighth Heroine — fale com o Bozai de novo na tenda fora de Gerudo Town. Agora ele quer a foto da espada da oitava heroína, cravada no extremo sul do Gerudo Summit. Cuidado com o White-Maned Lynel que ronda a área. Recompensa: Snow Boots.',
    },
    {
      id: 'sq_an_ice_guy',
      name: 'An Ice Guy',
      detail:
        'O Guy passou mal de calor no Kara Kara Bazaar, caído perto da água. Leve um chilly elixir pra ele (cozinhe um inseto refrescante, tipo winterwing butterfly ou cold darner, com uma parte de monstro). Recompensa em rupees.',
    },
    {
      id: 'sq_missing_in_action',
      name: 'Missing in Action',
      detail:
        'O Sesami, no Gerudo Canyon Stable, perdeu quatro amigos na travessia do canyon. Eles estão presos nas passarelas de madeira do desfiladeiro em Koukot Plateau, cada um cercado de Bokoblins — derrote os monstros pra libertar os quatro e volte ao Sesami.',
    },
    {
      id: 'sq_rushroom_rush',
      name: 'Rushroom Rush!',
      detail:
        'O Pirou, no Gerudo Canyon Stable, quer 55 rushrooms. Eles crescem grudados nos paredões do próprio Gerudo Canyon e arredores — escale coletando ou compre de vendedores. Recompensa em rupees por lote entregue.',
    },
    {
      id: 'sq_good_sized_horse',
      name: 'Good-Sized Horse',
      detail:
        'O Zyle, na estrada do Gerudo Canyon, quer comprar um cavalo grande. Traga um cavalo montado até ele (ou venda um que você já tenha registrado) pra fechar o negócio e ganhar rupees. Quest rápida de fazer a caminho do deserto.',
    },
  ],
  extras: [
    {
      id: 'mem_4',
      name: 'Memória #4 — Kara Kara Bazaar',
      detail:
        'Foto tirada no Kara Kara Bazaar. O ponto exato da memória fica no topo da grande rocha do oásis, acima da lojinha e da pousada — escale a rocha e procure o brilho no chão. Fácil de pegar junto com a compra da roupa Gerudo.',
    },
    {
      id: 'extra_great_fairy_tera',
      name: 'Grande Fada Tera',
      detail:
        'Fica dentro do Gerudo Great Skeleton (esqueleto de leviatã), no extremo sudoeste do deserto, perto do santuário Hawa Koth. É uma das quatro Grandes Fadas que melhoram armaduras — o custo depende de quantas você já liberou (até 10.000 rupees se for a última). Vá de sand seal e leve proteção contra o calor.',
    },
    {
      id: 'extra_yiga_hideout',
      name: 'Yiga Clan Hideout',
      detail:
        'No fim do Karusa Valley, norte do deserto (passando o santuário Sho Dantu). Trecho stealth da quest da Vah Naboris: os guardas matam em um golpe, então use furtividade e jogue mighty bananas pra distraí-los. No fim, derrote o Master Kohga e recupere o Thunder Helm da Riju. Depois de limpo, o local vira bom ponto de farm de mighty bananas.',
    },
    {
      id: 'extra_molduga',
      name: 'Molduga (4 minibosses)',
      detail:
        'Quatro Moldugas vivem sob a areia do deserto (Toruma Dunes, Southern Oasis, East Barrens e região do Gerudo Great Skeleton). Suba numa rocha ou ruína onde ele não te alcança, jogue uma bomba na areia e detone quando ele engolir — aí ele fica encalhado e você desce pra bater. Repita. Os drops servem pra Medicinal Molduga e pro medalhão do Kilton.',
    },
    {
      id: 'extra_gerudo_outfit',
      name: 'Roupa Gerudo (entrada na cidade)',
      detail:
        'Homens não entram em Gerudo Town — você precisa do conjunto Gerudo (vai). Compre do Vilia, no telhado da pousada do Kara Kara Bazaar (600 rupees), durante a quest Forbidden City Entry. Bônus: o conjunto dá resistência ao calor do dia.',
    },
    {
      id: 'extra_desert_climate',
      name: 'Clima do deserto (calor de dia, frio à noite)',
      detail:
        'O deserto queima de dia e congela à noite — prepare os dois lados antes de ir. De dia: roupa Gerudo/Desert Voe, comida gelada (chilly) ou hydromelon. À noite: roupa quente (Warm Doublet/Snowquill) ou comida apimentada (spicy peppers). Elixires resolvem se você não tiver as armaduras.',
    },
    {
      id: 'extra_sand_seal',
      name: 'Sand seal (travessia do deserto)',
      detail:
        'Cavalos não entram no deserto — alugue um sand seal na loja ao lado do portão de Gerudo Town (20 rupees) e surfe segurando o escudo. Também dá pra se aproximar de sand seals selvagens agachado e montar de graça. Essencial pra alcançar os cantos distantes (Great Skeleton, labirinto, ruínas).',
    },
    {
      id: 'gerudo_koroks_guide',
      name: 'Koroks da região',
      sub: 'Use o contador da região + mapa interativo',
      detail:
        'São centenas espalhados — inviável listar um a um. Use o mapa interativo objmap.zeldadungeon.net (camada Korok Seeds) e marque no contador abaixo conforme coletar.',
    },
  ],
}

export default gerudo;
