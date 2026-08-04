import type { Region } from '../../types';

const faron: Region = {
  key: 'Faron',
  id: 'faron',
  name: 'Faron',
  description:
    'Sul tropical de Hyrule, cobrindo as regiões das torres Faron e Lake: a vila pesqueira de Lurelin, a floresta tropical de Faron, o Lake Hylia, as planícies do Highland e a Eventide Island. Chuva quase constante na floresta atrapalha escalada — planeje rotas por estradas e morros baixos.',
  koroksTotal: 124,
  towers: [
    {
      id: 'tower_faron',
      name: 'Faron Tower',
      detail:
        'Fica num morro acima da estrada leste, entre a Lakeside Stable e a floresta de Faron. A base é cercada de espinhos e inimigos: suba pelo lado norte do morro e limpe os arqueiros antes de escalar. A chuva frequente da região derruba a escalada — espere estiar ou use pausas nas saliências.',
    },
    {
      id: 'tower_lake',
      name: 'Lake Tower',
      detail:
        'Fica nas Faron Grasslands, a noroeste do Lake Hylia e perto da estrada que vem da Great Plateau. Torre tranquila comparada às outras: só uns poucos inimigos na base. Ótimo ponto de partida pra Highland Stable e pro Spring of Courage.',
    },
  ],
  shrines: [
    {
      id: 'shrine_shai_utoh',
      name: 'Shai Utoh',
      detail:
        'Fica em Ubota Point, escondido sob a rocha logo ao sul da Lakeside Stable. Provação "Halt the Tilt": use Stasis pra congelar gangorras de madeira e atravessar antes que tombem. Puzzle curto — o baú extra pede um lançamento com a gangorra travada.',
    },
    {
      id: 'shrine_qukah_nata',
      name: 'Qukah Nata',
      detail:
        'Ligado à shrine quest "A Song of Storms" (Kass em Calora Lake). Durante a tempestade, equipe algo de metal (ou largue uma arma metálica) no monte de lama no morro a sudeste pra atrair um raio e revelar o santuário. Lá dentro é só bênção: baú e Spirit Orb direto.',
    },
    {
      id: 'shrine_shoda_sah',
      name: 'Shoda Sah',
      detail:
        'Escondido atrás da cachoeira de Riola Spring, a nordeste da floresta de Faron. Entre pela lateral da queda d\'água (Cryonis ajuda a subir). Provação "Impeccable Timing": lance as esferas e acerte o cristal no momento certo pra alinhar as plataformas móveis.',
    },
    {
      id: 'shrine_tawa_jinn',
      name: 'Tawa Jinn',
      detail:
        'Aparece no Mount Taran após a shrine quest "The Three Giant Brothers": derrote os três Hinox irmãos nos morros ao redor, pegue a esfera que cada um carrega no colar e encaixe nos pedestais. Dentro é bênção com três baús. Leve armas boas — o Hinox mais velho é preto.',
    },
    {
      id: 'shrine_yah_rin',
      name: 'Yah Rin',
      detail:
        'No morro logo a noroeste de Lurelin Village — bom primeiro teleporte pra vila. Provação "A Weighty Decision": use Magnesis pra distribuir baús de metal nos pratos de uma balança e alcançar as plataformas. O baú escondido entra na conta do contrapeso.',
    },
    {
      id: 'shrine_kah_yah',
      name: 'Kah Yah',
      detail:
        'Nas Palmorae Ruins, na praia a leste de Lurelin. Ligado à shrine quest "A Fragmented Monument": ajude Garini achando os três fragmentos do monumento ao longo da praia (guia visual ajuda), depois ele medita e revela o santuário. Provação curta "Quick Thinking".',
    },
    {
      id: 'shrine_muwo_jeem',
      name: 'Muwo Jeem',
      detail:
        'No alto do penhasco de Cape Cales, sudeste da região — visível de longe pela costa. Provação "A Modest Test of Strength" contra um Guardian Scout III: leve escudo bom pra aparar os giros de laser. Do penhasco ao lado parte a rota de paraglider pra Eventide Island.',
    },
    {
      id: 'shrine_korgu_chideh',
      name: 'Korgu Chideh',
      detail:
        'Na Eventide Island, só liberado ao completar "Stranded on Eventide": a ilha confisca todo seu equipamento e você precisa levar três esferas aos pedestais usando o que achar por lá. Ao terminar, o santuário é bênção direta. Cuidado com o Hinox que dorme com uma das esferas.',
    },
    {
      id: 'shrine_ishto_soh',
      name: 'Ishto Soh',
      detail:
        'No platô entre Daval Peak e as Oseira Plains, ao sul do Lake Hylia. Provação "Bravery\'s Grasp": carregue o emissor de laser com Magnesis e posicione-o pra acionar os cristais e mover as plataformas. Vale subir até lá de paraglider a partir do Lake Tower ou de Faron Tower.',
    },
    {
      id: 'shrine_shoqa_tatone',
      name: 'Shoqa Tatone',
      detail:
        'Em Puffer Beach, ligado à shrine quest "Guardian Slideshow": Loone só entrega a esfera que carrega se você mostrar fotos de três tipos de Guardian no Sheikah Slate. Coloque a esfera no pedestal pra abrir. Dentro, "A Modest Test of Strength" contra um Guardian Scout.',
    },
    {
      id: 'shrine_kao_makagh',
      name: 'Ka\'o Makagh',
      detail:
        'Bem ao lado da Highland Stable, nas Faron Grasslands — teleporte essencial da região Lake. Provação "Metal Doors Open the Way": use Magnesis pra abrir portas e montar rampas com placas de metal. Rápido e sem combate obrigatório.',
    },
    {
      id: 'shrine_pumaag_nitae',
      name: 'Pumaag Nitae',
      detail:
        'No meio das matas entre Finra Woods e Pagos Woods, junto à estrada que sobe do Lake Tower pra floresta de Faron. Provação "A Minor Test of Strength" contra um Guardian Scout II — tranquilo com qualquer arma decente. Bom pit stop na rota até o Spring of Courage.',
    },
    {
      id: 'shrine_ya_naga',
      name: 'Ya Naga',
      detail:
        'Na Hylia Island, no meio do Lake Hylia — chegue de paraglider a partir da grande ponte ou com Cryonis. Provação "Shatter the Heavens": use bombas nos elevadores pra explodir os bloqueios no teto e subir. Puzzle curto de timing com as bombas redonda e quadrada.',
    },
    {
      id: 'shrine_shae_katha',
      name: 'Shae Katha',
      detail:
        'No Spring of Courage, em Dracozu Lake — ligado à shrine quest "The Serpent\'s Jaws" (Kass em Pagos Woods). Siga o vale do rio Dracozu até a estátua do dragão e ofereça uma Farosh\'s Scale na fonte pra abrir o santuário. Dentro é bênção direta; Lizalfos guardam o caminho.',
    },
  ],
  sidequests: [
    {
      id: 'sq_sunken_treasure',
      name: 'Sunken Treasure',
      sub: 'Rozel, em Lurelin Village',
      detail:
        'Rozel aponta um tesouro afundado perto da ilhota triangular ao sul da vila. Pegue uma jangada na praia, navegue até o ponto e use Magnesis pra içar os baús do fundo do mar. Volte e conte a ele pra fechar a quest.',
    },
    {
      id: 'sq_whats_for_dinner',
      name: 'What\'s for Dinner?',
      sub: 'Kiana, em Lurelin Village',
      detail:
        'Kiana precisa de ingredientes pro jantar da família: um Hearty Blueshell Snail e um Goat Butter. O caramujo aparece nas praias da própria vila; a manteiga se compra em lojas (ex.: Hateno). Entregue os dois e ganhe o prato pronto.',
    },
    {
      id: 'sq_take_back_the_sea',
      name: 'Take Back the Sea',
      sub: 'Sebasto, em Lurelin Village',
      detail:
        'Sebasto pede pra limpar os monstros que tomaram Aris Beach, a oeste da vila. Derrote todos os Bokoblins do acampamento na praia (cuidado com os que atiram das plataformas) e volte pra receber a recompensa.',
    },
    {
      id: 'sq_a_gift_of_nightshade',
      name: 'A Gift of Nightshade',
      sub: 'Wabbin, em Tuft Mountain (acima de Lurelin)',
      detail:
        'Wabbin quer se declarar pra Perda e pede uma Blue Nightshade. A planta brilha à noite e cresce na região (West Necluda tem bastante). Entregue a flor e assista a cena — quest rapidinha.',
    },
    {
      id: 'sq_thunder_magnet',
      name: 'Thunder Magnet',
      sub: 'Cima, na Lakeside Stable',
      detail:
        'Raios não param de cair na Lakeside Stable e Cima quer saber o porquê. A causa é um machado de lenhador cravado no topo do estábulo: use Magnesis pra tirá-lo de lá (Revali\'s Gale também resolve). Fale com Cima de novo pra concluir.',
    },
    {
      id: 'sq_the_horseback_hoodlums',
      name: 'The Horseback Hoodlums',
      sub: 'Perosa, na Highland Stable',
      detail:
        'Bokoblins montados a cavalo estão aterrorizando a área de Pappetto Grove, perto do estábulo. Derrote os cavaleiros (arco em câmera lenta montado ajuda muito) e volte pra Perosa. Recompensa: Endura Carrot.',
    },
    {
      id: 'sq_hunt_for_the_giant_horse',
      name: 'Hunt for the Giant Horse',
      sub: 'Straia, no Mounted Archery Camp',
      detail:
        'Straia quer ver de perto o cavalo gigante que vive em Taobab Grassland, a oeste. O animal gasta muita stamina pra domar — leve comidas de recuperação de vigor e monte por trás. Cavalgue de volta até o acampamento montado nele e fale com Straia pra ganhar 100 rupees.',
    },
  ],
  extras: [
    {
      id: 'extra_eventide_island',
      name: 'Eventide Island',
      sub: 'Desafio "Stranded on Eventide"',
      detail:
        'Ao pisar na ilha, todo seu equipamento e comida são confiscados — sobreviva com o que achar lá até colocar as três esferas nos pedestais. Chegue de jangada ou planando do penhasco de Cape Cales (elixires de stamina ajudam na travessia). Completa o desafio e libera o santuário Korgu Chideh; tudo é devolvido no final.',
    },
    {
      id: 'extra_spring_of_courage',
      name: 'Spring of Courage',
      sub: 'Dracozu Lake, no vale do rio Dracozu',
      detail:
        'A grande estátua de dragão engolindo a fonte fica no fim do vale do Dracozu, acessível subindo o rio a partir das Faron Grasslands. Ofereça uma Farosh\'s Scale na água da fonte pra abrir o santuário Shae Katha (shrine quest "The Serpent\'s Jaws", com Kass em Pagos Woods). Lizalfos infestam o vale — vá armado ou passe correndo.',
    },
    {
      id: 'extra_farosh',
      name: 'Farosh (dragão elétrico)',
      sub: 'Farm de Farosh\'s Scale',
      detail:
        'Farosh emerge do Lake Hylia de madrugada (por volta da meia-noite às primeiras horas) e também aparece na área de Lake Floria/Riola Spring. Acampe ou espere numa fogueira até a madrugada, plane até perto e acerte uma flecha no corpo pra derrubar uma scale — cuidado com as esferas elétricas que ele solta. A scale é a oferenda do Spring of Courage e ingrediente de upgrades.',
    },
    {
      id: 'extra_lurelin_minigame',
      name: 'Lurelin Village — jogo do tesouro',
      sub: 'Cloyne, na tenda de apostas da vila',
      detail:
        'Cloyne comanda um jogo de azar: pague 10, 50 ou 100 rupees e escolha um dos três baús — um deles paga mais do que você apostou. Bom pra tentar a sorte quando precisar de rupees (salve antes se quiser garantir). Aproveite a vila pra comprar peixe e usar as jangadas da praia nas quests locais.',
    },
    {
      id: 'faron_koroks_guide',
      name: 'Koroks da região',
      sub: 'Use o contador da região + mapa interativo',
      detail:
        'São centenas espalhados — inviável listar um a um. Use o mapa interativo objmap.zeldadungeon.net (camada Korok Seeds) e marque no contador abaixo conforme coletar.',
    },
  ],
}

export default faron;
