import type { Region } from '../../types';

const lanayru: Region = {
  key: 'Lanayru',
  id: 'lanayru',
  name: 'Lanayru',
  description:
    'Região da torre Lanayru: cobre as Lanayru Wetlands, o Zora\'s Domain e o East Reservoir Lake. É o cenário da Divine Beast Vah Ruta e lar dos Zora — prepare-se pra muita chuva e escalada limitada no caminho.',
  koroksTotal: 60,
  towers: [
    {
      id: 'tower_lanayru',
      name: 'Lanayru Tower',
      detail:
        'Fica num morro entre as Lanayru Wetlands e o início do Zora River, cercada por lama e alguns inimigos na base. Suba pelo lado leste, usando as plataformas de pedra pra descansar a estamina. Libera o mapa de toda a região Lanayru.',
    },
  ],
  shrines: [
    {
      id: 'shrine_soh_kofi',
      name: 'Soh Kofi',
      detail:
        'Logo ao norte da Lanayru Tower, perto do início da trilha do Zora River (região da Inogo Bridge, onde Sidon te aborda). Provação "A Minor Test of Strength": luta contra um Guardian Scout. Bom pegar já no caminho pro Zora\'s Domain.',
    },
    {
      id: 'shrine_kaya_wan',
      name: 'Kaya Wan',
      detail:
        'Colado no Wetland Stable, no morrinho logo ao norte do estábulo. Provação "Shields from Water": puzzle de água com plataformas e correnteza — Cryonis resolve quase tudo. Explore as laterais pra achar os baús extras.',
    },
    {
      id: 'shrine_daka_tuss',
      name: 'Daka Tuss',
      detail:
        'Numa ilhota no meio das Lanayru Wetlands, ao sul da torre. Provação "Sunken Scoop": use Magnesis pra controlar uma tigela de metal e pescar as esferas submersas até o pedestal. Curto e tranquilo, só exige calma com o Magnesis.',
    },
    {
      id: 'shrine_sheh_rata',
      name: 'Sheh Rata',
      detail:
        'Escondido numa ilhota dentro de uma lagoa cercada de árvores, ao norte das Lanayru Wetlands, perto do Zelo Pond e a leste do Crenel Peak. Provação "Speed of Light": gire a manivela pra mudar o nível da água e acerte o interruptor com o laser no tempo certo. Fácil de passar batido no mapa — procure a lagoa redonda.',
    },
    {
      id: 'shrine_rucco_maag',
      name: 'Rucco Maag',
      detail:
        'Numa ilhota do Rutala River, a leste do Zora\'s Domain, ao sul do Ruto Mountain. Provação "Five Flames": acenda as cinco tochas usando a tocha de madeira ou flechas de fogo — cuidado com a água apagando o fogo. Se estiver chovendo (quase sempre por lá), resolva por dentro do santuário mesmo, que o puzzle é interno.',
    },
    {
      id: 'shrine_shai_yota',
      name: 'Shai Yota',
      detail:
        'No Horon Lagoon, a nordeste do Zora\'s Domain. Aparece só depois da shrine quest "Master of the Wind", do Kass: destrua as rochas que bloqueiam as correntes de vento (bombas ou Stasis + marreta) e use a corrente de ar pra planar até o santuário. Lá dentro é só bênção — baú e Spirit Orb.',
    },
    {
      id: 'shrine_dagah_keek',
      name: 'Dagah Keek',
      detail:
        'No Veiled Falls, a cachoeira ao sul do Zora\'s Domain. Vem da shrine quest "The Ceremonial Song", da criança Laruta: recupere o Ceremonial Trident caído na água perto da ponte do Domain (Magnesis ajuda a achar) e, com a Zora Armor, suba a cachoeira e faça um ataque mergulhando com o tridente sobre o pedestal. O santuário em si é só bênção.',
    },
    {
      id: 'shrine_neez_yohma',
      name: 'Ne\'ez Yohma',
      detail:
        'Dentro do próprio Zora\'s Domain, na base da cidade — impossível não ver. Provação "Pushing Power": guie a esfera rampa abaixo contra a correnteza usando pilares de Cryonis pra desviar o caminho. Sirva de teleporte pro Domain, então pegue cedo.',
    },
    {
      id: 'shrine_kah_mael',
      name: 'Kah Mael',
      detail:
        'Na Tingel Island, a ilha mais ao norte do arquipélago no Lanayru Sea — chegue de jangada com Korok Leaf ou pulando de ilha em ilha com Cryonis. O santuário fica numa caverna tampada por uma laje de pedra: use Stasis + marretadas (ou Octo Balloons) pra tirar a laje. Provação "Drop and Rise": corte as cordas da plataforma pra derrubar o cubo na balança e se lançar pra cima.',
    },
  ],
  sidequests: [
    {
      id: 'sq_special_delivery',
      name: 'Special Delivery',
      detail:
        'Finley, no Bank of Wishes (margem do Zora River, ao sul da Inogo Bridge). Acompanhe a carta dela boiando rio abaixo, protegendo-a dos inimigos e desviando-a quando encalhar, até a foz perto da Mercay Island. Missão de escolta meio lenta — vá pela margem com arco pronto.',
    },
    {
      id: 'sq_lynel_safari',
      name: 'Lynel Safari',
      detail:
        'Laflat, no Zora\'s Domain. Tire uma foto do Lynel vermelho no Shatterback Point (topo do Ploymus Mountain) com a câmera da Sheikah Slate. Dá pra fotografar de longe/escondido sem lutar — aproveite a subida pra farmar as shock arrows da região. Recompensa: Zora Greaves.',
    },
    {
      id: 'sq_giant_of_ralis_pond',
      name: 'The Giant of Ralis Pond',
      detail:
        'Torfeau, no Zora\'s Domain. Derrote o Hinox que dorme no Ralis Pond, a oeste do Domain, descendo o rio. Mire nos olhos pra derrubar e ataque enquanto ele está no chão; flechas de fogo/bomba aceleram muito.',
    },
    {
      id: 'sq_frog_catching',
      name: 'Frog Catching',
      detail:
        'Tumbo, criança Zora no Zora\'s Domain (durante o dia). Entregue 5 hot-footed frogs — eles aparecem perto de água e pulam pelo mapa quando chove, especialmente nas Lanayru Wetlands. Agache e se aproxime devagar pra capturar.',
    },
    {
      id: 'sq_zora_stone_monuments',
      name: 'Zora Stone Monuments',
      detail:
        'Jiahto, o historiador do Zora\'s Domain. Encontre os 10 monumentos de pedra com a história dos Zora espalhados pela região do Lanayru Great Spring, ao redor do Domain. Vários ficam em pontos altos ou escondidos atrás de cachoeiras — na dúvida, siga um guia visual (Zelda Dungeon tem mapa dos 10).',
    },
    {
      id: 'sq_diving_is_beautiful',
      name: 'Diving is Beautiful',
      detail:
        'Gruve, perto da escadaria que leva ao trono no Zora\'s Domain. Ele te desafia a mergulhar da plataforma na água lá embaixo — é só pular de onde ele indica e cair na água. Uma das quests mais rápidas do jogo, faça junto com as outras do Domain.',
    },
    {
      id: 'sq_luminous_stone_gathering',
      name: 'Luminous Stone Gathering',
      detail:
        'Ledo, o Zora martelando um pilar ao sul da fonte da Mipha no Zora\'s Domain. Entregue 10 luminous stones e ele paga em diamante — e continua trocando depois, então é uma boa fonte de diamantes. Luminous stones brilham à noite em paredões de pedra por toda a região.',
    },
    {
      id: 'sq_a_wife_washed_away',
      name: 'A Wife Washed Away',
      detail:
        'Fronk, no Zora\'s Domain, procura a esposa Mei, que sumiu. Ela está longe: numa ilhota do Lake Hylia, a oeste da Bridge of Hylia, do outro lado do mapa. Fale com ela e volte ao Fronk pra concluir — deixe pra quando estiver explorando o sul de Hyrule.',
    },
    {
      id: 'sq_riverbed_reward',
      name: 'Riverbed Reward',
      detail:
        'Izra, na beira do rio perto do Wetland Stable. Ele quer o tesouro afundado no leito do rio ali do lado: use Magnesis pra içar o baú de metal da água. Trinta segundos de quest — resolva quando passar pelo estábulo.',
    },
  ],
  extras: [
    {
      id: 'extra_ploymus_lynel',
      name: 'Ploymus Mountain / Shatterback Point',
      sub: 'Lynel — farme shock arrows antes do Vah Ruta',
      detail:
        'Um Lynel vermelho patrulha o topo do Ploymus Mountain, acima do Zora\'s Domain (suba a cachoeira com a Zora Armor). Antes do Vah Ruta você precisa de 20 shock arrows: dá pra coletar as flechas cravadas nas árvores e no chão sem enfrentar o bicho — vá agachado e evite o campo de visão dele. Aproveite a subida pra já fazer a foto da quest Lynel Safari.',
    },
    {
      id: 'extra_zora_armor_set',
      name: 'Zora Armor (conjunto completo)',
      sub: 'Peitoral + Zora Helm + Zora Greaves',
      detail:
        'O peitoral (Zora Armor) vem do King Dorephan durante a quest principal e permite nadar cachoeira acima. O Zora Helm está num baú afundado no Toto Lake, a nordeste do Domain — mergulhe com Magnesis/Cryonis pra içar o baú; ele libera o ataque giratório nadando. A Zora Greaves é recompensa da side quest Lynel Safari (foto do Lynel no Shatterback Point).',
    },
    {
      id: 'extra_vah_ruta',
      name: 'Divine Beast Vah Ruta / Mipha\'s Grace',
      sub: 'Referência — rastreado na seção Divine Beasts',
      detail:
        'A campanha do Zora\'s Domain culmina no East Reservoir Lake, enfrentando o Vah Ruta com o Sidon e depois o Waterblight Ganon lá dentro. Recompensa: Mipha\'s Grace. O progresso completo dessa Divine Beast é marcado na seção Divine Beasts do tracker.',
    },
    {
      id: 'lanayru_koroks_guide',
      name: 'Koroks da região',
      sub: 'Use o contador da região + mapa interativo',
      detail:
        'São centenas espalhados — inviável listar um a um. Use o mapa interativo objmap.zeldadungeon.net (camada Korok Seeds) e marque no contador abaixo conforme coletar.',
    },
  ],
}

export default lanayru;
