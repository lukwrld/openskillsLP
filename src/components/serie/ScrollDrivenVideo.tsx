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
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const loadFrame = (index: number) => {
      if (images[index]) return Promise.resolve(images[index]!);
      if (pending[index]) return pending[index]!;
      pending[index] = new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.decoding = "async";
        image.onload = () => {
          images[index] = image;
          resolve(image);
        };
        image.onerror = () => reject(new Error(`Frame ${index + 1} não carregou`));
        image.src = frameSource(index);
      });
      return pending[index]!;
    };

    const warmFrames = (from: number, count = PRELOAD_AHEAD) => {
      for (let offset = 0; offset < count; offset += 1) {
        const index = (from + offset) % FRAME_COUNT;
        void loadFrame(index).catch(() => undefined);
      }
    };

    const draw = (target: number) => {
      const image = images[target];
      if (!image?.naturalWidth) return false;
      const width = wrapper.clientWidth;
      const height = wrapper.clientHeight;
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
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(bounds.width * ratio));
      canvas.height = Math.max(1, Math.round(bounds.height * ratio));
      canvas.style.width = `${bounds.width}px`;
      canvas.style.height = `${bounds.height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw(activeFrame);
    };

    const play = (now: number) => {
      if (!playing || !pageVisible) return;
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
      warmFrames(0);
      await Promise.all(Array.from({ length: 8 }, (_, index) => loadFrame(index))).catch(
        () => undefined,
      );
      playing = true;
      lastFrameAt = 0;
      animationFrame = requestAnimationFrame(play);
    };

    const onVisibilityChange = () => {
      pageVisible = !document.hidden;
      if (pageVisible && playing) {
        lastFrameAt = 0;
        animationFrame = requestAnimationFrame(play);
      } else {
        cancelAnimationFrame(animationFrame);
      }
    };

    const observer = new ResizeObserver(resize);
    observer.observe(wrapper);
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
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="hero-video-background" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-video-canvas" />
    </div>
  );
}
