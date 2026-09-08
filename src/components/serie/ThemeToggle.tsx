import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

type Tema = "light" | "dark" | "system";
const CHAVE = "serie-tema";

function aplicar(tema: Tema) {
  const escuro =
    tema === "dark" ||
    (tema === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", escuro);
}

export function ThemeToggle() {
  const [tema, setTema] = useState<Tema>("system");
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    const salvo = (localStorage.getItem(CHAVE) as Tema | null) ?? "system";
    setTema(salvo);
    setMontado(true);
  }, []);

  useEffect(() => {
    if (!montado) return;
    localStorage.setItem(CHAVE, tema);
    aplicar(tema);
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => aplicar(tema);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [tema, montado]);

  const opcoes: { valor: Tema; label: string; Icone: typeof Sun }[] = [
    { valor: "light", label: "Tema claro", Icone: Sun },
    { valor: "dark", label: "Tema escuro", Icone: Moon },
    { valor: "system", label: "Tema automático", Icone: Monitor },
  ];

  return (
    <div
      className="flex items-center gap-0.5 rounded-full border border-border bg-surface p-0.5"
      role="group"
      aria-label="Escolher tema"
    >
      {opcoes.map(({ valor, label, Icone }) => (
        <button
          key={valor}
          type="button"
          onClick={() => setTema(valor)}
          aria-label={label}
          aria-pressed={montado && tema === valor}
          className={`flex size-7 items-center justify-center rounded-full transition-colors ${
            montado && tema === valor
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Icone className="size-3.5" aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
