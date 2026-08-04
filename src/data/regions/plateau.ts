import type { Region } from '../../types';

const plateau: Region = {
  key: 'Great Plateau',
  id: 'plateau',
  name: 'Great Plateau',
  description: 'A área tutorial do jogo — só se sai daqui com o Paraglider. Vale limpar 100% antes de descer: 4 santuários, 18 koroks, baús e o Warm Doublet.',
  koroksTotal: 18,
  quests: [
    { id: 'q_slate', name: 'Quest: "Follow the Sheikah Slate"', sub: 'Pegar o Slate + ativar a Great Plateau Tower', detail: 'Acorde na Shrine of Resurrection e pegue o Sheikah Slate no altar. Saia da caverna, siga a voz misteriosa até a Great Plateau Tower (visível no horizonte) e escale até o topo pra ativá-la e revelar o mapa da região.' },
    { id: 'q_isolated', name: 'Quest: "The Isolated Plateau"', sub: 'Os 4 Spirit Orbs + falar com o Velho no Temple of Time', detail: 'Depois de ativar a torre, desça e converse com o Velho sentado na fogueira ao pé dela. Ele te manda completar os 4 santuários do platô pra conseguir 4 Spirit Orbs. Depois de ter os 4, volte e fale com ele — ele vai te seguir até o Temple of Time no topo do Monte Hylia, onde revela ser o Rei Rhoam e te dá o Paraglider.' },
  ],
  towers: [
    { id: 'tower_great_plateau', name: 'Great Plateau Tower', detail: 'Ativada durante a quest "Follow the Sheikah Slate" — é a primeira das 15 torres e não tem inimigos por perto. Basta escalar até o topo e tocar o Slate no pedestal.' },
  ],
  shrines: [
    { id: 'oman_au', name: 'Oman Au (Magnesis)', detail: 'Fica na área da lagoa lamacenta a oeste. A provação te dá a rune Magnesis, usada pra mover objetos metálicos. Puzzle simples de mover blocos até plataformas.' },
    { id: 'ja_baij', name: 'Ja Baij (Bombas)', detail: 'Fica no leste do platô, geralmente afundado — pode precisar nadar/mergulhar até a entrada dependendo de como você chega. Dá as bombas remotas (redonda e quadrada).' },
    { id: 'owa_daim', name: 'Owa Daim (Stasis)', detail: 'Fica na parte sul/central. Provação usa a rune Stasis pra congelar objetos no tempo e criar caminhos com física (ex: empurrar uma prancha).' },
    { id: 'keh_namut', name: 'Keh Namut (Cryonis)', detail: 'Fica na área gelada ao norte, perto do River of the Dead. Dá a rune Cryonis, que cria pilares de gelo na água — essencial pra travessias depois.' },
  ],
  sidequests: [],
  extras: [
    { id: 'warm_doublet', name: 'Warm Doublet', sub: 'Subir o Monte Hylia até o topo só com comida de resistência ao frio (ou cozinhar prato pro Velho na panela)', detail: 'Duas formas: (1) suba o Monte Hylia até o topo usando apenas comida de resistência ao frio, sem roupa quente — o Velho no topo fica impressionado e te dá a peça. (2) Cozinhe um prato com carne crua + pimenta + Hyrule Bass (peixe) na panela perto da casa dele enquanto ele descansa na fogueira, depois fale com ele.' },
    { id: 'korok_mud', name: 'Korok — charco lamacento (Oman Au)', sub: 'Bola de corrente + toco de árvore', detail: 'No charco lamacento perto do Oman Au tem um toco de árvore oco com uma corrente e uma bola de metal presa. Use Magnesis pra puxar a bola de metal e encaixar dentro do buraco do toco.' },
    { id: 'korok_log', name: 'Korok — tronco oco (Forest of Spirits)', sub: 'Flor amarela some/reaparece', detail: 'Entre no tronco caído gigante na Forest of Spirits. Tem uma flor amarela alta lá dentro — ao se aproximar ela some e reaparece um pouco à frente. Siga ela algumas vezes até ela virar branca; toque nela pra revelar o Korok.' },
    { id: 'korok_hill', name: 'Korok — pedra na colina (Forest of Spirits)', detail: 'No centro da Forest of Spirits tem uma colina rochosa de formato estranho que se destaca da vegetação ao redor. Suba nela (escalando) e vire a pedra que fica no topo.' },
    { id: 'korok_ice', name: 'Korok — bloco de gelo (perto do Keh Namut)', detail: 'Perto do santuário Keh Namut, na parede de pedra da área gelada, tem um Korok preso dentro de um bloco de gelo visível. Quebre o gelo (arma, bomba de fogo, ou Cryonis nas proximidades) pra soltar.' },
    { id: 'korok_circle', name: 'Korok — círculo de pedras (topo do Mt. Hylia)', detail: 'No topo do Monte Hylia (onde fica a Torre) tem um círculo de pedras no chão com uma faltando. Ache a pedra solta um pouco a oeste do círculo e carregue até o espaço vazio pra encaixar.' },
    { id: 'korok_others', name: 'Demais Koroks do platô (Exchange Ruins, alvos, fada)', sub: 'Recomendo guia visual pra esses', detail: 'Existem mais alguns espalhados: um puzzle de blocos de metal nas montanhas a oeste do Hopper Pond (Magnesis), um korok debaixo de pedra perto de duas pedras encostadas uma na outra a nordeste da Forest of Spirits, e mais alguns na área das Exchange Ruins. Esses são mais fáceis de errar — vale abrir um vídeo "Great Plateau all 18 koroks" no YouTube pra pegar os últimos sem perder tempo.' },
    { id: 'chest_mud1', name: 'Baú submerso #1 — lagoa lamacenta (Oman Au)', detail: 'Na lagoa lamacenta a oeste do Oman Au. Use Magnesis pra localizar e puxar o baú metálico de dentro da água.' },
    { id: 'chest_mud2', name: 'Baú submerso #2 — lagoa lamacenta (Oman Au)', detail: 'Mesma área do baú anterior — tem um segundo baú submerso próximo, também puxável com Magnesis.' },
    { id: 'chest_platform', name: '2 Baús na plataforma sobre a água (Magnesis + tábua)', detail: 'Perto do Oman Au tem uma plataforma de madeira sobre a água lamacenta com 2 baús. Use Magnesis numa tábua metálica próxima pra criar uma ponte/rampa até a plataforma.' },
    { id: 'chest_hylia1', name: 'Baú submerso #1 — lago do Mt. Hylia', detail: 'No lago que fica na base/encosta do Monte Hylia. Mergulhe e nade até o fundo pra pegar (não precisa de rune, é só natação).' },
    { id: 'chest_hylia2', name: 'Baú submerso #2 — lago do Mt. Hylia', detail: 'Mesmo lago do baú anterior, um segundo baú submerso nas proximidades.' },
    { id: 'chest_keh', name: 'Baú — lagoa gelada (Keh Namut, usar Cryonis)', detail: 'Na lagoa congelada perto do santuário Keh Namut. Use Cryonis embaixo do baú (que fica preso sob o gelo/água) pra criar um pilar que o empurra pra cima.' },
    { id: 'chest_waterfall', name: 'Baú — cachoeira', detail: 'Tem um baú escondido atrás/perto de uma cachoeira na região do River of the Dead, ao norte do platô — procure atrás da queda d\'água.' },
    { id: 'chest_ruins', name: 'Baú — Exchange Ruins (poço, Magnesis, Rupee roxa)', detail: 'Nas Exchange Ruins tem um poço de água. Use Magnesis pra puxar o baú metálico de dentro — contém uma Rupee roxa.' },
    { id: 'temple_time', name: 'Visitar Temple of Time (ver pedestal Master Sword)', detail: 'No topo do Monte Hylia, ao lado de onde você recebe o Paraglider. Dá pra ver o pedestal da Master Sword através das ruínas — ainda não dá pra puxar a espada nessa fase do jogo.' },
    { id: 'old_man', name: 'Falar com Rei Rhoam no topo → receber Paraglider', detail: 'Depois de completar os 4 santuários, volte ao Velho na fogueira. Ele te leva até o Temple of Time no topo do Monte Hylia, revela quem é, e te dá o Paraglider — item que libera a saída do platô.' },
  ],
};

export default plateau;
