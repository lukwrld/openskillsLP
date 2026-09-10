# Efeitos e Animações — código e explicação

> Catálogo de **todo** efeito de interação/animação da landing, com o código
> exato de origem. Para replicar na nova landing, copie os blocos como estão.
> Origem: `src/styles.css`, `src/routes/index.tsx`, `src/components/tech-effects.tsx`,
> `src/components/preloader.tsx`, `src/hooks/use-reveal.ts`.

Índice:
1. Nav bar (header) — centraliza→cantos no scroll
2. Scroll reveal (fade + rise) + stagger
3. Hero — entrada em stagger no load
4. Botões — pill e sólido
5. Cards — bezel-outer, card-lift, chips reativos ao pai
6. Eyebrow — régua que se desenha
7. Link sublinhado animado
8. Marquee infinito (16 competências)
9. Timeline — conector que cresce
10. StatNumber — contador que anima ao entrar na tela
11. Efeitos de fundo em `<canvas>` — FilamentFlow e ConnectionSphere
12. Preloader — rede que converge no logo
13. Hero grid (blueprint) + máscaras
14. Regras globais de fallback (reduced-motion / no-JS)

---

## 1. Nav bar (header)

### Comportamento
- **Sticky** no topo (`sticky top-0 z-40`), altura fixa `h-16`, fundo `--background` com `border-bottom`.
- Estado inicial (topo da página): logo + ações **centralizados**.
- Após rolar > 6px: os itens **deslizam para os cantos** (logo à esquerda, ações à direita). A transição é animada via `flex-grow` dos espaçadores.
- No mobile (`max-width: 639px`): sempre nos cantos, sem animação.

### Como funciona
Três espaçadores flex entre/around os itens. Os das pontas (`--edge`) começam com
`flex-grow: 1` (empurram tudo pro centro); o do meio (`--mid`) com `flex-grow: 0`.
Quando `data-scrolled="true"` é setado no header, as regras invertem: pontas → `0`,
meio → `1`. A transição de `flex-grow` (0.35s) produz o deslize.

### JSX (`index.tsx`)
```tsx
function Index() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="site-header sticky top-0 z-40" data-scrolled={scrolled}>
      <div className="flex h-16 w-full items-center gap-3 px-4 sm:px-6">
        <span className="hdr-spacer hdr-spacer--edge hidden sm:block" aria-hidden />
        <Logo showText={false} />
        <span className="hdr-spacer hdr-spacer--mid" aria-hidden />
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            onClick={openCart}
            id="cta-nav"
            className="btn-solid inline-flex items-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Comprar a Série
          </button>
        </div>
        <span className="hdr-spacer hdr-spacer--edge hidden sm:block" aria-hidden />
      </div>
    </header>
  );
}
```

### CSS (`styles.css`)
```css
.site-header {
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border);
}

/* itens centralizados até o 1º scroll; depois vão para os cantos.
   os espaçadores flex encolhem/crescem e a mudança anima. */
.hdr-spacer {
  flex-grow: 0;
  transition: flex-grow 0.35s ease;
}
.hdr-spacer--edge {
  flex-grow: 1;
}
.site-header[data-scrolled="true"] .hdr-spacer--edge {
  flex-grow: 0;
}
.site-header[data-scrolled="true"] .hdr-spacer--mid {
  flex-grow: 1;
}

/* no mobile os espaçadores das pontas somem — header sempre nos cantos */
@media (max-width: 639px) {
  .hdr-spacer--mid {
    flex-grow: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hdr-spacer {
    transition: none;
  }
}
```

> Nota: `flex-grow` é animável na maioria dos motores modernos (Chrome/Edge/Safari).
> Onde não for, o layout apenas "salta" entre os dois estados — sem quebra.

