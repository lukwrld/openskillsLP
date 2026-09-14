import { useEffect, useRef } from "react";

const FRAME_COUNT = 194;
const FRAME_RATE = 24;
const PRELOAD_AHEAD = 18;
const frameSource = (index: number) =>
  `/hero-frames-cropped/ezgif-frame-${String(index + 1).padStart(3, "0")}.jpg`;

/** Decorative image sequence that plays automatically on loop. */
export function ScrollDrivenVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !wrapper || !context) return;

    const images: Array<HTMLImageElement | undefined> = new Array(FRAME_COUNT);
    const pending: Array<Promise<HTMLImageElement> | undefined> = new Array(FRAME_COUNT);
    let activeFrame = 0;
    let animationFrame = 0;
    let started = false;
    let playing = false;
    let lastFrameAt = 0;
    let pageVisible = !document.hidden;
    let heroVisible = true;
    let canvasWidth = 0;
    let canvasHeight = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 639px)").matches;
    const initialFrames = isMobile ? 3 : 8;
    const preloadAhead = isMobile ? 8 : PRELOAD_AHEAD;

    const loadFrame = (index: number) => {
      if (images[index]) return Promise.resolve(images[index]!);
      if (pending[index]) return pending[index]!;
      pending[index] = new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.decoding = "async";
        image.fetchPriority = index === 0 ? "high" : "low";
        image.onload = () => {
          images[index] = image;
          resolve(image);
        };
        image.onerror = () => reject(new Error(`Frame ${index + 1} não carregou`));
        image.src = frameSource(index);
      });
      return pending[index]!;
    };

    const warmFrames = (from: number, count = preloadAhead) => {
      for (let offset = 0; offset < count; offset += 1) {
        const index = (from + offset) % FRAME_COUNT;
        void loadFrame(index).catch(() => undefined);
      }
    };

    const draw = (target: number) => {
      const image = images[target];
      if (!image?.naturalWidth) return false;
      const width = canvasWidth;
      const height = canvasHeight;
      if (!width || !height) return false;
      const imageRatio = image.naturalWidth / image.naturalHeight;
      const boxRatio = width / height;
      const drawWidth = imageRatio > boxRatio ? height * imageRatio : width;
      const drawHeight = imageRatio > boxRatio ? height : width / imageRatio;
      context.fillStyle = "#101725";
      context.fillRect(0, 0, width, height);
      context.drawImage(
        image,
        (width - drawWidth) / 2,
        (height - drawHeight) / 2,
        drawWidth,
        drawHeight,
      );
      return true;
    };

    const resize = () => {
      const bounds = wrapper.getBoundingClientRect();
      canvasWidth = Math.max(1, Math.round(bounds.width));
      canvasHeight = Math.max(1, Math.round(bounds.height));
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(canvasWidth * ratio);
      canvas.height = Math.round(canvasHeight * ratio);
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw(activeFrame);
    };

    const play = (now: number) => {
      if (!playing || !pageVisible || !heroVisible) return;
      if (!lastFrameAt) lastFrameAt = now;
      if (now - lastFrameAt >= 1000 / FRAME_RATE) {
        const nextFrame = (activeFrame + 1) % FRAME_COUNT;
        if (draw(nextFrame)) {
          activeFrame = nextFrame;
          lastFrameAt = now;
          warmFrames(activeFrame + PRELOAD_AHEAD, 4);
        } else {
          void loadFrame(nextFrame).catch(() => undefined);
        }
      }
      animationFrame = requestAnimationFrame(play);
    };

    const beginPlayback = async () => {
      if (started || reducedMotion) return;
      started = true;
      warmFrames(0, initialFrames);
      await Promise.all(
        Array.from({ length: initialFrames }, (_, index) => loadFrame(index)),
      ).catch(() => undefined);
      playing = true;
      lastFrameAt = 0;
      animationFrame = requestAnimationFrame(play);
    };

    const onVisibilityChange = () => {
      pageVisible = !document.hidden;
      if (pageVisible && heroVisible && playing) {
        lastFrameAt = 0;
        animationFrame = requestAnimationFrame(play);
      } else {
        cancelAnimationFrame(animationFrame);
      }
    };

    const inViewObserver = new IntersectionObserver(
      ([entry]) => {
        heroVisible = entry.isIntersecting;
        if (heroVisible && pageVisible && playing) {
          lastFrameAt = 0;
          animationFrame = requestAnimationFrame(play);
        } else {
          cancelAnimationFrame(animationFrame);
        }
      },
      { threshold: 0 },
    );

    const observer = new ResizeObserver(resize);
    observer.observe(wrapper);
    inViewObserver.observe(wrapper);
    document.addEventListener("visibilitychange", onVisibilityChange);
    void loadFrame(0).then(() => {
      resize();
      warmFrames(1);
      void beginPlayback();
    });

    return () => {
      playing = false;
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      inViewObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="hero-video-background" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-video-canvas" />
    </div>
  );
}
