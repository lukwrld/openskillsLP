# Design System — Landing "Laudo de Competências Empreendedoras"

> Documento de contexto para times que constroem **outra landing page** do mesmo
> ecossistema (100 Open Startups) e precisam ficar visualmente consistentes com
> esta. Fonte da verdade do código: `src/styles.css`, `src/routes/__root.tsx`,
> `src/routes/index.tsx`, `src/components/tech-effects.tsx`,
> `src/components/preloader.tsx`, `src/config/site.ts`.

Arquivos irmãos nesta pasta:
- `design-tokens.css` — variáveis CSS (oklch), fonte da verdade das cores.
- `design-tokens.js` — mesmos tokens em JS/ESM + paleta literal do canvas.
- `branding.md` — logo, voz, uso de marca, cores de marca.
- `effects.md` — todo efeito de interação/animação com o código.

---

## 1. Princípios visuais

| Princípio | Como se traduz |
|---|---|
| **Blueprint / técnico, não "startup colorida"** | Um único azul de marca sobre neutros frios. Grade fina de blueprint no hero. Efeitos de rede/filamento em `<canvas>`. Zero gradientes chamativos na UI. |
| **Contenção no movimento** | Reveal = fade + subida de 12px, 0.5s. Nada "quica". `prefers-reduced-motion` e `scripting:none` sempre degradam para conteúdo estático e visível. |
| **Tipografia faz o trabalho pesado** | Archivo (display) extrabold com tracking negativo nos títulos; IBM Plex Sans no corpo. Hierarquia vem de peso/tamanho, não de cor. |
| **Superfícies alternadas** | Seções alternam `background` (branco) e `surface` (cinza levíssimo) para ritmar a página sem divisórias pesadas. Seções de efeito usam `fx-bg`. |
| **Dark mode é first-class** | Todo token tem par claro/escuro. O canvas lê o tema e troca a paleta (aditiva no escuro, traço sobre claro no claro). |
| **Acessibilidade** | Foco visível global (anel 2px `--ring`), `aria-hidden` em todo canvas decorativo, `scroll-margin-top` para âncoras sob header sticky. |

---

## 2. Fundações

### 2.1 Cor
Todas as cores são **oklch** e semânticas (nunca use um hex solto na UI). Ver
`design-tokens.css`. Resumo dos papéis:

- `background` / `foreground` — página e texto principal.
- `surface` — seções alternadas, fundo de inputs, toggles.
- `card` / `card-foreground` — qualquer superfície elevada.
- `navy` / `navy-foreground` — footer e superfícies de marca escuras (fixo, não inverte).
- `abyss` (`#101725`) — fundo do preloader; **igual nos dois temas**.
- `fx-bg` — seções que contêm um `<canvas>` de efeito.
- `primary` / `primary-hover` / `primary-foreground` — o azul da marca. Único hue de destaque. Links, CTAs, eyebrow, ícones ativos, números de stat.
- `muted-foreground` — todo texto de apoio/parágrafo secundário.
- `accent` — realce azulado sutil (chips de ícone, linha de FAQ ativa).
- `border` — 1px em tudo; no escuro vira `branco / 12%`.
- `ring` — = `primary`; anel de foco.
- `destructive` — só erro de formulário.

Regra prática: **se algo precisa "chamar atenção", é `primary`. Se é secundário,
é `muted-foreground`. Não introduza uma terceira cor de destaque.**

### 2.2 Tipografia

| Uso | Família | Peso | Tracking | Notas |
|---|---|---|---|---|
| h1–h4, `.font-display`, botões, números | `--font-display` = **Archivo** | 700–900 (800 padrão em títulos) | `-0.02em` | `text-wrap: balance` em h1/h2 |
| Corpo, parágrafos, labels, inputs | `--font-sans` = **IBM Plex Sans** | 400 / 500 / 600 | normal | `-webkit-font-smoothing: antialiased` |
| Eyebrow (rótulo de seção) | Archivo | 700 | `0.09em` | `uppercase`, `0.75rem`, cor `primary`, com régua animada (ver `effects.md`) |

Carregamento (Google Fonts, em `__root.tsx` `<head>`):
```
https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,500;0,600;0,700;0,800;0,900;1,700&family=IBM+Plex+Sans:wght@400;500;600&display=swap
```
Com `preconnect` para `fonts.googleapis.com` e `fonts.gstatic.com`.

