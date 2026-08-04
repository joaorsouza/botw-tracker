import type { Region } from '../../types';

const plateau: Region = {
  key: 'Great Plateau',
  id: 'plateau',
  name: 'Great Plateau',
  description: 'A área tutorial do jogo — só se sai daqui com o Paraglider. Vale limpar 100% antes de descer: 4 santuários, 18 koroks, baús e o Warm Doublet.',
  koroksTotal: 18,
  mapPos: { x: -560, z: 1695, zoom: 5 },
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
    { id: 'temple_time', name: 'Visitar Temple of Time (ver pedestal Master Sword)', detail: 'No topo do Monte Hylia, ao lado de onde você recebe o Paraglider. Dá pra ver o pedestal da Master Sword através das ruínas — ainda não dá pra puxar a espada nessa fase do jogo.' },
    { id: 'old_man', name: 'Falar com Rei Rhoam no topo → receber Paraglider', detail: 'Depois de completar os 4 santuários, volte ao Velho na fogueira. Ele te leva até o Temple of Time no topo do Monte Hylia, revela quem é, e te dá o Paraglider — item que libera a saída do platô.' },
  ],
};

export default plateau;
