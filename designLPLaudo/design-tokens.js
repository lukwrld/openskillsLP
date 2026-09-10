/* =============================================================================
   100 OPEN STARTUPS — LANDING "LAUDO DE COMPETÊNCIAS"
   DESIGN TOKENS — JavaScript / ESM
   -----------------------------------------------------------------------------
   Espelho de design-tokens.css para consumo em JS/TS: temas de charts,
   canvas, styled-components, JS de animação, Storybook, etc.

   A fonte da verdade das cores da UI continua sendo o CSS (variáveis oklch).
   Aqui as cores da UI aparecem como referência (oklchString) + aproximação hex.
   A paleta do <canvas> é literal (é assim que está no código de origem).
   ============================================================================= */

/** Cores semânticas da UI — tema claro. Strings oklch = fonte canônica. */
export const lightTheme = {
  radius: "0.5rem",

  background: "oklch(1 0 0)",
  foreground: "oklch(0.19 0.018 260)",
  surface: "oklch(0.975 0.004 250)",
  card: "oklch(1 0 0)",
  cardForeground: "oklch(0.19 0.018 260)",
  popover: "oklch(1 0 0)",
  popoverForeground: "oklch(0.19 0.018 260)",

  navy: "oklch(0.288 0.079 265)",
  navyForeground: "oklch(1 0 0)",
  abyss: "oklch(0.205 0.03 264)", // = #101725
  fxBg: "oklch(0.965 0.008 245)",

  primary: "oklch(0.55 0.13 250)",
  primaryHover: "oklch(0.48 0.13 250)",
  primaryForeground: "oklch(1 0 0)",

  secondary: "oklch(0.972 0.004 250)",
  secondaryForeground: "oklch(0.288 0.079 265)",
  muted: "oklch(0.968 0.007 247.896)",
  mutedForeground: "oklch(0.47 0.03 257)",
  accent: "oklch(0.962 0.02 250)",
  accentForeground: "oklch(0.288 0.079 265)",

  destructive: "oklch(0.577 0.245 27.325)",
  destructiveForeground: "oklch(0.984 0.003 247.858)",

  border: "oklch(0.916 0.013 255.508)",
  input: "oklch(0.916 0.013 255.508)",
  ring: "oklch(0.55 0.13 250)",

  chart1: "oklch(0.646 0.222 41.116)",
  chart2: "oklch(0.6 0.118 184.704)",
  chart3: "oklch(0.398 0.07 227.392)",
  chart4: "oklch(0.828 0.189 84.429)",
  chart5: "oklch(0.769 0.188 70.08)",
};

/** Cores semânticas da UI — tema escuro (classe .dark em <html>). */
export const darkTheme = {
  radius: "0.5rem",

  background: "oklch(0.17 0.028 265)",
  foreground: "oklch(0.96 0.005 250)",
  surface: "oklch(0.205 0.03 265)",
  card: "oklch(0.222 0.03 265)",
  cardForeground: "oklch(0.96 0.005 250)",
  popover: "oklch(0.222 0.03 265)",
  popoverForeground: "oklch(0.96 0.005 250)",

  navy: "oklch(0.2 0.032 265)",
  navyForeground: "oklch(0.98 0.003 247)",
  abyss: "oklch(0.205 0.03 264)", // = #101725
  fxBg: "oklch(0.205 0.03 264)", // = #101725

  primary: "oklch(0.7 0.12 245)",
  primaryHover: "oklch(0.76 0.12 245)",
  primaryForeground: "oklch(0.16 0.03 265)",

  secondary: "oklch(0.26 0.032 265)",
  secondaryForeground: "oklch(0.96 0.005 250)",
  muted: "oklch(0.26 0.032 265)",
  mutedForeground: "oklch(0.72 0.02 255)",
  accent: "oklch(0.26 0.035 255)",
  accentForeground: "oklch(0.96 0.005 250)",

  destructive: "oklch(0.704 0.191 22.216)",
  destructiveForeground: "oklch(0.984 0.003 247.858)",

  border: "oklch(1 0 0 / 12%)",
  input: "oklch(1 0 0 / 15%)",
  ring: "oklch(0.7 0.12 245)",

  chart1: "oklch(0.488 0.243 264.376)",
  chart2: "oklch(0.696 0.17 162.48)",
  chart3: "oklch(0.769 0.188 70.08)",
  chart4: "oklch(0.627 0.265 303.9)",
  chart5: "oklch(0.645 0.246 16.439)",
};

/**
 * Aproximações hex sRGB das cores-chave (para libs que não entendem oklch:
 * canvas 2D, alguns temas de chart, e-mail, export de imagem).
 * NÃO edite a UI a partir daqui — ajuste o oklch e reconverta.
 */
