import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { CookieSettingsButton } from "./CookieConsent";

export function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="site-header h-16 border-b border-border">
        <div className="mx-auto flex h-full w-full max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold text-navy-foreground"
          >
            <img
              src="/logo_100os_transparent.png"
              alt="100 Open Startups"
              className="size-8"
              width={32}
              height={32}
            />
            100 Open Startups
          </Link>
          <Link to="/" className="text-sm text-navy-foreground/80 hover:text-navy-foreground">
            Voltar ao início
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-20">{children}</main>
      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-7 text-sm text-muted-foreground sm:px-6">
          <span>© 2026 100 Open Startups</span>
          <nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Links legais">
            <Link className="link-underline" to="/termos">
              Termos de Uso
            </Link>
            <Link className="link-underline" to="/privacidade">
              Política de Privacidade
            </Link>
            <CookieSettingsButton className="link-underline cursor-pointer" />
          </nav>
        </div>
      </footer>
    </div>
  );
}
