# Documento de Branding — 100 Open Startups (contexto da landing "Laudo de Competências")

> Guia de marca **na medida do que esta landing usa e do que a próxima precisa
> replicar**. Não é o brandbook institucional completo da 100 Open Startups — é o
> recorte aplicado ao produto digital, extraído do código-fonte.

---

## 1. Identidade

**Nome exibido:** `100 Open Startups`
Sempre escrito com "Open" em destaque na cor primária:

```html
100 <span class="text-primary">Open</span> Startups
```

Aparece assim no hero, no preloader e (sem texto, só o símbolo) no header e footer.

**Produto desta landing:** *Laudo de Competências Empreendedoras* (também chamado
"Diagnóstico"). Título institucional da página:
`Laudo de Competências Empreendedoras | 100 Open Startups`.

---

## 2. Logo / símbolo

| Item | Valor |
|---|---|
| Arquivo | `/favicon.jpg` (constante `LOGO_SRC` em `src/config/site.ts`) |
| Forma de uso | Sempre **circular**: `rounded-full` + `object-cover` |
| Tamanhos usados | Header `size-8` (32px) · Hero `size-16`→`sm:size-[72px]` · Preloader `48px` · Footer `size-8` |
| Borda | No hero: `border border-border`. Nas demais: sem borda. |
| Com texto | `inline-flex items-center gap-2.5` + wordmark "100 Open Startups" em Archivo extrabold |
| Sem texto | Header e footer usam só o círculo (`showText={false}`) |

**Componente `Logo`** (`index.tsx`) — assinatura de referência:
```tsx
<Logo tone="navy" | "light" showText={boolean} />
// tone="navy"  -> wordmark em text-foreground  (sobre fundo claro)
// tone="light" -> wordmark em text-navy-foreground (sobre footer navy)
```

> A nova landing deve usar o **mesmo componente e o mesmo asset**. Não recriar o
> logo com fonte/tipografia.

---

## 3. Cores de marca

### 3.1 Azul da marca (primary)
O sistema tem **um único hue de destaque**. Tudo que precisa se destacar usa ele.

| Token | Claro | Escuro | Uso |
|---|---|---|---|
| `--primary` | `oklch(0.55 0.13 250)` ≈ `#3d6fb4` | `oklch(0.7 0.12 245)` ≈ `#5aa0e0` | CTAs, links, eyebrow, ícones ativos, números, "Open" no wordmark |
| `--primary-hover` | `oklch(0.48 0.13 250)` | `oklch(0.76 0.12 245)` | hover de botão sólido |
| `--primary-foreground` | branco | `oklch(0.16 0.03 265)` | texto/ícone sobre primary |

### 3.2 Azul-marinho de marca (navy / abyss)
Âncora escura da marca. **Não inverte** entre temas.

| Token | Valor | Uso |
|---|---|---|
| `--navy` | `oklch(0.288 0.079 265)` ≈ `#1f2b57` | Footer, superfícies de marca escuras |
| `--abyss` | `oklch(0.205 0.03 264)` = **`#101725`** | Fundo do preloader; fundo dos canvases no dark |
| `meta theme-color` | `#0f1c3f` | barra do navegador |

### 3.3 Paleta dos efeitos (canvas) — cores de marca "vivas"
Usada só nos efeitos em `<canvas>` (rede de conexões, filamentos, preloader).
São valores **literais** no código:

| Nome | Valor | Papel |
|---|---|---|
| Ciano | `#29ABE2` / `rgb(41,171,226)` | traço e partícula "energizada", pulsos que correm nas conexões |
| Azul | `#5C8CE1` / `rgb(92,140,225)` | traço secundário da rede |
| Centelha | `#D4EEFF` / `rgb(212,238,255)` | brilho nos nós |

> Esse ciano `#29ABE2` é a "faísca" da marca — aparece **apenas em movimento/efeito**,
> nunca como cor de UI estática (botão, texto, borda).

### 3.4 Neutros
Frios, levemente azulados (hue ~250–265 no oklch). Nunca cinza puro/quente.
Ver `design-tokens.css`.

---

## 4. Tipografia da marca

| Papel | Fonte | Observação |
|---|---|---|
| Display / títulos / wordmark / botões / números | **Archivo** (500–900, itálico 700) | Sempre com `letter-spacing: -0.02em`. Peso 800 é o "voz de título". |
| Texto corrido / UI | **IBM Plex Sans** (400/500/600) | — |

Ambas via Google Fonts (ver `design.md §2.2`). A dupla Archivo + IBM Plex passa
o tom "engenharia / técnico / confiável" da marca.

---

## 5. Voz e tom (verbal)

Observado nos textos de `index.tsx` e `config/site.ts`:

- **Português do Brasil**, 2ª pessoa ("Descubra…", "Compre a Série…").
- Direto, sem jargão de marketing inflado. Frases curtas.
- **Desmistifica**: "não é um teste de personalidade", "não define se alguém 'é ou não é empreendedor'".
- Enfatiza concretude: "avaliação real, não um formulário", "prova presencial", "revisão humana".
- Números sempre explícitos: "16 competências", "4 blocos", "R$ 385", "4 palestras · 8h".
- Acentuação e ortografia **sempre corretas** (nada de "nao", "voce").
- Termos fixos do produto (não variar):
  - "Laudo de Competências Empreendedoras" / "Diagnóstico" (o mesmo produto).
  - "Série de Competências" — o produto pago (R$ 385, 4 palestras · 8h).
  - "Inovabra Habitat" — local da aplicação presencial.
  - "condição especial" (não "desconto") para universitários — 100%.
  - "devolutiva" (não "feedback").

---

## 6. Regras de aplicação (do's / don'ts)

**Faça**
- Um só azul de destaque; resto em neutros.
- Logo sempre circular, sempre o asset oficial.
- "Open" destacado em `primary` no wordmark.
- Footer sempre `bg-navy`.
- Ciano `#29ABE2` só em efeito/movimento.
- Dark mode com paridade total.

**Não faça**
- Não introduzir segunda cor de destaque (verde, laranja, roxo) na UI.
- Não usar sombra em elementos em repouso (só hover, e azulada).
- Não recriar o logo tipograficamente.
- Não usar gradientes decorativos na UI (gradientes só existem dentro do canvas e como máscaras).
- Não usar cinzas quentes.
- Não animar de forma "saltitante" — movimento é contido (12px, 0.5s, `ease`).

---

## 7. Ativos e constantes compartilhadas

De `src/config/site.ts` — **ponto único de verdade**, replicar na nova landing:

```ts
LOGO_SRC = "/favicon.jpg"
SERIE = { valor: "R$ 385", precoBRL: 385, formato: "4 palestras · 8h",
          inclui: "Diagnóstico de Competências incluído" }
VOUCHER = { desconto: "100%", valorComVoucher: "R$ 0",
            publico: "estudantes universitários com e-mail acadêmico válido" }
DIAGNOSTICO = { acesso: "Incluído na Série",
                bonus: "Conclua o Diagnóstico e ganhe acesso gratuito a mais uma palestra" }
```

Carrinho/cupom compartilhado entre páginas: `sessionStorage['op_cart_coupon']`
(as duas landings leem o mesmo carrinho — ver `cart.tsx`).