export const hexApprox = {
  light: {
    background: "#ffffff",
    foreground: "#262a36",
    surface: "#f7f8fa",
    border: "#e3e6eb",
    mutedForeground: "#6b7280",
    primary: "#3d6fb4",
    primaryHover: "#345f9c",
    navy: "#1f2b57",
    fxBg: "#eef2f8",
  },
  dark: {
    background: "#141824",
    foreground: "#f2f3f5",
    surface: "#1c2130",
    card: "#20263a",
    primary: "#5aa0e0",
    navy: "#161b28",
    fxBg: "#101725",
  },
  abyss: "#101725",
};

/**
 * Paleta LITERAL dos efeitos em <canvas> (tech-effects.tsx / preloader.tsx).
 * Estes são os valores exatos usados no código de origem.
 */
export const canvasPalette = {
  cyan: "rgb(41, 171, 226)",   // #29ABE2 — traço/partícula "viva", pulsos
  blue: "rgb(92, 140, 225)",   // #5C8CE1 — traço secundário
  spark: "rgb(212, 238, 255)", // #D4EEFF — brilho de nó / centelha
  navyBg: "#101725",           // fundo dos canvases no escuro (= abyss)
  lightBg: "#eef2f8",          // fundo fallback no claro
  // strings rgba() cruas mais usadas nos efeitos:
  darkTrail: "rgba(16,23,37,0.42)", // "rastro" do FilamentFlow (dark)
  sphereTrail: "rgba(16,23,37,0.3)", // "rastro" da ConnectionSphere (dark)
};

/** Tipografia. */
export const typography = {
  fontDisplay: 'Archivo, ui-sans-serif, system-ui, sans-serif',
  fontSans: '"IBM Plex Sans", ui-sans-serif, system-ui, sans-serif',
  displayWeights: [500, 600, 700, 800, 900],
  sansWeights: [400, 500, 600],
  headingLetterSpacing: "-0.02em",
  headingTextWrap: "balance", // só h1, h2
  googleFontsHref:
    "https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,500;0,600;0,700;0,800;0,900;1,700&family=IBM+Plex+Sans:wght@400;500;600&display=swap",
  // escala fluida usada nos títulos principais
  scale: {
    h1Hero: "clamp(2.25rem, 5vw, 3.5rem)",   // line-height 1.1
    h2Section: "clamp(1.875rem, ~4vw, 2.25rem)", // text-3xl -> sm:text-4xl
    statNumber: "clamp(2.25rem, 4vw, 3rem)",
    preloaderWord: "clamp(1.25rem, 4vw, 1.7rem)",
    marqueeItem: "clamp(1rem, 2vw, 1.4rem)",
    eyebrow: "0.75rem", // uppercase, letter-spacing 0.09em, weight 700
  },
};

/** Raio / borda. */
export const radii = {
  base: "0.5rem",
  sm: "calc(0.5rem - 4px)",
  md: "calc(0.5rem - 2px)",
  lg: "0.5rem",
  xl: "calc(0.5rem + 4px)",
  "2xl": "calc(0.5rem + 8px)",
  "3xl": "calc(0.5rem + 12px)",
  "4xl": "calc(0.5rem + 16px)",
};

/** Movimento — durações, easings e delays de stagger (ms/s literais do CSS). */
export const motion = {
  easeStandard: "ease",
  easeEmphasized: "cubic-bezier(0.16, 1, 0.3, 1)", // preloader logo reveal
  durations: {
    fast: "0.18s",   // btn-hero-pill, btn-solid, comp-item, link-underline chip
    base: "0.2s",    // bezel-outer, card-lift
    chip: "0.22s",   // comp-chip, entrega-icon
    reveal: "0.5s",  // .reveal, hero-stagger, eyebrow::after, timeline::before (0.45s)
    preloaderExit: "0.5s",
  },
  // scroll reveal: translateY(12px) -> 0, opacity 0 -> 1
  reveal: { distance: "12px", duration: "0.5s", easing: "ease" },
  revealStagger: ["0ms", "70ms", "140ms", "210ms", "280ms", "350ms"],
  heroStagger: ["0ms", "70ms", "140ms", "220ms", "300ms"],
  cardGridStagger: "60ms per index",   // "O que você recebe", stats
  timelineStagger: "80ms per index",   // "Como é a aplicação"
  marqueeDuration: "44s linear infinite",
  statCountUp: { duration: 1300, easing: "1 - (1 - p)^4 (easeOutQuart)", threshold: 0.6 },
};

/** Breakpoints efetivamente usados (Tailwind default + checagens JS de mobile). */
export const breakpoints = {
  sm: 640,   // px — corte principal (layout header, grid, canvas density)
  mobileCanvas: 640, // tech-effects/preloader trocam densidade abaixo disto
  headerEdgeCollapse: 639, // max-width:639px -> header sempre nos cantos
};

export default { lightTheme, darkTheme, hexApprox, canvasPalette, typography, radii, motion, breakpoints };
