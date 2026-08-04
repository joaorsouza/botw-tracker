# BOTW 100% Tracker

Tracker de progresso pra 100% de Breath of the Wild, feito em React + Vite + Tailwind.
O progresso é salvo no `localStorage` do navegador (fica gravado no aparelho/navegador que você usar).

## Rodar localmente

Precisa ter [Node.js](https://nodejs.org) instalado (versão 18+).

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Rodar no celular (mesma rede Wi-Fi)

```bash
npm run dev -- --host
```

Isso mostra um endereço tipo `http://192.168.x.x:5173` — abre esse endereço no navegador do celular (precisa estar na mesma rede Wi-Fi do computador).

## Colocar no ar (acessível de qualquer lugar, de graça)

A forma mais simples é a **Vercel**:

1. Crie uma conta grátis em https://vercel.com (dá pra usar login do GitHub).
2. Instale a CLI: `npm install -g vercel`
3. Dentro da pasta do projeto, rode: `vercel`
4. Siga as perguntas (aceita os padrões). Ele te dá uma URL tipo `botw-tracker.vercel.app`.

Alternativa igualmente fácil: **Netlify Drop** — depois de rodar `npm run build`, arraste a pasta `dist` gerada pra https://app.netlify.com/drop e pronto, ganha uma URL pública na hora, sem precisar de conta.

## Build de produção

```bash
npm run build
```

Gera a pasta `dist/` com os arquivos estáticos prontos pra hospedar em qualquer lugar (Vercel, Netlify, GitHub Pages, etc).
