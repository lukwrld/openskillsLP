import { useEffect } from "react";

/**
 * Adiciona a classe "is-visible" a todo elemento com data-anim quando ele
 * entra na tela pela primeira vez (fade + slide e linha sob os títulos).
 */
export function useRevealOnScroll() {
  useEffect(() => {
    const alvos = Array.from(document.querySelectorAll<HTMLElement>("[data-anim]"));
    if (!alvos.length) return;

    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            e.target.classList.toggle("is-visible", e.isIntersecting);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
    );

    for (const el of alvos) obs.observe(el);
    return () => obs.disconnect();
  }, []);
}

/**
 * Deixa o header progressivamente mais transparente conforme a rolagem
 * (mantendo o blur), variando a opacidade do fundo de 70% até 22%.
 */
export function useHeaderScrollState() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".site-header");
    if (!header) return;

    let raf = 0;
    const atualizar = () => {
      raf = 0;
      header.dataset.scrolled = String(window.scrollY > 6);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(atualizar);
    };

    atualizar();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
}

/** Revela as competências em dois grupos enquanto a seção permanece em foco. */
export function useCompetenciasStage() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>(".competencias-stage");
    const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-competency-card]"));
    if (!section || !cards.length) return;

    const reveal = (count: number) => {
      cards.slice(0, count).forEach((card) => card.classList.add("is-revealed"));
    };
    const triggers = Array.from(section.querySelectorAll<HTMLElement>("[data-competency-trigger]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(Number((entry.target as HTMLElement).dataset.competencyTrigger));
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "-10% 0px -55% 0px", threshold: 0 },
    );

    section.dataset.ready = "true";
    triggers.forEach((trigger) => observer.observe(trigger));

    return () => {
      observer.disconnect();
      delete section.dataset.ready;
    };
  }, []);
}
