import type { Region } from '../../types';

const eldin: Region = {
  key: 'Eldin',
  id: 'eldin',
  name: 'Eldin',
  description: 'Região da Eldin Tower — Death Mountain, Goron City e o Eldin Canyon, a terra vulcânica dos Gorons. Calor extremo: sem proteção contra fogo você literalmente pega fogo nas áreas altas, armas de madeira queimam e bombas explodem sozinhas.',
  koroksTotal: 45,
  towers: [
    {
      id: 'tower_eldin',
      name: 'Eldin Tower',
      detail: 'Fica a sudoeste da Death Mountain, num morro cercado de poças de lava e fontes termais. O caminho mais tranquilo é subir a partir da Foothill Stable pela estrada e contornar a encosta sul da torre. A partir daqui o calor já é forte: itens de madeira podem pegar fogo, então guarde arco e armas de madeira e leve elixir ou comida de resistência ao calor.',
    },
  ],
  shrines: [
    {
      id: 'shrine_shae_mosah',
      name: 'Shae Mo\'sah (Swinging Flames)',
      detail: 'Fica no topo de Goron City, impossível de errar. Puzzle de lança-chamas e interruptores de cristal: acenda as tochas e acerte os cristais pra abrir caminho. Não saia sem o baú com o Stone Smasher — quebra pedras e destrói o Igneo Talus da side quest The Road to Respect.',
    },
    {
      id: 'shrine_qua_raym',
      name: 'Qua Raym (A Balanced Approach)',
      detail: 'Fica numa ilhota no meio do lago de lava de Goronbi Lake, a sudoeste de Goron City — planeie de um ponto alto pra chegar. Lá dentro é puzzle de gangorras: use bombas e blocos de metal pra equilibrar as plataformas e alcançar os baús e a saída.',
    },
    {
      id: 'shrine_sah_dahaj',
      name: 'Sah Dahaj (Power of Fire)',
      detail: 'Fica perto de Cephla Lake, a leste da Eldin Tower, dentro de uma formação rochosa. A provação é simples: queime os arbustos de espinhos com fogo (tocha ou flecha de fogo acesa nas próprias tochas do santuário) pra liberar o caminho e os baús.',
    },
    {
      id: 'shrine_moa_keet',
      name: 'Mo\'a Keet (Metal Makes a Path)',
      detail: 'Fica na encosta logo acima da Foothill Stable — escale o paredão atrás da estábulo. Puzzle de Magnesis: mova os blocos de metal pra criar escadas e plataformas até o monge. Bom primeiro santuário da região, ainda fora da zona de calor extremo.',
    },
    {
      id: 'shrine_tah_muhl',
      name: 'Tah Muhl (Passing the Flame)',
      detail: 'Fica em Trilby Valley, no caminho entre a Foothill Stable e Cephla Lake. É o alvo da shrine quest "A Landscape of a Stable": o Mayro na Foothill Stable mostra uma foto do local. Lá dentro, carregue fogo com uma tocha pra acender braseiros e queimar palha que esconde baús e caminhos.',
    },
    {
      id: 'shrine_daqa_koh',
      name: 'Daqa Koh (Stalled Flight)',
      detail: 'Fica na encosta da Death Mountain, perto da Bridge of Eldin, a nordeste de Goron City. A provação usa Stasis numa plataforma móvel: congele no momento certo pra ela te arremessar pra cima, e use o paraglider nas correntes de ar. Zona de calor extremo — precisa de proteção contra fogo pra chegar.',
    },
    {
      id: 'shrine_kayra_mah',
      name: 'Kayra Mah (The Secret of the Hero)',
      detail: 'Fica dentro do Gorko Tunnel, liberado pela shrine quest "A Brother\'s Roast": fale com o Bladon em Goron City, depois leve um Rock Roast grelhado (tem um no pé do Gortram Cliff — role até a lava/fogueira pra assar) pro irmão dele, Gonguron, que está cavando no túnel. Lá dentro, suba a rampa desviando das bolas de ferro e pedregulhos com espinhos que rolam pelos três corredores.',
    },
    {
      id: 'shrine_shora_hah',
      name: 'Shora Hah (Blue Flame)',
      detail: 'Fica na Isle of Rabac, no noroeste da região — chegue pelos trilhos de mina abandonados usando os carrinhos (jogue uma bomba redonda no compartimento e detone pra impulsionar). Um dos santuários mais longos do jogo: carregue a chama azul com uma tocha pra acender tochas e abrir caminhos, com vários baús opcionais. Não deixe a chama apagar na água nem nos ventiladores.',
    },
    {
      id: 'shrine_gorae_torr',
      name: 'Gorae Torr (Blessing)',
      detail: 'Fica no topo do Gut Check Rock, o pilar de pedra gigante ao norte da Death Mountain. Só abre completando a shrine quest "The Gut Check Challenge" do Goron Bayge: escale o pilar coletando 100 rupees em cristais antes do tempo acabar. O santuário em si é só bênção — baú e monge, sem puzzle.',
    },
  ],
  sidequests: [
    {
      id: 'sq_jewel_trade',
      name: 'The Jewel Trade',
      sub: 'Ramella, em Goron City — entregar 10 Amber',
      detail: 'Fale com a Ramella, a Gerudo perto da loja de joias de Goron City. Ela quer comprar 10 Amber e paga acima do preço de mercado. Depois da quest ela continua comprando gemas em lote (10 por vez) por bom dinheiro — ótima cliente pra vender o farm de minério da região.',
    },
    {
      id: 'sq_road_to_respect',
      name: 'The Road to Respect',
      sub: 'Fugo, em Goron City — derrotar o Igneo Talus',
      detail: 'O Fugo, aprendiz de ferreiro em Goron City, pede pra você derrotar o Igneo Talus de Darunia Lake, a noroeste da cidade. Flechas de gelo esfriam o corpo dele e deixam escalar pra bater no minério das costas; o Stone Smasher do baú do santuário Shae Mo\'sah causa dano enorme no ponto fraco. Recompensa: 100 rupees, fora as gemas que o Talus derruba.',
    },
    {
      id: 'sq_fireproof_lizard',
      name: 'Fireproof Lizard Roundup',
      sub: 'Kima, no Southern Mine — capturar 10 Fireproof Lizards',
      detail: 'A Kima, no Southern Mine (no caminho entre a Eldin Tower e Goron City), pede 10 Fireproof Lizards. Eles ficam nas pedras da própria mina: agache e se aproxime bem devagar por trás pra capturar. A recompensa é uma peça da Flamebreaker Armor — de graça, antes de você chegar na loja de Goron City.',
    },
    {
      id: 'sq_death_mountains_secret',
      name: 'Death Mountain\'s Secret',
      sub: 'Dugby, nas Goron Hot Springs — achar a arma escondida',
      detail: 'O Dugby, o Goron criança de banho nas Goron Hot Springs, fala de uma arma escondida na montanha. Procure no morro entre Gorko Lake e as termas: o baú com o Drillshaft está escondido sob pedras destrutíveis — exploda com bombas pra liberar. Volte e mostre a arma pro Dugby pra completar.',
    },
  ],
  extras: [
    {
      id: 'mem_5',
      name: 'Memória #5 — Eldin Canyon',
      sub: 'Foto 5 da quest Captured Memories',
      detail: 'O ponto exato fica no topo do morro logo a oeste de Goronbi Lake, no Eldin Canyon — o mesmo morro que tem um círculo de pedras de Korok no cume. Saindo de Goron City ou da Eldin Tower, contorne o lago de lava pelo sul e escale o morro. Precisa de proteção contra fogo, e itens de madeira no inventário podem queimar no caminho.',
    },
    {
      id: 'eldin_fire_protection',
      name: 'Proteção contra calor/fogo',
      sub: 'Fireproof Elixirs + Flamebreaker Armor',
      detail: 'Na parte alta da região (de Goron City pra cima) você pega fogo sem proteção — e resistência a calor do deserto NÃO serve, tem que ser fireproof. Capture Fireproof Lizards no Southern Mine e cozinhe com partes de monstro pra fazer Fireproof Elixirs, ou compre o set Flamebreaker na armaduraria de Goron City (uma peça já segura o dano; o set completo dispensa elixir). Lembre: armas, arcos e escudos de madeira pegam fogo e bombas explodem sozinhas na zona vulcânica.',
    },
    {
      id: 'eldin_dinraal',
      name: 'Dinraal (dragão de fogo)',
      sub: 'Farmar escamas e partes na rota de spawn',
      detail: 'O Dinraal aparece de madrugada perto do Eldin Great Skeleton, no norte da região, e voa pelo Tanagar Canyon até passar sobre a Tabantha Great Bridge. Faça uma fogueira e passe o tempo até de madrugada num ponto alto da rota, aí plane até ele e acerte uma flecha: no corpo derruba escama, no chifre/garra/presa derruba as partes raras. Ele não ataca — só cuidado com o dano de fogo da aura ao chegar perto.',
    },
    {
      id: 'eldin_gut_check',
      name: 'Gut Check Rock — desafio Goron',
      sub: 'Escalada do Bayge (libera o santuário Gorae Torr)',
      detail: 'No topo do Gut Check Rock, o pilar gigante ao norte da Death Mountain, o Goron Bayge te desafia a escalar coletando 100 rupees em cristais antes do tempo acabar. Roupa de escalada e comida de stamina ajudam muito; os cristais marcam a rota. Vencer libera o santuário Gorae Torr lá em cima — marque os dois juntos.',
    },
    {
      id: 'eldin_koroks_guide',
      name: 'Koroks da região',
      sub: 'Use o contador da região + mapa interativo',
      detail: 'São centenas espalhados — inviável listar um a um. Use o mapa interativo objmap.zeldadungeon.net (camada Korok Seeds) e marque no contador abaixo conforme coletar.',
    },
  ],
}

export default eldin;
