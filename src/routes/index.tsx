import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Award,
  CalendarClock,
  CheckCircle2,
  Info,
  Lightbulb,
  MapPin,
  Mic,
  Users,
} from "lucide-react";

import logo from "@/assets/100openstartups-logo.png.asset.json";
import { ThemeToggle } from "@/components/serie/ThemeToggle";
import {
  useHeaderTransparency,
  useRevealOnScroll,
} from "@/hooks/use-serie-anim";
import { blocos, competencias, estaConfirmada } from "@/data/programacao";

/**
 * ⚠️ PENDENTE ANTES DA PUBLICAÇÃO ⚠️
 * Destino de TODOS os botões de CTA desta página.
 * Defina aqui a URL real (página de interesse / formulário oficial) antes de publicar.
 * NÃO reutilizar links de formulários de outros produtos.
 */
const CTA_HREF = "URL_A_DEFINIR";
const CTA_LABEL = "Quero acompanhar a Série";

/** Largura máxima única de container, usada em TODAS as seções. */
const CONTAINER = "mx-auto w-full max-w-5xl px-4 sm:px-6";
/** Largura máxima confortável de leitura para texto corrido, listas e FAQ. */
const LEITURA = "mx-auto w-full max-w-[680px]";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Série de Competências Empreendedoras | 100 Open Startups" },
      {
        name: "description",
        content:
          "Ciclo de palestras presenciais com founders e executivos sobre as 16 competências empreendedoras, a partir de casos reais do Congresso da 100 Open Startups.",
      },
      {
        property: "og:title",
        content: "Série de Competências Empreendedoras | 100 Open Startups",
      },
      {
        property: "og:description",
        content:
          "Palestras presenciais de 2 horas com quem viveu o caso na prática. Programação em confirmação.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
  };
  return (
    <a
      href={CTA_HREF}
      className={`cta-glow inline-flex items-center justify-center gap-2 rounded-full bg-primary font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 ${sizes[size]} ${className}`}
    >
      {CTA_LABEL}
      <ArrowRight className="size-4" aria-hidden="true" />
    </a>
  );
}

const beneficios = [
  {
    Icone: Lightbulb,
    titulo: "Aprendizado com casos reais",
    texto:
      "Cada sessão parte de uma experiência real, não de teoria genérica.",
  },
  {
    Icone: Mic,
    titulo: "Contato direto com founders e executivos",
    texto: "Acesso a quem viveu o caso na prática.",
  },
  {
    Icone: Users,
    titulo: "Aplicação prática em sala",
    texto:
      "Discussão e exercício aplicado com a turma, não é só palco.",
  },
  {
    Icone: Award,
    titulo: "Caminho para o certificado de 32h",
    texto:
      "Participar das 16 competências do curso introdutório completo dá direito ao certificado de conclusão — ele atesta percurso e conhecimento do mapa de competências, não proficiência.",
  },
];

const faq = [
  {
    p: "O que é a Série de Competências Empreendedoras?",
    r: "Um ciclo de palestras presenciais, cada uma conduzida por um founder ou executivo sobre uma competência empreendedora específica, com base em casos reais do Congresso da 100 Open Startups.",
  },
  {
    p: "Como funciona cada sessão?",
    r: "Sessões de 2 horas, presenciais, com história e caso real, aplicação prática e discussão com a turma.",
  },
  {
    p: "Onde acontece?",
    r: "O piloto acontece no Inovabra Habitat, com expansão futura para outras instituições parceiras.",
  },
  {
    p: "Quando começam as palestras?",
    r: "A programação está em fechamento. Assim que as primeiras datas forem confirmadas, elas aparecem nesta página.",
  },
  {
    p: "Quem são os convidados?",
    r: "Founders e executivos ligados aos casos apresentados no Congresso da 100 Open Startups, ao lado de uma corporação parceira por competência. As confirmações estão sendo fechadas.",
  },
  {
    p: "Como faço para me inscrever em uma sessão?",
    r: "Assim que a programação completa estiver publicada, cada sessão terá inscrição própria. Por enquanto, use o botão principal para acompanhar novidades.",
  },
];

const comoParticipar = [
  "Participação presencial, em sessões de 2 horas. O piloto acontece no Inovabra Habitat.",
  "Um convidado — founder ou executivo — por competência, ligado a um caso do Congresso da 100 Open Startups.",
  "A inscrição por sessão específica abre conforme a programação for publicada.",
  "Por enquanto, você pode demonstrar interesse geral pelo botão principal e acompanhar as novidades.",
];

