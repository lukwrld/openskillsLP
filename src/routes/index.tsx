import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  CalendarClock,
  Info,
  LineChart,
  Mic,
  Target,
  Users,
  Zap,
} from "lucide-react";

import { ThemeToggle } from "@/components/serie/ThemeToggle";
import { CookieSettingsButton } from "@/components/privacy/CookieConsent";
import { ScrollDrivenVideo } from "@/components/serie/ScrollDrivenVideo";
import { ProgramacaoCarousel } from "@/components/serie/ProgramacaoCarousel";
import {
  useCompetenciasStage,
  useHeaderScrollState,
  useRevealOnScroll,
} from "@/hooks/use-serie-anim";
import { blocos, competencias } from "@/data/programacao";

const CTA_HREF = "#interesse";
const CTA_LABEL = "Quero participar";
const LOGO_SRC = "/logo_100os_transparent.png";
const CONTAINER = "mx-auto w-full max-w-5xl px-4 sm:px-6";
const LEITURA = "mx-auto w-full max-w-[680px]";
const blocoIcons = [Target, Zap, Users, LineChart];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Diagnóstico de Competências Empreendedoras | 100 Open Startups" },
      {
        name: "description",
        content:
          "Experiência presencial de desenvolvimento e Diagnóstico de Competências Empreendedoras da 100 Open Startups.",
      },
    ],
  }),
  component: Index,
});