### ThemeToggle (dentro do header)
Pílula com 3 botões (claro/escuro/automático). Item ativo `bg-primary text-primary-foreground`;
inativos `text-muted-foreground hover:text-foreground`. Transição: `transition-colors`.
```tsx
<div className="inline-flex items-center rounded-md border border-border bg-surface p-0.5">
  {options.map(({ value, label, Icon }) => (
    <button
      key={value} type="button" onClick={() => setTheme(value)}
      aria-label={label} aria-pressed={theme === value}
      className={`flex size-7 items-center justify-center rounded transition-colors ${
        theme === value ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"}`}
    >
      <Icon className="size-3.5" />
    </button>
  ))}
</div>
```

---

## 2. Scroll reveal (fade + rise)

Elemento entra com `opacity 0 → 1` e `translateY(12px) → 0` em `0.5s ease`.
**Replica a cada passagem** pela viewport (não é one-shot).

### CSS
```css
.reveal {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.reveal.is-visible {
  opacity: 1;
  transform: none;
}
.reveal-delay-1 { transition-delay: 70ms; }
.reveal-delay-2 { transition-delay: 140ms; }
.reveal-delay-3 { transition-delay: 210ms; }
.reveal-delay-4 { transition-delay: 280ms; }
.reveal-delay-5 { transition-delay: 350ms; }
```

### Hook (`use-reveal.ts`) — usar `useAutoReveal()` uma vez no componente de página
```ts
export function useAutoReveal(options: IntersectionObserverInit = {}) {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(".reveal, .reveal-mask");
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px -10% 0px", ...options },
    );

    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add("is-visible"); // já visível no mount
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [options.root, options.rootMargin, options.threshold]);
}
```
(`use-reveal.ts` também exporta `useReveal()` e `useRevealChildren()` — variantes
one-shot com ref; `useAutoReveal` é a usada na landing.)

Stagger dentro de grids é feito com `style={{ transitionDelay: \`${i * 60}ms\` }}`
(entregas, stats) ou `${i * 80}ms` (timeline).

---

## 3. Hero — entrada em stagger no load

Toca **uma vez** no carregamento, sem depender de scroll.

### CSS
```css
.hero-stagger {
  opacity: 0;
  animation: hero-reveal 0.5s ease forwards;
}
.hero-stagger-1 { animation-delay: 0ms; }
.hero-stagger-2 { animation-delay: 70ms; }
.hero-stagger-3 { animation-delay: 140ms; }
.hero-stagger-4 { animation-delay: 220ms; }
.hero-stagger-5 { animation-delay: 300ms; }

@keyframes hero-reveal {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: none; }
}
```
Uso: `className="hero-stagger hero-stagger-3"` em logo, eyebrow, h1, parágrafo, CTA.

---

## 4. Botões

### 4.1 CTA principal — `.btn-hero-pill`
Lift −1px + sombra azul no hover; ícone (`ArrowUpRight`) desliza +2px; "afunda" no `:active`.
```css
.btn-hero-pill {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.8rem 1.4rem;
  border-radius: var(--radius-md);
  background: var(--color-primary);
  color: var(--color-primary-foreground);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.9375rem;
  transition: background 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
}
.btn-hero-pill:hover {
  background: var(--primary-hover);
  transform: translateY(-1px);
  box-shadow: 0 10px 22px -10px color-mix(in oklch, var(--color-primary) 45%, transparent);
}
.btn-hero-pill:active {
  transform: translateY(1px);
  box-shadow: none;
}
.btn-hero-pill svg { transition: transform 0.18s ease; }
.btn-hero-pill:hover svg { transform: translateX(2px); }
```

### 4.2 CTA sólido (header/nav) — `.btn-solid`
Mesmo lift/sombra, sem deslize de ícone. Combina com utilitários Tailwind (`bg-primary px-4 py-2 rounded-md`).
```css
.btn-solid {
  transition: background-color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
}
.btn-solid:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 22px -10px color-mix(in oklch, var(--color-primary) 40%, transparent);
}
.btn-solid:active { transform: translateY(1px); box-shadow: none; }
```

### 4.3 Botões de formulário / carrinho
Tailwind puro: `rounded-xl bg-primary shadow-md shadow-primary/20 transition-all
hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.99]`.

---

## 5. Cards

### 5.1 Painel — `.bezel-outer` / `.bezel-inner`
```css
.bezel-outer {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-card);
  height: 100%;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}
.bezel-outer:hover {
  transform: translateY(-2px);
  border-color: color-mix(in oklch, var(--color-primary) 35%, var(--color-border));
  box-shadow: 0 12px 28px -16px color-mix(in oklch, var(--color-primary) 22%, transparent);
}
.bezel-inner { padding: 1.75rem; height: 100%; }
```

### 5.2 Card leve — `.card-lift`
```css
.card-lift {
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}
.card-lift:hover {
  transform: translateY(-2px);
  border-color: color-mix(in oklch, var(--color-primary) 30%, var(--color-border));
  box-shadow: 0 10px 24px -16px color-mix(in oklch, var(--color-primary) 18%, transparent);
}
```

### 5.3 Elementos internos que reagem ao hover do **card pai**

```css
/* chip de ícone: preenche e gira quando o card (bezel-outer) tem hover */
.comp-chip {
  transition: background-color 0.22s ease, color 0.22s ease, transform 0.22s ease;
}
.bezel-outer:hover .comp-chip {
  background: var(--color-primary);
  color: var(--color-primary-foreground);
  transform: rotate(-4deg);
}

/* linha de competência: realça número e texto no hover da própria linha */
.comp-item { transition: color 0.18s ease; }
.comp-item .comp-num { transition: border-color 0.18s ease, color 0.18s ease; }
.comp-item:hover { color: var(--color-foreground); }
.comp-item:hover .comp-num {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

/* ícone de "O que você recebe": sobe e cresce quando o card-lift tem hover */
.entrega-icon { transition: transform 0.22s ease; }
.card-lift:hover .entrega-icon { transform: translateY(-2px) scale(1.08); }
```

---

## 6. Eyebrow — régua que se desenha

Rótulo de seção com uma barra de 2px embaixo. Quando o bloco `.reveal` ao redor
entra na tela, a barra cresce de `0` a `1.75rem`.

```css
.eyebrow {
  position: relative;
  display: inline-block;
  padding-bottom: 0.45rem;
  color: var(--color-primary);
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}
.eyebrow::after {
  content: "";
  position: absolute; left: 0; bottom: 0;
  height: 2px; width: 1.75rem;
  border-radius: 1px;
  background: var(--color-primary);
  transition: width 0.5s ease 0.1s;
}
/* dentro de um .reveal ainda não visível, começa em 0 */
.reveal .eyebrow::after { width: 0; }
.reveal.is-visible .eyebrow::after { width: 1.75rem; }
```

---

## 7. Link sublinhado animado — `.link-underline`

Sublinhado de 1px que cresce da esquerda para a direita no hover. Usado nos links do footer.
```css
.link-underline {
  background-image: linear-gradient(currentColor, currentColor);
  background-size: 0% 1px;
  background-position: 0 100%;
  background-repeat: no-repeat;
  transition: background-size 0.3s ease;
}
.link-underline:hover { background-size: 100% 1px; }
```
(Links de texto no corpo usam `underline underline-offset-2/4` estático + `hover:text-primary`/`hover:text-foreground`.)

---

## 8. Marquee infinito — 16 competências

Faixa que rola infinitamente à esquerda, pausa no hover, com fade nas duas bordas
via `mask-image`. O conteúdo é duplicado (`[...nomes, ...nomes]`) e o track anda
`-50%`.

### CSS
```css
.marquee {
  margin-top: 4rem;
  border-block: 1px solid var(--color-border);
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
}
.marquee__track {
  display: inline-flex; align-items: center;
  white-space: nowrap;
  padding-block: 1rem;
  animation: marquee 44s linear infinite;
  will-change: transform;
}
.marquee:hover .marquee__track { animation-play-state: paused; }
.marquee__item {
  display: inline-flex; align-items: center;
  gap: 1.5rem; padding-right: 1.5rem;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(1rem, 2vw, 1.4rem);
  letter-spacing: -0.01em;
  color: var(--color-muted-foreground);
}
.marquee__sep { color: var(--color-primary); font-size: 0.6em; }

@keyframes marquee {
  to { transform: translateX(-50%); }
}
```

### JSX
```tsx
function CompetenciasMarquee() {
  const nomes = blocos.flatMap((b) => b.itens);
  const loop = [...nomes, ...nomes];
  return (
    <div className="marquee -mx-5" aria-hidden>
      <div className="marquee__track">
        {loop.map((nome, i) => (
          <span key={`${nome}-${i}`} className="marquee__item">
            {nome}<span className="marquee__sep">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}
```

---

## 9. Timeline — conector que cresce

Cada passo (menos o primeiro) tem um segmento vertical de 1px acima. Ele começa
`scaleY(0)` (origem no topo) e vai a `scaleY(1)` quando o passo entra na viewport
(o passo também é `.reveal`, então ganha `.is-visible`).

```css
.timeline-step { position: relative; }
.timeline-step + .timeline-step::before {
  content: "";
  position: absolute;
  left: 1.375rem; top: -2rem;
  width: 1px; height: 2rem;
  background: var(--color-border);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.45s ease;
}
.timeline-step + .timeline-step.is-visible::before { transform: scaleY(1); }
```
JSX: `<li className="timeline-step reveal ..." style={{ transitionDelay: \`${i*80}ms\` }}>`
com um badge numérico `size-11 rounded-md bg-primary`.

---

## 10. StatNumber — contador animado

Conta de `0` até o alvo **toda vez** que entra na viewport (reinicia a cada
passagem). easeOutQuart, 1300ms. Preserva prefixo/sufixo (ex.: `+300`, `16`).
Degrada para o valor final sem JS ou com `prefers-reduced-motion`.

```tsx
function StatNumber({ value }: { value: string }) {
  const parts = value.match(/^(\D*)(\d[\d.,]*)(\D*)$/);
  const prefix = parts?.[1] ?? "";
  const suffix = parts?.[3] ?? "";
  const target = Number((parts?.[2] ?? "0").replace(/[.,]/g, ""));

  const ref = useRef<HTMLSpanElement | null>(null);
  const [n, setN] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const animate = () => {
      cancelAnimationFrame(raf);
      const start = performance.now();
      const dur = 1300;
      setN(0);
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        setN(Math.round((1 - Math.pow(1 - p, 4)) * target)); // easeOutQuart
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => { if (entries[0]?.isIntersecting) animate(); },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [target]);

  return (
    <span ref={ref}>{prefix}{n.toLocaleString("pt-BR")}{suffix}</span>
  );
}
```
```css
.stat-number {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(2.25rem, 4vw, 3rem);
  letter-spacing: -0.02em;
  line-height: 1;
  color: var(--color-primary);
  font-variant-numeric: tabular-nums;
}
```

---

## 11. Efeitos de fundo em `<canvas>` (`tech-effects.tsx`)

Dois efeitos decorativos, ambos `aria-hidden`, atrás do conteúdo (`z-index: 0`),
`pointer-events: none`. Compartilham um **runner genérico** (`runCanvas`) que:
- dimensiona com `devicePixelRatio` (com cap);
- roda o rAF com throttle de FPS;
- **pausa** quando fora da tela (`IntersectionObserver`) ou aba oculta (`visibilitychange`);
- observa a classe `.dark` no `<html>` (`MutationObserver`) e avisa o efeito para trocar a paleta;
- em `prefers-reduced-motion`: desenha **um único quadro** e não inicia o loop;
- reduz densidade de partículas quando largura `< 640`.

### CSS de posicionamento
```css
.fx-canvas {
  position: absolute; inset: 0; z-index: 0;
  display: block; width: 100%; height: 100%;
  pointer-events: none;
}
/* sangra para 100vw ignorando padding/max-width do container
   (a seção precisa de overflow-hidden) */
.fx-canvas--bleed {
  left: 50%; right: auto;
  width: 100vw; max-width: none;
  transform: translateX(-50%);
}
```

### Paleta (literal, muda com o tema)
- Escuro: composição **aditiva** (`globalCompositeOperation = "lighter"`), linhas
  luminosas ciano `rgba(41,171,226,a)` / azul `rgba(38,96,168,a)` / centelha
  `rgba(214,236,255,a)`, fundo limpo com "rastro" `rgba(16,23,37,0.42)`.
- Claro: `source-over`, traço azul escuro sobre fundo claro, alpha multiplicado
  (`aMul = 3` no FilamentFlow, `2.4` na ConnectionSphere), fundo limpo opaco com
  `var(--color-fx-bg)` (ou fallback `#eef2f8`).

### 11.1 `<FilamentFlow />` — filamentos luminosos convergentes
Feixe de ~58 filamentos (22 no mobile) que partem da borda esquerda, convergem
num ponto (~78% da largura, meio da altura), e divergem saindo pela direita.
Cada filamento tem ondulação senoidal com amortecimento (`taper`) perto da
convergência. ~44 partículas (18 mobile) viajam ao longo dos filamentos e
aceleram perto do ponto de convergência. `dprCap: 1`, `maxFps: 40`.
Usado na seção **CTA final** (`#em-breve`).
```tsx
<section className="relative overflow-hidden bg-fx-bg ...">
  <FilamentFlow />
  <div className="relative z-10 ...">…</div>
</section>
```

### 11.2 `<ConnectionSphere />` — esfera de conexões
Distribuição Fibonacci de ~210 pontos (88 mobile) numa esfera; arestas ligam cada
nó aos 2–3 vizinhos mais próximos + algumas "cordas" longas. A esfera gira
lentamente (`time * 0.14`) com um tilt fixo (~0.38rad). Nós cintilam (seno).
"Pulsos" (12 / 6 mobile) correm ao longo das arestas. Desenha também o círculo
do contorno da esfera. `dprCap: 1.5` (padrão), `maxFps: 60`.
Usado na seção **prova social / stats** ("Parte do ecossistema").

> **Reuso:** copie `tech-effects.tsx` inteiro. Não altere as cores literais —
> elas são a assinatura de marca em movimento (ver `branding.md §3.3`).

### Runner genérico (referência — `runCanvas`)
```ts
function runCanvas(canvas, handlers) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};
  const reduced = reducedMotion();
  const dprCap = handlers.dprCap ?? 1.5;
  const minInterval = 1000 / (handlers.maxFps ?? 60);
  // ... resize() com setTransform(dpr,...); loop() com throttle;
  //     sync() liga/desliga por onscreen && !document.hidden && !reduced
  const ro = new ResizeObserver(resize); ro.observe(canvas);
  const io = new IntersectionObserver(([e]) => { onscreen = e?.isIntersecting ?? true; sync(); }, { threshold: 0 });
  io.observe(canvas);
  const themeObs = new MutationObserver(() => { handlers.onThemeChange?.(); if (reduced) handlers.frame(ctx, w, h, 0); });
  themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  document.addEventListener("visibilitychange", sync);
  resize(); if (!reduced) loop();
  return () => { /* cancelAnimationFrame + disconnect all + removeEventListener */ };
}
```

---

## 12. Preloader (`preloader.tsx` + `.preloader*` no CSS)

Overlay `#101725` full-screen. Rede de 30 pontos (15 mobile) surge, se conecta,
faz **duas transições de configuração** (cluster → anel → fluxo senoidal), tudo
**converge para o centro**, o logo oficial é revelado com `clip-path: circle()`,
um **pulso ciano** expande e o overlay some — revelando a página (que já está
renderizada por baixo, via SSR).

**Toca 1× por sessão** (flag em `window.__opPreloaderPlayed`; não sobrevive a
refresh real, mas evita reinício no HMR do dev).

### Timeline interna (ms, a partir de `performance.now()`)
| t (ms) | evento |
|---|---|
| 0–280 | rede "aparece" (`appear`) |
| 240–680 | morph config 0 → 1 (cluster → anel) |
| 680–1080 | morph config 1 → 2 (anel → fluxo) |
| ~1000 (CONV0−80) | checa `document.readyState`; se não `complete`, **segura** a animação até `window.load` (teto 2400ms) |
| 1080–1400 | pontos convergem ao centro, rede some (`netAlpha → 0`) |
| 1220 | logo revelado (`setLogoIn(true)`) |
| 1380–1680 | pulso ciano expande |
| 1760 | agenda `beginExit` |
| — | `beginExit`: `phase="exit"` (fade 0.56s) → `phase="gone"` (desmonta) |

### Failsafes (camadas)
1. `setTimeout(beginExit, 4800)` — saída absoluta.
2. `setTimeout(unlock, 6000)` — devolve o scroll aconteça o que acontecer (`html { overflow: hidden }` é aplicado durante o preload).
3. Qualquer `throw` no setup → `setLogoIn(true)` + saída em 700ms.
4. CSS: `animation: preloader-failsafe 0.6s ease 5.5s forwards` some sozinho se o JS não rodar.
5. `@media (scripting: none) { .preloader { display: none } }`.
6. `prefers-reduced-motion`: pula a rede, só o logo com fade, saída em 950ms.

### CSS
```css
.preloader {
  position: fixed; inset: 0; z-index: 200;
  display: grid; place-items: center;
  background: var(--color-abyss);
  transition: opacity 0.5s ease;
  animation: preloader-failsafe 0.6s ease 5.5s forwards; /* failsafe */
}
.preloader[data-exit="true"] { opacity: 0; pointer-events: none; }

@keyframes preloader-failsafe {
  to { opacity: 0; visibility: hidden; pointer-events: none; }
}

.preloader::before { /* vinheta + malha de pontos de fundo (modo sem canvas) */
  content: ""; position: absolute; inset: 0; z-index: 0;
  background:
    radial-gradient(rgba(120,170,220,0.10) 1px, transparent 1.5px) 0 0 / 54px 54px,
    radial-gradient(ellipse 65% 55% at 50% 42%, rgba(41,171,226,0.05), transparent 70%),
    radial-gradient(circle at 50% 48%, transparent 38%, rgba(0,0,0,0.32));
  -webkit-mask-image: radial-gradient(ellipse 95% 95% at 50% 50%, #000 55%, transparent 100%);
  mask-image: radial-gradient(ellipse 95% 95% at 50% 50%, #000 55%, transparent 100%);
  pointer-events: none;
}

.preloader__canvas { position: absolute; inset: 0; z-index: 0; }

.preloader__logo {
  position: relative; z-index: 2;
  display: inline-flex; align-items: center; gap: 0.8rem;
  padding: 0 1.5rem;
  opacity: 0; transform: scale(0.94);
  clip-path: circle(0% at 50% 50%);
  transition:
    opacity 0.55s ease,
    transform 0.7s cubic-bezier(0.16, 1, 0.3, 1),
    clip-path 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.preloader__logo[data-in="true"] {
  opacity: 1; transform: none;
  clip-path: circle(140% at 50% 50%);
}
.preloader__logo img { width: 3rem; height: 3rem; border-radius: 999px; object-fit: cover; }

.preloader__word {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(1.25rem, 4vw, 1.7rem);
  letter-spacing: -0.02em;
  color: #eaf2ff;
  white-space: nowrap;
}
.preloader__word b { color: #29abe2; font-weight: 800; }

@media (prefers-reduced-motion: reduce) {
  .preloader__logo { clip-path: none; transform: none; transition: opacity 0.35s ease; }
}
@media (scripting: none) {
  .preloader { display: none; }
}
```

### Paleta do canvas do preloader (literal)
```
CYAN  = "41,171,226"   BLUE = "92,140,225"   SPARK = "212,238,255"
NAVY_FALLBACK = "#101725"  (na prática lê o backgroundColor do pai)
easeInOut(t) = t < 0.5 ? 4t³ : 1 - (-2t+2)³ / 2
```

> **Reuso:** copie `preloader.tsx` inteiro e monte `<Preloader />` no shell/root,
> **antes** do conteúdo (como em `__root.tsx`). Depende só de `LOGO_SRC`.

---

## 13. Hero grid (blueprint) + máscaras radiais

Grade fina de 56px atrás do hero, esmaecida por uma máscara radial elíptica.
```css
.hero-grid {
  position: absolute; inset: 0; z-index: 0;
  pointer-events: none;
  background-image:
    linear-gradient(color-mix(in oklch, var(--color-border) 55%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in oklch, var(--color-border) 55%, transparent) 1px, transparent 1px);
  background-size: 56px 56px;
  -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 38%, #000 28%, transparent 80%);
  mask-image: radial-gradient(ellipse 80% 70% at 50% 38%, #000 28%, transparent 80%);
}
```
Uso: `<div className="hero-grid" aria-hidden />` como primeiro filho de uma `<section className="relative overflow-hidden">`, com o conteúdo em `relative z-10`.

---

## 14. Regras globais de fallback

### `prefers-reduced-motion: reduce` (styles.css)
```css
@media (prefers-reduced-motion: reduce) {
  .reveal, .hero-stagger, .marquee__track, .bezel-outer, .card-lift,
  .btn-solid, .comp-chip, .entrega-icon, .eyebrow::after,
  .timeline-step + .timeline-step::before {
    opacity: 1 !important;
    transform: none !important;
    animation: none !important;
    transition: none !important;
  }
  .reveal .eyebrow::after { width: 1.75rem !important; }
}
```

### Sem JavaScript (`@media (scripting: none)`)
```css
@media (scripting: none) {
  .reveal { opacity: 1; transform: none; }
  .reveal .eyebrow::after { width: 1.75rem; }
  .timeline-step + .timeline-step::before { transform: none; }
}
```

### Base (`@layer base`)
```css
:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
  border-radius: 3px;
}
/* header sticky: âncoras internas não ficam escondidas */
section[id], [id]:target { scroll-margin-top: 5.5rem; }
```

### Anti-flash de tema (script inline no `<head>`, `__root.tsx`)
```html
<script>
(function(){try{
  document.documentElement.classList.add('js');
  var t=localStorage.getItem('laudo-theme');
  var d=t==='dark'||((!t||t==='system')&&window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark',d);
}catch(e){}})();
</script>
```

---

## 15. Tabela-resumo de timings

| Efeito | Duração | Easing | Delay / stagger |
|---|---|---|---|
| Header centraliza→cantos | 0.35s | ease | — |
| Scroll reveal | 0.5s | ease | 70ms × índice |
| Hero stagger | 0.5s | ease | 0/70/140/220/300ms |
| Botão pill/solid (hover) | 0.18s | ease | — |
| Ícone do botão (slide) | 0.18s | ease | — |
| Card lift (bezel/card-lift) | 0.2s | ease | grid: 60ms × índice |
| Chip preenche (hover do pai) | 0.22s | ease | — |
| Eyebrow régua | 0.5s | ease | +0.1s |
| Link underline | 0.3s | ease | — |
| Marquee | 44s | linear infinite | pausa no hover |
| Timeline connector | 0.45s | ease | 80ms × índice |
| StatNumber count-up | 1.3s | easeOutQuart | dispara a 60% visível |
| Canvas FilamentFlow | loop | — | 40fps, dpr≤1 |
| Canvas ConnectionSphere | loop | rot = t·0.14 | 60fps, dpr≤1.5 |
| Preloader (total) | ~1.8s + 0.56s saída | vários | ver §12 |
| Preloader logo reveal | 0.55–0.7s | cubic-bezier(0.16,1,0.3,1) | em t≈1220ms |
