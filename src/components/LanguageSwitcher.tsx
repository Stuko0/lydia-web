import { useState, useEffect, useRef } from "react";
import { Globe, Check } from "lucide-react";

const labels: Record<string, string> = { es: "Espa\u00f1ol", en: "English", it: "Italiano" };

export function LanguageSwitcher({ currentLng }: { currentLng: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const switchTo = (next: string) => {
    const rest = window.location.pathname.replace(/^\/(es|en|it)/, "") || "/";
    window.location.href = `/${next}${rest}`;
  };

  return (
    <div className="relative" ref={ref}>
      <button
        aria-label="Cambiar idioma"
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 items-center gap-1.5 rounded-full border border-rpm-highlight-med/40 bg-rpm-surface/60 px-3 text-sm font-medium text-rpm-text transition hover:border-rpm-iris hover:text-rpm-iris"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden uppercase sm:inline">{currentLng}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-12 z-50 min-w-[8rem] overflow-hidden rounded-xl border border-rpm-highlight-med/40 bg-rpm-surface shadow-2xl">
          {["es", "en", "it"].map((code) => (
            <button
              key={code}
              onClick={() => {
                setOpen(false);
                switchTo(code);
              }}
              className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm transition hover:bg-rpm-base ${code === currentLng ? "text-rpm-iris" : "text-rpm-text"}`}
            >
              {labels[code]}
              {code === currentLng && <Check className="h-3.5 w-3.5" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
