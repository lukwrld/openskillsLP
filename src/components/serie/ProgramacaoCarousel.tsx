import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
      className="relative mt-10 h-[20rem] sm:h-[22rem]"
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
              className="absolute h-72 w-52 overflow-hidden rounded-2xl border border-border bg-background text-left shadow-xl transition-all duration-500 ease-in-out sm:h-80 sm:w-60"
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
                width={240}
                height={320}
                loading="lazy"
                decoding="async"
                alt="Palestrante em confirmação"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/45 to-transparent p-5 pt-16">
                <p className="text-xs font-bold uppercase tracking-[0.09em] text-white/75">
                  {bloco?.titulo}
                </p>
                <h3 className="mt-2 font-display text-lg font-bold leading-tight text-white">
                  {competencia.nome}
                </h3>
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
