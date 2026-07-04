# SOS Ajuda

Plataforma mobile-first de assistência de emergência em **Português**, desenvolvida para conectar pessoas afectadas por cheias com voluntários e doadores em Moçambique.

**Hackathon Cursor · Categoria 3 — SOS / Reunião**

## Funcionalidades

- **Pedir Ajuda** — criar pedidos de emergência (água, comida, abrigo, medicamentos, transporte)
- **Lista de Pedidos** — voluntários veem quem precisa de ajuda, com filtros e pesquisa
- **Detalhes + Aceitar** — fluxo completo: Pendente → Em atendimento → Resolvido
- **Sincronização comunitária** — API partilhada entre vítimas e voluntários
- **Offline-first** — cache da aplicação e fila local sincronizada ao recuperar a ligação
- **Optimizado para 3G** — interface leve, sem imagens pesadas

## Fluxo end-to-end

1. Pessoa cria pedido de ajuda em `/pedir-ajuda`
2. Pedido aparece na lista pública em `/pedidos`
3. Voluntário abre detalhes em `/pedidos/[id]`
4. Voluntário aceita → estado muda para **Em atendimento**
5. Voluntário marca como **Resolvido**

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS 4
- shadcn/ui
- Lucide React
- API Next.js + armazenamento JSON no servidor
- Service Worker + fila offline no dispositivo

## Executar localmente

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

Para demonstrar em dois telemóveis na mesma rede, executar `npm run dev -- --hostname 0.0.0.0`
e abrir o endereço IP do computador em ambos. Um pedido criado num dispositivo
fica imediatamente disponível no outro.

## Build de produção

```bash
npm run build
npm start
```

## Estrutura

```
src/
├── app/
│   ├── page.tsx              # Dashboard / Início
│   ├── pedir-ajuda/page.tsx  # Criar pedido
│   ├── pedidos/page.tsx      # Lista de pedidos
│   ├── pedidos/[id]/page.tsx # Detalhes + acções
│   └── sobre/page.tsx        # Pitch / Sobre
├── components/               # UI + navegação
├── lib/                      # storage, format, utils
└── types/                    # HelpRequest
```

## Demo (3 minutos)

1. Mostrar ecrã **Início** com indicador 3G e estatísticas
2. Criar pedido em **Pedir Ajuda**
3. Ir a **Pedidos** → ver o novo pedido
4. Abrir detalhes → **Aceitar pedido**
5. **Marcar como resolvido**
6. Mostrar ecrã **Sobre** para o pitch

## Licença

MIT
