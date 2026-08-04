import type { Region } from '../../types';

const hebra: Region = {
  key: 'Hebra',
  id: 'hebra',
  name: 'Hebra',
  description:
    'Região da torre Hebra: as montanhas geladas do extremo noroeste de Hyrule, dominadas pelo Hebra Peak e cortadas por nevascas constantes. Abriga o North Lomei Labyrinth e vários santuários escondidos em cavernas — leve proteção contra frio extremo (nível 2).',
  koroksTotal: 73,
  mapPos: { x: -2173, z: -2034, zoom: 4 },
  towers: [
    {
      id: 'tower_hebra',
      name: 'Hebra Tower',
      detail:
        'Fica numa encosta gelada a noroeste, acima da Tabantha Snowfield. A base é cercada por blocos de gelo que impedem a escalada: derreta-os com arma flamejante, flechas de fogo ou uma fogueira (lenha + pederneira), ou pule tudo com a Revali\'s Gale. Vá com roupa contra frio — a região inteira exige.',
    },
  ],
  shrines: [
    {
      id: 'shrine_hia_miu',
      name: 'Hia Miu',
      detail:
        'No canto extremo noroeste do mapa, em Icefall Foothills — plane das montanhas próximas. É um Major Test of Strength: Guardian Scout IV com armas ++. Erga os blocos de metal do chão com Magnesis pra usar de escudo. Frio extremo no caminho, capriche na proteção.',
    },
    {
      id: 'shrine_to_quomo',
      name: 'To Quomo',
      detail:
        'Dentro de uma caverna abaixo do Hebra North Summit, com o portão trancado ao lado de um laguinho. Crie dois blocos de Cryonis como ponte sobre o lago e derrube a bola de neve GIGANTE da encosta a leste — ela desce, atravessa a ponte e arromba o portão. Bolas pequenas não têm força, não perca tempo. Dentro é bênção direta, com baú de Royal Claymore.',
    },
    {
      id: 'shrine_mozo_shenno',
      name: 'Mozo Shenno',
      detail:
        'Escondido numa pequena caverna sob a Biron Snowshelf — a montanha em forma de pássaro branco da shrine quest "The Bird in the Mountains" (Molli, em Rito Village). Só dá pra ver a entrada planando de cima, pelo vale a leste: desça de paraglider mirando o buraco na parede oeste. Dentro, Major Test of Strength contra Guardian Scout IV; use os blocos de metal como cobertura.',
    },
    {
      id: 'shrine_shada_naw',
      name: 'Shada Naw',
      detail:
        'Debaixo de uma formação rochosa logo ao norte do Selmie\'s Spot, a noroeste do Hebra Peak. Fácil de achar depois de visitar a cabana da Selmie. Puzzle "Red Giveaway": guie a bola pelos jatos de vento bloqueando saídas com o bloco de metal (Magnesis) e suba na plataforma antes de soltar a bola. Baú com Great Frostblade num nicho acima de um dos ventiladores.',
    },
    {
      id: 'shrine_rok_uwog',
      name: 'Rok Uwog',
      detail:
        'Numa caverna na parte norte da Pikida Stonegrove, sob os pilares de pedra gigantes, a noroeste da Snowfield Stable. A entrada fica na parte baixa da área — procure pelo lado norte. Lá dentro, queime o monte de folhas perto da tocha pra revelar a passagem, e puxe o baú da plataforma alta com Magnesis (tem uma Drillshaft).',
    },
    {
      id: 'shrine_sha_gehma',
      name: 'Sha Gehma',
      detail:
        'No extremo norte da North Tabantha Snowfield — do Rin Oyaa, siga direto pro norte atravessando o campo de neve. É visível, só é longe de tudo. Puzzle "Shift and Lock": carregue o bloco de metal com Magnesis pela rampa em espiral e use Stasis nas plataformas móveis pra sempre ter apoio embaixo dele.',
    },
    {
      id: 'shrine_qaza_tokki',
      name: 'Qaza Tokki',
      detail:
        'No centro do North Lomei Labyrinth, canto noroeste da Tabantha Tundra — entrar no labirinto inicia a shrine quest "Trial on the Cliff". Navegue o labirinto até o santuário; no caminho tem o baú com a Barbarian Leg Wraps (não saia sem ela). O santuário em si é bênção direta.',
    },
    {
      id: 'shrine_goma_asaagh',
      name: 'Goma Asaagh',
      detail:
        'Numa caverna na base do Hebra Peak, perto de Coldsnap Hollow. A entrada e o terminal estão encobertos por gelo: derreta com flechas de fogo, arma flamejante ou uma fogueira montada ao lado. Dentro, Major Test of Strength — o chão coberto de água deixa criar pilares de Cryonis pra se proteger do Guardian Scout IV.',
    },
    {
      id: 'shrine_maka_rah',
      name: 'Maka Rah',
      detail:
        'Dentro de uma caverna na margem norte do Lake Kilsie, a noroeste do Flight Range. O santuário aparece por uma fresta na rocha, mas a entrada real é escondida: exploda as pedras no topo da ilha no meio do lago pra liberar uma corrente de ar, suba com o paraglider e plane a noroeste até a entrada da caverna marcada por tochas no alto do penhasco. Desça a caverna e atravesse a água rasa pela passagem à direita.',
    },
    {
      id: 'shrine_dunba_taag',
      name: 'Dunba Taag',
      detail:
        'No fundo do Tanagar Canyon, a sudeste do Rito Stable — desça o desfiladeiro de paraglider. Puzzle de Stasis: congele a engrenagem pra deixar as pedras rolantes acertarem o interruptor, depois dê "tacadas de golfe" com Stasis nos barris (carregue a força no vermelho) pra abrir o portão e derrubar a laje final.',
    },
    {
      id: 'shrine_lanno_kooh',
      name: 'Lanno Kooh',
      detail:
        'Escondido sob uma formação rochosa a oeste da Hebra Tower, no fim do rio que desce do Hebra Headspring e das Hebra Falls. O desafio é chegar: a água é congelante e nadar drena vida rápido. Truque clássico: derrube uma árvore e desça o rio montado no tronco até a entrada. Dentro é bênção direta, com baú de Gold Rupee.',
    },
    {
      id: 'shrine_gee_harah',
      name: 'Gee Ha\'rah',
      detail:
        'Atrás de um par de portões de pedra na base das Kopeeki Drifts, a noroeste da Hebra Tower. Suba a encosta, pegue a bola de neve no alto e solte-a numa das canaletas (a segunda à direita da rocha funciona bem) — ela cresce descendo e arromba os portões. Dentro, corte as cordas com flechas pra derrubar pedras sobre os botões.',
    },
    {
      id: 'shrine_rin_oyaa',
      name: 'Rin Oyaa',
      detail:
        'Coladinho na Snowfield Stable, na borda da Tabantha Tundra — ótimo primeiro teleporte da região. Puzzle "Directing the Wind": bloqueie os jatos de vento com os dois blocos de metal (Magnesis) e solte a bola pelo labirinto de correntes de ar; suba na rampa antes de ela encaixar pra plataforma te levar até o monge.',
    },
  ],
  sidequests: [
    {
      id: 'sq_stalhorse_pictured',
      name: 'Stalhorse: Pictured!',
      sub: 'Juannelle — Snowfield Stable',
      detail:
        'Juannelle quer uma foto de um Stalhorse. Entre 21h e 5h, vá ao acampamento bokoblin marcado por uma rocha em forma de caveira ao norte da estábulo, na North Tabantha Snowfield, e fotografe um dos cavalos-esqueleto (montados pelos bokoblins) com a câmera do Sheikah Slate. Recompensa: Silver Rupee (100). É a única side quest da região.',
    },
  ],
  extras: [
    {
      id: 'extra_north_lomei_labyrinth',
      name: 'North Lomei Labyrinth',
      sub: 'Labirinto — Barbarian Leg Wraps',
      detail:
        'Labirinto gigante no canto noroeste da Tabantha Tundra, ligado ao santuário Qaza Tokki (shrine quest "Trial on the Cliff"). Além de resolver o santuário, pegue o baú com a Barbarian Leg Wraps no caminho — peça do set que aumenta dano de ataque. Cuidado com os malice (gosma roxa) espalhados pelas paredes.',
    },
    {
      id: 'extra_selmie_shield_surfing',
      name: 'Shield surfing da Selmie',
      sub: 'Minigame — Selmie\'s Spot',
      detail:
        'Na cabana da Selmie, a noroeste do Hebra Peak, por 20 rupees você desce a montanha surfando no escudo contra o relógio (percurso iniciante e avançado). Bater os tempos-alvo rende escudos de prêmio, chegando ao Royal Shield nos melhores tempos. Leve escudos sobressalentes — a durabilidade desgasta surfando.',
    },
    {
      id: 'extra_pondo_snow_bowling',
      name: 'Snow bowling do Pondo',
      sub: 'Minigame — Pondo\'s Lodge — farm de rupees',
      detail:
        'Na cabana do Pondo, perto das Tabantha Village Ruins (sudeste da Hebra Tower), por 20 rupees você rola uma bola de neve gigante contra 10 pinos. Strike paga 300 rupees — lucro de 280 por rodada, um dos melhores farms de rupees do jogo. Ache o ângulo certo na canaleta e repita à vontade.',
    },
    {
      id: 'extra_cold_prep',
      name: 'Preparação pro frio extremo',
      sub: 'Snowquill set / comidas spicy',
      detail:
        'Quase toda a região tem frio extremo (nível 2), que derrete vida sem proteção. Compre o set Snowquill na loja de armaduras de Rito Village (touca, túnica e calça — 2 peças bastam pro nível 2) ou cozinhe pratos/elixires com Spicy Pepper antes de subir. Armas flamejantes na mão também esquentam.',
    },
  ],
}

export default hebra;
