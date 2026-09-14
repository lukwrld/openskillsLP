import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  CalendarClock,
  Info,
  Lightbulb,
  LineChart,
  MapPin,
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
const CTA_LABEL = "Quero acompanhar a Série";
const LOGO_SRC = "/logo_100os_transparent.png";
const CONTAINER = "mx-auto w-full max-w-5xl px-4 sm:px-6";
const LEITURA = "mx-auto w-full max-w-[680px]";
const blocoIcons = [Target, Zap, Users, LineChart];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Série de Competências Empreendedoras | 100 Open Startups" },
      {
        name: "description",
        content:
          "Série de palestras presenciais para desenvolver competências empreendedoras com founders e executivos, a partir de casos reais do Congresso da 100 Open Startups.",
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
    Icone: Lightbulb,
    titulo: "Aprendizado baseado em casos reais",
    texto: "Experiências concretas de quem precisou tomar decisões e executar na prática.",
  },
  {
    Icone: Mic,
    titulo: "Contato com founders e executivos",
    texto: "Acesso direto a profissionais que construíram, lideraram e enfrentaram desafios reais.",
  },
  {
    Icone: Users,
    titulo: "Aplicação prática",
    texto:
      "Discussões e exercícios que conectam cada competência a situações que você pode enfrentar em projetos, no trabalho ou ao empreender.",
  },
  {
    Icone: Award,
    titulo: "Caminho para o certificado de 32 horas",
    texto:
      "Ao completar as 16 competências do curso introdutório, você recebe um certificado de conclusão de 32 horas. O certificado reconhece sua participação e conhecimento do mapa de competências empreendedoras.",
  },
];
const faq = [
  {
    p: "O que é a Série de Competências Empreendedoras?",
    r: "É uma série de palestras presenciais voltada ao desenvolvimento de competências empreendedoras por meio de casos reais, experiências de founders e executivos e atividades práticas.",
  },
  {
    p: "Como funciona cada encontro?",
    r: "Cada sessão dura aproximadamente 2 horas e combina apresentação de um caso real, decisões e aprendizados do convidado, discussão com a turma e aplicação prática da competência abordada.",
  },
  {
    p: "Onde acontecem as palestras?",
    r: "O piloto da Série acontece no Inovabra Habitat, em São Paulo. Novos locais e instituições parceiras poderão fazer parte das próximas edições.",
  },
  {
    p: "Quando começam as palestras?",
    r: "A programação está sendo confirmada. As primeiras datas serão publicadas nesta página assim que estiverem disponíveis.",
  },
  {
    p: "Quem são os convidados?",
    r: "Founders, executivos e profissionais ligados a casos reais apresentados no Congresso da 100 Open Startups. Os convidados de cada encontro serão divulgados junto à programação.",
  },
  {
    p: "Preciso ter uma startup para participar?",
    r: "Não. A Série foi pensada para universitários e pessoas interessadas em desenvolver competências empreendedoras, mesmo sem experiência prévia ou um negócio próprio.",
  },
  {
    p: "Como faço para me inscrever?",
    r: "Cada palestra terá sua própria inscrição assim que a programação for publicada. Enquanto isso, você pode demonstrar interesse para acompanhar as próximas sessões.",
  },
];
const comoParticipar = [
  {
    titulo: "Acompanhe a programação",
    texto: "As palestras serão divulgadas conforme datas, temas e convidados forem confirmados.",
  },
  {
    titulo: "Escolha sua sessão",
    texto:
      "Cada encontro aborda uma competência empreendedora a partir de um caso real apresentado por um founder ou executivo.",
  },
  {
    titulo: "Faça sua inscrição",
    texto:
      "Quando uma sessão estiver disponível, você poderá se inscrever diretamente pela página.",
  },
  {
    titulo: "Participe presencialmente",
    texto:
      "Os encontros têm duração aproximada de 2 horas. O piloto acontece no Inovabra Habitat, em São Paulo.",
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
                <span className="sm:block">Palestras sobre </span>
                <span className="sm:block">
                  <span className="hero-highlight">Empreendedorismo</span> na Prática
                </span>
              </h1>
              <p className="hero-description hero-stagger hero-stagger-4 mt-6 text-base leading-relaxed sm:text-lg">
                Desenvolva competências empreendedoras com founders e executivos, a partir de casos
                reais, decisões e aprendizados vividos no mercado.
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
              O que é a Série
            </h2>
            <div
              className={`${LEITURA} mt-6 space-y-5 text-base leading-relaxed text-muted-foreground`}
            >
              <p>
                A Série de Competências Empreendedoras é um ciclo de encontros presenciais para
                desenvolver competências essenciais para quem quer criar, decidir, comunicar,
                liderar e executar melhor.
              </p>
              <p>
                Cada encontro tem duração de aproximadamente 2 horas e conecta uma competência
                empreendedora a um caso real vivido por founders, executivos e empresas.
              </p>
              <p>
                Mais do que ouvir uma história, você entende o contexto, as decisões tomadas, os
                erros, os aprendizados e como aplicar aquela competência na prática.
              </p>
              <p>
                O piloto acontece no Inovabra Habitat, em São Paulo, com previsão de expansão para
                instituições parceiras.
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
              Como funciona cada encontro
            </h2>
            <div className={`${LEITURA} mt-6 grid gap-4 text-left sm:grid-cols-4`}>
              {[
                ["Caso real", "Entenda o contexto, o desafio e o que estava em jogo."],
                ["Decisões", "Conheça as escolhas, os erros e os trade-offs enfrentados."],
                [
                  "Discussão",
                  "Converse diretamente com quem viveu o caso e participe das perguntas com a turma.",
                ],
                [
                  "Aplicação",
                  "Transforme o aprendizado em um exercício prático para levar com você.",
                ],
              ].map(([titulo, texto], index) => (
                <article key={titulo} className="card-lift p-5">
                  <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 font-display font-semibold">{titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{texto}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section data-anim className={`reveal ${CONTAINER} py-20 text-center sm:py-24`}>
          <h2 className="h2-line font-display text-2xl font-bold tracking-tight sm:text-3xl">
            O que você ganha
          </h2>
          <div className="mx-auto mt-8 grid max-w-4xl gap-5 sm:grid-cols-2">
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
                              <span
                                aria-hidden="true"
                                className="comp-num flex size-6 shrink-0 items-center justify-center rounded-full border border-border text-xs font-semibold text-foreground"
                              >
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
              <strong className="font-semibold">Programação em confirmação.</strong> As palestras
              serão divulgadas conforme datas, temas e convidados forem confirmados.
            </p>
          </div>
          <ProgramacaoCarousel competencias={competencias} blocos={blocos} />
        </section>
        <section data-anim className={`reveal ${CONTAINER} py-20 text-center sm:py-24`}>
          <h2 className="h2-line font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Como participar
          </h2>
          <ol className={`${LEITURA} mt-8 space-y-5 text-left`}>
            {comoParticipar.map(({ titulo, texto }, i) => (
              <li
                key={i}
                data-anim
                className="timeline-step reveal flex gap-4"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span
                  aria-hidden="true"
                  className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground"
                >
                  {i + 1}
                </span>
                <p className="pt-1.5 text-base leading-relaxed text-muted-foreground">
                  <strong className="font-semibold text-foreground">{titulo}</strong> — {texto}
                </p>
              </li>
            ))}
          </ol>
          <p className={`${LEITURA} mt-8 text-base leading-relaxed text-muted-foreground`}>
            <strong className="font-semibold text-foreground">
              Ainda não há uma sessão aberta?
            </strong>{" "}
            Demonstre seu interesse para receber as próximas novidades da Série.
          </p>
          <p className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4 text-primary" />
            Piloto no Inovabra Habitat, em São Paulo.
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
        <section id="interesse" className="relative bg-navy text-navy-foreground">
          <div className={`${CONTAINER} relative py-20 text-center`}>
            <h2 className="editorial-heading font-display text-2xl font-bold tracking-tight sm:text-4xl">
              Acompanhe a Série de perto
            </h2>
            <p className={`${LEITURA} mt-4 text-base text-navy-foreground/70`}>
              Receba as próximas datas, convidados e informações sobre as palestras da Série de
              Competências Empreendedoras.
            </p>
            <div className="mt-8 flex justify-center">
              <CtaButton size="lg" />
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
