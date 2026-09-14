import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import type { Bloco, Competencia } from "@/data/programacao";

type ProgramacaoCarouselProps = { competencias: Competencia[]; blocos: Bloco[] };

export function ProgramacaoCarousel({ competencias, blocos }: ProgramacaoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(Math.floor(competencias.length / 2));
  const [isVisible, setIsVisible] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const handleNext = useCallback(
    () => setCurrentIndex((index) => (index + 1) % competencias.length),
    [competencias.length],
  );
  const handlePrevious = useCallback(
    () => setCurrentIndex((index) => (index - 1 + competencias.length) % competencias.length),
    [competencias.length],
  );

  useEffect(() => {
    const element = carouselRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      threshold: 0.1,
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!isVisible) return;
    const timer = window.setInterval(handleNext, 4000);
    return () => window.clearInterval(timer);
  }, [handleNext, isVisible]);
  if (!competencias.length) return null;

  return (
    <div
      ref={carouselRef}
      className="relative mt-10 h-[25rem] sm:h-[30rem]"
      aria-roledescription="carrossel"
    >
      <div className="relative flex size-full items-center justify-center [perspective:1000px]">
        {competencias.map((competencia, index) => {
          const offset = index - currentIndex;
          let position = (offset + competencias.length) % competencias.length;
          if (position > Math.floor(competencias.length / 2)) position -= competencias.length;
          const isCurrent = position === 0;
          const isAdjacent = Math.abs(position) === 1;
          const bloco = blocos.find((item) => item.id === competencia.bloco);
          if (!isCurrent && !isAdjacent) return null;
          return (
            <article
              key={competencia.id}
              aria-hidden={!isCurrent}
              className="absolute h-96 w-64 overflow-hidden rounded-[var(--radius-surface)] border border-border bg-background text-left shadow-xl transition-all duration-500 ease-in-out sm:h-[28rem] sm:w-80"
              style={{
                transform: `translateX(${position * 45}%) scale(${isCurrent ? 1 : isAdjacent ? 0.85 : 0.7})`,
                zIndex: isCurrent ? 10 : isAdjacent ? 5 : 1,
                opacity: isCurrent ? 1 : isAdjacent ? 0.4 : 0,
                filter: isCurrent ? "blur(0px)" : "blur(4px)",
                visibility: Math.abs(position) > 1 ? "hidden" : "visible",
              }}
            >
              <img
                src="/menu-palestrantes.png"
                width={320}
                height={448}
                loading="lazy"
                decoding="async"
                alt="Palestrante em confirmação"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 pt-28">
                <p className="text-xs font-bold uppercase tracking-[0.09em] text-white/75">
                  {bloco?.titulo}
                </p>
                <h3 className="mt-2 font-display text-lg font-bold leading-tight text-white">
                  {competencia.nome}
                </h3>
                <p className="mt-2 text-sm text-white/75">Palestrante em confirmação</p>
                <p className="mt-1 text-xs leading-relaxed text-white/65">
                  Data, horário e local em confirmação
                </p>
                {isCurrent && (
                  <button
                    type="button"
                    disabled
                    title="Inscrições em breve"
                    className="btn-solid mt-4 inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground opacity-90"
                  >
                    Quero me inscrever
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </button>
                )}
                {isCurrent && <p className="mt-2 text-center text-[11px] font-medium text-white/70">Inscrições em breve</p>}
              </div>
            </article>
          );
        })}
      </div>
      <button
        type="button"
        aria-label="Competência anterior"
        onClick={handlePrevious}
        className="absolute left-0 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur-sm transition-colors hover:bg-accent sm:left-8"
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Próxima competência"
        onClick={handleNext}
        className="absolute right-0 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur-sm transition-colors hover:bg-accent sm:right-8"
      >
        <ChevronRight className="size-5" aria-hidden="true" />
      </button>
    </div>
  );
}
