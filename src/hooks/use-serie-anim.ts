import { useEffect } from "react";

/**
 * Adiciona a classe "is-visible" a todo elemento com data-anim quando ele
 * entra na tela pela primeira vez (fade + slide e linha sob os títulos).
 */
export function useRevealOnScroll() {
  useEffect(() => {
    const alvos = Array.from(
      document.querySelectorAll<HTMLElement>("[data-anim]"),
    );
    if (!alvos.length) return;

    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );

    for (const el of alvos) obs.observe(el);
    return () => obs.disconnect();
  }, []);
}

/**
 * Deixa o header progressivamente mais transparente conforme a rolagem
 * (mantendo o blur), variando a opacidade do fundo de 70% até 22%.
 */
export function useHeaderTransparency() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".glass-header");
    if (!header) return;

    let raf = 0;
    const atualizar = () => {
      raf = 0;
      const p = Math.min(1, window.scrollY / 360);
      const alpha = 70 - p * 48;
      header.style.setProperty("--header-alpha", `${alpha.toFixed(1)}%`);
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