Escala fluida (clamp) — ver `design-tokens.js › typography.scale`:
- Hero h1: `clamp(2.25rem, 5vw, 3.5rem)`, line-height `1.1`
- h2 de seção: `text-3xl` → `sm:text-4xl` (1.875 → 2.25rem)
- Número de stat: `clamp(2.25rem, 4vw, 3rem)`, `font-variant-numeric: tabular-nums`

### 2.3 Espaçamento e layout
- Escala de espaçamento = Tailwind default (base 4px).
- **Padding lateral de seção:** `px-5` (mobile) → `sm:px-6` no header; conteúdo centralizado com `max-w-*` (`max-w-2xl` texto, `max-w-5xl` grids, `max-w-3xl` hero).
- **Padding vertical de seção:** `py-20` → `sm:py-24` (seções de efeito: `py-24` → `sm:py-28`).
- **Grids:** `gap-4` a `gap-6`; cards em `sm:grid-cols-2`, entregas em `lg:grid-cols-4`, stats em `sm:grid-cols-3`.
- **Header:** altura fixa `h-16`, sticky, `z-40`.

### 2.4 Raio
Base `--radius: 0.5rem`. Escala `sm/md/lg/xl/2xl…` derivada por `calc()`
(ver tokens). Na prática:
- `rounded-md` — botões, chips de ícone, ícones de passo.
- `rounded-lg` — cards, caixas de oferta, painéis (`bezel-outer`).
- `rounded-xl` — inputs e botões dentro de formulários/carrinho.
- `rounded-full` — avatares/logo, números de competência.

### 2.5 Borda e elevação
- **Padrão:** `1px solid var(--border)`. Aplicado globalmente a `*` no `@layer base`.
- **Sem sombra em repouso.** Sombra só aparece no `:hover` de cards e botões, sempre azulada e difusa via `color-mix(... var(--color-primary) ...)`. Ver `effects.md §4`.
- Dois "níveis" de card:
  - `.bezel-outer` + `.bezel-inner` — painel principal (padding interno 1.75rem, lift −2px no hover).
  - `.card-lift` — card leve bordado (mesmo lift, sombra um pouco menor).

### 2.6 Movimento (resumo — detalhe em `effects.md`)
- Easing padrão: `ease`. Easing enfático (só preloader/logo): `cubic-bezier(0.16,1,0.3,1)`.
- Durações: `0.18s` micro-interação · `0.2s` cards · `0.5s` reveal.
- Stagger: reveal `70ms`, hero `70–80ms`, grid `60ms`, timeline `80ms` por índice.
- **Toda animação tem fallback** em `@media (prefers-reduced-motion: reduce)` e `@media (scripting: none)`.

---

## 3. Componentes / padrões recorrentes

| Padrão | Classe / origem | Regras de consistência |
|---|---|---|
| **Eyebrow** | `.eyebrow` (styles.css) | Sempre acima do h2. Uppercase, `primary`, régua de 1.75rem que "desenha" quando o bloco `.reveal` aparece. |
| **Section heading** | `SectionHeading` em `index.tsx` | `mb-10 max-w-2xl`: eyebrow + h2 (`text-3xl sm:text-4xl font-extrabold`) + parágrafo opcional `text-sm text-muted-foreground`. |
| **CTA primário** | `.btn-hero-pill` | Archivo 700, `bg-primary`, ícone `ArrowUpRight` que desliza +2px no hover, lift −1px, sombra azul. |
| **CTA sólido (header/nav)** | `.btn-solid` + utilitários Tailwind | Mesmo lift/sombra do pill, sem o deslize de ícone. |
| **Card painel** | `.bezel-outer > .bezel-inner` | Para blocos de conteúdo densos (as 16 competências, cards de preço). |
| **Card leve** | `.card-lift` | Para itens curtos (entregas, stats). |
| **Chip de ícone** | `.comp-chip` / `.entrega-icon` | Fica dentro de um card; reage ao hover do **card pai**, não ao próprio. |
| **Marquee** | `.marquee > .marquee__track` | Rolagem infinita 44s, pausa no hover, máscara de fade nas bordas. |
| **Timeline** | `.timeline-step` | Conector vertical de 1px que cresce (`scaleY`) quando o passo entra na viewport. |
| **Stat number** | `StatNumber` + `.stat-number` | Conta de 0 ao valor toda vez que entra na tela (easeOutQuart, 1.3s). Preserva prefixo/sufixo (`+300`). |
| **Toggle de tema** | `ThemeToggle` em `index.tsx` | 3 opções (claro/escuro/automático), pílula bordada em `bg-surface`, item ativo `bg-primary`. |
| **Preloader** | `Preloader` + `.preloader*` | Overlay `#101725` com rede em canvas que converge e revela o logo. Toca 1x por sessão. Failsafes em JS **e** CSS. |
| **Cart / Sheet** | `cart.tsx` (Radix + vaul) | Sheet lateral direita, `sm:max-w-md`. Cupom universitário compartilhado entre páginas via `sessionStorage` (`op_cart_coupon`). |
| **FAQ** | Radix Accordion (`type=single collapsible`) | Trigger `font-semibold`, hover → `text-primary`. |
| **Footer** | `<footer class="bg-navy">` | Sempre `navy` fixo. Links com `.link-underline` (sublinhado que cresce da esquerda). |

