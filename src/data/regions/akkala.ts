import type { Region } from '../../types';

const akkala: Region = {
  key: 'Akkala',
  id: 'akkala',
  name: 'Akkala',
  description: 'Região da torre Akkala, no extremo nordeste de Hyrule — cobre as Akkala Highlands, Tarrey Town, a Deep Akkala (com o Skull Lake) e a Lomei Labyrinth Island. Terra de outono eterno, com a Akkala Citadel em ruínas, dois estábulos e o Akkala Ancient Tech Lab.',
  koroksTotal: 58,
  mapPos: { x: 3308, z: -1500, zoom: 4 },
  towers: [
    {
      id: 'tower_akkala',
      name: 'Akkala Tower',
      detail: 'Fica no topo da Akkala Citadel, uma fortaleza em ruínas cheia de Guardians (incluindo torretas embutidas nas muralhas). Evite a estrada frontal: contorne e suba por trás, pelo lado noroeste da cidadela, usando as muralhas como cobertura entre um trecho de escalada e outro. À noite fica mais fácil passar despercebido; leve comida de stamina pra parede final.',
    },
  ],
  shrines: [
    {
      id: 'shrine_zuna_kai',
      name: 'Zuna Kai',
      detail: 'Fica no pináculo do "olho" esquerdo do Skull Lake, na Deep Akkala. Liberado pela shrine quest The Skull\'s Eye (Kilton, no outro olho da caveira, dá a dica à noite): suba os penhascos ao norte do lago e plane até o topo da pedra do olho. Santuário de bênção — só abrir o baú e pegar o orbe.',
    },
    {
      id: 'shrine_ze_kasho',
      name: 'Ze Kasho',
      detail: 'No alto da colina a nordeste do South Akkala Stable, no caminho pra Akkala Tower. Lá dentro, "Ze Kasho Apparatus": puzzle de aparelho com controle de movimento — gire o mecanismo pra guiar a esfera/plataformas até o alvo. Tem baú escondido atrás de caixotes na segunda sala.',
    },
    {
      id: 'shrine_kenai_shakah',
      name: 'Ke\'nai Shakah',
      detail: 'Embutido num paredão de pedra na Ulria Grotto, no leste de Akkala — a entrada fica no meio do penhasco, então plane a partir do lado oposto do desfiladeiro ou desça escalando. Lá dentro é um Modest Test of Strength contra um Guardian Scout. Leve armas boas ou use Guard Parry.',
    },
    {
      id: 'shrine_ritaag_zumo',
      name: 'Ritaag Zumo',
      detail: 'No centro da espiral da Rist Peninsula, no nordeste de Akkala. Liberado pela shrine quest Into the Vortex: pegue o orbe e leve-o até o pedestal no miolo da espiral — dá pra cortar caminho nadando/planando em vez de seguir a espiral inteira cheia de inimigos elétricos. Santuário de bênção.',
    },
    {
      id: 'shrine_tutsuwa_nima',
      name: 'Tutsuwa Nima',
      detail: 'No Spring of Power (Fonte do Poder), no norte de Akkala. Liberado pela shrine quest The Spring of Power: ofereça uma Dinraal\'s Scale (escama do dragão Dinraal) na fonte. Lá dentro é um Major Test of Strength — Guardian Scout IV, um dos combates mais duros de santuário; vá bem equipado.',
    },
    {
      id: 'shrine_tu_kaloh',
      name: 'Tu Ka\'loh',
      detail: 'No coração da Lomei Labyrinth Island, o labirinto na ponta nordeste do mapa. Liberado pela shrine quest Trial of the Labyrinth: navegue o labirinto (dica: dá pra escalar boa parte das muralhas e planar). Santuário de bênção; no complexo do labirinto também está o baú com a peça do conjunto Barbarian.',
    },
    {
      id: 'shrine_dah_hesho',
      name: 'Dah Hesho',
      detail: 'Em cima de um morro no sul de Akkala, a leste do Lake Akkala e pertinho da fonte da Grande Fada Mija. Lá dentro é um Minor Test of Strength contra um Guardian Scout II — bom pra farmar peças ancient no começo do jogo.',
    },
    {
      id: 'shrine_katosa_aug',
      name: 'Katosa Aug',
      detail: 'Num platô ao norte do East Akkala Stable, subindo a estrada do Tech Lab. Lá dentro, "Katosa Aug Apparatus": uma espécie de golfe por controle de movimento — gire a raquete pra rebater a bola até os buracos. Capriche no timing da tacada pro baú opcional.',
    },
  ],
  sidequests: [
    {
      id: 'sq_from_the_ground_up',
      name: 'From the Ground Up',
      sub: 'Hudson — canteiro de obras no Lake Akkala (Tarrey Town)',
      detail: 'A grande cadeia de construção de Tarrey Town (requer ter comprado a casa em Hateno com a Bolson Construction). Fale com Hudson na ilha do Lake Akkala e entregue madeira em etapas (10, 20, 30, 50 bundles de wood) e recrute trabalhadores de cada raça, todos com nome terminado em "-son": Greyson (Goron, na Southern Mine em Eldin — vem com o irmão Pelison), Rhondson (Gerudo, no Kara Kara Bazaar), Fyson (Rito, na Rito Village) e Kapson (Zora, no Zora\'s Domain, que celebra o casamento). Termina com o casamento de Hudson e Rhondson; recompensa: 3 diamantes e uma cidade inteira de lojas.',
    },
    {
      id: 'sq_robbies_research',
      name: 'Robbie\'s Research',
      sub: 'Robbie — Akkala Ancient Tech Lab (Deep Akkala)',
      detail: 'Liberada após a main quest Locked Mementos com a Purah (Hateno Lab). No Akkala Tech Lab, tire a armadura do peito pra Robbie reconhecer suas cicatrizes, depois leve a chama azul da fornalha ancestral (descendo a estrada ao sul do laboratório) com uma tocha, acendendo os lampiões pelo caminho — chuva apaga a chama. Recompensa: 3 Ancient Arrows e acesso à loja de equipamento ancient da Cherry.',
    },
    {
      id: 'sq_a_shady_customer',
      name: 'A Shady Customer',
      sub: 'Hoz — East Akkala Stable',
      detail: 'Hoz quer saber quem é o dono da loja suspeita Fang and Bone. Vá ao Skull Lake (Deep Akkala) à noite, encontre o balão do Kilton no "olho" da caveira e tire uma foto da loja com a Camera rune, depois mostre a Hoz. Recompensa: uma Silver Rupee. De quebra você conhece o Kilton e a moeda mon.',
    },
    {
      id: 'sq_hobbies_of_the_rich',
      name: 'Hobbies of the Rich',
      sub: 'Hagie — Tarrey Town (após From the Ground Up)',
      detail: 'Disponível depois de terminar From the Ground Up. Hagie, no lado oeste de Tarrey Town, paga adiantado pra você destruir 2 Guardians na Torin Wetland, a oeste da cidade. Flechas ancient ou parry com escudo resolvem rápido; volte pra receber o resto do pagamento em rupees.',
    },
    {
      id: 'sq_a_parents_love',
      name: 'A Parent\'s Love',
      sub: 'Ruli — Tarrey Town (após From the Ground Up)',
      detail: 'Ruli precisa de um doce especial pra animar a filha Hunnie. Cozinhe um Monster Cake: Monster Extract + Tabantha Wheat + Cane Sugar + Goat Butter (o Monster Extract é vendido pelo Kilton na Fang and Bone). Entregue o bolo e fale com Ruli de novo. Recompensa: uma Gold Rupee (300).',
    },
    {
      id: 'sq_little_sisters_big_request',
      name: 'Little Sister\'s Big Request',
      sub: 'Jana — South Akkala Stable',
      detail: 'Jana pede primeiro um Armoranth (cresce nas colinas ali perto). Depois, descubra com a irmãzinha Gleema o presente de aniversário: uma libélula de cada tipo — Cold Darner, Warm Darner e Electric Darner. Você mesmo entrega as libélulas pra Gleema (Jana tem nojo de insetos) e volta pra Jana. Recompensa: 100 rupees.',
    },
  ],
  extras: [
    {
      id: 'mem_9',
      name: 'Memória #9 — Spring of Power',
      sub: 'North Akkala',
      detail: 'A memória fica no Spring of Power (Fonte do Poder), no norte de Akkala, ao norte do East Akkala Stable — a mesma fonte da shrine quest do Tutsuwa Nima. Fique em frente à estátua da deusa na água e ative a lembrança pela foto do álbum da Camera.',
    },
    {
      id: 'fairy_mija',
      name: 'Grande Fada Mija',
      sub: 'South Akkala, perto do santuário Dah Hesho',
      detail: 'A fonte da Grande Fada Mija fica no alto de um morro no sul de Akkala, coladinha no santuário Dah Hesho — teleporte pra lá e é uma caminhada curta. Pague a oferenda em rupees (o valor cresce a cada fada liberada: 100/500/1.000/10.000) pra desbloquear mais um nível de upgrade de armaduras.',
    },
    {
      id: 'lomei_labyrinth_island',
      name: 'Lomei Labyrinth Island',
      sub: 'Ilha-labirinto no extremo nordeste do mapa',
      detail: 'Um dos três labirintos de Hyrule, ligado à shrine quest Trial of the Labyrinth e ao santuário Tu Ka\'loh. Chegue planando dos penhascos da costa nordeste (ou de barco/gelo com Cryonis). Além do santuário, procure o baú com a peça do conjunto Barbarian — dica: pelo alto dá pra usar as correntes de ar e as muralhas pra atalhar o labirinto.',
    },
    {
      id: 'skull_lake',
      name: 'Skull Lake / Deep Akkala',
      sub: 'Lago em formato de caveira no noroeste da região',
      detail: 'Ponto marcante da Deep Akkala: um lago em formato de caveira com duas ilhas-olho. No olho esquerdo fica o santuário Zuna Kai (shrine quest The Skull\'s Eye) e é ali que o Kilton estaciona o balão da Fang and Bone à noite. Melhor acesso: escalar os penhascos ao norte e planar até os olhos.',
    },
    {
      id: 'akkala_tech_lab',
      name: 'Akkala Ancient Tech Lab',
      sub: 'Robbie — ponta nordeste da Deep Akkala',
      detail: 'Laboratório do Robbie, no fim da estrada que sobe do East Akkala Stable. Pra ativar tudo, complete Robbie\'s Research levando a chama azul da fornalha ancestral até o laboratório com uma tocha (acenda os lampiões do caminho como checkpoints e evite a chuva). Com a fornalha acesa, a Cherry vende flechas e equipamentos ancient — essenciais contra Guardians.',
    },
  ],
}

export default akkala;
