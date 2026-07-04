# SOS Ajuda

Plataforma mobile-first de assistência de emergência em **português**, desenvolvida para comunidades moçambicanas afetadas por inundações.

Liga quem precisa de ajuda a voluntários e doadores — funciona em ligação 3G lenta, sem backend.

## Funcionalidades

- **Pedir Ajuda** — formulário completo com tipo, urgência e localização
- **Lista de Pedidos** — pesquisa e filtros para voluntários
- **Detalhes do Pedido** — aceitar e marcar como resolvido
- **Dashboard** — resumo de pedidos urgentes e estatísticas
- **Persistência local** — LocalStorage com dados de exemplo

## Fluxo end-to-end

1. Pessoa cria pedido de emergência
2. Pedido aparece na lista pública
3. Voluntário abre detalhes
4. Voluntário aceita → **Em atendimento**
5. Voluntário marca → **Resolvido**

## Stack

- Next.js 15 + TypeScript
- Tailwind CSS + shadcn/ui
- Lucide React icons
- LocalStorage (sem backend)

## Executar localmente

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## Demo (3 minutos)

1. **Problema** (30s) — `/sobre`
2. **Criar pedido** (60s) — `/pedir-ajuda`
3. **Aceitar e resolver** (60s) — `/pedidos` → detalhes
4. **3G + Cursor** (30s) — indicador de ligação leve + screenshot do Cursor

## Hackathon Cursor

- Mobile-first
- Interface em português
- Utilizável em 3G lento
- Repositório público pronto
- Demo funcional, não slides

## Licença

MIT
