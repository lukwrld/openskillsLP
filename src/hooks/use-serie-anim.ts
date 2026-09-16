import { useEffect } from "react";

/**
 * Adiciona a classe "is-visible" a todo elemento com data-anim quando ele
 * entra na tela pela primeira vez (fade + slide e linha sob os títulos).
 */
export function useRevealOnScroll() {
  useEffect(() => {
    const alvos = Array.from(document.querySelectorAll<HTMLElement>("[data-anim]"));
    if (!alvos.length) return;

    const reveal = (entradas: IntersectionObserverEntry[]) => {
      for (const entrada of entradas) {
        entrada.target.classList.toggle("is-visible", entrada.isIntersecting);
      }
    };
    const regulares = alvos.filter((el) => el.dataset.anim !== "lower");
    const inferiores = alvos.filter((el) => el.dataset.anim === "lower");
    const obs = new IntersectionObserver(reveal, {
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.01,
    });
    const obsInferior = new IntersectionObserver(reveal, {
      rootMargin: "0px 0px -28% 0px",
      threshold: 0.01,
    });

    for (const el of regulares) obs.observe(el);
    for (const el of inferiores) obsInferior.observe(el);
    return () => {
      obs.disconnect();
      obsInferior.disconnect();
    };
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
/**
 * Vincula o progresso visual da jornada à posição real da rolagem.
 */
export function useShowcaseScrollMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const journey = document.querySelector<HTMLElement>(".journey-showcase");
    const experience = document.querySelector<HTMLElement>(".experience-showcase");
    if (!journey && !experience) return;
    let frame = 0;

    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    const update = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;
      if (experience) {
        const rect = experience.getBoundingClientRect();
        const threshold = viewportHeight * 0.72;
        const entered = rect.top < threshold && rect.bottom > viewportHeight * 0.18;
        experience.classList.toggle("is-visible", entered);
      }

      if (journey) {
        const rect = journey.getBoundingClientRect();
        const active = rect.top < viewportHeight * 0.82 && rect.bottom > viewportHeight * 0.18;
        const progress = active
          ? clamp((viewportHeight * 0.78 - rect.top) / (rect.height * 0.72))
          : 0;
        journey.classList.toggle("is-visible", active);
        journey.style.setProperty("--journey-progress", progress.toFixed(3));
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
}

export function useCompetenciasStage() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>(".competencias-stage");
    const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-competency-card]"));
    if (!section || !cards.length) return;

    const reveal = (count: number) => {
      cards.slice(0, count).forEach((card) => card.classList.add("is-revealed"));
    };
    const reset = () => {
      cards.forEach((card) => card.classList.remove("is-revealed", "is-visible"));
    };
    const triggers = Array.from(section.querySelectorAll<HTMLElement>("[data-competency-trigger]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(Number((entry.target as HTMLElement).dataset.competencyTrigger));
        });
      },
      { rootMargin: "-10% 0px -55% 0px", threshold: 0 },
    );
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) reset();
      },
      { threshold: 0 },
    );

    section.dataset.ready = "true";
    triggers.forEach((trigger) => observer.observe(trigger));
    sectionObserver.observe(section);

    return () => {
      observer.disconnect();
      sectionObserver.disconnect();
      reset();
      delete section.dataset.ready;
    };
  }, []);
}