### 3.1 Biblioteca de componentes
shadcn/ui, estilo **new-york**, base **slate**, ícones **lucide-react**,
CSS variables ligado, sem prefixo. Aliases: `@/components`, `@/components/ui`,
`@/lib`, `@/hooks`. Ver `components.json`. Radix primitives já são dependência
para accordion, dialog, sheet, tooltip, etc.

### 3.2 Stack
TanStack Start + TanStack Router (SSR/shell), React 19, Vite 8, Tailwind CSS v4
(`@tailwindcss/vite`, config **dentro** do CSS via `@theme inline`),
`tw-animate-css`. Build/deploy: Nitro → Cloudflare (Lovable). Sem `tailwind.config.js`.

---

## 4. Regras de tema (claro/escuro)

1. Classe `.dark` em `<html>`. Aplicada **antes da primeira pintura** por um
   script inline no `<head>` (evita flash) — ver `__root.tsx`.
2. Persistência: `localStorage['laudo-theme']` = `light | dark` (ou ausente = `system`).
3. `system` acompanha `prefers-color-scheme` em tempo real.
4. `theme-provider.tsx` é o dono do estado; `useTheme()` expõe `{ theme, setTheme }`.
5. **Ao criar a nova landing, reutilize `theme-provider.tsx` e o script inline
   exatamente** — mesma chave de storage, para as duas páginas ficarem em sincronia.
6. `meta[name=theme-color]` = `#0f1c3f`.

---

## 5. Acessibilidade e resiliência (não-negociável)

- `:focus-visible` global: `outline: 2px solid var(--color-ring); outline-offset: 2px`.
- Todo `<canvas>` decorativo: `aria-hidden`, `pointer-events: none`, pausa fora da viewport (IntersectionObserver) e com aba oculta (`visibilitychange`).
- `prefers-reduced-motion: reduce` → canvas renderiza **1 quadro estático**; reveals/marquee/lifts ficam em estado final.
- `@media (scripting: none)` → preloader nunca aparece; reveals já visíveis.
- Preloader: conteúdo real já está no DOM (SSR) atrás do overlay; timeout absoluto 4.8s + failsafe CSS 5.5s.
- Âncoras internas: `scroll-margin-top: 5.5rem` por causa do header sticky.
- `<html lang="pt-BR">`, `suppressHydrationWarning`.

---

## 6. Checklist para a nova landing

- [ ] Copiar `design-tokens.css` (bloco `:root` + `.dark` + `@theme inline`) para o CSS de entrada.
- [ ] Carregar Archivo + IBM Plex Sans com o mesmo `<link>` e `preconnect`.
- [ ] Reusar `theme-provider.tsx` + script inline de tema (mesma storage key `laudo-theme`).
- [ ] Reusar `src/styles.css` (blocos de `.reveal`, `.eyebrow`, `.btn-*`, `.bezel-*`, `.marquee`, `.timeline-step`, `.site-header`, `.fx-canvas`, `.preloader`) — ou o subconjunto necessário.
- [ ] Reusar `tech-effects.tsx` e `preloader.tsx` sem alteração de paleta.
- [ ] Reusar `use-reveal.ts` (`useAutoReveal()` no componente de página).
- [ ] Header: `h-16`, sticky, `z-40`, `data-scrolled`, espaçadores flex `hdr-spacer` (ver `effects.md §1`).
- [ ] Alternar `bg-background` / `bg-surface` entre seções; `bg-fx-bg` só onde houver canvas.
- [ ] Toda seção de conteúdo: `px-5 sm:px-6`, `py-20 sm:py-24`, heading com `eyebrow` + h2 `text-3xl sm:text-4xl font-extrabold`.
- [ ] CTAs = `.btn-hero-pill` (principal) ou `.btn-solid` (nav). Nunca outra cor.
- [ ] Rodar checagem de contraste nos dois temas.
- [ ] Verificar `prefers-reduced-motion` e navegação por teclado.
