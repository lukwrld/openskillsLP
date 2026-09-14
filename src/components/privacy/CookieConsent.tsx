import { useEffect, useState } from "react";

type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
  version: "1";
};
const STORAGE_KEY = "100os-cookie-consent";

function saveConsent(analytics: boolean, marketing: boolean) {
  const consent: Consent = {
    necessary: true,
    analytics,
    marketing,
    updatedAt: new Date().toISOString(),
    version: "1",
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  window.dispatchEvent(new CustomEvent("privacy-consent-updated", { detail: consent }));
}

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  useEffect(() => {
    setOpen(!localStorage.getItem(STORAGE_KEY));
    const openSettings = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const consent = JSON.parse(saved) as Consent;
          setAnalytics(consent.analytics);
          setMarketing(consent.marketing);
        }
      } catch {
        /* Replaced on save. */
      }
      setSettings(true);
      setOpen(true);
    };
    window.addEventListener("open-cookie-settings", openSettings);
    return () => window.removeEventListener("open-cookie-settings", openSettings);
  }, []);
  if (!open) return null;
  const closeWith = (nextAnalytics: boolean, nextMarketing: boolean) => {
    saveConsent(nextAnalytics, nextMarketing);
    setOpen(false);
    setSettings(false);
  };
  return (
    <section
      className="fixed inset-x-4 bottom-4 z-[100] mx-auto w-auto max-w-xl rounded-[var(--radius-surface)] border border-border bg-card p-5 shadow-2xl sm:bottom-6"
      aria-label="Preferências de cookies"
      role="dialog"
      aria-modal="true"
    >
      <h2 className="font-display text-lg font-bold text-foreground">Sua privacidade</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Usamos armazenamento estritamente necessário para lembrar suas preferências. Cookies de
        análise e marketing só serão ativados se você autorizar — e não estão ativos neste momento.
        Veja a{" "}
        <a className="link-underline text-primary" href="/privacidade">
          Política de Privacidade
        </a>
        .
      </p>
      {settings && (
        <fieldset className="mt-4 space-y-3 border-t border-border pt-4 text-sm">
          <legend className="sr-only">Categorias de armazenamento</legend>
          <label className="flex items-start justify-between gap-4">
            <span>
              <strong className="text-foreground">Necessários</strong>
              <br />
              Preferências de consentimento e tema.
            </span>
            <input
              checked
              disabled
              type="checkbox"
              aria-label="Cookies necessários, sempre ativos"
            />
          </label>
          <label className="flex items-start justify-between gap-4">
            <span>
              <strong className="text-foreground">Análise</strong>
              <br />
              Medição de uso do site. Atualmente não utilizada.
            </span>
            <input
              checked={analytics}
              onChange={(event) => setAnalytics(event.target.checked)}
              type="checkbox"
            />
          </label>
          <label className="flex items-start justify-between gap-4">
            <span>
              <strong className="text-foreground">Marketing</strong>
              <br />
              Publicidade e personalização. Atualmente não utilizada.
            </span>
            <input
              checked={marketing}
              onChange={(event) => setMarketing(event.target.checked)}
              type="checkbox"
            />
          </label>
        </fieldset>
      )}
      <div className="mt-5 flex flex-wrap gap-2">
        <button
          className="btn-solid rounded-md border border-border px-3 py-2 text-sm font-semibold"
          onClick={() => closeWith(false, false)}
          type="button"
        >
          Recusar opcionais
        </button>
        <button
          className="btn-solid rounded-md border border-border px-3 py-2 text-sm font-semibold"
          onClick={() => setSettings(!settings)}
          type="button"
        >
          {settings ? "Fechar opções" : "Personalizar"}
        </button>
        <button
          className="btn-solid rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground"
          onClick={() => (settings ? closeWith(analytics, marketing) : closeWith(true, true))}
          type="button"
        >
          {settings ? "Salvar preferências" : "Aceitar todos"}
        </button>
      </div>
    </section>
  );
}

export function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button
      className={className}
      onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
      type="button"
    >
      Preferências de cookies
    </button>
  );
}