function CtaButton({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = { sm: "px-4 py-2 text-sm", md: "px-5 py-2.5 text-sm", lg: "px-7 py-3.5 text-base" };
  return (
    <a
      href={CTA_HREF}
      aria-label={CTA_LABEL}
      className={`${size === "lg" ? "btn-hero-pill" : "btn-solid"} inline-flex items-center justify-center gap-2 bg-primary font-display font-bold text-primary-foreground ${sizes[size]} ${className}`}
    >
      {CTA_LABEL}
      <ArrowRight className="size-4" aria-hidden="true" />
    </a>
  );
}

const beneficios = [
  {
    Icone: LineChart,
    titulo: "Diagnóstico de Competências Empreendedoras",
    texto: "Uma avaliação estruturada das competências utilizadas para transformar ideias em ação.",
  },
  {
    Icone: Award,
    titulo: "Laudo de Competências",
    texto: "Um resultado individual que ajuda você a entender seus pontos fortes e oportunidades de desenvolvimento.",
  },
  {
    Icone: Mic,
    titulo: "Workshop presencial",
    texto:
      "Conteúdo baseado em experiências e casos reais de founders, executivos e empresas do ecossistema 100 Open Startups.",
  },
];
const faq = [
  {
    p: "O que é o Diagnóstico de Competências Empreendedoras?",
    r: "É uma avaliação estruturada das competências empreendedoras utilizadas para transformar ideias em ação, aplicada presencialmente durante a experiência.",
  },
  {
    p: "Como funciona a experiência?",
    r: "Você participa de um workshop presencial baseado em casos reais, realiza o exame e recebe um Laudo com uma visão estruturada das suas competências.",
  },
  {
    p: "A experiência é presencial?",
    r: "Sim. O workshop, a aplicação do Diagnóstico e a experiência atual acontecem 100% presencialmente.",
  },
  {
    p: "Quando serão as próximas experiências?",
    r: "A programação está em confirmação. As datas disponíveis serão divulgadas nesta página.",
  },
  {
    p: "O que recebo ao final?",
    r: "Você recebe seu Laudo de Competências, com uma visão dos seus pontos fortes e das oportunidades de desenvolvimento.",
  },
  {
    p: "Preciso ter uma startup para participar?",
    r: "Não. A experiência é para pessoas interessadas em desenvolver competências empreendedoras, mesmo sem experiência prévia ou um negócio próprio.",
  },
  {
    p: "Como faço para participar?",
    r: "Escolha uma das datas disponíveis quando a programação for publicada e manifeste seu interesse nesta página.",
  },
];
const etapasExperiencia = [
  {
    titulo: "Escolha uma experiência",
    texto: "Selecione uma das datas disponíveis de workshop presencial.",
  },
  {
    titulo: "Participe do encontro",
    texto:
      "Encontre founders, executivos e especialistas em uma experiência baseada em casos reais de empreendedorismo.",
  },
  {
    titulo: "Faça o Exame",
    texto:
      "Durante o encontro, realize a aplicação presencial do Diagnóstico de Competências Empreendedoras.",
  },
  {
    titulo: "Receba seu Laudo",
    texto:
      "Tenha uma visão estruturada das suas competências e dos principais pontos para desenvolver.",
  },
  {
    titulo: "Convide outras pessoas",
    texto:
      "Depois da experiência, você poderá indicar colegas para participarem das próximas edições.",
  },
];

function CompetenciasMarquee() {
  const nomes = competencias.map((competencia) => competencia.nome);
  return (
    <div className="marquee -mx-4 mt-12 sm:-mx-6" aria-hidden="true">
      <div className="marquee__track">
        {[...nomes, ...nomes].map((nome, indice) => (
          <span key={`${nome}-${indice}`} className="marquee__item">
            {nome}
            <span className="marquee__sep">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Index() {
  useRevealOnScroll();
  useHeaderScrollState();
  useCompetenciasStage();
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <a href="#conteudo" className="skip-link">
        Ir para o conteúdo principal
      </a>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-gradient-to-b from-accent via-accent/40 to-transparent"
      />
      <header className="site-header sticky top-0 z-40 h-16 border-b border-border">
        <div className="flex h-full w-full items-center justify-between gap-3 px-5 sm:px-8 lg:px-12">
          <span className="hdr-spacer hdr-spacer--edge hidden sm:block" aria-hidden="true" />
          <img
            src={LOGO_SRC}
            alt="100 Open Startups"
            className="size-8 shrink-0"
            width={32}
            height={32}
          />
          <span className="hdr-spacer hdr-spacer--mid" aria-hidden="true" />
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <CtaButton size="sm" />
          </div>
          <span className="hdr-spacer hdr-spacer--edge hidden sm:block" aria-hidden="true" />
        </div>
      </header>
      <main id="conteudo" className="relative">
        <section className="hero-with-video relative overflow-hidden bg-fx-bg">
          <ScrollDrivenVideo />
          <div
            className="hero-video-overlay pointer-events-none absolute inset-0 z-[1]"
            aria-hidden="true"
          />
          <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative z-10 mx-auto flex min-h-[32rem] w-full max-w-[1440px] items-center px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
            <div className="max-w-xl text-left">
              <h1 className="hero-stagger hero-stagger-3 text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-[1.1]">
                Workshop de Competências Empreendedoras
              </h1>
              <p className="hero-description hero-stagger hero-stagger-4 mt-6 text-base leading-relaxed sm:text-lg">
                Participe de uma experiência presencial que combina conteúdo, aplicação prática e o
                Diagnóstico de Competências Empreendedoras. Ao final, você recebe um Laudo com uma
                visão estruturada das suas competências.
              </p>
              <div className="hero-stagger hero-stagger-5 mt-9 flex justify-start">
                <CtaButton size="lg" />
              </div>
              <p className="mt-5 flex items-center justify-start gap-2 text-sm text-muted-foreground">
                <CalendarClock className="size-4 text-primary" />
                Programação em confirmação
              </p>
            </div>
          </div>
        </section>
        <section className="border-y border-border bg-surface">
          <div data-anim className={`reveal ${CONTAINER} py-20 text-center sm:py-24`}>
            <h2 className="h2-line font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Uma experiência presencial
            </h2>
            <div
              className={`${LEITURA} mt-6 space-y-5 text-base leading-relaxed text-muted-foreground`}
            >
              <p>
                Uma experiência presencial para desenvolver e diagnosticar competências essenciais
                para quem quer criar, decidir, comunicar, liderar e executar melhor.
              </p>
              <p>
                O workshop conecta competências empreendedoras a casos reais vividos por founders,
                executivos e empresas do ecossistema 100 Open Startups.
              </p>
              <p>
                Além do conteúdo e da aplicação prática, você realiza presencialmente o Diagnóstico
                de Competências Empreendedoras.
              </p>
              <p>
                Ao final, recebe um Laudo com uma visão estruturada dos seus pontos fortes e das
                oportunidades de desenvolvimento.
              </p>
            </div>
          </div>
        </section>
        <section data-anim className={`reveal ${CONTAINER} py-16 text-center sm:py-20`}>
          <h2 className="h2-line font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Para quem é
          </h2>
          <p className={`${LEITURA} mt-6 text-base leading-relaxed text-muted-foreground`}>
            Para universitários de qualquer curso que querem desenvolver competências úteis para
            empreender, trabalhar em projetos, liderar equipes e tomar melhores decisões. Você não
            precisa ter uma startup ou experiência prévia com empreendedorismo. A Série é para quem
            está começando a graduação, entrando no mercado de trabalho ou buscando experiências
            práticas além da sala de aula.
          </p>
        </section>
        <section className="border-y border-border bg-surface">
          <div data-anim className={`reveal ${CONTAINER} py-16 text-center sm:py-20`}>
            <h2 className="h2-line font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Como funciona
            </h2>
            <div className="mx-auto mt-6 grid w-full max-w-6xl gap-3 text-left sm:grid-cols-2 lg:grid-cols-5">
              {etapasExperiencia.map(({ titulo, texto }, index) => (
                <article key={titulo} className="card-lift p-4">
                  <span className="flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                  <h3 className="mt-3 font-display text-[0.9375rem] font-semibold leading-snug">{titulo}</h3>
                  <p className="mt-1.5 text-sm leading-snug text-muted-foreground">{texto}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section data-anim className={`reveal ${CONTAINER} py-20 text-center sm:py-24`}>
          <h2 className="h2-line font-display text-2xl font-bold tracking-tight sm:text-3xl">
            O que você recebe
          </h2>
          <div className="mx-auto mt-8 grid max-w-4xl gap-5 sm:grid-cols-3">
            {beneficios.map(({ Icone, titulo, texto }, indice) => (
              <article
                key={titulo}
                className="card-lift p-6 text-center"
                style={{ transitionDelay: `${indice * 60}ms` }}
              >
                <span className="entrega-icon mx-auto flex size-10 items-center justify-center rounded-xl bg-accent text-primary">
                  <Icone className="size-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{texto}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="border-y border-border bg-surface">
          <div className={`${CONTAINER} py-16 sm:py-20`}>
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              As 16 competências
            </h2>
            <div className="competencias-stage">
              <span
                aria-hidden="true"
                data-competency-trigger="2"
                className="competencias-trigger trigger-one"
              />
              <span
                aria-hidden="true"
                data-competency-trigger="4"
                className="competencias-trigger trigger-two"
              />
              <div className="competencias-sticky mt-8 grid gap-5 text-left sm:grid-cols-2">
                {blocos.map((bloco, indice) => {
                  const Icon = blocoIcons[indice] ?? Target;
                  const itens = competencias.filter(
                    (competencia) => competencia.bloco === bloco.id,
                  );
                  return (
                    <article
                      key={bloco.id}
                      data-anim
                      data-competency-card
                      className="bezel-outer competency-card reveal"
                    >
                      <div className="bezel-inner">
                        <div className="flex items-center gap-3">
                          <span className="comp-chip flex size-9 items-center justify-center rounded-md bg-accent text-primary">
                            <Icon className="size-4" />
                          </span>
                          <h3 className="text-xs font-bold uppercase tracking-[0.09em] text-primary">
                            Bloco {indice + 1} — {bloco.titulo}
                          </h3>
                        </div>
                        <p className="mt-4 text-lg font-bold text-foreground">{bloco.subtitulo}</p>
                        <ol className="mt-4 space-y-2.5">
                          {itens.map((competencia) => (
                            <li
                              key={competencia.id}
                              className="comp-item flex items-center gap-3 text-sm text-muted-foreground"
                              style={{ transitionDelay: `${(competencia.id % 4) * 55}ms` }}
                            >
                              <span aria-hidden="true" className="comp-num flex size-6 shrink-0 items-center justify-center rounded-full border border-border text-xs font-semibold text-foreground">
                                {competencia.id}
                              </span>
                              {competencia.nome}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
            <CompetenciasMarquee />
          </div>
        </section>
        <section id="programacao" className={`${CONTAINER} py-20 text-center sm:py-24`}>
          <h2 className="h2-line font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Programação
          </h2>
          <div
            className={`${LEITURA} mt-6 flex items-start gap-3 rounded-[var(--radius-surface)] border border-primary/25 bg-accent/60 p-4 text-left text-sm leading-relaxed text-foreground`}
          >
            <Info className="mt-0.5 size-4 shrink-0 text-primary" />
            <p>
              <strong className="font-semibold">Programação em confirmação.</strong> As próximas
              experiências serão divulgadas conforme forem confirmadas.
            </p>
          </div>
          <ProgramacaoCarousel competencias={competencias} blocos={blocos} />
        </section>
        <section id="interesse" className="relative bg-navy text-navy-foreground">
          <div className={`${CONTAINER} relative py-20 text-center`}>
            <h2 className="editorial-heading font-display text-2xl font-bold tracking-tight sm:text-4xl">
              Escolha sua próxima experiência
            </h2>
            <p className={`${LEITURA} mt-4 text-base text-navy-foreground/70`}>
              Selecione uma das próximas datas disponíveis para participar presencialmente do
              workshop e realizar seu Diagnóstico de Competências Empreendedoras.
            </p>
            <div className="mx-auto mt-8 max-w-xl rounded-[var(--radius-surface)] border border-navy-foreground/20 bg-navy-foreground/5 p-6 text-left sm:p-8">
              <div className="flex items-start gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-navy-foreground/10 text-navy-foreground">
                  <CalendarClock className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold">Novas datas em confirmação</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-foreground/70">
                    Em breve divulgaremos os próximos workshops presenciais.
                  </p>
                  <p className="mt-5 text-sm leading-relaxed text-navy-foreground/70">
                    <strong className="font-semibold text-navy-foreground">Formato:</strong> 100%
                    presencial
                    <br />
                    <strong className="font-semibold text-navy-foreground">Local:</strong> Inovabra
                    Habitat — São Paulo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section data-anim className={`reveal ${CONTAINER} py-20 text-center sm:py-24`}>
          <h2 className="h2-line font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Experiência 100% presencial
          </h2>
          <ol className={`${LEITURA} mt-8 space-y-5 text-left`}>
            {etapasExperiencia.map(({ titulo, texto }, i) => (
              <li
                key={i}
                data-anim
                className="timeline-step reveal flex gap-4"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <p className="pt-1.5 text-base leading-relaxed text-muted-foreground">
                  <strong className="font-semibold text-foreground">{titulo}</strong> — {texto}
                </p>
              </li>
            ))}
          </ol>
          <p className={`${LEITURA} mt-8 text-base leading-relaxed text-muted-foreground`}>
            Do workshop à entrega do Laudo, toda a experiência acontece presencialmente.
          </p>
        </section>
        <section className="border-y border-border bg-surface">
          <div data-anim className={`reveal ${CONTAINER} py-16 text-center sm:py-20`}>
            <h2 className="h2-line font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Perguntas frequentes
            </h2>
            <div className={`${LEITURA} mt-8 space-y-3 text-left`}>
              {faq.map((item) => (
                <details key={item.p} className="card-lift group p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                    {item.p}
                    <ArrowRight className="size-4 shrink-0 text-primary transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.r}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="relative border-t border-navy-foreground/15 bg-navy text-navy-foreground">
        <div className={`${CONTAINER} py-12 text-center`}>
          <div className="flex items-center justify-center gap-2.5">
            <img src={LOGO_SRC} alt="100 Open Startups" className="size-7" width={28} height={28} />
            <span className="font-display text-sm font-semibold">100 Open Startups</span>
          </div>
          <p className={`${LEITURA} mt-6 text-xs leading-relaxed text-navy-foreground/65`}>
            Ao se inscrever, você concorda com nossos{" "}
            <a href="/termos" className="link-underline">
              Termos de Uso
            </a>{" "}
            e{" "}
            <a href="/privacidade" className="link-underline">
              Política de Privacidade
            </a>
            . Seus dados são tratados conforme a LGPD.
          </p>
          <div className="mt-4 flex justify-center gap-4 text-xs text-navy-foreground/65">
            <a href="/termos" className="link-underline">
              Termos de Uso
            </a>
            <a href="/privacidade" className="link-underline">
              Política de Privacidade
            </a>
            <CookieSettingsButton className="link-underline cursor-pointer" />
          </div>
          <p className="mt-4 text-xs text-navy-foreground/65">
            © 2026 100 Open Startups. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
