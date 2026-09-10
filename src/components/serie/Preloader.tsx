import { useEffect, useRef, useState } from "react";

const LOGO_SRC = "/logo_100os_transparent.png";

const ENTRANCE_MS = 500;
const HOLD_MS = 350;
const EXPAND_MS = 1500;

/** Clean brand intro shown while the page boots: small logo grows and dissolves smoothly. */
export function Preloader() {
  const [entered, setEntered] = useState(false);
  const [expanding, setExpanding] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scale, setScale] = useState(20);
  const markRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const computeScale = () => {
      const el = markRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      if (!size) return;
      const target = Math.max(window.innerWidth, window.innerHeight);
      setScale((target / size) * 1.2);
    };

    computeScale();
    window.addEventListener("resize", computeScale);

    if (reduced) {
      setVisible(false);
      return () => window.removeEventListener("resize", computeScale);
    }

    const enterTimer = window.setTimeout(() => setEntered(true), 20);
    const startTimer = window.setTimeout(() => setExpanding(true), ENTRANCE_MS + HOLD_MS);
    const hideTimer = window.setTimeout(
      () => setVisible(false),
      ENTRANCE_MS + HOLD_MS + EXPAND_MS + 100,
    );

    return () => {
      window.removeEventListener("resize", computeScale);
      window.clearTimeout(enterTimer);
      window.clearTimeout(startTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;
  return (
    <div
      className="preloader"
      data-entered={entered}
      data-expanding={expanding}
      style={{ "--preloader-scale": scale } as React.CSSProperties}
      aria-label="Carregando página"
      role="status"
    >
      <div className="preloader__mark" ref={markRef}>
        <img src={LOGO_SRC} alt="" />
      </div>
    </div>
  );
}
