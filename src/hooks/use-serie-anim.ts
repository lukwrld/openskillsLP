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