function Index() {
  const [blocoAtivo, setBlocoAtivo] = useState<string>(blocos[0]!.id);
  const lista = competencias.filter((c) => c.bloco === blocoAtivo);
  const bloco = blocos.find((b) => b.id === blocoAtivo)!;
  useRevealOnScroll();
  useHeaderTransparency();

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* DEGRADÊ SUAVE ATRÁS DO HEADER + HERO */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-gradient-to-b from-accent via-accent/40 to-transparent"
      />

      {/* HEADER */}
      <header className="glass-header sticky top-0 z-50">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <img
              src={logo.url}
              alt="100 Open Startups"
              className="size-8 shrink-0"
              width={32}
              height={32}
            />
            <span className="font-display text-sm font-semibold leading-tight sm:text-base">
              100 Open Startups
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <CtaButton size="sm" className="hidden sm:inline-flex" />
          </div>
        </div>
      </header>

      <main className="relative">
        {/* HERO */}
        <section className="relative">
          <div className={`${CONTAINER} py-16 text-center sm:py-24`}>
            {/* Logo grande com glow */}
            <div className="relative mx-auto mb-8 flex w-fit items-center justify-center">
              <span
                aria-hidden="true"
                className="logo-glow pointer-events-none absolute size-[19rem] rounded-full sm:size-[24rem]"
              />
              <img
                src={logo.url}
                alt="100 Open Startups"
                className="relative size-24 sm:size-32"
                width={128}
                height={128}
              />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              100 Open Startups
            </p>
            <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl">
              Série de Competências Empreendedoras
            </h1>
            <p
              className={`${LEITURA} mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg`}
            >
              Aprenda competências empreendedoras com quem já viveu isso na
              prática. Palestras presenciais com founders e executivos, direto
              dos casos reais do Congresso da 100 Open Startups.
            </p>
            <div className="mt-9 flex justify-center">
              <CtaButton size="lg" />
            </div>
            <p className="mt-5 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <CalendarClock className="size-4 text-primary" aria-hidden="true" />
              Programação em confirmação
            </p>
          </div>
        </section>

        {/* O QUE É A SÉRIE */}
        <section className="border-y border-border bg-surface">
          <div className={`${CONTAINER} py-16 text-center sm:py-20`}>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              O que é a Série
            </h2>
            <div
              className={`${LEITURA} mt-6 space-y-5 text-base leading-relaxed text-muted-foreground`}
            >
              <p>
                A Série de Competências Empreendedoras é um ciclo de palestras
                presenciais, de 2 horas cada, conduzidas por um founder ou
                executivo ao lado de uma corporação parceira, sobre uma
                competência empreendedora específica.
              </p>
              <p>
                Cada sessão parte de um caso real apresentado no Congresso da 100
                Open Startups, com aplicação prática e discussão com a turma —
                não é uma palestra motivacional genérica.
              </p>
              <p>
                O piloto acontece no Inovabra Habitat, com planos de expandir
                para outras instituições parceiras ao longo do tempo.
              </p>
            </div>
          </div>
        </section>

        {/* BENEFÍCIOS */}
        <section className={`${CONTAINER} py-16 text-center sm:py-20`}>
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            O que você ganha
          </h2>
          <div className="mx-auto mt-8 grid max-w-4xl gap-5 sm:grid-cols-2">
            {beneficios.map(({ Icone, titulo, texto }) => (
              <article
                key={titulo}
                className="card-hover rounded-2xl border border-border bg-card p-6 text-center shadow-sm"
              >
                <span className="mx-auto flex size-10 items-center justify-center rounded-xl bg-accent text-primary">
                  <Icone className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">
                  {titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {texto}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* 16 COMPETÊNCIAS E PROGRAMAÇÃO */}
        <section id="programacao" className="border-y border-border bg-surface">
          <div className={`${CONTAINER} py-16 text-center sm:py-20`}>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              As 16 competências e a programação
            </h2>
            <div
              className={`${LEITURA} mt-5 flex items-start gap-3 rounded-2xl border border-primary/25 bg-accent/60 p-4 text-left text-sm leading-relaxed text-foreground`}
            >
              <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <p>
                <strong className="font-semibold">
                  Programação em confirmação.
                </strong>{" "}
                Conforme os convidados forem fechados, esta seção será
                atualizada com nome, cargo, empresa, data, horário e formato de
                cada sessão.
              </p>
            </div>

            {/* Abas dos 4 blocos temáticos */}
            <div
              className="mt-8 flex flex-wrap justify-center gap-2"
              role="tablist"
              aria-label="Blocos temáticos"
            >
              {blocos.map((b, i) => {
                const ativo = b.id === blocoAtivo;
                return (
                  <button
                    key={b.id}
                    role="tab"
                    aria-selected={ativo}
                    onClick={() => setBlocoAtivo(b.id)}
                    className={`card-hover rounded-full border px-4 py-2 text-left text-sm font-semibold ${
                      ativo
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="opacity-70">Bloco {i + 1} — </span>
                    {b.titulo}
                  </button>
                );
              })}
            </div>

            <div className="card-hover mx-auto mt-6 max-w-4xl rounded-3xl border border-border bg-card p-6 text-left shadow-sm sm:p-8">
              <h3 className="text-center font-display text-xl font-bold">
                {bloco.titulo}
              </h3>
              <p className="mt-1 text-center text-sm text-muted-foreground">
                {bloco.subtitulo}
              </p>
              <ul className="mt-6 divide-y divide-border">
                {lista.map((c) => {
                  const confirmada = estaConfirmada(c);
                  return (
                    <li
                      key={c.id}
                      className="flex flex-col gap-1.5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-primary">
                          {c.id}
                        </span>
                        <div>
                          <p className="font-medium leading-snug">{c.nome}</p>
                          {c.descricao && (
                            <p className="mt-1 text-sm text-muted-foreground">
                              {c.descricao}
                            </p>
                          )}
                          {confirmada && (
                            <p className="mt-1 text-sm text-muted-foreground">
                              {[c.convidado, c.cargo, c.empresa]
                                .filter(Boolean)
                                .join(" · ")}
                            </p>
                          )}
                        </div>
                      </div>
                      <p className="shrink-0 pl-9 text-xs text-muted-foreground sm:pl-0 sm:text-right">
                        {confirmada ? (
                          <span className="inline-flex items-center gap-1.5 font-medium text-primary">
                            <CheckCircle2 className="size-3.5" aria-hidden="true" />
                            {[c.data, c.horario, c.formato]
                              .filter(Boolean)
                              .join(" · ")}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5">
                            <span
                              className="size-1.5 rounded-full bg-muted-foreground/60"
                              aria-hidden="true"
                            />
                            Convidado e data em confirmação
                          </span>
                        )}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        {/* COMO PARTICIPAR */}
        <section className={`${CONTAINER} py-16 text-center sm:py-20`}>
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Como participar
          </h2>
          <ol className={`${LEITURA} mt-8 space-y-5 text-left`}>
            {comoParticipar.map((texto, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <p className="pt-1.5 text-base leading-relaxed text-muted-foreground">
                  {texto}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4 text-primary" aria-hidden="true" />
            Piloto no Inovabra Habitat, em São Paulo.
          </p>
        </section>

        {/* FAQ */}
        <section className="border-y border-border bg-surface">
          <div className={`${CONTAINER} py-16 text-center sm:py-20`}>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Perguntas frequentes
            </h2>
            <div className={`${LEITURA} mt-8 space-y-3 text-left`}>
              {faq.map((item) => (
                <details
                  key={item.p}
                  className="card-hover group rounded-2xl border border-border bg-card p-5"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                    {item.p}
                    <ArrowRight
                      className="size-4 shrink-0 text-primary transition-transform group-open:rotate-90"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.r}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL — com transição suave para o rodapé */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-surface">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-72 max-w-2xl rounded-full bg-accent opacity-60 blur-3xl"
          />
          <div className={`${CONTAINER} relative py-20 text-center`}>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-4xl">
              Acompanhe a Série de perto
            </h2>
            <p className={`${LEITURA} mt-4 text-base text-muted-foreground`}>
              Demonstre seu interesse e receba as novidades assim que as
              primeiras sessões forem confirmadas.
            </p>
            <div className="mt-8 flex justify-center">
              <CtaButton size="lg" />
            </div>
          </div>
        </section>
      </main>

      {/* RODAPÉ */}
      <footer className="relative bg-surface">
        <div className={`${CONTAINER} py-12 text-center`}>
          <div className="flex items-center justify-center gap-2.5">
            <img
              src={logo.url}
              alt="100 Open Startups"
              className="size-7"
              width={28}
              height={28}
            />
            <span className="font-display text-sm font-semibold">
              100 Open Startups
            </span>
          </div>
          <p
            className={`${LEITURA} mt-6 text-xs leading-relaxed text-muted-foreground`}
          >
            Ao se inscrever, você concorda com nossos Termos de Uso e Política de
            Privacidade. Seus dados são tratados conforme a LGPD.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            © 2026 100 Open Startups. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
