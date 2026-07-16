import { useEffect, useRef } from "react";

export function FloatingOrbs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationId = 0;

    const colors = ["#c4a7e7", "#9ccfd8", "#eb6f92", "#ea9a97", "#f6c177"];
    const orbs = Array.from({ length: 18 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 20 + Math.random() * 60,
      dx: (Math.random() - 0.5) * 0.0006,
      dy: (Math.random() - 0.5) * 0.0006,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 0.08 + Math.random() * 0.12,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const o of orbs) {
        o.x += o.dx;
        o.y += o.dy;
        if (o.x < 0 || o.x > 1) o.dx *= -1;
        if (o.y < 0 || o.y > 1) o.dy *= -1;
        const g = ctx.createRadialGradient(o.x * width, o.y * height, 0, o.x * width, o.y * height, o.r);
        g.addColorStop(0, `${o.color}${Math.floor(o.alpha * 255).toString(16).padStart(2, "0")}`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(o.x * width, o.y * height, o.r, 0, Math.PI * 2);
        ctx.fill();
      }
      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />;
}
